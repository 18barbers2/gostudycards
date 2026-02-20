
import { useState, useRef } from 'react';
import '../css/AddCard.css';
import FieldInput from '../components/FieldInput';
import type { FieldInputHandle } from '../components/FieldInput';
import PreviewPanel from '../components/PreviewPanel';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import { MOCK_DECKS } from '../data/decks';

// Tracks which field the user is currently typing in so the format toolbar
// knows which FieldInput to apply bold/italic/etc. to.
// 'question' | 'answer' | 'hint' are the fixed fields; string covers custom field IDs (UUIDs).
type ActiveField = 'question' | 'answer' | 'hint' | string;

export default function AddCard() {

    // The deck the user has selected from the dropdown — defaults to the first available deck
    const [selectedDeckId, setSelectedDeckId] = useState<string>(MOCK_DECKS[0]?.id ?? '');

    // List of custom fields the user has added via "Add Field".
    // Each has a unique id (UUID), a display name, and its text value.
    const [customFields, setCustomFields] = useState<{ id: string; name: string; value: string }[]>([]);

    // Controls whether the card preview shows the front or back face
    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

    // State for the three fixed card fields
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [hint, setHint] = useState('');

    // Tracks which field the user last focused, so the format toolbar targets the right textarea
    const [activeField, setActiveField] = useState<ActiveField>('question');

    // Refs give us a handle into each FieldInput so we can call applyFormat() on them
    // from the toolbar without re-rendering the whole page
    const questionRef = useRef<FieldInputHandle>(null);
    const answerRef   = useRef<FieldInputHandle>(null);
    const hintRef     = useRef<FieldInputHandle>(null);

    // A Map from field ID → FieldInputHandle for custom fields.
    // Using a Map (instead of an array of refs) makes it easy to look up by ID.
    const customFieldRefs = useRef<Map<string, FieldInputHandle>>(new Map());

    // Called by the format toolbar (bold, italic, etc.).
    // Routes the format command to whichever field is currently active.
    const handleFormat = (format: string) => {
        if (activeField === 'question') questionRef.current?.applyFormat(format);
        else if (activeField === 'answer') answerRef.current?.applyFormat(format);
        else if (activeField === 'hint') hintRef.current?.applyFormat(format);
        else customFieldRefs.current.get(activeField)?.applyFormat(format); // Custom field by UUID
    };

    // Creates a new custom field with a unique ID and adds it to the list.
    // crypto.randomUUID() ensures no two fields ever share an ID.
    const handleAddField = () => {
        const id = crypto.randomUUID();
        setCustomFields(prev => [...prev, { id, name: 'Field', value: '' }]);
    };

    // Removes a custom field by its ID and cleans up its ref entry
    const handleDeleteField = (id: string) => {
        setCustomFields(prev => prev.filter(f => f.id !== id));
        customFieldRefs.current.delete(id);
    };

    // Updates the display name of a custom field (e.g. renaming "Field" → "Etymology")
    const handleFieldNameChange = (id: string, name: string) => {
        setCustomFields(prev => prev.map(f => f.id === id ? { ...f, name } : f));
    };

    // Updates the text content of a custom field
    const handleFieldValueChange = (id: string, value: string) => {
        setCustomFields(prev => prev.map(f => f.id === id ? { ...f, value } : f));
    };

    // Builds a flat key→value object from all fields for the preview panel.
    // Custom field names become the keys, so {{FieldName}} tokens in the template resolve correctly.
    const cardData = {
        Question: question,
        Answer: answer,
        Hint: hint,
        ...Object.fromEntries(customFields.map(f => [f.name, f.value]))
    };

    // Toggles the preview between front and back
    const handleFlip = () => {
        setPreviewSide(prev => prev === 'front' ? 'back' : 'front');
    };

    // Resets all fields after saving (currently just logs and shows an alert)
    const handleSaveCard = () => {
        console.log('Card saved:', { deckId: selectedDeckId, ...cardData });
        setQuestion('');
        setAnswer('');
        setHint('');
        setCustomFields([]);
        setPreviewSide('front');
        alert('Card saved successfully!');
    };

    // HTML templates for the card preview. {{Token}} placeholders are replaced with live
    // field values by the PreviewPanel component.
    const frontTemplate = `<div style="padding: 20px; text-align: center;"><h2 style="color: #ffffff; margin-bottom: 10px;">{{Question}}</h2><p style="color: rgba(255,255,255,0.7); font-style: italic;">{{Hint}}</p></div>`;
    const backTemplate  = `<div style="padding: 20px; text-align: center;"><p style="color: rgba(255,255,255,0.6); font-size: 0.8em; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Answer</p><p style="color: #ffffff; font-size: 1.2em;">{{Answer}}</p></div>`;
    const previewTemplate = previewSide === 'front' ? frontTemplate : backTemplate;

    return (
        <Layout>
            <div className='add-card-page'>
                {/* Title row — page title on the left, deck selector on the right */}
                <div className='page-title-row'>
                    <h1 className='page-title'>Add Card</h1>
                    <select
                        className='deck-selector'
                        value={selectedDeckId}
                        onChange={e => setSelectedDeckId(e.target.value)}
                    >
                        {MOCK_DECKS.map(deck => (
                            <option key={deck.id} value={deck.id}>{deck.name}</option>
                        ))}
                    </select>
                </div>

                {/* Formatting toolbar — field-level editing tools, sits on its own row */}
                <EditorFormatControls handleFormat={handleFormat} />

                <div className='workspace'>
                    <div className='input-section'>
                        {/* Each wrapper div listens for focus so we know which field is active.
                            The ref gives the toolbar a way to call applyFormat() on that field. */}
                        <div onFocus={() => setActiveField('question')}>
                            <FieldInput ref={questionRef} fieldName='Question' value={question} onChange={setQuestion} />
                        </div>
                        <div onFocus={() => setActiveField('answer')}>
                            <FieldInput ref={answerRef} fieldName='Answer' value={answer} onChange={setAnswer} />
                        </div>
                        <div onFocus={() => setActiveField('hint')}>
                            <FieldInput ref={hintRef} fieldName='Hint' value={hint} onChange={setHint} />
                        </div>

                        {/* Render each custom field dynamically.
                            onDelete removes it from the list.
                            onNameChange lets the user rename it inline.
                            The ref callback stores the handle in our Map keyed by field ID. */}
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

                        {/* Adds a new blank custom field to the list */}
                        <button className='add-field-button' onClick={handleAddField}>
                            <span className='material-symbols-outlined'>add</span>
                            Add Field
                        </button>

                        <button className='save-card-button' onClick={handleSaveCard}>Save Card</button>
                    </div>

                    {/* Live card preview — updates as the user types.
                        onFlip switches between front and back views. */}
                    <PreviewPanel
                        side={previewSide}
                        template={previewTemplate}
                        style=''
                        data={cardData}
                        onFlip={handleFlip}
                        onInsert={() => {}}
                        showInsertBar={false}
                    />
                </div>
            </div>
        </Layout>
    );
}
