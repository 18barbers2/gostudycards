import { useState } from 'react';
import '../css/CardBuilder.css';

// const testHtml = `<div class='card' style='background-color: white'>User's HTML goes here</div>`;
const iFrameStyle = {backgroundColor: 'green', border: '0', width: '100%', height: '100%'};


function HtmlFrame({ html } : {html : string}) {
    return(
        <div>
            <iframe width='200px' height='200px' sandbox="" style= {iFrameStyle} srcDoc={html}>
            </iframe>
        </div>
    );
}

function TextBox({ html, onChange } : {html : string; onChange : (v: string) => void}) {

    return (
        <textarea className={'card-input'} rows={40} cols={100} value={html} onChange={e => onChange(e.target.value)} />
    );
}

function CardPreview({html} : { html: string }) {

    return(
        <div className='card-preview'>
            <HtmlFrame html={html}></HtmlFrame>
        </div>
    );
}
export default function CardBuilder() {

    const [html, setHtml] = useState("");
    const [isHtmlMode, setIsHtmlMode] = useState(false);

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

