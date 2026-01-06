import '../css/AddCard.css';

function FieldInput({ html, onChange, fieldName } : {html : string; onChange : (v: string) => void; fieldName : string}) {
    return (
        <div>
            <h1>{fieldName}</h1>
            <textarea className={`field-input ${fieldName}`} rows={5} cols={100} value={html} onChange={e => onChange(e.target.value) }/>
        </div>
    );
}


export default function AddCard () {

    return(
        <div className="add-card-page">
            <h1 className='page-title'>Add Card</h1>
            <br />
            <div className='editor-format-controls'>
                <button className='button-left'><b>B</b></button>
                <button className='button-middle'><i>I</i></button>
                <button className='button-middle'><u>U</u></button>
                <button className='button-right'><s>S</s></button>
                
                <button className='button-left'>x<sup>2</sup></button>
                <button className='button-right'>x<sub>2</sub></button>
                
                <button className='button-left'><span className='material-symbols-outlined'>format_color_text</span></button>
                <button className='button-middle'><span className='material-symbols-outlined'>ink_highlighter</span></button>
                <button className='button-right'><span className='material-symbols-outlined'>format_clear</span></button>

                <button className='button-left'><span className='material-symbols-outlined'>format_list_numbered</span></button>
                <button className='button-middle'><span className='material-symbols-outlined'>format_list_bulleted</span></button>
                <button className='button-right'><span className='material-symbols-outlined'>format_align_center</span></button>
                
                <button className='button-left'><span className='material-symbols-outlined'>image</span></button>
                <button className='button-middle'><span className='material-symbols-outlined'>mic</span></button>
                <button className='button-right'><span className='material-symbols-outlined'>function</span></button>                
                
            </div>


            <FieldInput html={''} onChange={function (v: string): void {
                throw new Error('Function not implemented.');
            } } fieldName={'Question'}></FieldInput>
            <FieldInput html={''} onChange={function (v: string): void {
                throw new Error('Function not implemented.');
            } } fieldName={'Answer'}></FieldInput>
            <FieldInput html={''} onChange={function (v: string): void {
                throw new Error('Function not implemented.');
            } } fieldName={'Hint'}></FieldInput>
        </div>
    );
}