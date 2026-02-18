import '../css/EditorFormatControls.css';


export function EditorFormatControls({ handleFormat }: { handleFormat: (format: string) => void }) {
    return (
        <div className='editor-format-controls'>
            <div className='button-group'>
                <button className='button-left' onClick={() => handleFormat('bold')}><b>B</b></button>
                <button className='button-middle' onClick={() => handleFormat('italic')}><i>I</i></button>
                <button className='button-middle' onClick={() => handleFormat('underline')}><u>U</u></button>
                <button className='button-right' onClick={() => handleFormat('strikethrough')}><s>S</s></button>
            </div>
            <div className='button-group'>
                <button className='button-left' onClick={() => handleFormat('superscript')}>x<sup>2</sup></button>
                <button className='button-right' onClick={() => handleFormat('subscript')}>x<sub>2</sub></button>
            </div>
            <div className='button-group'>
                <button className='button-left'><span className='material-symbols-outlined'>format_color_text</span></button>
                <button className='button-middle' onClick={() => handleFormat('highlight')}><span className='material-symbols-outlined'>ink_highlighter</span></button>
                <button className='button-right' onClick={() => handleFormat('clear')}><span className='material-symbols-outlined'>format_clear</span></button>
            </div>
            <div className='button-group'>
                <button className='button-left' onClick={() => handleFormat('ordered_list')}><span className='material-symbols-outlined'>format_list_numbered</span></button>
                <button className='button-middle' onClick={() => handleFormat('unordered_list')}><span className='material-symbols-outlined'>format_list_bulleted</span></button>
                <button className='button-right' onClick={() => handleFormat('center_align')}><span className='material-symbols-outlined'>format_align_center</span></button>
            </div>
            <div className='button-group'>
                <button className='button-left disabled'><span className='material-symbols-outlined'>image</span></button>
                <button className='button-middle disabled'><span className='material-symbols-outlined'>mic</span></button>
                <button className='button-right disabled'><span className='material-symbols-outlined'>function</span></button>
            </div>
        </div>
    );
}