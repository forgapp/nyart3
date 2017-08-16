import { h, Component } from 'preact';
import { step, success, stage, date } from './style.css';

const Offer = ({ offer }) => {
  const stepClass = offer ? `${step} ${success}` : step;

  return (<div class={ stepClass }>
    <p class={ stage }>Offer</p>
    <p class={ date }>{ offer && offer.StageDate }</p>
  </div>);
};

export default Offer;
