import '../css/Decks.css';
import DeckTile from '../components/DeckTile.tsx';
import { useState, useEffect } from 'react';
import type { Deck } from '../types';
import { getDecks, createDeck, deleteDeck } from '../api/decks';
import { Layout } from '../components/Layout/Layout.tsx';
import { useAuth } from '../context/AuthContext.tsx';

const TEMP_USER_ID = 'test-user-1'; // Temporary until guest/auth is implemented

export function Decks() {
    const { userId } = useAuth();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        getDecks( userId ?? '')
            .then(data => setDecks(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [userId]);

    function handleCreate(e: React.FormEvent) {
        if (creating) return;
        e.preventDefault();
        setCreating(true);
        createDeck(newName, newDesc || undefined, userId ?? '')
            .then(deck => setDecks(prev => [...prev, deck]))
            .catch(err => console.error(err))
            .finally(() => { 
                setCreating(false); 
                setShowForm(false); 
                setNewName(''); 
                setNewDesc(''); });
    }

    return (

        <Layout>
            <div className='decks-page'>
                <div className='page-title-row'>
                    <h1 className='page-title'>Decks</h1>
                </div>
                    <p>This is the Decks page. Here you will be able to view and manage your decks of cards.</p>
                <div className='decks'>
                    {loading ? (
                        // Show skeleton tiles while the deck list is being fetched
                        <>
                            <div className='deck-tile-skeleton'>
                                <div className='skeleton deck-tile-skeleton__title' />
                                <div className='skeleton deck-tile-skeleton__sub' />
                            </div>
                            <div className='deck-tile-skeleton'>
                                <div className='skeleton deck-tile-skeleton__title' style={{ width: '50%' }} />
                                <div className='skeleton deck-tile-skeleton__sub' style={{ width: '30%' }} />
                            </div>
                            <div className='deck-tile-skeleton'>
                                <div className='skeleton deck-tile-skeleton__title' style={{ width: '70%' }} />
                                <div className='skeleton deck-tile-skeleton__sub' style={{ width: '45%' }} />
                            </div>
                        </>
                    ) : (
                        <>
                            {decks.map((deck) => (
                                <DeckTile
                                    key={deck.id}
                                    deckId={deck.id}
                                    title={deck.name}
                                    createdBy={deck.ownerId}
                                    onDelete={(id) => {
                                        deleteDeck(id)
                                            .then(() => setDecks(prev => prev.filter(d => d.id !== id)))
                                            .catch(err => console.error(err));
                                    }}
                                />
                            ))}
                            {showForm ? (
                                <form className='add-deck-form-tile' onSubmit={handleCreate}>
                                    <input
                                        className='add-deck-input'
                                        type='text'
                                        placeholder='Deck name'
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    <input
                                        className='add-deck-input'
                                        type='text'
                                        placeholder='Description (optional)'
                                        value={newDesc}
                                        onChange={e => setNewDesc(e.target.value)}
                                    />
                                    <button className='add-deck-submit' type='submit' disabled={creating}>Create</button>
                                    <button className='add-deck-cancel' type='button' onClick={() => setShowForm(false)}>Cancel</button>
                                </form>
                            ) : (
                                <button className='add-deck-tile' onClick={() => setShowForm(true)}>
                                    <span className='material-symbols-outlined'>add</span>
                                    New Deck
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}


export default Decks;
