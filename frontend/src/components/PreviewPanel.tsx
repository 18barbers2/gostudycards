import Card from './Card';
import '../css/PreviewPanel.css';

interface PreviewPanelProps {
    side: 'front' | 'back';
    template: string;
    style: string;
    data: Record<string, string>;
    onFlip: () => void;
    onInsert: (text: string) => void;
    showInsertBar?: boolean;
}
function PreviewPanel({ side, template, style, data, onFlip, onInsert, showInsertBar = true }: PreviewPanelProps) {
    const variables = [...new Set([...template.matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]))];

    return (
        <div className='preview-pane'>
            <div className='preview-pane-header'>
                <span className='preview-label'>Live Preview</span>
                <span className='preview-side-badge'>{side}</span>
            </div>
            <div className='preview-pane-body'>
                <div className='preview-card-wrapper'>
                    <Card id='' deckId='' template={template} style={style} data={data} />
                </div>
                <button className='preview-flip-hint' onClick={onFlip}>
                    <span className='preview-flip-icon'>&#9737;</span> Click card to flip
                </button>
            </div>
            {showInsertBar && (
                <div className='preview-insert-bar'>
                    <span className='preview-insert-label'></span>
                </div>
            )}
        </div>
    );
}

export default PreviewPanel;
