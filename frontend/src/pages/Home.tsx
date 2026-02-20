import '../css/Home.css';
import { DashboardCard, GreetingCardContent, StudyProgressCardContent, WeeklyActivityCardContent, PieChartCardContent, QuickActionsContent} from '../components/DashboardCard';
import { Layout } from '../components/Layout/Layout';


export function Home() {
    return (

        <Layout>
            <div className='home-page'>
                <h1 className='page-title'>Welcome to GoStudyCards!</h1>
                <p>This is the home page. Use the navigation bar to explore the app.</p>
                <div className='home-page-container'>
                    <DashboardCard className='welcome' title='Welcome back!'>
                        <GreetingCardContent userName='Sam' deckCount={5} cardCount={120} />
                    </DashboardCard>
                    <DashboardCard className='study-progress' title='Study Progress'>
                        <StudyProgressCardContent dueCards={1} totalCards={100} />
                    </DashboardCard>
                    <DashboardCard className='weekly-activity' title='Weekly Activity'>
                        <WeeklyActivityCardContent />
                    </DashboardCard>
                    <DashboardCard className='mastery-distribution' title='Mastery Distribution'>
                        <PieChartCardContent />
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