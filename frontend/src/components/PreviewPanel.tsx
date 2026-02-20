import Card from './Card';
import '../css/PreviewPanel.css';

interface PreviewPanelProps {
    side: 'front' | 'back';
    template: string;
    data: Record<string, string>;
    onFlip: () => void;
    onInsert: (text: string) => void;
}
function PreviewPanel({ side, template, data, onFlip, onInsert} : PreviewPanelProps) {
    return (
        <div className='preview-pane'>
            <div className='preview-pane-header'>
                <span className='preview-label'>Live Preview</span>
                <span className='preview-side-badge'>{side}</span>
            </div>
            <div className='preview-card-wrapper'>
                <Card id='' deckId='' template={template} data={data} />
            </div>
            <button className='preview-flip-btn' onClick={onFlip}>Flip Card</button>
        </div>
    );
}

export default PreviewPanel;