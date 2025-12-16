import { useState } from 'react';
import '../css/CardBuilder.css';

// Test data to inject to the iframe
const cardDoc = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Document</title>
    <style>
        html, body { margin:0; padding:0; }
        body {
            font-size: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    </style>
</head>

<body>
    <h1>test</h1>
    <p>test</p>
    <p>test</p>
    <p>test</p>
</body>
</html>`;

function createDoc ( userHtml: string ) {

    return (`<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Card Document</title>
            <style>
                html, body { margin:0; padding:0; }
                body {
                    font-size: 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    white-space: pre-wrap;
                }
            </style>
        </head>

        <body>${userHtml}</body>
        </html>`);
}

// const testHtml = `<div class='card' style='background-color: white'>User's HTML goes here</div>`;
const iFrameStyle = {backgroundColor: '#e5e5e5ff', border: '0', width: '60%', height: '500px', borderRadius: '10px'};
type PageStatus = 'html-mode' | 'loading'| 'empty' | 'error';

// Track which side of the card the user is editing
type CardTextInputMode = 'front' | 'back' | 'style';

// Text input for user
function Editor({ html, onChange } : {html : string; onChange : (v: string) => void}) {
    return (
        <textarea className={'card-input'} rows={40} cols={100} value={html} onChange={e => onChange(e.target.value) }/>
    );
}

// Card preview for user
function Preview({html, srcDoc, side, onFlip} : { html: string; srcDoc : string ; side: 'front' | 'back'; onFlip: () => void}) {
    return(
        <div className='card-preview'>
            <p style={{marginBottom: '10px'}}>Preview - {side === 'front' ?  'Front' : 'Back'}</p>
            <iframe 
                title='Card Preview'
                sandbox="" 
                style={iFrameStyle} 
                srcDoc={srcDoc}>
            </iframe>
            <button onClick={onFlip} style={{marginTop: '10px'}}>Flip Card</button>
        </div>
    );
}

export default function CardBuilder() {
    
    
    // Which version side of the card is displayed (HTML)
    const [frontHtml, setFrontHtml] = useState('');
    const [backHtml, setBackHtml] = useState('');
    const [cardTextInputMode, setCardTextInputMode]= useState<CardTextInputMode>('front')
    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');
    
    // Which HTML to show in editor based on mode
    const currentHtml = cardTextInputMode === 'front' ? frontHtml : backHtml;
    
    // Which HTML to show in the preview
    const previewHtml = previewSide === 'front' ? frontHtml : backHtml;
    const doc = createDoc(previewHtml);

    // Handle the HTML update
    const handleHtmlChange = (newHtml: string) => {
        if (cardTextInputMode === 'front') {
            setFrontHtml(newHtml);
        }
        else {
            setBackHtml(newHtml);
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


    // Card Builder Page
    return (
        <div className='card-builder-page'>
            <h1 className='page-title'>Card Builder</h1>
            <div className='editor-controls'>
                <button className={cardTextInputMode === 'front' ? 'active' : ''} onClick={() => handleTabChange('front')}>Front</button>
                <button className={cardTextInputMode === 'back' ? 'active' : ''} onClick={() => handleTabChange('back')}>Back</button>
                <button className={cardTextInputMode === 'style' ? 'active' : ''} onClick={() => handleTabChange('style')}>Style</button>
            </div>
            <div className='editor-format-controls'>
                <button><b>B</b></button>
                <button><i>I</i></button>
                <button><u>U</u></button>
                <button><s>S</s></button>
            </div>
            <div className='card-builder'>
                <Editor html={currentHtml} onChange={handleHtmlChange}></Editor>
                <Preview 
                    html={previewHtml}
                    srcDoc={doc}
                    side={previewSide}
                    onFlip={handleFlip}
                >
                </Preview>
            </div>
        </div>
    );
}

