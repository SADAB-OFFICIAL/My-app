import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const provider = 'vega'; // Default provider for homepage

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const data = await fetchPosts(provider);
            setPosts(data);
            setLoading(false);
        };
        loadPosts();
    }, []);

    if (loading) return <div className="loading-spinner">Loading...</div>;

    return (
        <div>
            <h1 className="page-title">Trending Content</h1>
            <div className="movie-grid">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <MovieCard
                            key={post.link}
                            provider={provider}
                            title={post.title}
                            imageUrl={post.image}
                            link={post.link}
                        />
                    ))
                ) : (
                    <p>No content found.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
