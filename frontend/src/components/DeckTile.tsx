import '../css/DeckTile.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface DeckTileProps {
    title?: string;
    description?: string;
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

export function DeckTile({ title, description, deckId, onDelete, onRename }: DeckTileProps){
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <div className='deck-tile' onClick={() => deckId && navigate(`/decks/${deckId}`)}>
            <button
                className='deck-menu'
                onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}
            >⋯</button>

            {menuOpen && (
                <>
                    <div className='deck-menu-backdrop' onClick={(e) => { e.stopPropagation(); closeMenu(); }} />
                    <div className='deck-menu-dropdown'>
                        <button
                            className='deck-menu-item'
                            disabled
                            onClick={(e) => { e.stopPropagation(); onRename?.(deckId!); closeMenu(); }}
                        >
                            Rename
                        </button>
                        <button
                            className='deck-menu-item deck-menu-item--danger'
                            onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true); closeMenu(); }}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}

            {showDeleteModal && createPortal(
                <>
                    <div className='modal-overlay' onClick={(e) => { e.stopPropagation(); setShowDeleteModal(false); }} />
                    <div className='modal-dialog' onClick={(e) => e.stopPropagation()}>
                        <h3 className='modal-title'>Delete deck?</h3>
                        <p className='modal-body'>
                            <strong>"{title}"</strong> and all its cards will be permanently deleted. This can't be undone.
                        </p>
                        <div className='modal-actions'>
                            <button className='modal-btn modal-btn--cancel' onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button className='modal-btn modal-btn--danger' onClick={() => { onDelete?.(deckId!); setShowDeleteModal(false); }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}

            <div className='deck-content'>
                <h3 className='deck-title'>{ title }</h3>
                {/* Removed the below because it's not needed */}
                {/* <p className='created-by'>{createdBy}</p> */}
                <p className='deck-description'>{description }</p>

            </div>
        </div>
    );
}

export default DeckTile;
