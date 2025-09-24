import { useState } from 'react';
import '../css/CardBuilder.css';

// Test data to inject to the iframe
const TestCardDoc = `<!DOCTYPE html>
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
    <h1>Content of body</h1>
    <p>Paragraph</p>
</body>
</html>`;

// const testHtml = `<div class='card' style='background-color: white'>User's HTML goes here</div>`;
const iFrameStyle = {backgroundColor: '#e5e5e5ff', border: '0', width: '60%', height: '85%', borderRadius: '10px'};
type PageStatus = 'html-mode' | 'loading'| 'empty' | 'error';


// Text input for user
function Editor({ html, onChange } : {html : string; onChange : (v: string) => void}) {
    return (
        <textarea className={'card-input'} rows={40} cols={100} value={html} onChange={e => onChange(e.target.value)} />
    );
}

// Card preview for user
function Preview({html} : { html: string }) {
    return(
        <div className='card-preview'>
            <iframe title='Card Preview' sandbox="" style={iFrameStyle} srcDoc={TestCardDoc}>
            </iframe>
        </div>
    );
}

export default function CardBuilder() {

    const [pageState, setPageState] = useState<PageStatus>('loading');
    const [html, setHtml] = useState("");
    // const [isHtmlMode, setIsHtmlMode] = useState(false);

    return (
        <div className='card-builder-page'>
            <h1 className='page-title'>Card Builder</h1>
            <button>Button1</button><button>Button2</button><button>Button3</button>
            <div className='card-builder'>
                <Editor html={html} onChange={setHtml}></Editor>
                <Preview html={html}>
                </Preview>
            </div>
        </div>
    );
}

