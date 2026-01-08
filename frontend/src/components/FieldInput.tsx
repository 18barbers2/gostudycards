interface FieldInputProps {
    value: string;
    onChange: (value: string) => void;
    fieldName: string;
    onDelete?: () => void;
}


export function FieldInput({ value, onChange, fieldName, onDelete }: FieldInputProps) {

    return (
        <div className='field-container'>
            <div className='field-header'>
                <h1 className='field-name'>{fieldName}</h1>
                {onDelete &&
                    <button className='delete-field-button' onClick={onDelete}>
                        <span>
                            <span className='material-symbols-outlined'>delete</span>
                        </span>
                    </button>
                }
            </div>
            <textarea 
                className={`field-input ${fieldName}`}
                rows={5}
                value={value}
                onChange={e => onChange(e.target.value)}></textarea>
        </div>
    );
}

export default FieldInput