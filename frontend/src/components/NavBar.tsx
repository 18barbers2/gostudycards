import '../css/NavBar.css';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function NavBar() {
    const location = useLocation();

    if (location.pathname === '/login') return null;
    
    const [collapsed, setCollapsed] = useState(
        () => localStorage.getItem('navCollapsed') === 'true'
    );

    const toggleCollapsed = () => {
        setCollapsed(prev => {
            const next = !prev;
            localStorage.setItem('navCollapsed', String(next));
            return next;
        });
    };

    type NavItem = {
        to: string;
        icon: string;
        label: string;
    }

    const navItems: NavItem[] = [
        { to: '/', icon: 'home', label: 'Home' },
        { to: '/add-card', icon: 'add_card', label: 'Add Card' },
        { to: '/card-builder', icon: 'design_services', label: 'Card Builder' },
        { to: '/study', icon: 'school', label: 'Study' },
        { to: '/decks', icon: 'stacks', label: 'Decks' },
    ];

    return (
        <nav className={`navbar${collapsed ? ' navbar--collapsed' : ''}`}>
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
            <div className="navbar-footer">
                <button className="navbar-toggle" onClick={toggleCollapsed}>
                    <span className="material-symbols-outlined">
                        {collapsed ? 'chevron_right' : 'chevron_left'}
                    </span>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
