import { h, Component } from 'preact';
import { step, success, stage, date } from './style.css';

const Application = ({ application }) => {
  const stepClass = application ? `${step} ${success}` : step;

  return (<div class={ stepClass }>
    <p class={ stage }>Application</p>
    <p class={ date }>{ application.StageDate }</p>
  </div>);
}

export default Application;
