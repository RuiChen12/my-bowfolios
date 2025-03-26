import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  config.defaultProjects.forEach(async (project) => {
    console.log(`  Creating/Updating project ${project.name}`);
    project.interests.forEach(async (interest) => {
      // console.log(`Project ${project.name} ${interest}`);
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
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
      project.interests.forEach(async (intere) => {
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
    });
  });
  const password = await hash('foo', 10);
  config.defaultProfiles.forEach(async (profile) => {
    console.log(`  Creating/Updating profile ${profile.email}`);
    // upsert interests from the profile
    profile.interests.forEach(async (interest) => {
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
    });
    // Upsert/Create the user so they can login.
    await prisma.user.upsert({
      where: { email: profile.email },
      update: {},
      create: {
        email: profile.email,
        password,
      },
    });
    // Upsert/Create the profile.
    const dbProfile = await prisma.profile.upsert({
      where: { email: profile.email },
      update: {},
      create: {
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        picture: profile.picture,
      },
    });
    profile.interests.forEach(async (interest) => {
      const dbInterest = await prisma.interest.findUnique({
        where: { name: interest },
      });
      // console.log(`${dbProfile.firstName} ${dbInterest!.name}`);
      const dbProfileInterest = await prisma.profileInterest.findMany({
        where: { profileId: dbProfile.id, interestId: dbInterest!.id },
      });
      if (dbProfileInterest.length === 0) {
        // Create the profile interest
        await prisma.profileInterest.create({
          data: {
            profileId: dbProfile.id,
            interestId: dbInterest!.id,
          },
        });
      }
    });
    // Upsert/Create the profile projects
    profile.projects.forEach(async (project) => {
      // console.log(`Project member ${dbProfile.firstName} ${project}`);
      const dbProject = await prisma.project.findFirst({
        where: { name: project },
      });
      const dbProfileProject = await prisma.profileProject.findMany({
        where: { profileId: dbProfile.id, projectId: dbProject!.id },
      });
      if (dbProfileProject.length === 0 && dbProject !== null) {
        // Create the profile project
        await prisma.profileProject.create({
          data: {
            profileId: dbProfile.id,
            projectId: dbProject.id,
          },
        });
      }
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
