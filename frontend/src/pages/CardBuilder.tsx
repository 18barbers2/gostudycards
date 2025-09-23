import { useState } from 'react';
import '../css/CardBuilder.css';

// const testHtml = `<div class='card' style='background-color: white'>User's HTML goes here</div>`;
const iFrameStyle = {backgroundColor: '#e5e5e5ff', border: '0', width: '50%',height: '75%', borderRadius: '10px'};


// function HtmlFrame({ html } : {html : string}) {
//     return(
//     );
// }

function TextBox({ html, onChange } : {html : string; onChange : (v: string) => void}) {

    return (
        <textarea className={'card-input'} rows={40} cols={100} value={html} onChange={e => onChange(e.target.value)} />
    );
}

function CardPreview({html} : { html: string }) {
    return(
        <div className='card-preview'>
            <iframe sandbox="" style={iFrameStyle} srcDoc={html}></iframe>
        </div>
    );
}
export default function CardBuilder() {

    const [html, setHtml] = useState("");
    // const [isHtmlMode, setIsHtmlMode] = useState(false);

    return (
        <div className='card-builder-page'>
            <h1 className='page-title'>Card Builder</h1>
            <div className='card-builder'>
                <TextBox html={html} onChange={setHtml}></TextBox>
                <CardPreview html={html}>
                </CardPreview>
            </div>
        </div>
    );
}

