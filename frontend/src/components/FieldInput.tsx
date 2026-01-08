import { useRef } from "react";

interface FieldInputProps {
    value: string;
    onChange: (value: string) => void;
    fieldName: string;
    onDelete?: () => void;
    onFormat?: (format: string) => void;
}


export function FieldInput({ value, onChange, fieldName, onDelete , onFormat}: FieldInputProps) {


    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const applyFormat = (format: string) => {
        const textArea = textareaRef.current;
        if (!textArea) return;

        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = textArea.value.substring(start, end);

        let formattedText = selectedText;
        switch (format) {
            case 'bold':
                formattedText = `<b>${selectedText}</b>`;
                break;
            case 'italic':
                formattedText = `<i>${selectedText}</i>`;
                break;
            case 'underline':
                formattedText = `<u>${selectedText}</u>`;
                break;
            case 'strikethrough':
                formattedText = `<s>${selectedText}</s>`;
                break;
            default:
                formattedText = selectedText;
        }

        const newValue = textArea.value.substring(0, start) + formattedText + textArea.value.substring(end);
        onChange(newValue);


        // Restore focus and cursor position
        setTimeout(() => {
            textArea.focus();
            textArea.setSelectionRange(start + formattedText.length, start + formattedText.length);
        }, 0);
    }

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
                ref={textareaRef}
                className={`field-input ${fieldName}`}
                rows={5}
                value={value}
                onChange={e => onChange(e.target.value)}></textarea>
        </div>
    );
}

export default FieldInput