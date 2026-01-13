import '../css/Home.css';

export function Home() {
    return (
        <div className='home-page'>
            <h1>Welcome to GoStudyCards!</h1>
            <p>This is the home page. Use the navigation bar to explore the app.</p>
            <div className='home-page-container'>
                <div className='welcome-section'>Hi, Sam</div>
                <div className='cards-due-section'> 42 Cards Due</div>
                <div className='card-piechart-section'>Pie Chart Goes Here</div>
                <div className='heatmap-section'>Heatmap goes here</div>
                <div className='quick-actions-section'>
                    <button>Study Now</button>
                    <button>Add New Card</button>
                </div>
            </div>
            
        </div>
    );
}

export default Home;