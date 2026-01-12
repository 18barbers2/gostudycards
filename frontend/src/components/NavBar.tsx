import '../css/NavBar.css';
import { Link } from "react-router-dom";

export function NavBar() {


    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to={'/'}>
                        <span className="material-symbols-outlined">dataset</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/add-card'}>
                        <span className="material-symbols-outlined">timer</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/card-builder'}>
                        <span className="material-symbols-outlined">cards_stack</span>
                    </Link>
                </li>
                {/* <li>
                    <Link to={'/'}>
                        <span className="material-symbols-outlined">school</span>
                    </Link>
                </li> */}
                <li>
                    <Link to={'/decks'}>
                        <span className="material-symbols-outlined">stacks</span>
                    </Link>
                </li>

            </ul>
        </nav>
    );
}

export default NavBar;