'use client';
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { IconUser } from "@tabler/icons-react";

interface UserProfilePhotoProps {
    username: string;
}

interface Repository {
    owner: string;
    name: string;
}

const CommitHistory: React.FC<UserProfilePhotoProps> = ({ username }) => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commitsPerDay, setCommitsPerDay] = useState(0);
    const hasFetchedData = useRef(false);

    const fetchCommitsForRepository = async (owner: string, repo: string) => {
        // /repos/{owner}/{repo}/commits
        try {
            const response = await axios.get<Repository[]>(`https://api.github.com/repos/${owner}/${repo}/commits`,
            {
                params: {
                    author: username,
                    per_page: 100, // Note: Does not currently account for more than 100 commits
                },
                headers: {
                    Authorization: `${process.env.GITHUB_READ_API_KEY}`,
                },
            })
            // let prevCommitsPerDay = commitsPerDay;
            setCommitsPerDay(prevCommitsPerDay => prevCommitsPerDay + response.data.length);
            // console.log(`Commits in repo ${repo}: ${response.data.length}`);
        } catch (error: any) {
            setError(error.message);
        }
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            if (hasFetchedData.current)
                return;

            try {
                hasFetchedData.current = true;
                setIsLoading(true);
                setError(null);
                const response = await axios.get<Repository[]>(`https://api.github.com/users/${username}/repos`,
                {
                    headers: {
                        Authorization: `${process.env.GITHUB_READ_API_KEY}`,
                    },
                })
                // setRepositories(response.data.map((repo: any) => { return {owner: repo.owner.login, name: repo.name} }));
                response.data.forEach((repo: any) => {
                    // console.log(`Fetching commits in repo ${repo}`);
                    fetchCommitsForRepository(repo.owner.login, repo.name);
                })
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, [])

    if (isLoading)
        return <p>Loading...</p>

    if (error)
        return <p>Error: {error}</p>

    return (
        <div>
            <span>Total Commits: {commitsPerDay}</span>
            {
                repositories.map((repo: any, index: number) => (
                    <p key={index}>{repo.owner}: {repo.name}</p>
                    // <pre>{JSON.stringify(repo.owner, null, 2)}</pre>
                ))
            }
        </div>
    );
}

const CommitGraph = () => {
    return (
        <div className="gap-2 mt-5 flex flex-col items-center justify-center">
            <CommitHistory username="ymumberson"/>
        </div>
    );
}

export default CommitGraph;