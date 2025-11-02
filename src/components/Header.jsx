import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm.trim()}`);
            setSearchTerm('');
        }
    };

    return (
        <header className="header">
            <Link to="/" className="logo">VEGA</Link>
            <form onSubmit={handleSearch} className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for movies, shows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </header>
    );
};

export default Header;
