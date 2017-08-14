import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { differenceFromToday } from '../../lib/date';
import Application from './application';
import Submittal from './submittal';
import { timeline, step, success, stage, date } from './style.css';

const Ats = ({ id, type, process }) => {
  const label = type.toLowerCase() === 'job' ? process.Job.JobTitle : process.Candidate.Name;
  const labelId = type.toLowerCase() === 'job' ? process.Job.id : process.Candidate.id;
  const openedDays = differenceFromToday(new Date(process.Application.StageDate));

  return (<div class="columns" >
    <div class="column is-4">
      <Link href={ `/details/${type.toLowerCase()}/${labelId}` }>{ label }</Link>
      <p>opened for { openedDays } days</p>
    </div>
    <div class="column">
      <div class={ timeline }>
        <Application application={ process.Application } />
        <Submittal submittal={ process.Submittal } />
        <div class={ step }>
          <p class={ stage }>CCM1</p>
        </div>
        <div class={ step }>
          <p class={ stage }>CCM2</p>
        </div>
        <div class={ step }>
          <p class={ stage }>Offer</p>
        </div>
        <div class={ step }>
          <p class={ stage }>Placement</p>
        </div>
      </div>
    </div>
  </div>)
}

export default Ats;
