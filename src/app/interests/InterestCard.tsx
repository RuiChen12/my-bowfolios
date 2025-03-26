'use client';

import { Card } from 'react-bootstrap';
// eslint-disable-next-line import/extensions
import TooltipImage from '@/components/TooltipImage';
import { InterestCardData } from './InterestCardData';

const InterestCard = ({ interest }: { interest: InterestCardData }) => (
  <Card>
    <Card.Body>
      <Card.Title style={{ marginTop: '0px' }}>{interest.name}</Card.Title>
      {interest.profilePictures.map((p) => (
        <TooltipImage
          className="mx-1"
          key={`profile-${p!.name}`}
          src={p?.picture ? p.picture : ''}
          name={p!.name}
          width={50}
          roundedCircle
        />
      ))}
      {interest.projectPictures.map((p) => (
        <TooltipImage
          className={undefined}
          key={`project-${p!.name}`}
          src={p?.picture ? p.picture : ''}
          name={p!.name}
          width={50}
          roundedCircle
        />
      ))}
    </Card.Body>
  </Card>
);
export default InterestCard;
