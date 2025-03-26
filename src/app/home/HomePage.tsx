/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import { Profile, Interest, Project } from '@prisma/client';
import ProfileForm from '@/components/ProfileForm';

const HomePage = ({
  profile,
  interests,
  projects,
  profileInterests,
  profileProjects,
}: {
  profile: Profile;
  interests: Interest[];
  projects: Project[];
  profileInterests: Interest[];
  profileProjects: Project[];
}) => (
  <Container id={PageIDs.homePage} style={pageStyle}>
    <Col>
      <h2 className="text-center">Your Profile</h2>
      <ProfileForm
        profile={profile}
        interests={interests}
        projects={projects}
        profileInterests={profileInterests}
        profileProjects={profileProjects}
      />
    </Col>
  </Container>
);

export default HomePage;
