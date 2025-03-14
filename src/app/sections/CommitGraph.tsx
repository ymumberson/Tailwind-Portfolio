'use client';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { IconUser } from "@tabler/icons-react";

interface UserProfilePhotoProps {
    username: string;
}

const UserProfilePhoto: React.FC<UserProfilePhotoProps> = ({ username }) => {
    const [githubData, setGithubData] = useState<{[key: string]: string}>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(`https://api.github.com/users/${username}`,
                {
                    headers: {
                        Authorization: `${process.env.GITHUB_READ_API_KEY}`,
                    },
                })
                setGithubData(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, [])

    if (isLoading)
        return <IconUser className="p-6 rounded-full w-40 h-auto animate-pulse border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"/>

    if (error)
        return <p>Error: {error}</p>

    return (
        <img className="rounded-full w-40 h-auto" src={githubData["avatar_url"]}/>
    );
}

const CommitGraph = () => {
    return (
        <div className="gap-2 mt-5 flex flex-col items-center justify-center">
            <UserProfilePhoto username="ymumberson"/>
        </div>
    );
}

export default CommitGraph;