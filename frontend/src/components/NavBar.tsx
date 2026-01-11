import '../css/NavBar.css';

export default function NavBar() {


    return (
        <nav className='navbar'>
            <ul>
                <a href='#'>
                    <span className="material-symbols-outlined">dataset</span>
                </a>
                <a href="#">
                    <span className="material-symbols-outlined">timer</span>
                </a>
                <a href='#'>
                    <span className="material-symbols-outlined">cards_stack</span>
                </a>
                <a href='#'>
                    <span className="material-symbols-outlined">school</span>
                </a>
            </ul>
        </nav>
    );
}