import { Container, Row, Col, Image } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';

export default function Home() {
  return (
    <main>
      <div id={PageIDs.landingPage}>
        <div className="landing-green-background">
          <Container className="text-center">
            <h1
              style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}
            >
              Welcome to Bowfolios
            </h1>
            <h3 style={{ paddingBottom: '20px', color: 'white' }}>
              Profiles, projects, and interest areas for the UH Community
            </h3>
          </Container>
        </div>
        <div className="landing-white-background">
          <Container className="justify-content-center text-center">
            <h2 style={{ color: '#376551' }}>
              Start by making your profile....
            </h2>
            <Row md={1} lg={2}>
              <Col xs={6}>
                <Image src="/images/home-page.png" width={500} alt="homepage" />
              </Col>
              <Col xs={6}>
                <Image
                  src="/images/profiles-page.png"
                  width={500}
                  alt="profile"
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="landing-green-background">
          <Container className="justify-content-center text-center">
            <h2 style={{ color: 'white' }}>...then add your projects</h2>
            <Row md={1} lg={2}>
              <Col xs={6}>
                <Image
                  src="/images/add-project-page.png"
                  width={500}
                  alt="add-project-page"
                />
              </Col>
              <Col xs={6}>
                <Image
                  src="/images/projects-page.png"
                  width={500}
                  alt="projets-page"
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="landing-white-background text-center">
          <h2 style={{ color: '#376551' }}>
            Connect to people and projects with shared interests!
          </h2>
          <Container>
            <Row md={1} lg={2}>
              <Col xs={6}>
                <Image
                  src="/images/interests-page.png"
                  width={500}
                  alt="interest-page"
                />
              </Col>
              <Col xs={6}>
                <Image
                  src="/images/filter-page.png"
                  width={500}
                  alt="filter-page"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </main>
  );
}
