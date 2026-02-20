import '../css/NavBar.css';
import { Link, useLocation } from "react-router-dom";

export function NavBar() {
    const location = useLocation()

    type NavItem = {
        to: string;
        icon: string;
        label: string;
    }

    {/** Store the information for each navitem */}
    const navItems: NavItem[] = [
        { to: '/', icon: 'home', label: 'Home' },
        { to: '/add-card', icon: 'add_card', label: 'Add Card' },
        { to: '/card-builder', icon: 'cards_stack', label: 'Card Builder' },
        { to: '/study', icon: 'school', label: 'Study' },
        { to: '/decks', icon: 'stacks', label: 'Decks' },
    ]

    return (
        <nav className='navbar'>
            <ul>
                {navItems.map((item: NavItem) => (
                    <li key={item.to} className={location.pathname === item.to ? 'active' : ''}>
                        <Link to={item.to}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;