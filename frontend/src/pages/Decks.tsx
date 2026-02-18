import '../css/Decks.css';
import DeckTile from '../components/DeckTile.tsx';
import { useState } from 'react';
import type { DeckProps } from '../components/Deck.tsx';
import { Layout } from '../components/Layout/Layout.tsx';


export function Decks() {

    // TODO: Replace with API fetch
    const [decks, setDecks] = useState<DeckProps[]>([
    {
        id: '1',
        name: 'Japanese JLPT N5 Vocabulary',
        cardIds: ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8'],
        description: 'Essential vocabulary for JLPT N5 level. Covers greetings, numbers, and basic daily conversation.',
        ownerId: '1ilkimen2',
    },
    {
        id: '2',
        name: 'Spanish Verbs - Present Tense',
        cardIds: ['s1', 's2', 's3', 's4', 's5'],
        description: 'Common Spanish verbs conjugated in present tense. Includes regular -ar, -er, and -ir verbs.',
        ownerId: '1ilkimen2',
    },
    {
        id: '3',
        name: 'Calculus I - Derivatives',
        cardIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
        description: 'Derivative rules, chain rule, product rule, and quotient rule with examples.',
        ownerId: 'mathprofessor',
    },
    {
        id: '4',
        name: 'World Capitals',
        cardIds: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'],
        description: 'Learn the capitals of countries around the world. Organized by continent.',
        ownerId: 'geoking99',
    },
    {
        id: '5',
        name: 'Medical Terminology',
        cardIds: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'],
        description: 'Common medical prefixes, suffixes, and root words used in healthcare.',
        ownerId: 'nurserachel',
    },
    {
        id: '6',
        name: 'Python Programming Basics',
        cardIds: ['p1', 'p2', 'p3', 'p4'],
        description: 'Core Python concepts including data types, loops, functions, and classes.',
        ownerId: 'codewizard',
    },
    {
        id: '7',
        name: 'Classical Music Composers',
        cardIds: ['m1', 'm2', 'm3', 'm4', 'm5'],
        description: 'Famous composers from Baroque to Romantic era with their notable works.',
        ownerId: 'musiclover88',
    },
    {
        id: '8',
        name: 'French Food Vocabulary',
        cardIds: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
        description: 'Learn the French names for common foods, cooking methods, and restaurant phrases.',
        ownerId: '1ilkimen2',
    },
    {
        id: '9',
        name: 'US History Timeline',
        cardIds: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'],
        description: 'Major events in US history from colonial times to the 21st century.',
        ownerId: 'historybuff',
    },
    {
        id: '10',
        name: 'German Articles & Cases',
        cardIds: ['g1', 'g2', 'g3'],
        description: 'Master German definite and indefinite articles across all four cases.',
        ownerId: '1ilkimen2',
    }
]);


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