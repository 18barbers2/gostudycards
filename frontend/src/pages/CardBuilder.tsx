import '../css/CardBuilder.css';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const style = {backgroundColor: 'green', border: '0', width: '100%', height: '100%'};

function htmlFrame() {
    return(
        <div>
            <iframe style= {style} srcDoc={`<div class='card' style='background-color: blue'>User's HTML goes here</div>`}>
            </iframe>
        </div>
    );
}

function TextBox() {
    return (
        <div>
            <textarea className={'card-input'} rows={40} cols={100} defaultValue={'card text goes here'}/>
        </div>
    );
}

function CardPreview() {
    return(
        <div className='card-preview'>
            {htmlFrame()}
        </div>
    );
}
export default function CardBuilder() {
    return (
        <div className='card-builder-page'>
            <h1 className='page-title'>Card Builder</h1>
            <div className='card-builder'>
                <TextBox></TextBox>
                <CardPreview>
                    
                </CardPreview>
            </div>
        </div>
    );
}

