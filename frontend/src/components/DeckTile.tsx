import '../css/DeckTile.css';


export function DeckTile({ title, createdBy, deckId, onMenuClick }: { title?: string; createdBy?: string; deckId?: string; onMenuClick?: (deckId: string) => void }) {
    return (
        <div className='deck-tile'>
            <button className='deck-menu' onClick={() => onMenuClick && deckId && onMenuClick(deckId)}>⋯</button>
            <div className='deck-content'>
                <h3 className='deck-title'>Deck Title</h3>
                {/* <p>Number of Cards: 42</p> */}
                <p className='created-by'>created by: samuel barber</p>
            </div>
        </div>
    );
}

export default DeckTile;  