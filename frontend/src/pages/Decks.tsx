import '../css/Decks.css';
import DeckTile from '../components/DeckTile.tsx';
import { useState } from 'react';
import type { Deck } from '../types';
import { MOCK_DECKS } from '../data/decks';
import { Layout } from '../components/Layout/Layout.tsx';


export function Decks() {

    // TODO: Replace with API fetch
    const [decks] = useState<Deck[]>(MOCK_DECKS);


    return (

        <Layout>
            <div className='decks-page'>
                <h1>Decks</h1>
                <p>This is the Decks page. Here you will be able to view and manage your decks of cards.</p>
                <div className='decks'>
                    {decks.map((deck) => (
                        <DeckTile
                            key={deck.id}
                            title={deck.name}
                            createdBy={deck.ownerId}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}


export default Decks;