import { h, Component } from 'preact';
import { step, success, rejected, stage, date } from './style.css';

const Placement = ({ placement, isRejected }) => {
  const stepClass = placement && !isRejected
    ? `${step} ${success}` 
    : (placement && isRejected ? `${step} ${rejected}` : step);

  return (<div class={ stepClass }>
    <p class={ stage }>Placement</p>
    <p class={ date }>{ placement && placement.StageDate }</p>
  </div>);
};

export default Placement;
