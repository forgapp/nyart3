import { h, Component } from 'preact';
import { step, success, stage, date } from './style.css';

const Placement = ({ placement }) => {
  const stepClass = placement ? `${step} ${success}` : step;

  return (<div class={ stepClass }>
    <p class={ stage }>Placement</p>
    <p class={ date }>{ placement && placement.StageDate }</p>
  </div>);
};

export default Placement;
