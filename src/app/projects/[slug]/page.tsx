import { notFound } from "next/navigation";
import { getProject } from "@/lib/github";
import Markdown from "@/app/components/Markdown";
import Project from "@/app/components/Project";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <Project name={project.name} description={project.description ?? ""}>
            <div className="flex flex-col justify-center">
                <Markdown>{project.readme}</Markdown>
            </div>
        </Project>
    );
}