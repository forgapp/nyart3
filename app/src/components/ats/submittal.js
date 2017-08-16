import { h, Component } from 'preact';
import { step, success, rejected, stage, date } from './style.css';

const Submittal = ({ submittal, isRejected }) => {
  const stepClass = submittal && !isRejected  
    ? `${step} ${success}` 
    : (submittal && isRejected ? `${step} ${rejected}` : step);

  return (<div class={ stepClass }>
    <p class={ stage }>Submittal</p>
    <p class={ date }>{ submittal && submittal.StageDate }</p>
  </div>);
};

export default Submittal;
