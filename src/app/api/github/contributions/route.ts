import { NextResponse } from "next/server";
import axios from "axios";

export const revalidate = 3600; // 1 hour

export async function GET() {
    const username = "ymumberson";

    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);

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

    try {
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

        return NextResponse.json(
            response.data.data.user.contributionsCollection.contributionCalendar
        );

    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}