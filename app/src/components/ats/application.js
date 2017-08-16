import { h, Component } from 'preact';
import { step, success, rejected, stage, date } from './style.css';

const Application = ({ application, isRejected }) => {
  const stepClass = application && !isRejected 
    ? `${step} ${success}` 
    : (application && isRejected ? `${step} ${rejected}` : step);

  return (<div class={ stepClass }>
    <p class={ stage }>Application</p>
    <p class={ date }>{ application.StageDate }</p>
  </div>);
};

export default Application;
