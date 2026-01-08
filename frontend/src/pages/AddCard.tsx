
import { useState, useRef} from 'react';
import '../css/AddCard.css';
import FieldInput from '../components/FieldInput';
import CardPreview from '../components/CardPreview';


export default function AddCard() {

    // Custom fields
    const [customFields, setCustomFields] = useState<{ id: string; name: string; value: string }[]>([]);

    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

    // Standard fields
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [hint, setHint] = useState('');

    const [activeField, setActiveField] = useState<'question' | 'answer' | 'hint'>('question');

    const questionRef = useRef<any>(null);
    const answerRef = useRef<any>(null);
    const hintRef = useRef<any>(null);  


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
        console.log('Card saved:', cardData);
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
        <div className='add-card-page'>
            <div className='input-section'>
                <h1 className='page-title'>Add Card</h1>
                <br />
                <div className='editor-format-controls'>

                    <div className='button-group'>
                        <button className='button-left' onClick={() => handleFormat('bold')}><b>B</b></button>
                        <button className='button-middle' onClick={() => handleFormat('italic')}><i>I</i></button>
                        <button className='button-middle' onClick={() => handleFormat('underline')}><u>U</u></button>
                        <button className='button-right' onClick={() => handleFormat('strikethrough')}><s>S</s></button>
                    </div>
                    <div className='button-group'>
                        <button className='button-left'>x<sup>2</sup></button>
                        <button className='button-right'>x<sub>2</sub></button>
                    </div>
                    <div className='button-group'>
                        <button className='button-left'><span className='material-symbols-outlined'>format_color_text</span></button>
                        <button className='button-middle'><span className='material-symbols-outlined'>ink_highlighter</span></button>
                        <button className='button-right'><span className='material-symbols-outlined'>format_clear</span></button>
                    </div>
                    <div className='button-group'>
                        <button className='button-left'><span className='material-symbols-outlined'>format_list_numbered</span></button>
                        <button className='button-middle'><span className='material-symbols-outlined'>format_list_bulleted</span></button>
                        <button className='button-right'><span className='material-symbols-outlined'>format_align_center</span></button>
                    </div>
                    <div className='button-group'>
                        <button className='button-left'><span className='material-symbols-outlined'>image</span></button>
                        <button className='button-middle'><span className='material-symbols-outlined'>mic</span></button>
                        <button className='button-right'><span className='material-symbols-outlined'>function</span></button>
                    </div>
                </div>

                <div onFocus={() => setActiveField('question')}>
                    <FieldInput
                        fieldName={'Question'}
                        value={question}
                        onChange={setQuestion}>
                    </FieldInput>
                </div>
                <div onFocus={() => setActiveField('answer')}>
                <FieldInput
                    fieldName={'Answer'}
                    value={answer}
                    onChange={setAnswer}>
                </FieldInput>
                </div>
                <div onFocus={() => setActiveField('hint')}>
                <FieldInput
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
    );
}