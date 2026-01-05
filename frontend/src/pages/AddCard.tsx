import '../css/AddCard.css';

function FieldInput({ html, onChange, fieldName } : {html : string; onChange : (v: string) => void; fieldName : string}) {
    return (
        <div>
            <h1>{fieldName}</h1>
            <textarea className={fieldName} rows={5} cols={100} value={html} onChange={e => onChange(e.target.value) }/>
        </div>
    );
}


export default function AddCard () {

    return(
        <div className="add-card-page">
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