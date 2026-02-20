import { forwardRef, useRef, useImperativeHandle, useState } from "react";
import '../css/FieldInput.css';

// Props passed in from the parent component (e.g. AddCard) to control this field
interface FieldInputProps {
    value: string;                          // The current text content of the field
    onChange: (value: string) => void;      // Called whenever the user types in the textarea
    fieldName: string;                      // The label shown above the textarea (e.g. "Question")
    maxLength?: number;                     // Max characters allowed (defaults to 500)
    onDelete?: () => void;                  // If provided, shows a delete button — called when clicked
    onNameChange?: (name: string) => void;  // If provided, the field label becomes editable
    onFormat?: (format: string) => void;    // Unused externally, but part of the API surface
}

// The "handle" exposes a method to the parent so it can trigger formatting on this field
// from outside (e.g. when the user clicks Bold in the toolbar)
export interface FieldInputHandle {
    applyFormat: (format: string) => void;
}

// forwardRef lets the parent attach a ref to this component and call applyFormat on it
export const FieldInput = forwardRef<FieldInputHandle, FieldInputProps>(
    ({ value, onChange, fieldName, maxLength = 500, onDelete, onNameChange, onFormat: _onFormat }, ref) => {

    // Direct reference to the <textarea> DOM element so we can read/set cursor position
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Whether the textarea is currently focused — used to apply a highlight CSS class
    const [focused, setFocused] = useState(false);

    // Whether the user is currently editing the field's label (e.g. renaming "Field" to "Notes")
    const [editingName, setEditingName] = useState(false);

    // Local copy of the field name so the inline input can be edited before committing
    const [nameValue, setNameValue] = useState(fieldName);

    // Wraps the selected text in the appropriate HTML tag for the given format type.
    // This reads the textarea's current selection, wraps it, and pushes the new value up via onChange.
    const applyFormat = (format: string) => {
        const textArea = textareaRef.current;
        if (!textArea) return;

        // Get the start and end positions of whatever text the user has highlighted
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = textArea.value.substring(start, end);

        // Wrap the selected text in the appropriate HTML tag based on the format
        let formattedText = selectedText;
        switch (format) {
            case 'bold':           formattedText = `<b>${selectedText}</b>`;                              break;
            case 'italic':         formattedText = `<i>${selectedText}</i>`;                              break;
            case 'underline':      formattedText = `<u>${selectedText}</u>`;                              break;
            case 'strikethrough':  formattedText = `<s>${selectedText}</s>`;                              break;
            case 'superscript':    formattedText = `<sup>${selectedText}</sup>`;                          break;
            case 'subscript':      formattedText = `<sub>${selectedText}</sub>`;                          break;
            case 'ordered_list':   formattedText = `<ol><li>${selectedText}</li></ol>`;                   break;
            case 'unordered_list': formattedText = `<ul><li>${selectedText}</li></ul>`;                   break;
            case 'center_align':   formattedText = `<div style="text-align:center;">${selectedText}</div>`; break;
            case 'highlight':      formattedText = `<mark>${selectedText}</mark>`;                        break;
            case 'clear':          formattedText = selectedText;                                          break; // No-op, strips any wrapper
            default:               formattedText = selectedText;
        }

        // Rebuild the full textarea value: text before selection + formatted chunk + text after selection
        const newValue = textArea.value.substring(0, start) + formattedText + textArea.value.substring(end);
        onChange(newValue);

        // After React re-renders, restore focus and place the cursor after the inserted text
        setTimeout(() => {
            textArea.focus();
            textArea.setSelectionRange(start + formattedText.length, start + formattedText.length);
        }, 0);
    };

    // Exposes applyFormat to the parent via the ref, so AddCard can call it from the toolbar
    useImperativeHandle(ref, () => ({ applyFormat }));

    // Called when the user finishes editing the field name (on blur or Enter key).
    // Falls back to the original fieldName if the input is left blank.
    const commitName = () => {
        setEditingName(false);
        const trimmed = nameValue.trim() || fieldName;
        setNameValue(trimmed);
        onNameChange?.(trimmed); // Notify the parent of the new name
    };

    // True when the user has reached the character limit — used to apply a red colour to the counter
    const atLimit = value.length >= maxLength;

    return (
        <div className={`field-container ${focused ? 'field-container--focused' : ''}`}>
            <div className='field-header'>
                {/* If the field supports renaming AND the user clicked the label, show a text input */}
                {onNameChange && editingName ? (
                    <input
                        className='field-name-input'
                        value={nameValue}
                        autoFocus
                        onChange={e => setNameValue(e.target.value)}
                        onBlur={commitName}                                          // Save when focus leaves
                        onKeyDown={e => { if (e.key === 'Enter') commitName(); }}   // Save on Enter
                    />
                ) : (
                    // Normal state: show the field name as a label.
                    // If renaming is supported (onNameChange exists), clicking it enters edit mode.
                    <span
                        className={`field-name ${focused ? 'field-name--focused' : ''} ${onNameChange ? 'field-name--editable' : ''}`}
                        onClick={() => onNameChange && setEditingName(true)}
                    >
                        {nameValue}
                        {/* Show a pencil icon only on fields that support renaming (i.e. custom fields) */}
                        {onNameChange && <span className='field-name-edit-icon material-symbols-outlined'>edit</span>}
                    </span>
                )}

                <div className='field-header-right'>
                    {/* Character counter — turns red when the limit is reached */}
                    <span className={`field-char-count ${atLimit ? 'field-char-count--limit' : ''}`}>
                        {value.length} / {maxLength}
                    </span>
                    {/* Delete button — only rendered when onDelete is provided (custom fields only) */}
                    {onDelete && (
                        <button className='field-delete-btn' onClick={onDelete} tabIndex={-1}>
                            <span className='material-symbols-outlined'>delete</span>
                        </button>
                    )}
                </div>
            </div>

            {/* The main text area where the user types their card content */}
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
