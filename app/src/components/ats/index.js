import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { differenceFromToday } from '../../lib/date';
import Application from './application';
import Submittal from './submittal';
import Ccm from './ccm';
import Offer from './offer';
import Placement from './placement';
import RejectButton from './rejectButton';
import UnrejectButton from './unrejectButton';
import NextButton from './nextButton';
import { ats, timeline, commandButtons } from './style.css';
import { getNextStage } from './utils';

const Ats = ({ id, type, process }) => {
  const label = type.toLowerCase() === 'job' ? process.Job.Title : process.Candidate.Name;
  const labelId = type.toLowerCase() === 'job' ? process.Job.id : process.Candidate.id;
  const isPlaced = !!process.Placement;
  const isBackout = !!process.Backout;
  const isCCM = !!process.CCM && !process.Offer;
  const openedDays = differenceFromToday(new Date(process.Application.StageDate));
  const ccm1 = !!process.CCM && Object.keys(process.CCM)
    .filter(key => process.CCM[key].Number === 1)
    .map(key => process.CCM[key])[0];
  const lastCCM = process.CCM ? Object.keys(process.CCM)
    .filter(key => process.CCM[key].Number !== 1)
    .reduce((aggr, key) => {
      if(aggr.Number && process.CCM[key].Number < aggr.Number) {
        return aggr;
      } else {
        return process.CCM[key];
      }
    }, {}) : {};

  return (<div class={ `${ats} columns` } >
    <div class="column is-4">
      <div class="columns">
        <div class="column">
          <Link href={ `/details/${type.toLowerCase()}/${labelId}` }>{ label }</Link>
          <p>opened for { openedDays } days</p>
        </div>
        <div class={ `column ${commandButtons}` }>
          { isPlaced && !isBackout && <p class="tag is-success">Placed</p> }
          { isBackout && <p class="tag is-danger">Backout</p> }
          { process.IsRejected && <p class="tag is-danger">Rejected</p> }
          <div class="field is-grouped">
            { !process.IsRejected && !isPlaced && <p class="control">
              <NextButton id={ id } nextStage={ getNextStage(process) }>
                <i class="fa fa-play" aria-hidden="true"></i>
              </NextButton>
            </p> }

            { !process.IsRejected && isCCM && !isPlaced && <p class="control">
              <NextButton id={ id } nextStage="CCM" ccmNumber={ Object.keys(process.CCM).length + 1 }>
                <span class="icon">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
                <span>CCM</span>
              </NextButton>
            </p> }


            { !process.IsRejected && !isPlaced && <p class="control">
              <RejectButton id={ id } label={ label } />
            </p> }
            { process.IsRejected && <p class="control">
              <UnrejectButton id={ id } label={ label } />
              </p> }
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class={ timeline }>
        <Application application={ process.Application } isRejected={ process.IsRejected } />
        <Submittal submittal={ process.Submittal } isRejected={ process.IsRejected } />
        <Ccm ccm={ ccm1 } isRejected={ process.IsRejected } />
        <Ccm ccm={ lastCCM } isRejected={ process.IsRejected } />
        <Offer offer={ process.Offer } isRejected={ process.IsRejected } />
        <Placement placement={ process.Placement } isRejected={ process.IsRejected } />
      </div>
    </div>
  </div>);
};

export default Ats;
