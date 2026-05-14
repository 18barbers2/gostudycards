import { useNavigate } from 'react-router-dom';
import '../css/DashboardCard.css';

interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function GreetingCardContent({ userName, deckCount, cardCount }: { userName: string; deckCount: number; cardCount: number }) {
    return (
        <div>
            <p className="greeting-text">Hi {userName}, ready to continue studying?</p>
            <div className="greeting-stats">
                <div className="stat">
                    <span className="stat-number">{deckCount}</span>
                    <span className="stat-label">Decks</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{cardCount}</span>
                    <span className="stat-label">Cards</span>
                </div>
            </div>
        </div>
    );
}

export function StudyProgressCardContent({ dueCards, totalCards }: { dueCards: number; totalCards: number }) {
    const progressPercentage = totalCards > 0 ? 100 - Math.round((dueCards / totalCards) * 100) : 100;
    return (
        <div>
            <div className="progress-value">{progressPercentage}%</div>
            <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
            </div>
            <p className="progress-label">{dueCards} card{dueCards !== 1 ? 's' : ''} due for review</p>
        </div>
    );
}

export function WeeklyActivityCardContent() {
    return (
        <div>
            <p className="card-placeholder">Activity graph coming soon.</p>
        </div>
    );
}

export function PieChartCardContent() {
    return (
        <div>
            <p className="card-placeholder">Mastery distribution coming soon.</p>
        </div>
    );
}

export function QuickActionsContent() {
    const navigate = useNavigate();
    return (
        <div className='quick-action-buttons'>
            <button className="quick-action-btn" onClick={() => navigate('/study')}>Study Now</button>
            <button className="quick-action-btn" onClick={() => navigate('/add-card')}>Add New Card</button>
            <button className="quick-action-btn" onClick={() => navigate('/decks')}>View Decks</button>
            <button className="quick-action-btn" onClick={() => navigate('/card-builder')}>Card Builder</button>
        </div>
    );
}

export function DashboardCard({ title, children, className }: DashboardCardProps) {
    return (
        <div className={`dashboard-card ${className || ''}`}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default DashboardCard;
