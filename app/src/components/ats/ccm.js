import { h, Component } from 'preact';
import { step, success, rejected, stage, date } from './style.css';

const Ccm = ({ ccm, isRejected }) => {
  const stepClass = ccm.Number && !isRejected 
    ? `${step} ${success}` 
    : (ccm.Number && isRejected ? `${step} ${rejected}` : step);

  return (<div class={ stepClass }>
    <p class={ stage }>CCM{ ccm && ccm.Number }</p>
    <p class={ date }>{ ccm.Number && ccm.StageDate }</p>
  </div>);
};

export default Ccm;