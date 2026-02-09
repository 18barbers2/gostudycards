import '../css/DashboardCard.css';


interface DashboardCardProps {
    title: string;
    colorGradient: [string, string];
    gridSpan?: number;
    children: React.ReactNode;
}

export function GreetingCardContent( {userName, deckCount, cardCount}: { userName: string; deckCount: number; cardCount: number }) {
    return (
        <div>
            <p>Hi {userName}, welcome back to GoStudyCards! Ready to review your flashcards?</p>
            <p>You have {deckCount} decks and {cardCount} cards waiting for you to study.</p>
        </div>
    );
}


export function DashboardCard({ title, colorGradient, gridSpan, children}: DashboardCardProps) {
    return (
        <div className='dashboard-card'>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default DashboardCard;