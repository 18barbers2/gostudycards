import '../css/NavBar.css';

export default function NavBar() {


    return (
        <nav className='navbar'>
            <ul>
                <a href='#'>
                    <span className="material-symbols-outlined">
                    dataset
                    </span>
                </a>
                <span className="material-symbols-outlined">
                    clear_all
                </span>
                <span className="material-symbols-outlined">
                    cards_stack
                </span>
                <span className="material-symbols-outlined">
                    contacts_product
                </span>
            </ul>
            
        </nav>
    );
}