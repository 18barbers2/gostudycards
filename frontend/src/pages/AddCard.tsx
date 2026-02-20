
import { useState, useRef} from 'react';
import '../css/AddCard.css';
import FieldInput from '../components/FieldInput';
import type { FieldInputHandle } from '../components/FieldInput';
import CardPreview from '../components/CardPreview';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import { MOCK_DECKS } from '../data/decks';


export default function AddCard() {

    const [selectedDeckId, setSelectedDeckId] = useState<string>(MOCK_DECKS[0]?.id ?? '');

    // Custom fields
    const [customFields, setCustomFields] = useState<{ id: string; name: string; value: string }[]>([]);

    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

    // Standard fields
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [hint, setHint] = useState('');

    const [activeField, setActiveField] = useState<'question' | 'answer' | 'hint'>('question');

    const questionRef = useRef<FieldInputHandle>(null);
    const answerRef = useRef<FieldInputHandle>(null);
    const hintRef = useRef<FieldInputHandle>(null);  


    const handleFormat = (format: string) => {
        if(activeField === 'question' && questionRef.current) {
            questionRef.current.applyFormat(format);
        } else if (activeField === 'answer' && answerRef.current) {
            answerRef.current.applyFormat(format);
        } else if (activeField === 'hint' && hintRef.current) { 
            hintRef.current.applyFormat(format);
        }  
    };

    
    const cardData = {
        Question: question,
        Answer: answer,
        Hint: hint,
        ...Object.fromEntries(customFields.map(f => [f.name, f.value]))
    };

        // Handle card flip logic
    const handleFlip = () => {
        setPreviewSide((prev: string) => prev === 'front' ? 'back' : 'front');
    };

    const handleSaveCard = () => {
        // Logic to save the card would go here
        console.log('Card saved:', { deckId: selectedDeckId, ...cardData });
        setQuestion('');
        setAnswer('');
        setHint('');
        setCustomFields([]);
        setPreviewSide('front');
        alert('Card saved successfully!');
    };


    // Templates (would come from database eventually)
    const frontTemplate = `<div style="padding: 20px; text-align: center;"><h2 style="color: #000000ff; margin-bottom: 10px;">{{Question}}</h2><p style="color: #000000ff; font-style: italic;">Hint: {{Hint}}</p></div>`;
    const backTemplate = `<div style="padding: 20px; text-align: center;"><h3 style="color: #000000ff; margin-bottom: 15px;">Answer:</h3><p style="color: #000000ff; font-size: 1.2em;">{{Answer}}</p></div>`;

    return (

        <Layout>

            <div className='add-card-page'>
                <div className='input-section'>
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
                    <EditorFormatControls handleFormat={handleFormat} />
                    <div onFocus={() => setActiveField('question')}>
                        <FieldInput
                            ref = {questionRef}
                            fieldName={'Question'}
                            value={question}
                            onChange={setQuestion}>
                        </FieldInput>
                    </div>
                    <div onFocus={() => setActiveField('answer')}>
                    <FieldInput
                        ref = {answerRef}
                        fieldName={'Answer'}
                        value={answer}
                        onChange={setAnswer}>
                    </FieldInput>
                    </div>
                    <div onFocus={() => setActiveField('hint')}>
                    <FieldInput
                        ref = {hintRef}
                        fieldName={'Hint'}
                        value={hint}
                        onChange={setHint}>
                    </FieldInput>
                    </div>

                    <button className='save-card-button' onClick={handleSaveCard}>Save Card</button>
                </div>
                <div className='preview-section'>
                    <CardPreview 
                        data={cardData}
                        template={previewSide === 'front' ? frontTemplate : backTemplate}
                        side={'front'}
                        onFlip={handleFlip}></CardPreview>
                </div>
            </div>
        </Layout>
    );
}