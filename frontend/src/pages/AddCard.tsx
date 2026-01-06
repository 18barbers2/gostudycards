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
            <div className='editor-format-controls'>
                <button><b>B</b></button>
                <button><i>I</i></button>
                <button><u>U</u></button>
                <button><s>S</s></button>
                
                <button>X<sup>2</sup></button>
                <button>X<sub>2</sub></button>
                
                <button>Text Color</button>
                <button>Highlight</button>
                
                <button>Remove Formatting</button>

                <button>Unordered List</button>
                <button>Ordered List</button>
                <button>Remove Formatting</button>

                <button>Image</button>
                <button>Sound</button>
                <button>Formula</button>

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