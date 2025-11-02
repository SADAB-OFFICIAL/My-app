import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchContent } from '../api';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const provider = 'multi'; // Default provider for search

    useEffect(() => {
        if (!query) return;

        const performSearch = async () => {
            setLoading(true);
            const data = await searchContent(provider, query);
            setResults(data);
            setLoading(false);
        };
        performSearch();
    }, [query]);

    if (loading) return <div className="loading-spinner">Searching...</div>;

    return (
        <div>
            <h1 className="page-title">Search Results for: "{query}"</h1>
            <div className="movie-grid">
                {results.length > 0 ? (
                    results.map((item) => (
                        <MovieCard
                            key={item.link}
                            provider={provider}
                            title={item.title}
                            imageUrl={item.image}
                            link={item.link}
                        />
                    ))
                ) : (
                    <p>No results found for your search.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;