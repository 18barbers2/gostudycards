import { useState } from 'react';
import '../css/CardBuilder.css';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import CodeEditor from '../components/CodeEditor.tsx';

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

    // Which HTML to show in editor based on active tab
    const currentHtml = cardTextInputMode === 'front' ? frontHtml : cardTextInputMode === 'back' ? backHtml : styleHtml;

    const handleHtmlChange = (newHtml: string) => {
        if (cardTextInputMode === 'front') setFrontHtml(newHtml);
        else if (cardTextInputMode === 'back') setBackHtml(newHtml);
        else setStyleHtml(newHtml);
    };

    const handleTabChange = (mode: CardTextInputMode) => {
        setCardTextInputMode(mode);
    };

    const filename = cardTextInputMode === 'style' ? 'style.css' : `${cardTextInputMode}.html`;

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
                </div>
            </div>
        </Layout>
    );
}
