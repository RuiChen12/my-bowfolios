import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  for (const project of config.defaultProjects) {
    console.log(`  Creating/Updating project ${project.name}`);

    for (const interest of project.interests) {
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
    }

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

    for (const intere of project.interests) {
      const dbInterest = await prisma.interest.findUnique({
        where: { name: intere },
      });

      if (!dbInterest) {
        console.error(`Interest "${intere}" not found for project "${project.name}"`);
        continue;
      }

      const dbProjectInterest = await prisma.projectInterest.findMany({
        where: { projectId: dbProject.id, interestId: dbInterest.id },
      });

      if (dbProjectInterest.length === 0) {
        await prisma.projectInterest.create({
          data: {
            projectId: dbProject.id,
            interestId: dbInterest.id,
          },
        });
      }
    }
  }

  const password = await hash('foo', 10);

  for (const profile of config.defaultProfiles) {
    console.log(`  Creating/Updating profile ${profile.email}`);

    for (const interest of profile.interests) {
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
    }

    await prisma.user.upsert({
      where: { email: profile.email },
      update: {},
      create: {
        email: profile.email,
        password,
      },
    });

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

    for (const interest of profile.interests) {
      const dbInterest = await prisma.interest.findUnique({
        where: { name: interest },
      });

      if (!dbInterest) {
        console.error(`Interest "${interest}" not found for profile "${profile.email}"`);
        continue;
      }

      const dbProfileInterest = await prisma.profileInterest.findMany({
        where: {
          profileId: dbProfile.id,
          interestId: dbInterest.id,
        },
      });

      if (dbProfileInterest.length === 0) {
        await prisma.profileInterest.create({
          data: {
            profileId: dbProfile.id,
            interestId: dbInterest.id,
          },
        });
      }
    }

    for (const project of profile.projects) {
      const dbProject = await prisma.project.findFirst({
        where: { name: project },
      });

      if (!dbProject) {
        console.error(`Project "${project}" not found for profile "${profile.email}"`);
        continue;
      }

      const dbProfileProject = await prisma.profileProject.findMany({
        where: {
          profileId: dbProfile.id,
          projectId: dbProject.id,
        },
      });

      if (dbProfileProject.length === 0) {
        await prisma.profileProject.create({
          data: {
            profileId: dbProfile.id,
            projectId: dbProject.id,
          },
        });
      }
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
