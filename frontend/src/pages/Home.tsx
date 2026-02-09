import '../css/Home.css';
import { DashboardCard, GreetingCardContent, StudyProgressCardContent} from '../components/DashboardCard';

export function Home() {
    return (
        <div className='home-page'>
            <h1>Welcome to GoStudyCards!</h1>
            <p>This is the home page. Use the navigation bar to explore the app.</p>
            <div className='home-page-container'>
                <DashboardCard className='welcome' title='Welcome back!'>
                    <GreetingCardContent userName='Sam' deckCount={5} cardCount={120} />
                </DashboardCard>
                <DashboardCard className='study-progress' title='Study Progress'>
                    <StudyProgressCardContent dueCards={42} totalCards={120} />
                </DashboardCard>
                <DashboardCard className='weekly-activity' title='Study Progress'>
                        <p>Weekly activity graph goes here</p>
                </DashboardCard>
                {/* <div className='card-piechart-section'>Pie Chart Goes Here</div> */}
                {/* <div className='heatmap-section'>Heatmap goes here</div> */}
                <div className='quick-actions-section'>
                    <button>Study Now</button>
                    <button>Add New Card</button>
                </div>
            </div>
            
        </div>
    );
}

export default Home;