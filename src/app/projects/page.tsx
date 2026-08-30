import Card from "../components/Card";
import { IconBrandGithub } from "@tabler/icons-react";
import { getPinnedProjects } from "@/lib/github";


export default async function Projects() {
    const projects = await getPinnedProjects();

    return (
      <div className="sm:px-16 xl:px-48">
        <h1 className="text-center mb-4 text-3xl font-extrabold tracking-light leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Projects
        </h1>
        <p className="mx-auto text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 max-w-lg">
          These are larger more complete projects, but are mostly non-interactive. This list is a subset fetched from my GitHub, but you can click the button below to see all of my projects.
        </p>
        <div className="w-full flex justify-center my-4">
            <a href="https://github.com/ymumberson" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F]/60 mb-2 gap-1">
                <IconBrandGithub size={20}/>
                Github
            </a>
        </div>
        <div className="flex flex-col items-center gap-2">
            {
                projects.map((project: any) => (
                    <Card key={project.url} title={project.name} href={`/projects/${project.name}`} hrefText="See project" description={project.description}/>
                ))
            }
        </div>
      </div>
    );
}