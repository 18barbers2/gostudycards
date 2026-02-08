
export function StudyHeatMap() {
    const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const yLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = 
    [
        [1, 2, 3, 4, 5, 6, 7],
        [2, 3, 4, 5, 6, 7, 8],
    ];


    return (
        <div className='heatmap'>
            <h2>Study Heatmap</h2>
            <p>Heatmap visualization goes here.</p>
        </div>
    );
}

export default StudyHeatMap;