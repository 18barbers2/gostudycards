
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/AddCard.css';
import FieldInput from '../components/FieldInput';
import type { FieldInputHandle } from '../components/FieldInput';
import PreviewPanel from '../components/PreviewPanel';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import { getDecks, createDeck } from '../api/decks';
import { getTemplate, createTemplate, updateTemplate } from '../api/templates';
import { getFieldUsageCount, createCard, removeFieldFromCards, renameFieldInCards } from '../api/cards';
import type { Deck, CardTemplate } from '../types';
import { useAuth } from '../context/AuthContext.tsx';

const TEMP_USER_ID = 'test-user-1';

// Default Q/A/H field names — always shown regardless of template
const DEFAULT_FIELD_NAMES = ['Question', 'Answer', 'Hint'];

// Fallback HTML used for the live preview when the deck has no saved template yet
const DEFAULT_FRONT = `<div style="padding: 20px; text-align: center;"><h2 style="color: #ffffff; margin-bottom: 10px;">{{Question}}</h2><p style="color: rgba(255,255,255,0.7); font-style: italic;">{{Hint}}</p></div>`;
const DEFAULT_BACK  = `<div style="padding: 20px; text-align: center;"><p style="color: rgba(255,255,255,0.6); font-size: 0.8em; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Answer</p><p style="color: #ffffff; font-size: 1.2em;">{{Answer}}</p></div>`;
const DEFAULT_TEMPLATE_FIELDS = DEFAULT_FIELD_NAMES.map(name => ({ name, isDefault: true }));

// Tracks which field the user is currently typing in so the format toolbar
// knows which FieldInput to apply bold/italic/etc. to.
type ActiveField = 'question' | 'answer' | 'hint' | string;

export default function AddCard() {

    const { userId } = useAuth();

    // Read navigation state — future deck detail page can pass a pre-selected deckId
    const location = useLocation();

    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeckId, setSelectedDeckId] = useState<string>('');

    // Inline deck creation form (shown when user clicks "+ New Deck")
    const [showNewDeckForm, setShowNewDeckForm] = useState(false);
    const [newDeckName, setNewDeckName] = useState('');

    // Template for the selected deck (null = no template, undefined = still loading)
    const [template, setTemplate] = useState<CardTemplate | null | undefined>(undefined);

    // Fixed default fields — always visible
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [hint, setHint] = useState('');

    // Extra fields defined in the template beyond Q/A/H (e.g. "Etymology", "Example")
    const [extraFieldValues, setExtraFieldValues] = useState<Record<string, string>>({});

    // User-added one-off custom fields (via the Add Field button)
    const [customFields, setCustomFields] = useState<{ id: string; name: string; value: string }[]>([]);

    // Controls whether the card preview shows the front or back face
    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

    // Tracks which field the user last focused so the format toolbar targets the right textarea
    const [activeField, setActiveField] = useState<ActiveField>('question');

    // Save feedback
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [saveMessage, setSaveMessage] = useState('');

    // Delete-field confirmation: the field (by id + name) waiting for confirmation, and how many cards use it
    const [pendingDeleteField, setPendingDeleteField] = useState<{ id: string; name: string } | null>(null);
    const [deleteWarningCount, setDeleteWarningCount] = useState(0);

    // IDs of fields currently playing their removal animation — actual state removal happens on animationend
    const [removingFields, setRemovingFields] = useState<Set<string>>(new Set());

    // Refs give us a handle into each FieldInput so we can call applyFormat() from the toolbar
    const questionRef = useRef<FieldInputHandle>(null);
    const answerRef   = useRef<FieldInputHandle>(null);
    const hintRef     = useRef<FieldInputHandle>(null);
    const extraFieldRefs = useRef<Map<string, FieldInputHandle>>(new Map());
    // A Map from custom field ID → FieldInputHandle for toolbar routing
    const customFieldRefs = useRef<Map<string, FieldInputHandle>>(new Map());

    // Prevents the [selectedDeckId] effect from firing a duplicate template fetch
    // on the initial mount (the mount effect already starts that fetch directly).
    const skipNextTemplateLoad = useRef(false);

    // Load decks on mount; if a deckId was passed via nav state, pre-select it.
    // Also kick off the template fetch immediately so both requests run in parallel.
    useEffect(() => {
        getDecks(userId || '')
            .then(data => {
                setDecks(data);
                const preselected = location.state?.deckId;
                const initialId = (preselected && data.some((d: { id: string }) => d.id === preselected))
                    ? preselected
                    : data.length > 0 ? data[0].id : '';
                skipNextTemplateLoad.current = true;
                setSelectedDeckId(initialId);
                if (initialId) {
                    getTemplate(initialId)
                        .then(t => setTemplate(t))
                        .catch(() => setTemplate(null));
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Load template whenever the selected deck changes (user picks a different deck).
    // Skipped on initial mount because the mount effect already handles that fetch.
    useEffect(() => {
        if (!selectedDeckId) return;
        if (skipNextTemplateLoad.current) {
            skipNextTemplateLoad.current = false;
            return;
        }
        setTemplate(undefined); // loading
        setExtraFieldValues({});
        getTemplate(selectedDeckId)
            .then(t => setTemplate(t))
            .catch(() => setTemplate(null));
    }, [selectedDeckId]);

    // When a template loads, seed the extra (non-default) field values
    useEffect(() => {
        if (template) {
            const extra: Record<string, string> = {};
            for (const f of template.fields) {
                if (!DEFAULT_FIELD_NAMES.includes(f.name)) extra[f.name] = '';
            }
            setExtraFieldValues(extra);
        }
    }, [template]);

    // Creates a new deck inline and auto-selects it so the user can save cards immediately
    const handleCreateDeck = (e: React.FormEvent) => {
        e.preventDefault();
        createDeck(newDeckName, undefined, TEMP_USER_ID)
            .then(deck => {
                setDecks(prev => [...prev, deck]);
                setSelectedDeckId(deck.id);
                setNewDeckName('');
                setShowNewDeckForm(false);
            })
            .catch(err => console.error(err));
    };

    const handleAddField = () => {
        const id = crypto.randomUUID();
        setCustomFields(prev => [...prev, { id, name: 'Field', value: '' }]);
    };

    const handleDeleteField = (id: string) => {
        // Trigger the pop animation; actual removal fires in the wrapper's onAnimationEnd
        setRemovingFields(prev => new Set(prev).add(id));
    };

    // Initiates deletion of a template-based (extra) field.
    // Uses fieldId so two fields with the same name are treated independently.
    // If existing cards have data for this field name, shows a confirmation warning first.
    const handleDeleteExtraField = (fieldId: string, fieldName: string) => {
        if (!template || !selectedDeckId) return;
        getFieldUsageCount(selectedDeckId, fieldName)
            .then(count => {
                if (count > 0) {
                    // Surface a warning before removing a field that has card data
                    setPendingDeleteField({ id: fieldId, name: fieldName });
                    setDeleteWarningCount(count);
                } else {
                    // No dialog needed — animate out; removal fires in the wrapper's onAnimationEnd
                    setRemovingFields(prev => new Set(prev).add(fieldId));
                }
            })
            .catch(err => console.error(err));
    };

    // Executes the deletion after the user confirms the warning dialog
    const confirmDeleteExtraField = () => {
        if (!pendingDeleteField) return;
        // Animate the field out; removal fires in the wrapper's onAnimationEnd
        setRemovingFields(prev => new Set(prev).add(pendingDeleteField.id));
        setPendingDeleteField(null);
    };

    const cancelDeleteExtraField = () => setPendingDeleteField(null);

    // Renames a template field: updates the template, migrates all card data, and syncs local state.
    // Uses fieldId so two fields with the same name are renamed independently.
    const handleRenameExtraField = (fieldId: string, oldName: string, newName: string) => {
        if (!template || !selectedDeckId || !newName.trim() || newName === oldName) return;
        const updatedFields = template.fields.map(f =>
            f.id === fieldId
                ? { name: newName, isDefault: f.isDefault }
                : { name: f.name, isDefault: f.isDefault }
        );
        Promise.all([
            updateTemplate(template.id, updatedFields),
            renameFieldInCards(selectedDeckId, oldName, newName),
        ])
            .then(([updated]) => {
                setTemplate(updated);
                // Move the current value over to the new key in local state
                setExtraFieldValues(prev => {
                    const next = { ...prev };
                    next[newName] = next[oldName] ?? '';
                    delete next[oldName];
                    return next;
                });
                // Keep the toolbar ref map consistent with the new name
                const ref = extraFieldRefs.current.get(oldName);
                if (ref) {
                    extraFieldRefs.current.set(newName, ref);
                    extraFieldRefs.current.delete(oldName);
                }
            })
            .catch(err => console.error(err));
    };

    // Removes exactly one field (by id) from the template and deletes its data from all cards in the deck
    const removeExtraField = (fieldId: string, fieldName: string) => {
        if (!template || !selectedDeckId) return;
        const updatedFields = template.fields
            .filter(f => f.id !== fieldId)  // match by id, not name, to avoid removing duplicates
            .map(f => ({ name: f.name, isDefault: f.isDefault }));
        // Run both operations in parallel: update the template and scrub the data from cards
        Promise.all([
            updateTemplate(template.id, updatedFields),
            removeFieldFromCards(selectedDeckId, fieldName),
        ])
            .then(([updated]) => {
                setTemplate(updated);
                setExtraFieldValues(prev => {
                    const next = { ...prev };
                    delete next[fieldName];
                    return next;
                });
                extraFieldRefs.current.delete(fieldName);
            })
            .catch(err => console.error(err));
    };

    const handleFieldNameChange = (id: string, name: string) => {
        setCustomFields(prev => prev.map(f => f.id === id ? { ...f, name } : f));
    };

    const handleFieldValueChange = (id: string, value: string) => {
        setCustomFields(prev => prev.map(f => f.id === id ? { ...f, value } : f));
    };

    // Routes the format command to whichever field is currently active
    const handleFormat = (format: string) => {
        if (activeField === 'question') questionRef.current?.applyFormat(format);
        else if (activeField === 'answer') answerRef.current?.applyFormat(format);
        else if (activeField === 'hint') hintRef.current?.applyFormat(format);
        else if (extraFieldRefs.current.has(activeField)) extraFieldRefs.current.get(activeField)?.applyFormat(format);
        else customFieldRefs.current.get(activeField)?.applyFormat(format);
    };

    const handleFlip = () => {
        setPreviewSide(prev => prev === 'front' ? 'back' : 'front');
    };

    const handleSaveCard = async () => {
        if (!selectedDeckId) return;
        setSaveStatus('saving');

        const customFieldData = Object.fromEntries(customFields.map(f => [f.name, f.value]));
        const cardData = { Question: question, Answer: answer, Hint: hint, ...extraFieldValues, ...customFieldData };

        // Use the existing template, or auto-create the default one on first save
        let activeTemplate = template;
        if (!activeTemplate) {
            try {
                activeTemplate = await createTemplate(
                    selectedDeckId, TEMP_USER_ID,
                    DEFAULT_FRONT, DEFAULT_BACK, '',
                    DEFAULT_TEMPLATE_FIELDS
                );
                setTemplate(activeTemplate);
            } catch {
                setSaveStatus('error');
                setSaveMessage('Failed to create template.');
                setTimeout(() => setSaveStatus('idle'), 3000);
                return;
            }
        }

        try {
            // Persist any new custom fields to the template so they survive across cards
            const newCustomFieldDefs = customFields
                .filter(cf => !DEFAULT_FIELD_NAMES.includes(cf.name))
                .map(cf => ({ name: cf.name, isDefault: false }));

            if (newCustomFieldDefs.length > 0) {
                const allFields = [
                    ...activeTemplate.fields.map(f => ({ name: f.name, isDefault: f.isDefault })),
                    ...newCustomFieldDefs
                ];
                // Run template update and card creation in parallel — createCard only needs
                // the template ID (which is already known) and doesn't depend on the update result.
                const [updatedTemplate] = await Promise.all([
                    updateTemplate(activeTemplate.id, allFields),
                    createCard(activeTemplate.id, selectedDeckId, cardData),
                ]);
                activeTemplate = updatedTemplate;
                // Updating the template triggers the extraFields seeding effect,
                // which will surface the new fields as persistent extra fields
                setTemplate(activeTemplate);
            } else {
                await createCard(activeTemplate.id, selectedDeckId, cardData);
            }
            setQuestion('');
            setAnswer('');
            setHint('');
            // Clear values only — the fields themselves persist via the template
            setExtraFieldValues(prev => Object.fromEntries(Object.keys(prev).map(k => [k, ''])));
            // Custom fields are now in the template; clear the ephemeral list
            setCustomFields([]);
            setPreviewSide('front');
            setSaveStatus('saved');
            setSaveMessage('Card saved!');
        } catch {
            setSaveStatus('error');
            setSaveMessage('Failed to save card.');
        }

        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    // Extra fields are those in the template that aren't the three defaults
    const extraFields = template?.fields.filter(f => !DEFAULT_FIELD_NAMES.includes(f.name)) ?? [];

    // Use the template's HTML for the preview if available, else fall back to the defaults
    const frontTemplate = template?.frontTemplate ?? DEFAULT_FRONT;
    const backTemplate  = template?.backTemplate  ?? DEFAULT_BACK;
    const previewTemplate = previewSide === 'front' ? frontTemplate : backTemplate;
    const cardData = {
        Question: question, Answer: answer, Hint: hint,
        ...extraFieldValues,
        ...Object.fromEntries(customFields.map(f => [f.name, f.value]))
    };

    return (
        <Layout>
            <div className='add-card-page'>
                {/* Title row — page title on the left, deck selector on the right */}
                <div className='page-title-row'>
                    <h1 className='page-title'>Add Card</h1>
                    {showNewDeckForm ? (
                        // Inline mini-form to create a deck without leaving the page
                        <form className='inline-deck-form' onSubmit={handleCreateDeck}>
                            <input
                                className='inline-deck-input'
                                placeholder='Deck name'
                                value={newDeckName}
                                onChange={e => setNewDeckName(e.target.value)}
                                required
                                autoFocus
                            />
                            <button type='submit'>Create</button>
                            <button type='button' onClick={() => setShowNewDeckForm(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div className='deck-selector-row'>
                            <select
                                className='deck-selector'
                                value={selectedDeckId}
                                onChange={e => setSelectedDeckId(e.target.value)}
                            >
                                {decks.length === 0 && <option value=''>No decks yet</option>}
                                {decks.map(deck => (
                                    <option key={deck.id} value={deck.id}>{deck.name}</option>
                                ))}
                            </select>
                            {/* Always visible — lets user create a deck without leaving Add Card */}
                            <button
                                className='new-deck-btn'
                                type='button'
                                onClick={() => setShowNewDeckForm(true)}
                            >
                                + New Deck
                            </button>
                        </div>
                    )}
                </div>

                {/* Formatting toolbar — field-level editing tools */}
                <EditorFormatControls handleFormat={handleFormat} />

                <div className='workspace'>
                    {/* input-column keeps the scrollable fields and the fixed save button together */}
                    <div className='input-column'>
                    <div className='input-section'>
                        {/* Fixed default fields — always shown */}
                        <div onFocus={() => setActiveField('question')}>
                            <FieldInput ref={questionRef} fieldName='Question' value={question} onChange={setQuestion} />
                        </div>
                        <div onFocus={() => setActiveField('answer')}>
                            <FieldInput ref={answerRef} fieldName='Answer' value={answer} onChange={setAnswer} />
                        </div>
                        <div onFocus={() => setActiveField('hint')}>
                            <FieldInput ref={hintRef} fieldName='Hint' value={hint} onChange={setHint} />
                        </div>

                        {/* Spinner shown while the selected deck's template is being fetched */}
                        {template === undefined && selectedDeckId && (
                            <div className='template-loading'>
                                <span className='spinner' />
                            </div>
                        )}

                        {/* Extra fields from the deck's template (e.g. "Etymology") */}
                        {extraFields.map(field => (
                            <div
                                key={field.id}
                                className={removingFields.has(field.id) ? 'field-wrapper--removing' : undefined}
                                onFocus={() => setActiveField(field.name)}
                                onAnimationEnd={e => {
                                    if (e.animationName !== 'field-pop-out') return;
                                    setRemovingFields(prev => { const s = new Set(prev); s.delete(field.id); return s; });
                                    removeExtraField(field.id, field.name);
                                }}
                            >
                                <FieldInput
                                    ref={el => { if (el) extraFieldRefs.current.set(field.name, el); }}
                                    fieldName={field.name}
                                    value={extraFieldValues[field.name] ?? ''}
                                    onChange={val => setExtraFieldValues(prev => ({ ...prev, [field.name]: val }))}
                                    onDelete={() => handleDeleteExtraField(field.id, field.name)}
                                    onNameChange={newName => handleRenameExtraField(field.id, field.name, newName)}
                                />
                            </div>
                        ))}

                        {/* User-added one-off custom fields */}
                        {customFields.map(field => (
                            <div
                                key={field.id}
                                className={removingFields.has(field.id) ? 'field-wrapper--removing' : undefined}
                                onFocus={() => setActiveField(field.id)}
                                onAnimationEnd={e => {
                                    if (e.animationName !== 'field-pop-out') return;
                                    setCustomFields(prev => prev.filter(f => f.id !== field.id));
                                    customFieldRefs.current.delete(field.id);
                                    setRemovingFields(prev => { const s = new Set(prev); s.delete(field.id); return s; });
                                }}
                            >
                                <FieldInput
                                    ref={el => { if (el) customFieldRefs.current.set(field.id, el); }}
                                    fieldName={field.name}
                                    value={field.value}
                                    onChange={val => handleFieldValueChange(field.id, val)}
                                    onDelete={() => handleDeleteField(field.id)}
                                    onNameChange={name => handleFieldNameChange(field.id, name)}
                                />
                            </div>
                        ))}

                        <button className='add-field-button' onClick={handleAddField}>
                            <span className='material-symbols-outlined'>add</span>
                            Add Field
                        </button>
                    </div>

                    {/* Save row sits outside the scrollable area — always visible at the bottom */}
                    <div className='save-card-row'>
                        <button
                            className='save-card-button'
                            onClick={handleSaveCard}
                            disabled={!selectedDeckId || saveStatus === 'saving'}
                        >
                            {saveStatus === 'saving' ? 'Saving…' : 'Save Card'}
                        </button>
                        {saveStatus !== 'idle' && saveStatus !== 'saving' && (
                            <span className={`save-status save-status--${saveStatus}`}>{saveMessage}</span>
                        )}
                    </div>
                    </div>

                    {/* Live card preview — updates as the user types */}
                    <PreviewPanel
                        side={previewSide}
                        template={previewTemplate}
                        style={template?.style ?? ''}
                        data={cardData}
                        onFlip={handleFlip}
                        onInsert={() => {}}
                        showInsertBar={false}
                    />
                </div>
            </div>

            {/* Warning dialog shown when deleting a field that has data in existing cards */}
            {pendingDeleteField && (
                <div className='delete-field-overlay'>
                    <div className='delete-field-modal'>
                        <p className='delete-field-modal__message'>
                            <strong>{deleteWarningCount} card{deleteWarningCount !== 1 ? 's' : ''}</strong> already
                            have data for &ldquo;{pendingDeleteField.name}&rdquo;. Removing this field will
                            permanently delete that data from all cards in this deck.
                        </p>
                        <div className='delete-field-modal__actions'>
                            <button className='delete-field-modal__confirm' onClick={confirmDeleteExtraField}>
                                Remove Field
                            </button>
                            <button className='delete-field-modal__cancel' onClick={cancelDeleteExtraField}>
                                Keep Field
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
