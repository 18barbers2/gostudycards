
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
import { getCards, createCard, removeFieldFromCards } from '../api/cards';
import type { Deck, CardTemplate } from '../types';

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

    // Delete-field confirmation: fieldName waiting for confirmation, and how many cards use it
    const [pendingDeleteField, setPendingDeleteField] = useState<string | null>(null);
    const [deleteWarningCount, setDeleteWarningCount] = useState(0);

    // Refs give us a handle into each FieldInput so we can call applyFormat() from the toolbar
    const questionRef = useRef<FieldInputHandle>(null);
    const answerRef   = useRef<FieldInputHandle>(null);
    const hintRef     = useRef<FieldInputHandle>(null);
    const extraFieldRefs = useRef<Map<string, FieldInputHandle>>(new Map());
    // A Map from custom field ID → FieldInputHandle for toolbar routing
    const customFieldRefs = useRef<Map<string, FieldInputHandle>>(new Map());

    // Load decks on mount; if a deckId was passed via nav state, pre-select it
    useEffect(() => {
        getDecks(TEMP_USER_ID)
            .then(data => {
                setDecks(data);
                const preselected = location.state?.deckId;
                if (preselected && data.some((d: { id: string }) => d.id === preselected)) {
                    setSelectedDeckId(preselected);
                } else if (data.length > 0) {
                    setSelectedDeckId(data[0].id);
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Load template whenever the selected deck changes
    useEffect(() => {
        if (!selectedDeckId) return;
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
        setCustomFields(prev => prev.filter(f => f.id !== id));
        customFieldRefs.current.delete(id);
    };

    // Initiates deletion of a template-based (extra) field.
    // If existing cards have data for this field, shows a confirmation warning first.
    const handleDeleteExtraField = (fieldName: string) => {
        if (!template || !selectedDeckId) return;
        getCards(selectedDeckId)
            .then(cards => {
                const count = cards.filter(c => c.data[fieldName]?.trim()).length;
                if (count > 0) {
                    // Surface a warning before removing a field that has card data
                    setPendingDeleteField(fieldName);
                    setDeleteWarningCount(count);
                } else {
                    removeExtraField(fieldName);
                }
            })
            .catch(err => console.error(err));
    };

    // Executes the deletion after the user confirms the warning dialog
    const confirmDeleteExtraField = () => {
        if (pendingDeleteField) removeExtraField(pendingDeleteField);
        setPendingDeleteField(null);
    };

    const cancelDeleteExtraField = () => setPendingDeleteField(null);

    // Removes a field from the template and deletes that field's data from all cards in the deck
    const removeExtraField = (fieldName: string) => {
        if (!template || !selectedDeckId) return;
        const updatedFields = template.fields
            .filter(f => f.name !== fieldName)
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
                activeTemplate = await updateTemplate(activeTemplate.id, allFields);
                // Updating the template triggers the extraFields seeding effect,
                // which will surface the new fields as persistent extra fields
                setTemplate(activeTemplate);
            }

            await createCard(activeTemplate.id, selectedDeckId, cardData);
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

                        {/* Extra fields from the deck's template (e.g. "Etymology") */}
                        {extraFields.map(field => (
                            <div key={field.name} onFocus={() => setActiveField(field.name)}>
                                <FieldInput
                                    ref={el => { if (el) extraFieldRefs.current.set(field.name, el); }}
                                    fieldName={field.name}
                                    value={extraFieldValues[field.name] ?? ''}
                                    onChange={val => setExtraFieldValues(prev => ({ ...prev, [field.name]: val }))}
                                    onDelete={() => handleDeleteExtraField(field.name)}
                                />
                            </div>
                        ))}

                        {/* User-added one-off custom fields */}
                        {customFields.map(field => (
                            <div key={field.id} onFocus={() => setActiveField(field.id)}>
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
                            have data for &ldquo;{pendingDeleteField}&rdquo;. Removing this field will
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
