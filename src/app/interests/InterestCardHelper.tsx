import { Interest } from '@prisma/client';
// eslint-disable-next-line import/extensions
import { prisma } from '@/lib/prisma';
import InterestCard from './InterestCard';

const InterestCardHelper = async ({ interest }: { interest: Interest }) => {
  const profileInterests = await prisma.profileInterest.findMany({
    where: { interestId: interest.id },
  });
  // console.log('profileInterests: ', profileInterests);
  const profiles = await prisma.profile.findMany({
    where: { id: { in: profileInterests.map((profileInterest) => profileInterest.profileId) } },
  });
  // console.log('profiles: ', profiles);
  const profileImages = profiles.map((profile) => ({ name: profile.email, picture: profile.picture }));
  // console.log('profileImages: ', profileImages);
  const projectInterests = await prisma.projectInterest.findMany({
    where: { interestId: interest.id },
  });
  const projects = await prisma.project.findMany({
    where: { id: { in: projectInterests.map((projectInterest) => projectInterest.projectId) } },
  });
  // console.log('projects: ', projects);
  const projectImages = projects.map((project) => ({ name: project.name, picture: project.picture }));
  // console.log('projectImages: ', projectImages);
  const interestData = {
    name: interest.name,
    profilePictures: profileImages,
    projectPictures: projectImages,
  };
  return <InterestCard interest={interestData} />;
};

export default InterestCardHelper;
