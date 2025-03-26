import { Project } from '@prisma/client';

export type ProfileCardData = {
  email: string;
  bio: string | null;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  title: string | null;
  projects: Project[];
  interests: string[];
};
