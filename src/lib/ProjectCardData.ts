import { Profile } from '@prisma/client';

export type ProjectCardData = {
  name: string;
  homepage: string | null;
  picture: string | null;
  description: string | null;
  interests: string[];
  participants: Profile[];
};
