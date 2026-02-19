import { useState } from 'react';
import '../css/CardBuilder.css';
import Card from '../components/Card';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import { FieldInput } from '../components/FieldInput';
import CodeEditor from '../components/CodeEditor.tsx';

// const testHtml = `<div class='card' style='background-color: white'>User's HTML goes here</div>`;
const iFrameStyle = {backgroundColor: '#e5e5e5ff', border: '0', width: '60%', height: '500px', borderRadius: '10px'};

// Track which side of the card the user is editing
type CardTextInputMode = 'front' | 'back' | 'style';

// Card preview for user
function Preview({html, side, onFlip} : { html: string; srcDoc : string ; side: 'front' | 'back'; onFlip: () => void}) {
    return(
        <div className='card-preview'>
            <p style={{marginBottom: '10px'}}>Preview - {side === 'front' ?  'Front' : 'Back'}</p>
            <Card 
                template={html}
                data={{ Question: "What is 2+2", Answer: "it equals 4 you dummy", Hint: "count how many wheels on a car", Description: "Description goes here, it's simple just add two together two times. " }} id={''} deckId={''}>
            </Card>
            <button onClick={onFlip} style={{marginTop: '10px'}}>Flip Card</button>
        </div>
    );
}

export function Tabs({ activeTab, onClick}: {activeTab: CardTextInputMode; onClick: (mode: CardTextInputMode) => void}) {

    return (
        <div className='tab-group'>
            <button className={`tab-button ${activeTab === 'front' ? 'active' : ''}`} onClick={() => onClick('front')}>Front</button>
            <button className={`tab-button ${activeTab === 'back' ? 'active' : ''}`} onClick={() => onClick('back')}>Back</button>
            <button className={`tab-button ${activeTab === 'style' ? 'active' : ''}`} onClick={() => onClick('style')}>Style</button>
        </div>

    );
}

export default function CardBuilder() {
    
    
    // Which version side of the card is displayed (HTML)
    const [frontHtml, setFrontHtml] = useState('');
    const [backHtml, setBackHtml] = useState('');
    const [styleHtml, setStyleHtml] = useState('');
    const [cardTextInputMode, setCardTextInputMode]= useState<CardTextInputMode>('front')
    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');
    
    // Which HTML to show in editor based on mode
    const currentHtml = cardTextInputMode === 'front' ? frontHtml : cardTextInputMode === 'back' ? backHtml : styleHtml;
    
    // Which HTML to show in the preview
    const previewHtml = previewSide === 'front' ? frontHtml : backHtml;

    // Handle the HTML update
    const handleHtmlChange = (newHtml: string) => {
        if (cardTextInputMode === 'front'){
            setFrontHtml(newHtml);
        }
        else if (cardTextInputMode === 'back'){
            setBackHtml(newHtml);
        }
        else {
            setStyleHtml(newHtml);
        }
    }

    // Handle tab change
    const handleTabChange = (mode: CardTextInputMode) => {
        setCardTextInputMode(mode);
        if (mode === 'front') {
            setPreviewSide('front');
        }
        else if (mode === 'back') {
            setPreviewSide('back');
        }
    };


    // Handle card flip logic
    const handleFlip = () => {
        setPreviewSide(prev => prev === 'front' ? 'back' : 'front');
    }

     const handleFormat = (format: string) => {
        // For simplicity, we'll just insert the format tags around the entire content

    };

    const filename = cardTextInputMode === 'style' ? 'style.css' : `${cardTextInputMode}.html`;

    // Card Builder Page
    return (

        <Layout>
            <div className='card-builder-page'>
                <h1 className='page-title'>Card Builder</h1>
                <div className='controls'>
                    <Tabs activeTab={cardTextInputMode} onClick={handleTabChange}></Tabs>
                    <EditorFormatControls handleFormat={() => {}} />
                </div>
                <div className='workspace'>
                    <CodeEditor value={currentHtml} onChange={handleHtmlChange} filename={filename}></CodeEditor>
                </div>
            </div>
        </Layout>
    );
}

