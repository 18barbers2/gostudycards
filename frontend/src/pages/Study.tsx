import { Layout } from "../components/Layout/Layout.tsx";
import '../css/Study.css';
import { useState, useEffect } from "react";
import Card from "../components/Card.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import { getDecks } from "../api/decks.ts";
import { getDueCards, submitReview } from "../api/cards.ts";
import { getTemplate } from "../api/templates.ts";
import type { CardEntry, CardTemplate } from "../types/index.ts";

export interface DeckStudyInfo {
    id: string;
    name: string;
    description?: string;
    cardsDue: number;
}

interface StudyCardData {
    id: string;
    deckId: string;
    frontTemplate: string;
    frontData: Record<string, string>;
    backTemplate: string;
    backData: Record<string, string>;
}

function StudyCard({ card, isFlipped, onFlip }: { card: StudyCardData; isFlipped: boolean; onFlip: () => void }) {
    return (
        <div
            className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={onFlip}
        >
            <div className="card-face card-front">
                <Card
                    template={card.frontTemplate}
                    data={card.frontData}
                    id={card.id}
                    deckId={card.deckId}
                />
            </div>
            <div className="card-face card-back">
                <Card
                    template={card.backTemplate}
                    data={card.backData}
                    id={card.id}
                    deckId={card.deckId}
                />
            </div>
        </div>
    );
}

function DeckOption({ id, name, description, cardsDue, onClick }: DeckStudyInfo & { onClick: () => void }) {
    return (
        <div className="deck-option" onClick={onClick}>
            <div className="deck-info">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div className="deck-stats">
                <div className="due-count">{cardsDue}</div>
                <div className="due-label">cards due</div>
            </div>
        </div>
    );
}

function StudyInterface({ deck, userId, onExit }: { deck: DeckStudyInfo; userId: string; onExit: () => void }) {
    const [cards, setCards] = useState<CardEntry[]>([]);
    const [template, setTemplate] = useState<CardTemplate | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const [dueCards, tmpl] = await Promise.all([
                getDueCards(deck.id),
                getTemplate(deck.id),
            ]);
            setCards(dueCards);
            setTemplate(tmpl);
            setLoading(false);
        }
        load();
    }, [deck.id]);

    const handleRate = async (rating: string) => {
        const currentCard = cards[currentIndex];
        await submitReview(currentCard.id, rating, userId, deck.id, currentCard);
        setCurrentIndex(i => i + 1);
        setIsFlipped(false);
    };

    const handleSkip = () => {
        setCurrentIndex(i => i + 1);
        setIsFlipped(false);
    };

    if (loading) {
        return (
            <div className="study-interface">
                <div className="page-title-row">
                    <h1 className="page-title">Study</h1>
                </div>
                <p>Loading cards...</p>
            </div>
        );
    }

    const sessionComplete = currentIndex >= cards.length;

    if (sessionComplete) {
        return (
            <div className="study-interface">
                <div className="page-title-row">
                    <h1 className="page-title">Study</h1>
                </div>
                <div className="study-header">
                    <div className="deck-name">{deck.name}</div>
                </div>
                <div className="flashcard-container">
                    <p>Session complete! You reviewed {cards.length} card{cards.length !== 1 ? 's' : ''}.</p>
                </div>
                <div className="study-session-controls">
                    <button className="end-session-button" onClick={onExit}>Back to Decks</button>
                </div>
            </div>
        );
    }

    if (!template) {
        return (
            <div className="study-interface">
                <div className="page-title-row">
                    <h1 className="page-title">Study</h1>
                </div>
                <p>No template found for this deck.</p>
                <button className="end-session-button" onClick={onExit}>Back to Decks</button>
            </div>
        );
    }

    const currentCard = cards[currentIndex];
    const studyCard: StudyCardData = {
        id: currentCard.id,
        deckId: currentCard.deckId,
        frontTemplate: template.frontTemplate,
        frontData: currentCard.data,
        backTemplate: template.backTemplate,
        backData: currentCard.data,
    };

    return (
        <div className="study-interface">
            <div className="page-title-row">
                <h1 className="page-title">Study</h1>
            </div>
            <div className="study-header">
                <div className="study-title">
                    <div className="deck-name">{deck.name}</div>
                </div>
                <div className="study-progress">
                    <span>Card <strong>{currentIndex + 1}</strong> of <strong>{cards.length}</strong></span>
                    <span><strong>{cards.length - currentIndex}</strong> remaining</span>
                </div>
            </div>

            <div className="flashcard-container">
                <StudyCard card={studyCard} isFlipped={isFlipped} onFlip={() => setIsFlipped(f => !f)} />
            </div>

            <div className="difficulty-section">
                <div className="difficulty-label">How well did you know this?</div>
                <div className="difficulty-buttons">
                    <button className="difficulty-button button-retry" onClick={() => handleRate('retry')} disabled={!isFlipped}>RETRY</button>
                    <button className="difficulty-button button-hard" onClick={() => handleRate('hard')} disabled={!isFlipped}>HARD</button>
                    <button className="difficulty-button button-medium" onClick={() => handleRate('medium')} disabled={!isFlipped}>MEDIUM</button>
                    <button className="difficulty-button button-easy" onClick={() => handleRate('easy')} disabled={!isFlipped}>EASY</button>
                </div>
            </div>

            <div className="study-session-controls">
                <button className="end-session-button" onClick={onExit}>End Session</button>
                <button className="skip-card-button" onClick={handleSkip}>Skip Card</button>
            </div>
        </div>
    );
}


export function Study() {
    const { isGuest } = useAuth();
    const userId = isGuest ? 'guest' : 'authenticated-user'; // TODO: replace with real userId from auth
    const [decks, setDecks] = useState<DeckStudyInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDeck, setSelectedDeck] = useState<DeckStudyInfo | null>(null);

    useEffect(() => {
        if (selectedDeck) return;
        setLoading(true);
        async function load() {
            const allDecks = await getDecks(userId);
            const withDue = await Promise.all(
                allDecks.map(async (deck) => {
                    const due = await getDueCards(deck.id);
                    return { id: deck.id, name: deck.name, description: deck.description, cardsDue: due.length };
                })
            );
            setDecks(withDue.filter(d => d.cardsDue > 0));
            setLoading(false);
        }
        load();
    }, [selectedDeck]);

    return (
        <Layout>
            {!selectedDeck && (
                <div className="deck-selection">
                    <div className="page-title-row">
                        <h1 className="page-title">Study</h1>
                    </div>
                    <h2 className="subtitle">Choose a deck to study</h2>
                    {loading && <p>Loading decks...</p>}
                    {!loading && decks.length === 0 && <p>No cards due for review right now.</p>}
                    {decks.map((deck) => (
                        <DeckOption
                            key={deck.id}
                            {...deck}
                            onClick={() => setSelectedDeck(deck)}
                        />
                    ))}
                </div>
            )}
            {selectedDeck && (
                <StudyInterface deck={selectedDeck} userId={userId} onExit={() => setSelectedDeck(null)} />
            )}
        </Layout>
    );
}

export default Study;
