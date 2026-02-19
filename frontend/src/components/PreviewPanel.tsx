
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

        </div>
    );
}

export default PreviewPanel;