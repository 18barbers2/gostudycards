import '../css/Home.css';
import { DashboardCard, GreetingCardContent, StudyProgressCardContent, WeeklyActivityCardContent, PieChartCardContent, QuickActionsContent} from '../components/DashboardCard';
import { Layout } from '../components/Layout/Layout';
import { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../api/dashboard';
import { useAuth } from '../context/AuthContext';

type DashboardStats =  {
    deckCount: number;
    totalCards: number;
    dueCount: number;
    weeklyActivity: { date: string; count: number }[];
    masteryDistribution: { new: number, learning: number, mastered: number}
};



export function Home() {

    const [stats, setStats] = useState<DashboardStats | null>(null);

    const { username } = useAuth();

    useEffect(() => {
        fetchDashboardStats().then(setStats);
    }, []);
    
    return (
        <Layout>
            <div className='home-page'>
                <div className='page-title-row'>
                    <h1 className='page-title'>Welcome to GoStudyCards!</h1>
                </div>
                <div className='home-page-container'>
                    <DashboardCard className='welcome' title='Welcome back!'>
                        <GreetingCardContent userName={username ?? 'there'} deckCount={stats?.deckCount ?? 0} cardCount={stats?.totalCards ?? 0} />
                    </DashboardCard>
                    <DashboardCard className='study-progress' title='Study Progress'>
                        <StudyProgressCardContent dueCards={stats?.dueCount ?? 0} totalCards={stats?.totalCards ?? 0} />
                    </DashboardCard>
                    <DashboardCard className='weekly-activity' title='Weekly Activity'>
                        <WeeklyActivityCardContent data={ stats?.weeklyActivity ?? []}/>
                    </DashboardCard>
                    <DashboardCard className='mastery-distribution' title='Mastery Distribution'>
                        <PieChartCardContent data={ stats?.masteryDistribution ?? { new: 0, learning: 0, mastered: 0 }}/>
                    </DashboardCard>
                    <DashboardCard className='quick-actions' title='Quick Actions'>
                        <QuickActionsContent />
                    </DashboardCard>
                </div>
                
            </div>
        </Layout>
    );
}

export default Home;