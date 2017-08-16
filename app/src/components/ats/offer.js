import { h, Component } from 'preact';
import { step, success, rejected, stage, date } from './style.css';

const Offer = ({ offer, isRejected }) => {
  const stepClass = offer && !isRejected
    ? `${step} ${success}`
    : (offer && isRejected ? `${step} ${rejected}` : step);

  return (<div class={ stepClass }>
    <p class={ stage }>Offer</p>
    <p class={ date }>{ offer && offer.StageDate }</p>
  </div>);
};

export default Offer;
