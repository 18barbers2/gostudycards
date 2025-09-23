import '../css/CardBuilder.css';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>


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

