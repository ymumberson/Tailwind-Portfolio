const GITHUB_API = "https://api.github.com/graphql";

type Repository = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
  } | null;
  owner: {
    login: string;
  };
  topics: string[];
};

type PinnedProjectsResponse = {
  data: {
    user: {
      pinnedItems: {
        nodes: Repository[];
      };
    };
  };
};

const pinnedProjectsQuery = `
  query PinnedProjects($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount

            primaryLanguage {
              name
            }

            repositoryTopics(first: 20) {
              nodes {
                topic {
                  name
                }
              }
            }

            owner {
              login
            }
          }
        }
      }
    }
  }
`;

export async function getPinnedProjects(): Promise<Repository[]> {
  const response = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_READ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: pinnedProjectsQuery,
      variables: {
        username: process.env.GITHUB_USERNAME,
      },
    }),
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub projects");
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message ?? "GitHub API error");
  }

  return result.data.user.pinnedItems.nodes.map((project: any) => ({
    ...project,
    topics: project.repositoryTopics.nodes.map(
      (node: { topic: { name: string } }) => node.topic.name
    ),
  }));
}

export async function getProject(slug: string) {
  const projects = await getPinnedProjects();

  const project = projects.find(
    (project) => project.name.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return null;
  }

  const readmeResponse = await fetch(
    `https://raw.githubusercontent.com/${project.owner.login}/${project.name}/HEAD/README.md`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const readme = readmeResponse.ok
    ? await readmeResponse.text()
    : "# README not found";

  return {
    ...project,
    slug: project.name,
    readme,
  };
}