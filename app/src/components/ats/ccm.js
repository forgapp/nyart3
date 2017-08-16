import { h, Component } from 'preact';
import { step, success, stage, date } from './style.css';

const Ccm = ({ ccm }) => {
  const stepClass = ccm.Number ? `${step} ${success}` : step;

  return (<div class={ stepClass }>
    <p class={ stage }>CCM{ ccm ? ccm.Number : '2+'}</p>
    <p class={ date }>{ ccm.Number && ccm.StageDate }</p>
  </div>);
};

export default Ccm;