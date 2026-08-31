import Card from "../components/Card";
import content from "@/content/playground.json";

export default function Playground() {
    return (
      <div className="sm:px-16 xl:px-48">
        <h1 className="text-center mb-4 text-3xl font-extrabold tracking-light leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          {content.title}
        </h1>
        <p className="mx-auto mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 max-w-lg">
          {content.description}
        </p>
        <div className="flex flex-col items-center gap-2">
            {
              Object.entries(content.projects).map(([slug, project]) => (
                <Card
                  key={slug}
                  title={project.title}
                  href={`/playground/${slug}`}
                  hrefText="See project"
                  description={project.summary ?? project.description}
                  topics={project.topics}
                />
              ))
            }
        </div>
      </div>
    );
}