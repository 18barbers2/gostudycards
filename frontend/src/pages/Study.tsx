import { Layout } from "../components/Layout/Layout.tsx";
import testDecks from '../data/testDecks.json';
import '../css/Study.css';
import { useState } from "react";
import Card from "../components/Card.tsx";



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
    frontData: Record<string, string>
    backTemplate: string;
    backData: Record<string, string>
}

function StudyCard( { card, isFlipped, onFlip }: { card: StudyCardData; isFlipped: boolean; onFlip: () => void }) {
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

    // ADD THIS: Sample card data (later this will come from database)
    const sampleCards: StudyCardData[] = [
        {
            id: "1",
            deckId: deck.id,
            frontTemplate: "<div>{{question}}</div>",
            frontData: { question: "What is the capital of France?" },
            backTemplate: "<div>{{answer}}</div>",
            backData: { answer: "Paris" }
        },
        {
            id: "2",
            deckId: deck.id,
            frontTemplate: "<div>{{question}}</div>",
            frontData: { question: "What is 2 + 2?" },
            backTemplate: "<div>{{answer}}</div>",
            backData: { answer: "4" }
        }
    ];

    // Set current card based on index (in real app, this would be fetched from backend based on deck and due cards)
    const currentCard = sampleCards[currentCardIndex % sampleCards.length];

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
            <h1>Study</h1>
            <div className="study-header">
                <div className="study-title">
                    <div className="deck-name">{deck.name}</div>
                </div>
                <div className="study-progress">
                    <span>Card <strong>{currentCardIndex + 1}</strong> of <strong>{deck.cardsDue}</strong></span>
                    <span><strong>{cardsRemaining}</strong> remaining</span>
                </div>

            </div>

            {/* Flashcard display */}
            <div className="flashcard-container">
                <StudyCard card={currentCard} isFlipped={isFlipped} onFlip={flipCard}/>
            </div>

            {/* Controls for card */}
            <div className="difficulty-section">
                <div className="difficulty-label">How well did you know this?</div>
                <div className="difficulty-buttons">
                    <button 
                        className="difficulty-button button-retry" 
                        onClick={() => rateCard('retry')}
                        disabled={!isFlipped}
                    >
                        RETRY
                    </button>
                    <button 
                        className="difficulty-button button-hard" 
                        onClick={() => rateCard('hard')}
                        disabled={!isFlipped}
                    >
                        HARD
                    </button>
                    <button 
                        className="difficulty-button button-medium" 
                        onClick={() => rateCard('medium')}
                        disabled={!isFlipped}
                    >
                        MEDIUM
                    </button>
                    <button 
                        className="difficulty-button button-easy" 
                        onClick={() => rateCard('easy')}
                        disabled={!isFlipped}
                    >
                        EASY
                    </button>
                </div>
            </div>

            <div className="study-session-controls">
                <button className="end-session-button">End Session</button>
                <button className="skip-card-button">Skip Card</button>
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
                <StudyInterface deck={selectedDeck} onExit={exitStudy} />
            )}
       
        </Layout>
    );
}

export default Study;