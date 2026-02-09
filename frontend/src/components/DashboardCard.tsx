import '../css/DashboardCard.css';

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function GreetingCardContent( {userName, deckCount, cardCount}: { userName: string; deckCount: number; cardCount: number }) {
    return (
        <div>
            <p>Hi {userName}, welcome back to GoStudyCards! Ready to review your flashcards?</p>
            <p>You have {deckCount} decks and {cardCount} cards waiting for you to study.</p>
        </div>
    );
}

export function StudyProgressCardContent({ dueCards, totalCards }: { dueCards: number; totalCards: number }) {
    const progressPercentage = totalCards > 0 ? Math.round((dueCards / totalCards) * 100) : 0;
    return (
        <div>
            <p>You have {dueCards} cards due for review out of {totalCards} total cards.</p>
            <p>Your current study progress is {progressPercentage}%.</p>
        </div>
    );
}

export function WeeklyActivityCardContent() {
    return (
        <div>
            <p>Your weekly activity graph will be displayed here.</p>
        </div>
    );
}

export function PieChartCardContent() {
    return (
        <div>
            <p>Your pie chart showing card distribution will be displayed here.</p>
        </div>
    );
}

export function QuickActionsContent() {
    return (
        <div className='quick-action-buttons'>
            <button>Study Now</button>
            <button>Add New Card</button>
        </div>
    );

}

export function DashboardCard({ title, children, className}: DashboardCardProps) {
    return (
        // Adding a classname prop allows us to apply specific styles to different cards if needed
        <div className={`dashboard-card ${className || ''}`}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default DashboardCard;