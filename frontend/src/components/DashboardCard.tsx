import { useNavigate } from 'react-router-dom';
import '../css/DashboardCard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';

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

export function WeeklyActivityCardContent( { data } : {data: { date: string; count: number;}[]}) {

    const formatted = data.map(d => ({
        ...d, 
        label: new Date(d.date).toLocaleDateString('en-US', {weekday: 'short'}),
    }));



    return (
        <ResponsiveContainer width="100%" height="95%">
            <BarChart data={formatted} barSize={20}>
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={24} />
                <Tooltip
                    contentStyle={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: 8, fontSize: 12 }}
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar dataKey="count" fill="#15a967" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function PieChartCardContent( { data } : { data: { new: number; learning: number; mastered: number}} ) {
    const chartData = [
    { name: 'New', value: data.new, color: "#5b8cf5" },
    { name: 'Learning', value: data.learning, color: "#f5a623" },
    { name: 'Mastered', value: data.mastered, color: "#4caf82" },
    ].filter(d => d.value > 0); // don't show empty slices
    
    
    return (
        <div>
            <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} dataKey="value" stroke='none'>
                        {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                    ))}
                    </Pie>
                    <Legend 
                        iconType='circle'
                        iconSize={8} 
                        wrapperStyle={{ fontSize: 12 }}
                        formatter={(value, entry) => {
                            const payload = entry?.payload as { value: number };
                            return `${value} - ${payload?.value}`;
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
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
