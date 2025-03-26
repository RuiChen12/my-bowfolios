/* eslint-disable import/extensions */
import { Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import ProjectCardHelper from './ProjectCardHelper';

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();
  projects.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <Container id={PageIDs.projectsPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {projects.map((project) => (
          <ProjectCardHelper key={project.id} project={project} />
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsPage;
