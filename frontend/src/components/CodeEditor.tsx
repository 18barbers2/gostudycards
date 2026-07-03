import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import '../css/CodeEditor.css';
import { html as beautifyHtml, css as beautifyCss } from 'js-beautify'


export interface CodeEditorHandle {
    insertAtCursor: (text: string) => void;
    applyFormat: (format: string) => void;
}

interface CodeEditorProps {
    value: string;
    onChange: (v: string) => void;
    filename?: string;
}

const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
    ({ value, onChange, filename= 'front.html'}, ref) => {
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumRef = useRef<HTMLDivElement>(null);
    // const [lineCount, setLineCount] = useState(1);
    const lineCount = (value.split('\n').length);


    // Handle format using beautifier
    const handleFormat = () => {
        const isCSS = filename?.endsWith('.css');
        const formatted = isCSS
            ? beautifyCss(value, { indent_size: 2 })
            : beautifyHtml(value, { indent_size: 2, wrap_line_length: 0 });
        onChange(formatted);
    };

    
    useImperativeHandle(ref, () => ({
        insertAtCursor: (text: string) => { /* ... */ },
        applyFormat: (format: string) => {
            const textarea = textareaRef.current;
            if (!textarea) return;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selected = textarea.value.substring(start, end);
            let wrapped = selected;
            switch (format) {
                case 'bold':           wrapped = `<b>${selected}</b>`;                                 break;
                case 'italic':         wrapped = `<i>${selected}</i>`;                                 break;
                case 'underline':      wrapped = `<u>${selected}</u>`;                                 break;
                case 'strikethrough':  wrapped = `<s>${selected}</s>`;                                 break;
                case 'superscript':    wrapped = `<sup>${selected}</sup>`;                             break;
                case 'subscript':      wrapped = `<sub>${selected}</sub>`;                             break;
                case 'ordered_list':   wrapped = `<ol><li>${selected}</li></ol>`;                      break;
                case 'unordered_list': wrapped = `<ul><li>${selected}</li></ul>`;                      break;
                case 'center_align':   wrapped = `<div style="text-align:center;">${selected}</div>`;  break;
                case 'highlight':      wrapped = `<mark>${selected}</mark>`;                           break;
                case 'clear':          wrapped = selected;                                             break;
                default:               wrapped = selected;
            }
            const newValue = textarea.value.substring(0, start) + wrapped + textarea.value.substring(end);
            onChange(newValue);
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + wrapped.length, start + wrapped.length);
            }, 0);
        },
    }));

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    const handleScroll = () => { /* sync lineNumRef.scrollTop to textarea */ };    

    return (
        <div className="code-editor">
            <div className="code-editor-header">
                <div className="code-editor-dot"></div>
                <span className="code-editor-filename">{filename}</span>
                <span className="code-editor-hint">Use {'{{variable}}'} for dynamic fields</span>
                <button className="code-editor-format-button" onClick={handleFormat}>Format</button>
            </div>

            <div className='code-editor-body'>
                <div className='code-editor-line-numbers' ref={lineNumRef}>
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className='line-num'>{i + 1}</div>
                    ))}
                </div>
                <textarea
                    ref={textareaRef}
                    className='code-editor-textarea'
                    value={value}
                    onChange={handleChange}
                    onScroll={handleScroll}
                    spellCheck={false}
                />
                </div>
            </div>

        
    );
});

export default CodeEditor;