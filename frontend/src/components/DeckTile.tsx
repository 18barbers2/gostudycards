import '../css/DeckTile.css';

interface DeckTileProps {
    title?: string;
    createdBy?: string;
    deckId?: string;
    stats?: {
        cards: number;
        needReview: number;
        new: number;
        learned: number;
        lastReviewed: string;
    };
    onMenuClick?: (deckId: string) => void;
}

export function DeckTile({ title, createdBy, deckId, onMenuClick }: DeckTileProps){
    return (
        <div className='deck-tile'>
            <button className='deck-menu' onClick={() => onMenuClick && deckId && onMenuClick(deckId)}>⋯</button>
            <div className='deck-content'>
                <h3 className='deck-title'>{ title }</h3>
                <p>Number of Cards: 42</p>
                <p className='created-by'>created by: samuel barber</p>
            </div>
        </div>
    );
}

export default DeckTile;  