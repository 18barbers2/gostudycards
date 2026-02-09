import NavBar from "../NavBar";
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="app-container">
            <NavBar/>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}