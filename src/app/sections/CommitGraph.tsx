'use client';
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { IconUser } from "@tabler/icons-react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface UserProfilePhotoProps {
    username: string;
}

interface ContributionDay {
    date: string;
    contributionCount: number;
}

const CommitHistory: React.FC<UserProfilePhotoProps> = ({ username }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commitsPerDay, setCommitsPerDay] = useState<ContributionDay[]>([]);
    const hasFetchedData = useRef(false);
    let max = 1;

    useEffect(() => {
        const fetchContributions = async () => {
            if (hasFetchedData.current)
                return;

            hasFetchedData.current = true;

            try {
                setIsLoading(true);

                const from = new Date();
                from.setFullYear(from.getFullYear() -1);

                const query = `
                    query($username: String!, $from: DateTime!, $to: DateTime!) {
                        user(login: $username) {
                            contributionsCollection(from: $from, to: $to) {
                                contributionCalendar {
                                    weeks {
                                        contributionDays {
                                            date
                                            contributionCount
                                        }
                                    }
                                }
                            }
                        }
                    }
                `;

                const response = await axios.post(
                    "https://api.github.com/graphql",
                    {
                        query,
                        variables: {
                            username,
                            from: from.toISOString(),
                            to: new Date().toISOString(),
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.GITHUB_READ_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.errors?.length) {
                    setError(response.data.errors[0].message);
                    return;
                }

                const weeks = response.data.data.user.contributionsCollection.contributionCalendar.weeks;

                const contributionValues = weeks.flatMap((week: any) => 
                    week.contributionDays.map((day: {date: string, contributionCount: number}) => ({
                        date: day.date,
                        count: day.contributionCount,
                    }))
                );

                setCommitsPerDay(contributionValues);

                const counts = contributionValues.map((v: { count: any; }) => v.count).filter((c: number) => c > 0);
                max = Math.max(...counts);
            } catch (error: any) {
                if (error.response?.data?.errors) {
                    setError(error.response.data.errors[0].message);
                } else {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchContributions();
    }, [username])

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
                values={commitsPerDay}
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