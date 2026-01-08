
import { useState } from 'react';
import '../css/AddCard.css';
import Card from '../components/Card';
import FieldInput from '../components/FieldInput';
import CardPreview from '../components/CardPreview';


// // Card preview for user
// function Preview({ html, side, onFlip }: { html: string; srcDoc: string; side: 'front' | 'back'; onFlip: () => void }) {
//     return (
//         <div className='card-preview'>
//             <p style={{ marginBottom: '10px' }}>Preview - {side === 'front' ? 'Front' : 'Back'}</p>
//             <Card
//                 template={html}
//                 data={{ Question: "What is 2+2", Answer: "it equals 4 you dummy", Hint: "count how many wheels on a car", Description: "Description goes here, it's simple just add two together two times. " }}>
//             </Card>
//             <button onClick={onFlip} style={{ marginTop: '10px' }}>Flip Card</button>
//         </div>
//     );
// }


export default function AddCard() {

    // Custom fields
    const [customFields, setCustomFields] = useState<{ id: string; name: string; value: string }[]>([]);

    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');


    // Standard fields
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [hint, setHint] = useState('');
    
    const cardData = {
        Question: question,
        Answer: answer,
        Hint: hint,
        ...Object.fromEntries(customFields.map(f => [f.name, f.value]))
    };

        // Handle card flip logic
    const handleFlip = () => {
        setPreviewSide((prev: string) => prev === 'front' ? 'back' : 'front');
    }

    // Templates (would come from database eventually)
    const frontTemplate = `<div style="text-align: center; padding: 20px"><h2 style="margin-bottom: 10px">{{Question}}</h2><p style="color: white">{{Hint}}</p></div>`;
    const backTemplate = `<h2>{{Answer}}</h2>`;

    return (
        <div className='add-card-page'>
            <div className='input-section'>
                <h1 className='page-title'>Add Card</h1>
                <br />
                <div className='editor-format-controls'>

                    <div className='button-group'>
                        <button className='button-left'><b>B</b></button>
                        <button className='button-middle'><i>I</i></button>
                        <button className='button-middle'><u>U</u></button>
                        <button className='button-right'><s>S</s></button>
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
                <FieldInput
                    fieldName={'Question'}
                    value={question}
                    onChange={setQuestion}>
                </FieldInput>
                <FieldInput
                    fieldName={'Answer'}
                    value={answer}
                    onChange={setAnswer}>
                </FieldInput>
                <FieldInput
                    fieldName={'Hint'}
                    value={hint}
                    onChange={setHint}>
                </FieldInput>
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