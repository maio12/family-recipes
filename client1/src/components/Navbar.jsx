import {Searchbar} from './Searchbar';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Family recipes</h1>
                <ul className="navbar__group">
                    <li className="navbar__item"><Searchbar /></li>
                    <li className="navbar__item">Signup</li>
                </ul>
        </nav>
    )
}