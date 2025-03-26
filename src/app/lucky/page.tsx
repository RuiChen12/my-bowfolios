import { Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import ProfileCardHelper from '../profiles/ProfileCardHelper';

const LuckyPage = async () => {
  const profiles = await prisma.profile.findMany();
  const luckyProfile = profiles[Math.floor(Math.random() * profiles.length)];

  return (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <h1>I’m Feeling Lucky</h1>
      <Row xs={1} md={2} lg={4} className="g-2">
        {luckyProfile && <ProfileCardHelper key={luckyProfile.id} profile={luckyProfile} />}
      </Row>
    </Container>
  );
};

export default LuckyPage;
