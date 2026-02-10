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

export function DeckOption( {id, name, description, cardsDue, onClick } : DeckStudyInfo & { onClick: () => void }) {
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