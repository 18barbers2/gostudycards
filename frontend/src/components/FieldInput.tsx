import { forwardRef, useRef, useImperativeHandle } from "react";

// Props for FieldInput component
interface FieldInputProps {
    value: string;
    onChange: (value: string) => void;
    fieldName: string;
    onDelete?: () => void;
    onFormat?: (format: string) => void;
}

// Which methods the parent can call on the FieldInput component
export interface FieldInputHandle {
    applyFormat: (format: string) => void;
}

export const FieldInput = forwardRef<FieldInputHandle, FieldInputProps>(({ value, onChange, fieldName, onDelete, onFormat }, ref) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Method to apply formatting to selected text
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

    useImperativeHandle(ref, () => ({
        applyFormat,
    }));

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
);

FieldInput.displayName = 'FieldInput';

export default FieldInput