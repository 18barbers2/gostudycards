import { Layout } from "../components/Layout/Layout.tsx";
import testDecks from '../data/testDecks.json';
import '../css/Study.css';
import { useState } from "react";



export interface DeckStudyInfo {
    id: string;
    name: string;
    description?: string;
    cardsDue: number;
}

function DeckOption( {id, name, description, cardsDue, onClick } : DeckStudyInfo & { onClick: () => void }) {
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

function StudyInterface( { deck, onExit }: { deck: DeckStudyInfo; onExit: () => void }) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardsRemaining, setCardsRemaining] = useState(deck.cardsDue);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const rateCard = (difficulty: string) => {
    console.log(`Rated as: ${difficulty}`);
    setCurrentCardIndex(currentCardIndex + 1);
    setCardsRemaining(cardsRemaining - 1);
    setIsFlipped(false);
    };

    return (
        <div className="study-interface">

            {/* Header with deck name and progress */}
            <div className="study-title">
                <h1>Study</h1>
                <div className="deck-name">{deck.name}</div>
            </div>
            <div className="study-progress">
                <span>Card <strong>{currentCardIndex + 1}</strong> of <strong>{deck.cardsDue}</strong></span>
                <span><strong>{cardsRemaining}</strong> remaining</span>
            </div>

            {/* Flashcard display */}
            <div className="flashcard-container">
                <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
                    <div className="card-face card-front">
                        <div className="card-label">FLASHCARD (FRONT)</div>
                        <div className="card-label">What is the capital of france?</div>
                        <div className="card-hint">Click to reveal answer</div>
                    </div>
                    <div className="card-face card-back">
                        <div className="card-label">FLASHCARD (BACK)</div>
                        <div className="card-label">Paris</div>
                        <div className="card-hint">Rate your answer below</div>
                    </div>
                </div>
            </div>

            {/* Controls for card */}
            <div className="difficulty-section">
                <div className="difficulty-label">How well did you know this?</div>
                <div className="difficulty-buttons">
                    <button className="difficulty-button button-retry" onClick={() => rateCard('retry')}>RETRY</button>
                    <button className="difficulty-button button-hard" onClick={() => rateCard('hard')}>HARD</button>
                    <button className="difficulty-button button-medium" onClick={() => rateCard('medium')}>MEDIUM</button>
                    <button className="difficulty-button button-easy" onClick={() => rateCard('easy')}>EASY</button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
                <button className="action-button button-exit" onClick={onExit}>End Session</button>
                <button className="action-button button-skip" onClick={onExit}>Skip Card</button>
            </div>

        </div>
    )
}


export function Study() {

    const [decks] = useState<DeckStudyInfo[]>(
        testDecks.filter(deck => deck.cardsDue > 0) as DeckStudyInfo[]
    );

    // State to track which view to show: 'selection' or 'study'
    const [selectedDeck, setSelectedDeck] = useState<DeckStudyInfo | null>(null);

    // Handler for when a deck is selected
    const startStudying = (deck: DeckStudyInfo) => {
        setSelectedDeck(deck);
    };

    const exitStudy = () => {
        setSelectedDeck(null);
    }


    return (
        <Layout>
            {!selectedDeck && (
                <div className="deck-selection">
                    <h1>Study</h1>
                    <h2 className='subtitle'>Choose a deck to study</h2>
                    {decks.map((deck) => (
                        <DeckOption
                            key={deck.id}
                            id={deck.id}
                            name={deck.name}
                            description={deck.description || "No description"}
                            cardsDue={deck.cardsDue}
                            onClick={() => startStudying(deck)}
                        />
                    ))}
                </div>
            )}
            {selectedDeck && (
                <div className="study-session">
                    <h1>Studying: {selectedDeck.name}</h1>
                    <p>{selectedDeck.cardsDue} cards to review</p>
                    <button onClick={exitStudy}>Back to Decks</button>
                </div>
            )}
       
        </Layout>
    );
}

export default Study;