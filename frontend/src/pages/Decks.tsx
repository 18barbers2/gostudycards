import '../css/Decks.css';
import DeckTile from '../components/DeckTile.tsx';
import { useState, useEffect } from 'react';
import type { Deck } from '../types';
import { getDecks, createDeck, deleteDeck } from '../api/decks';
import { Layout } from '../components/Layout/Layout.tsx';

const TEMP_USER_ID = 'test-user-1'; // Temporary until guest/auth is implemented

export function Decks() {

    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');

    useEffect(() => {
        getDecks(TEMP_USER_ID)
            .then(data => setDecks(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        createDeck(newName, newDesc || undefined, TEMP_USER_ID)
            .then(deck => setDecks(prev => [...prev, deck]))
            .catch(err => console.error(err))
            .finally(() => { setShowForm(false); setNewName(''); setNewDesc(''); });
    }

    if (loading) return <Layout><p>Loading decks ...</p></Layout>;

    return (

        <Layout>
            <div className='decks-page'>
                <div className='page-title-row'>
                    <h1 className='page-title'>Decks</h1>
                </div>
                <p>This is the Decks page. Here you will be able to view and manage your decks of cards.</p>
                <div className='decks'>
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
                            <button className='add-deck-submit' type='submit'>Create</button>
                            <button className='add-deck-cancel' type='button' onClick={() => setShowForm(false)}>Cancel</button>
                        </form>
                    ) : (
                        <button className='add-deck-tile' onClick={() => setShowForm(true)}>
                            <span className='material-symbols-outlined'>add</span>
                            New Deck
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
}


export default Decks;
