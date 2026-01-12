import '../css/Decks.css';
import DeckTile from '../components/DeckTile.tsx';

export function Decks() {
    return (
        <div className='decks-page'>
            <h2>Decks</h2>
            <p>This is the Decks page. Here you will be able to view and manage your decks of cards.</p>
            <DeckTile/>
        </div>
    );
}


export default Decks;