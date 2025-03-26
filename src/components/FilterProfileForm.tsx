/* eslint-disable import/extensions */

'use client';

import React from 'react';
import { Form, Button, Card, Container, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import Multiselect from 'multiselect-react-dropdown';
import { Interest, Profile, ProfileInterest, ProfileProject, Project } from '@prisma/client';
import { useStickyState } from '@/lib/StickyState';
import { ProfileCardData } from '@/lib/ProfileCardData';
import ProfileCard from './ProfileCard';

const FilterProfileForm = ({
  interests,
  profiles,
  profileInterests,
  profileProjects,
  projects,
}: {
  interests: Interest[];
  profiles: Profile[];
  profileInterests: ProfileInterest[];
  profileProjects: ProfileProject[];
  projects: Project[];
}) => {
  const [selectedInterests, setSelectedInterests] = useStickyState('selectedInterests', []);
  const interestNames = interests.map((interest) => interest.name);
  const selectedInterestIds = interests
    .filter((interest) => selectedInterests.includes(interest.name))
    .map((interest) => interest.id);
  const filteredProfileIds = profileInterests
    .filter((profileInterest) => selectedInterestIds.includes(profileInterest.interestId))
    .map((profileInterest) => profileInterest.profileId);
  const filteredProfiles = profiles.filter((profile) => filteredProfileIds.includes(profile.id));

  const { handleSubmit, control } = useForm({});

  const onSubmit = (data: { [x: string]: any }) => {
    setSelectedInterests(data.interests);
  };

  const getProfileInterestNames = (profileId: number): string[] => {
    const profileInterestIds = profileInterests
      .filter((profileInterest) => profileInterest.profileId === profileId)
      .map((profileInterest) => profileInterest.interestId);
    const profileInterestNames = interests
      .filter((interest) => profileInterestIds.includes(interest.id))
      .map((interest) => interest.name);
    return profileInterestNames;
  };

  const getProfileProjects = (profileId: number): Project[] => {
    const profileProjectIds = profileProjects
      .filter((profileProject) => profileProject.profileId === profileId)
      .map((profileProject) => profileProject.projectId);
    const filteredProjects = projects.filter((project) => profileProjectIds.includes(project.id));
    return filteredProjects;
  };

  const makeProfileData = (profile: Profile): ProfileCardData => {
    const profileInterestNames = getProfileInterestNames(profile.id);
    const profProjects = getProfileProjects(profile.id);
    const retVal = {
      email: profile.email,
      bio: profile.bio,
      firstName: profile.firstName,
      lastName: profile.lastName,
      picture: profile.picture,
      title: profile.title,
      projects: profProjects,
      interests: profileInterestNames,
    };
    return retVal;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Card.Body>
            <Form.Group>
              <Form.Label>Interests</Form.Label>
              <Controller
                control={control}
                name="interests"
                render={({ field: { value, onChange } }) => (
                  <Multiselect
                    options={interestNames}
                    isObject={false}
                    showCheckbox
                    hidePlaceholder
                    closeOnSelect={false}
                    onSelect={onChange}
                    onRemove={onChange}
                    selectedValues={value}
                  />
                )}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button type="submit">Submit</Button>
          </Card.Footer>
        </Card>
      </Form>

      <Row xs={1} md={2} lg={4} className="g-2" style={{ paddingTop: '10px' }}>
        {filteredProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={makeProfileData(profile)} />
        ))}
      </Row>
    </Container>
  );
};

export default FilterProfileForm;
