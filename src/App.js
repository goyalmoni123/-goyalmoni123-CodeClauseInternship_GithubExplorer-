// src/App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import UserProfile from './components/UserProfile';
import './styles.css';

function App() {
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [username, setUsername] = useState('');

    const handleSearch = async (query) => {
        if (!query) return;

        // Check if the query is a user profile
        const userResponse = await fetch(`https://api.github.com/users/${query}`);
        if (userResponse.status === 200) {
            setUsername(query);
            setRepos([]);
            setSelectedRepo(null);
            return;
        }

        // If not a user, treat the query as a repo search
        const repoResponse = await fetch(`https://api.github.com/search/repositories?q=${query}`);
        const data = await repoResponse.json();
        setRepos(data.items || []);
        setSelectedRepo(null);
        setUsername('');
    };

    return (
        <div className="App">
            <h1>GitHub Explorer</h1>
            <SearchBar onSearch={handleSearch} />
            {username ? (
                <UserProfile username={username} />
            ) : (
                <>
                    <RepoList repos={repos} onSelectRepo={setSelectedRepo} />
                    <RepoDetails repo={selectedRepo} />
                </>
            )}
        </div>
    );
}

export default App;
