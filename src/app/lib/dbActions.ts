'use server';

import { compare, hash } from 'bcrypt';
import { prisma } from './prisma';

export async function getUser(email: string) {
  // console.log(`getUser data: ${email}`);
  // eslint-disable-next-line @typescript-eslint/return-await
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function checkPassword(credentials: { email: string; password: string }) {
  // console.log(`checkPassword data: ${JSON.stringify(credentials, null, 2)}`);
  const user = await getUser(credentials.email);
  if (!user) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/return-await
  return await compare(credentials.password, user.password);
}

export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

export async function createProject(project: any) {
  // console.log(`createProject data: ${JSON.stringify(project, null, 2)}`);
  const dbProject = await prisma.project.create({
    data: project,
  });
  return dbProject;
}

export async function upsertProject(project: any) {
  // console.log(`upsertProject data: ${JSON.stringify(project, null, 2)}`);
  const dbProject = await prisma.project.upsert({
    where: { name: project.name },
    update: {},
    create: {
      name: project.name,
      description: project.description,
      homepage: project.homepage,
      picture: project.picture,
    },
  });
  project.interests.forEach(async (intere: string) => {
    const dbInterest = await prisma.interest.findUnique({
      where: { name: intere },
    });
    // console.log(`${dbProject.name} ${dbInterest!.name}`);
    const dbProjectInterest = await prisma.projectInterest.findMany({
      where: { projectId: dbProject.id, interestId: dbInterest!.id },
    });
    if (dbProjectInterest.length === 0) {
      await prisma.projectInterest.create({
        data: {
          projectId: dbProject.id,
          interestId: dbInterest!.id,
        },
      });
    }
  });
  project.participants.forEach(async (email: string) => {
    const dbProfile = await prisma.profile.findUnique({
      where: { email },
    });
    const dbProfileProject = await prisma.profileProject.findMany({
      where: { projectId: dbProject.id, profileId: dbProfile!.id },
    });
    if (dbProfileProject.length === 0) {
      await prisma.profileProject.create({
        data: {
          projectId: dbProject.id,
          profileId: dbProfile!.id,
        },
      });
    }
  });
  return dbProject;
}
