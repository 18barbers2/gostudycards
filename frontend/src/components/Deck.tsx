interface DeckProps {
    id: string;
    name: string;
    cardIds: string[];
    description?: string;
    ownerId?: string;
    createdAt?: string;
    updatedAt?: string;
    
}
export function Deck({  }: DeckProps) {
    return (<div>This is a Deck</div>);
}

export default Deck;