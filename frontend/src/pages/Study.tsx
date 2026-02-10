import { Layout } from "../components/Layout/Layout.tsx";
import testDecks from '../data/testDecks.json';
import '../css/Study.css';


export function DeckOption( {id, name, description, cardsDue} : {id: string, name: string, description: string, cardsDue: number} ) {
    return (
        <div className="deck-option">
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
    return (
        <Layout>
            <h1>Study</h1>
            <h2 className='subtitle'>Choose a deck to study</h2>
            <div className="deck-selection">
                {testDecks.map((deck) => (
                    <DeckOption
                        id={deck.id}
                        name={deck.name}
                        description={deck.description || "No description"}
                        cardsDue={deck.cardsDue}
                    />
                ))}
            </div>
       
        </Layout>
    );
}

export default Study;