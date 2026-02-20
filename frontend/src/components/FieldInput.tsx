import { forwardRef, useRef, useImperativeHandle, useState } from "react";
import '../css/FieldInput.css';

// Props for FieldInput component
interface FieldInputProps {
    value: string;
    onChange: (value: string) => void;
    fieldName: string;
    maxLength?: number;
    onDelete?: () => void;
    onFormat?: (format: string) => void;
}

// Which methods the parent can call on the FieldInput component
export interface FieldInputHandle {
    applyFormat: (format: string) => void;
}

export const FieldInput = forwardRef<FieldInputHandle, FieldInputProps>(({ value, onChange, fieldName, maxLength = 500, onDelete: _onDelete, onFormat: _onFormat }, ref) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [focused, setFocused] = useState(false);

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
            case 'superscript':
                formattedText = `<sup>${selectedText}</sup>`;
                break;
            case 'subscript':
                formattedText = `<sub>${selectedText}</sub>`;
                break;
            case 'ordered_list':
                formattedText = `<ol><li>${selectedText}</li></ol>`;
                break;
            case 'unordered_list':
                formattedText = `<ul><li>${selectedText}</li></ul>`;
                break;
            case 'center_align':
                formattedText = `<div style="text-align:center;">${selectedText}</div>`;
                break;
            case 'highlight':
                formattedText = `<mark>${selectedText}</mark>`;
                break;
            case 'clear':
                formattedText = selectedText;
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

    const atLimit = value.length >= maxLength;

    return (
        <div className={`field-container ${focused ? 'field-container--focused' : ''}`}>
            <div className='field-header'>
                <span className={`field-name ${focused ? 'field-name--focused' : ''}`}>{fieldName}</span>
                <span className={`field-char-count ${atLimit ? 'field-char-count--limit' : ''}`}>
                    {value.length} / {maxLength}
                </span>
            </div>
            <textarea
                ref={textareaRef}
                className='field-input'
                rows={4}
                value={value}
                maxLength={maxLength}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    );
});

FieldInput.displayName = 'FieldInput';

export default FieldInput;
