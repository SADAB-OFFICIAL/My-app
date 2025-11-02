import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchMeta, fetchStream } from '../api';

const DetailPage = () => {
    const { provider } = useParams();
    const location = useLocation();
    const link = new URLSearchParams(location.search).get('link');
    
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [streamUrl, setStreamUrl] = useState('');

    useEffect(() => {
        if (!provider || !link) return;

        const loadMeta = async () => {
            setLoading(true);
            const data = await fetchMeta(provider, link);
            setMeta(data);
            setLoading(false);
        };
        loadMeta();
    }, [provider, link]);

    const handlePlayClick = async (streamLink, type) => {
        alert("Streaming functionality is the next step! Fetching stream link now...");
        const streamData = await fetchStream(provider, streamLink, type);
        if (streamData && streamData.length > 0) {
            console.log("Stream URL:", streamData[0].link);
            setStreamUrl(streamData[0].link);
            // In a real app, you would open this URL in a video player
            alert(`Got stream URL: ${streamData[0].link}`);
            window.open(streamData[0].link, '_blank');
        } else {
            alert("Could not fetch stream link.");
        }
    };

    if (loading) return <div className="loading-spinner">Loading details...</div>;
    if (!meta) return <div className="error-message">Could not load details.</div>;

    return (
        <div className="detail-page">
            <div className="detail-content">
                <div className="detail-poster">
                    <img src={meta.image} alt={meta.title} />
                </div>
                <div className="detail-info">
                    <h1>{meta.title}</h1>
                    <p>{meta.synopsis}</p>
                    {/* Add more info like rating, tags etc. if available */}
                </div>
            </div>

            <div className="links-section">
                <h2>Seasons / Episodes / Links</h2>
                {meta.linkList && meta.linkList.map((item, index) => (
                    <div key={index} className="link-item">
                        <span>{item.title}</span>
                        {/* Logic to handle play button */}
                        <button 
                            className="play-button"
                            onClick={() => handlePlayClick(item.directLinks[0].link, meta.type)}
                        >
                            Play
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailPage;