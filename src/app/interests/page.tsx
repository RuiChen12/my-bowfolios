import { prisma } from '@/lib/prisma';
import { Container, Row } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import InterestCardHelper from './InterestCardHelper';

const InterestsPage = async () => {
  const interests = await prisma.interest.findMany();
  interests.sort((a, b) => a.name.localeCompare(b.name));
  console.log(interests);
  return (
    <Container id={PageIDs.interestsPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {interests.map((interest) => (
          <InterestCardHelper key={interest.id} interest={interest} />
        ))}
      </Row>
    </Container>
  );
};

export default InterestsPage;
