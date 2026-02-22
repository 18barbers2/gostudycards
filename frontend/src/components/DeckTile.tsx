import '../css/DeckTile.css';
import { useState } from 'react';

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
    onDelete?: (deckId: string) => void;
    onRename?: (deckId: string) => void;
}

export function DeckTile({ title, createdBy, deckId, onDelete, onRename }: DeckTileProps){
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='deck-tile'>
            <button
                className='deck-menu'
                onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}
            >⋯</button>

            {menuOpen && (
                <>
                    <div className='deck-menu-backdrop' onClick={() => setMenuOpen(false)} />
                    <div className='deck-menu-dropdown'>
                        <button
                            className='deck-menu-item'
                            disabled
                            onClick={() => { onRename?.(deckId!); setMenuOpen(false); }}
                        >
                            Rename
                        </button>
                        <button
                            className='deck-menu-item deck-menu-item--danger'
                            onClick={() => { onDelete?.(deckId!); setMenuOpen(false); }}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}

            <div className='deck-content'>
                <h3 className='deck-title'>{ title }</h3>
                <p className='created-by'>{createdBy}</p>
            </div>
        </div>
    );
}

export default DeckTile;
