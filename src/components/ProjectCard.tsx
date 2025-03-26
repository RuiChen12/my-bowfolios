/* eslint-disable import/extensions */

'use client';

import { Badge, Card, Col } from 'react-bootstrap';
import TooltipImage from '@/components/TooltipImage';
import { ProjectCardData } from '@/lib/ProjectCardData';

const ProjectCard = ({ project }: { project: ProjectCardData }) => (
  <Col>
    <Card className="h-100">
      <Card.Body>
        <Card.Img src={project.picture ? project.picture : ''} width={50} />
        <Card.Title style={{ marginTop: '0px' }}>{project.name}</Card.Title>
        <Card.Text>{project.description}</Card.Text>
      </Card.Body>
      <Card.Body>
        {project.interests.map((interest) => (
          <Badge className="mx-1" key={interest} bg="info">
            {interest}
          </Badge>
        ))}
      </Card.Body>
      <Card.Body>
        {project.participants.map((p) => (
          <TooltipImage
            className="mx-1"
            key={p.email}
            name={p.email}
            roundedCircle
            src={p.picture ? p.picture : ''}
            width={50}
          />
        ))}
      </Card.Body>
    </Card>
  </Col>
);

export default ProjectCard;
