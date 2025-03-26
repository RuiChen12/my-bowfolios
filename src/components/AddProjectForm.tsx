/* eslint-disable import/extensions */

'use client';

import React from 'react';
import { Form, Button, Col, Container, Card, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import Multiselect from 'multiselect-react-dropdown';
import { Interest, User } from '@prisma/client';
import { AddProjectSchema, IProject } from '@/lib/validationSchemas';
import { upsertProject } from '@/lib/dbActions';

const AddProjectForm = ({ interests, participants }: { interests: Interest[]; participants: User[] }) => {
  const formPadding = 'py-1';
  const interestNames = interests.map((interest) => interest.name);
  const participantNames = participants.map((participant) => participant.email);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddProjectSchema),
  });

  const onSubmit = async (data: IProject) => {
    const result = await upsertProject(data);
    if (result) {
      swal('Success!', 'Project data saved successfully!', 'success');
      reset();
    } else {
      swal('Error!', 'Failed to save project data!', 'error');
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={formPadding}>
              <Col xs={4}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" {...register('name')} />
                  <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group controlId="picture">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control type="text" {...register('picture')} />
                  <Form.Text className="text-danger">{errors.picture?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group controlId="homepage">
                  <Form.Label>Homepage</Form.Label>
                  <Form.Control type="text" {...register('homepage')} />
                  <Form.Text className="text-danger">{errors.homepage?.message}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Describe the project here." {...register('description')} />
                <Form.Text muted>(optional)</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Col xs={6}>
                <Form.Group controlId="interests">
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
              </Col>
              <Col xs={6}>
                <Form.Group controlId="participants">
                  <Form.Label>Participants</Form.Label>
                  <Controller
                    control={control}
                    name="participants"
                    render={({ field: { value, onChange } }) => (
                      <Multiselect
                        options={participantNames}
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
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProjectForm;
