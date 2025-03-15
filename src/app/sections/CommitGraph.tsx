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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commitsPerDay, setCommitsPerDay] = useState<Record<string, number>>({});
    const hasFetchedData = useRef(false);

    const fetchCommitsForRepository = async (owner: string, repo: string) => {
        let pageNumber = 1;
        let hasMorePages = true;

        try {
            while (hasMorePages) {
                const response = await axios.get<Repository[]>(`https://api.github.com/repos/${owner}/${repo}/commits`,
                {
                    params: {
                        author: username,
                        per_page: 100,
                        page: pageNumber,
                    },
                    headers: {
                        Authorization: `${process.env.GITHUB_READ_API_KEY}`,
                    },
                })

                if (response.headers['link'] && response.headers['link'].includes('rel="next"')) {
                    hasMorePages = true;
                    pageNumber += 1;
                } else {
                    hasMorePages = false;
                }

                response.data.forEach((commit: any) => {
                    let commitDate = new Date(commit.commit.author.date).toDateString();
                    setCommitsPerDay((prevCommitsPerDay) => ({
                        ...prevCommitsPerDay,
                        [commitDate]: (prevCommitsPerDay[commitDate] || 0) + 1,
                    }));
                })
            }
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
                response.data.forEach((repo: any) => {
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
            <pre>{JSON.stringify(commitsPerDay, null, 2)}</pre>
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