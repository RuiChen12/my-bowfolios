/* eslint-disable import/extensions */
import { Project } from '@prisma/client';
import ProjectCard from '@/components/ProjectCard';
import { prisma } from '@/lib/prisma';
import { ProjectCardData } from '@/lib/ProjectCardData';

const ProjectCardHelper = async ({ project }: { project: Project }) => {
  const projectInterests = await prisma.projectInterest.findMany({
    where: { projectId: project.id },
  });
  const interests = await prisma.interest.findMany({
    where: { id: { in: projectInterests.map((projectInterest) => projectInterest.interestId) } },
  });
  const interestNames = interests.map((interest) => interest.name);
  const projectParticipants = await prisma.profileProject.findMany({
    where: { projectId: project.id },
  });
  const participants = projectParticipants.map((projectParticipant) => projectParticipant.profileId);
  const profileParticipants = await prisma.profile.findMany({
    where: { id: { in: participants } },
  });
  const projectData: ProjectCardData = {
    name: project.name,
    homepage: project.homepage,
    picture: project.picture,
    description: project.description,
    interests: interestNames,
    participants: profileParticipants,
  };
  return <ProjectCard project={projectData} />;
};

export default ProjectCardHelper;
