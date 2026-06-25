import { useState, useEffect, useRef } from 'react';
import '../css/CardBuilder.css';
import { Layout } from '../components/Layout/Layout';
import { EditorFormatControls } from '../components/EditorFormatControls';
import CodeEditor, { type CodeEditorHandle } from '../components/CodeEditor.tsx';
import PreviewPanel from '../components/PreviewPanel.tsx';
import { getDecks } from '../api/decks';
import { getTemplate, createTemplate, updateFullTemplate } from '../api/templates';
import type { CardTemplate, Deck } from '../types';
import { useAuth } from '../context/AuthContext.tsx';


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
    const { userId } = useAuth();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeckId, setSelectedDeckId] = useState<string>('');
    const [existingTemplate, setExistingTemplate] = useState<CardTemplate | null>(null);
    const [frontHtml, setFrontHtml] = useState('<h2>{{Question}}</h2>\n<p>{{Hint}}</p>');
    const [backHtml, setBackHtml] = useState('<p>{{Answer}}</p>');
    const [styleHtml, setStyleHtml] = useState('h2, p {\n    color: white;\n    font-family: sans-serif;\n    text-align: center;\n}');
    const [cardTextInputMode, setCardTextInputMode] = useState<CardTextInputMode>('front');
    const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [saveMessage, setSaveMessage] = useState('');

    const codeEditorRef = useRef<CodeEditorHandle>(null);

    // Prevents the [selectedDeckId] effect from firing a duplicate template fetch
    // on the initial mount (the mount effect already starts that fetch directly).
    const skipNextTemplateLoad = useRef(false);

    useEffect(() => {
        getDecks(userId ?? '')
            .then(data => {
                setDecks(data);
                if (data.length > 0) {
                    const initialId = data[0].id;
                    skipNextTemplateLoad.current = true;
                    setSelectedDeckId(initialId);
                    getTemplate(initialId)
                        .then(t => {
                            setExistingTemplate(t);
                            if (t) {
                                setFrontHtml(t.frontTemplate);
                                setBackHtml(t.backTemplate);
                                setStyleHtml(t.style);
                            }
                        })
                        .catch(() => setExistingTemplate(null));
                }
            })
            .catch(err => console.error(err));
    }, []);

    // When the selected deck changes, load its existing template (if any) and
    // pre-populate the editor so the user can see and edit what was previously saved.
    // Skipped on initial mount because the mount effect already handles that fetch.
    useEffect(() => {
        if (!selectedDeckId) return;
        if (skipNextTemplateLoad.current) {
            skipNextTemplateLoad.current = false;
            return;
        }
        setExistingTemplate(null);
        getTemplate(selectedDeckId)
            .then(t => {
                setExistingTemplate(t);
                if (t) {
                    setFrontHtml(t.frontTemplate);
                    setBackHtml(t.backTemplate);
                    setStyleHtml(t.style);
                }
            })
            .catch(() => setExistingTemplate(null));
    }, [selectedDeckId]);

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

    const handleFormat = (format: string) => {
        codeEditorRef.current?.applyFormat(format);
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
            if (existingTemplate) {
                await updateFullTemplate(existingTemplate.id, frontHtml, backHtml, styleHtml, fields);
            } else {
                const created = await createTemplate(selectedDeckId, TEMP_USER_ID, frontHtml, backHtml, styleHtml, fields);
                setExistingTemplate(created);
            }
            setSaveStatus('saved');
            setSaveMessage('Template saved!');
        } catch {
            setSaveStatus('error');
            setSaveMessage('Failed to save template.');
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
                    <EditorFormatControls handleFormat={handleFormat} disabled={cardTextInputMode === 'style'} />
                </div>
                <div className='workspace'>
                    <CodeEditor ref={codeEditorRef} value={currentHtml} onChange={handleHtmlChange} filename={filename} />
                    <PreviewPanel side={previewSide} template={previewTemplate} style={styleHtml} data={{}} onFlip={handleFlip} onInsert={handleInsert} />
                </div>
            </div>
        </Layout>
    );
}
