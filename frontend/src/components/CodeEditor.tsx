import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import '../css/CodeEditor.css';


export interface CodeEditorHandle {
    insertAtCursor: (text: string) => void;
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
    const [lineCount, setLineCount] = useState(1);

    useImperativeHandle(ref, () => ({
        insertAtCursor: (text: string) => { /* ... */ }
    }));

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
        setLineCount(e.target.value.split('\n').length);
    };

    const handleScroll = () => { /* sync lineNumRef.scrollTop to textarea */ };

    return (
        <div className="code-editor">
            <div className="code-editor-header">
                <div className="code-editor-dot"></div>
                <span className="code-editor-filename">{filename}</span>
                <span className="code-editor-hint">Use {'{{variable}}'} for dynamic fields</span>
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