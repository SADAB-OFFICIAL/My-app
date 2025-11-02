const API_BASE_URL = "https://9333c487-5f4c-4e42-a1a2-6ccbf7ede528-00-2s86v94sa7dce.pike.replit.dev";

export const fetchPosts = async (provider, page = 1) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${provider}?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching posts for ${provider}:`, error);
        return [];
    }
};

export const searchContent = async (provider, query, page = 1) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${provider}?searchQuery=${encodeURIComponent(query)}&page=${page}`);
        if (!response.ok) throw new Error('Failed to search');
        return await response.json();
    } catch (error) {
        console.error(`Error searching on ${provider}:`, error);
        return [];
    }
};

export const fetchMeta = async (provider, link) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/meta/${provider}?link=${encodeURIComponent(link)}`);
        if (!response.ok) throw new Error('Failed to fetch metadata');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching meta for ${provider}:`, error);
        return null;
    }
};

export const fetchStream = async (provider, link, type) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stream/${provider}?link=${encodeURIComponent(link)}&type=${type}`);
        if (!response.ok) throw new Error('Failed to fetch stream');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching stream for ${provider}:`, error);
        return null;
    }
};