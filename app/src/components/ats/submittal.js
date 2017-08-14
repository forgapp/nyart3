import { h, Component } from 'preact';
import { step, success, stage, date } from './style.css';

const Submittal = ({ submittal }) => {
  const stepClass = submittal ? `${step} ${success}` : step;

  return (<div class={ stepClass }>
    <p class={ stage }>Submittal</p>
    <p class={ date }>{ submittal && submittal.StageDate }</p>
  </div>);
}

export default Submittal;
