/* eslint-disable import/extensions */
import React from 'react';
import { getServerSession } from 'next-auth';
import { Profile, Interest, Project } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { authOptions } from '../api/auth/[...nextauth]/route';
import HomePage from './HomePage';

const HomePageHelper = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const email = (session && session.user && session.user.email) || '';
  const profile = await prisma.profile.findUnique({
    where: { email },
  });
  const interests = await prisma.interest.findMany();
  // const allInterestNames = interests.map((interest) => interest.name);
  const projects = await prisma.project.findMany();
  // const allProjectNames = projects.map((project) => project.name);
  const profileInterests = await prisma.profileInterest.findMany({
    where: { profileId: profile!.id },
  });
  const proInterests: Interest[] = profileInterests.map((profileInterest) => {
    const i = interests.find((interest) => interest.id === profileInterest.interestId);
    return i as Interest;
  });
  const profileProjects = await prisma.profileProject.findMany({
    where: { profileId: profile!.id },
  });
  const proProjects: Project[] = profileProjects.map((profileProject) => {
    const p = projects.find((project) => project.id === profileProject.projectId);
    return p as Project;
  });
  return (
    <HomePage
      profile={profile as Profile}
      interests={interests}
      projects={projects}
      profileInterests={proInterests}
      profileProjects={proProjects}
    />
  );
};

export default HomePageHelper;
