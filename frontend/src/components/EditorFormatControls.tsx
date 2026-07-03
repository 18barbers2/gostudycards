import '../css/EditorFormatControls.css';


export function EditorFormatControls({ handleFormat, disabled = false }: { handleFormat: (format: string) => void; disabled?: boolean }) {
    const btn = (extra: string) => `${extra}${disabled ? ' disabled' : ''}`;
    return (
        <div className='editor-format-controls'>
            <div className='button-group'>
                <button className={btn('button-left')} disabled={disabled} onClick={() => handleFormat('bold')}><b>B</b></button>
                <button className={btn('button-middle')} disabled={disabled} onClick={() => handleFormat('italic')}><i>I</i></button>
                <button className={btn('button-middle')} disabled={disabled} onClick={() => handleFormat('underline')}><u>U</u></button>
                <button className={btn('button-middle')} disabled={disabled} onClick={() => handleFormat('strikethrough')}><s>S</s></button>
                <button className={btn('button-right')} disabled={disabled} onClick={() => handleFormat('highlight')}><span className='material-symbols-outlined'>ink_highlighter</span></button>

            </div>
            <div className='button-group'>
                <button className={btn('button-left')} disabled={disabled} onClick={() => handleFormat('superscript')}>x<sup>2</sup></button>
                <button className={btn('button-right')} disabled={disabled} onClick={() => handleFormat('subscript')}>x<sub>2</sub></button>
            </div>
            <div className='button-group'>
            </div>
            <div className='button-group'>
                <button className={btn('button-left')} disabled={disabled} onClick={() => handleFormat('ordered_list')}><span className='material-symbols-outlined'>format_list_numbered</span></button>
                <button className={btn('button-right')} disabled={disabled} onClick={() => handleFormat('unordered_list')}><span className='material-symbols-outlined'>format_list_bulleted</span></button>
            </div>
        </div>
    );
}