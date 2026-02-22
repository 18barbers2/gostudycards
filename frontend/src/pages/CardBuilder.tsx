import { useState, useEffect } from 'react';
import '../css/CardBuilder.css';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import CodeEditor from '../components/CodeEditor.tsx';
import PreviewPanel from '../components/PreviewPanel.tsx';
import { getDecks } from '../api/decks';
import { createTemplate } from '../api/templates';
import type { Deck } from '../types';

const TEMP_USER_ID = 'test-user-1';

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
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeckId, setSelectedDeckId] = useState<string>('');
    const [frontHtml, setFrontHtml] = useState('<h2>{{Question}}</h2>\n<p>{{Hint}}</p>');
    const [backHtml, setBackHtml] = useState('<p>{{Answer}}</p>');
    const [styleHtml, setStyleHtml] = useState('h2, p {\n    color: white;\n    font-family: sans-serif;\n    text-align: center;\n}');
    const [cardTextInputMode, setCardTextInputMode] = useState<CardTextInputMode>('front');
    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        getDecks(TEMP_USER_ID)
            .then(data => {
                setDecks(data);
                if (data.length > 0) setSelectedDeckId(data[0].id);
            })
            .catch(err => console.error(err));
    }, []);

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

    const handleSaveTemplate = async () => {
        if (!selectedDeckId) return;
        setSaveStatus('saving');

        // Parse {{token}} fields from both front and back, deduplicating across sides
        const tokenRegex = /\{\{(\w+)\}\}/g;
        const fieldNames = new Set<string>();
        for (const match of frontHtml.matchAll(tokenRegex)) fieldNames.add(match[1]);
        for (const match of backHtml.matchAll(tokenRegex)) fieldNames.add(match[1]);
        const DEFAULT_NAMES = new Set(['Question', 'Answer', 'Hint']);
        const fields = [...fieldNames].map(name => ({ name, isDefault: DEFAULT_NAMES.has(name) }));

        try {
            await createTemplate(selectedDeckId, TEMP_USER_ID, frontHtml, backHtml, styleHtml, fields);
            setSaveStatus('saved');
            setSaveMessage('Template saved!');
        } catch (err: unknown) {
            setSaveStatus('error');
            const message = err instanceof Error ? err.message : '';
            setSaveMessage(message.includes('409') || message.includes('Unique')
                ? 'A template already exists for this deck.'
                : 'Failed to save template.');
        }

        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    const filename = cardTextInputMode === 'style' ? 'style.css' : `${cardTextInputMode}.html`;
    const previewTemplate = previewSide === 'front' ? frontHtml : backHtml;

    return (
        <Layout>
            <div className='card-builder-page'>
                {/* Title row — page title on the left, deck selector + save on the right */}
                <div className='page-title-row'>
                    <h1 className='page-title'>Card Builder</h1>
                    <div className='title-row-actions'>
                        <select
                            className='deck-selector'
                            value={selectedDeckId}
                            onChange={e => setSelectedDeckId(e.target.value)}
                        >
                            {decks.length === 0 && <option value=''>No decks yet</option>}
                            {decks.map(deck => (
                                <option key={deck.id} value={deck.id}>{deck.name}</option>
                            ))}
                        </select>
                        <button
                            className='save-template-button'
                            onClick={handleSaveTemplate}
                            disabled={!selectedDeckId || saveStatus === 'saving'}
                        >
                            {saveStatus === 'saving' ? 'Saving…' : 'Save Template'}
                        </button>
                        {saveStatus !== 'idle' && saveStatus !== 'saving' && (
                            <span className={`save-status save-status--${saveStatus}`}>{saveMessage}</span>
                        )}
                    </div>
                </div>

                {/* Editor controls — tabs and format toolbar are both editor-level tools */}
                <div className='editor-controls'>
                    <Tabs activeTab={cardTextInputMode} onClick={handleTabChange} />
                    <EditorFormatControls handleFormat={() => {}} />
                </div>
                <div className='workspace'>
                    <CodeEditor value={currentHtml} onChange={handleHtmlChange} filename={filename} />
                    <PreviewPanel side={previewSide} template={previewTemplate} style={styleHtml} data={{}} onFlip={handleFlip} onInsert={handleInsert} />
                </div>
            </div>
        </Layout>
    );
}
