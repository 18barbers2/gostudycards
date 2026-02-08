
export function DashboardCard({ title, content }: { title: string; content: React.ReactNode }) {
    return (
        <div className='dashboard-card'>
            <h2>{title}</h2>
            <div className='card-content'>{content}</div>
        </div>
    );
}