'use client';
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { IconUser } from "@tabler/icons-react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

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

    if (isLoading) {
        return <div className="w-full max-w-screen-sm md:max-w-screen-md animate-pulse"> 
            <CalendarHeatmap
                startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                endDate={new Date()}
                values={[]}
                gutterSize={2}
                classForValue={(value) => {
                    return "fill-gray-100 dark:fill-gray-800";
                }}
            />
        </div>
    }

    if (error)
        return <p>Error: {error}</p>

    return (
        <section className="w-full max-w-screen-sm md:max-w-screen-md">
            <CalendarHeatmap
                startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                endDate={new Date()}
                values={
                    Object.keys(commitsPerDay).map((date) => ({
                        date: date,
                        count: commitsPerDay[date],
                    }))
                }
                gutterSize={2}
                classForValue={(value) => {
                    if (!value || value.count === 0)
                      return "fill-gray-100 dark:fill-gray-800";
                    if (value.count <= 4)
                        return "color-github-1 duration-150 ease-in-out";
                    if (value.count <= 9)
                        return "color-github-2 duration-150 ease-in-out";
                    if (value.count <= 19)
                        return "color-github-3 duration-150 ease-in-out";
                    return "color-github-4 duration-150 ease-in-out";
                  }}
            />
        </section>
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