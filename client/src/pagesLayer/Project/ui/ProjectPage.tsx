import { TagList, staticTags } from "@/entities/Tag";
import { Container, Headline } from "@/shared/ui";
import { LinkedProjects } from "@/widgets/LinkedProjects";
import { Header } from "@/widgets/Header";
import { ProjectDescription } from "@/widgets/ProjectDescription";
import { ProjectHero } from "@/widgets/ProjectHero";
import { ProjectRequirements } from "@/widgets/ProjectRequirements";
import { ProjectStatus } from "@/widgets/ProjectStatus";
import { Supervisors } from "@/widgets/Supervisors";
import { FC } from "react";
import { Footer } from "@/widgets/Footer";
import { ProjectTeam } from "@/widgets/ProjectTeam";
import { fetchProjectDetailed } from "@/composites/ProjectDetailed/api/fetchProjectDetailed";
import ProjectTeamList from "@/widgets/ProjectTeam/ui/ProjectTeamList";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateProjectPageMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const projectData = await fetchProjectDetailed(+params.slug);

  if (!projectData) return {};

  return {
    title: projectData.project.name + " - Реестр клинической практики СПбГУ",
    description:
      "Платформа для размещения образовательных проектов для выполнения студентами СПбГУ. Наш сервис предоставляет возможность совместной работы над учебными заданиями, расширения знаний и навыков, а также создания перспектив для будущей карьеры.",
  };
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const ProjectPage: FC<ProjectPageProps> = async ({ params }) => {
  const projectData = await fetchProjectDetailed(+params.slug);

  if (!projectData) {
    redirect("/");
  }

  return (
    <>
      <Head>
        <title>
          {projectData.project.name} - Реестр клинической практики СПбГУ
        </title>
        <meta name="description" content={projectData.project.description} />
      </Head>
      <Container>
        <div className="pt-6" />
        <Header text="dark" />
        <div className="pt-2" />
      </Container>
      <ProjectHero project={projectData.project} />
      <Container className="relative mt-[-160px] lg:mt-0">
        <ProjectStatus
          project={projectData.project}
          users={projectData.users}
          className="bottom-0 right-0 top-0 lg:absolute lg:w-[calc(50%-3rem)] lg:-translate-y-[calc(50%-0.75rem)] xl:w-[calc(50%-7rem)]"
        />
        <div className="pt-5" />
        <Supervisors
          project={projectData.project}
          className="lg:w-[calc(50%+1rem)] xl:w-[calc(50%+3rem)]"
        />
      </Container>
      <div className="pt-10" />
      <Container>
        <TagList tags={projectData.tags} />
        <div className="pt-20" />
        <ProjectDescription project={projectData.project} />
        <div className="pt-24" />
        {projectData.teams &&
          projectData.teams.length > 0 &&
          projectData.members &&
          projectData.users && (
            <ProjectTeamList
              teams={projectData.teams}
              members={projectData.members}
              users={projectData.users}
            />
          )}
        <div className="pt-24" />
        <ProjectRequirements project={projectData.project} />
        <div className="pt-16" />
      </Container>
      <Headline>
        <Container>
          <h2 className="text-2xl font-bold uppercase">Связанные проекты</h2>
        </Container>
      </Headline>
      <div className="pt-8" />
      <Container>
        <LinkedProjects />
      </Container>
      <div className="pt-32" />
      <Footer />
    </>
  );
};

export default ProjectPage;
