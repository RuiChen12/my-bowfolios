import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

export type TooltipImageProps = {
  src: string;
  name: string;
  width: number;
  roundedCircle: boolean;
  className: string | undefined;
};

const TooltipImage = ({ src, name, width, roundedCircle, className }: TooltipImageProps) => (
  <OverlayTrigger overlay={<Tooltip id={`tooltip-${name}`}>{name}</Tooltip>}>
    <Image roundedCircle={roundedCircle} src={src} width={width} className={className} alt={name} />
  </OverlayTrigger>
);

export default TooltipImage;
