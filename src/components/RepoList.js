// src/components/RepoList.js
import React from 'react';

function RepoList({ repos, onSelectRepo }) {
    return (
        <div className="repo-list">
            <h2>Repositories</h2>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id} onClick={() => onSelectRepo(repo)}>
                        {repo.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepoList;
