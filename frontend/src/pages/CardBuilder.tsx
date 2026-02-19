import { useState } from 'react';
import '../css/CardBuilder.css';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import CodeEditor from '../components/CodeEditor.tsx';
import PreviewPanel from '../components/PreviewPanel.tsx';

// Track which side of the card the user is editing
type CardTextInputMode = 'front' | 'back' | 'style';

export function Tabs({ activeTab, onClick }: { activeTab: CardTextInputMode; onClick: (mode: CardTextInputMode) => void }) {
    return (
        <div className='tab-group'>
            <button className={`tab-button ${activeTab === 'front' ? 'active' : ''}`} onClick={() => onClick('front')}>Front</button>
            <button className={`tab-button ${activeTab === 'back' ? 'active' : ''}`} onClick={() => onClick('back')}>Back</button>
            <button className={`tab-button ${activeTab === 'style' ? 'active' : ''}`} onClick={() => onClick('style')}>Style</button>
        </div>
    );
}

export default function CardBuilder() {
    const [frontHtml, setFrontHtml] = useState('');
    const [backHtml, setBackHtml] = useState('');
    const [styleHtml, setStyleHtml] = useState('');
    const [cardTextInputMode, setCardTextInputMode] = useState<CardTextInputMode>('front');
    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

    // Which HTML to show in editor based on active tab
    const currentHtml = cardTextInputMode === 'front' ? frontHtml : cardTextInputMode === 'back' ? backHtml : styleHtml;

    const handleHtmlChange = (newHtml: string) => {
        if (cardTextInputMode === 'front') setFrontHtml(newHtml);
        else if (cardTextInputMode === 'back') setBackHtml(newHtml);
        else setStyleHtml(newHtml);
    };

    const handleTabChange = (mode: CardTextInputMode) => {
        setCardTextInputMode(mode);
        if (mode === 'front') setPreviewSide('front');
        else if (mode === 'back') setPreviewSide('back');
    };

    const handleFlip = () => {
        setPreviewSide(prev => prev === 'front' ? 'back' : 'front');
    };

    const handleInsert = (_text: string) => {
        // TODO: wire up to CodeEditor cursor insertion
    };

    const filename = cardTextInputMode === 'style' ? 'style.css' : `${cardTextInputMode}.html`;
    const previewTemplate = previewSide === 'front' ? frontHtml : backHtml;

    return (
        <Layout>
            <div className='card-builder-page'>
                <h1 className='page-title'>Card Builder</h1>
                <div className='controls'>
                    <Tabs activeTab={cardTextInputMode} onClick={handleTabChange} />
                    <EditorFormatControls handleFormat={() => {}} />
                </div>
                <div className='workspace'>
                    <CodeEditor value={currentHtml} onChange={handleHtmlChange} filename={filename} />
                    <PreviewPanel side={previewSide} template={previewTemplate} data={{}} onFlip={handleFlip} onInsert={handleInsert} />
                </div>
            </div>
        </Layout>
    );
}
