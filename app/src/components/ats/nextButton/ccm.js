import { h, Component } from 'preact';

const Submittal = ({ stage, handleChange }) => (<div>
  <div className="field">
    <label className="label">Stage Date</label>
    <p className="control">
      <input id="StageDate" className="input" type="date" placeholder="Date" value={ stage.StageDate } onChange={ handleChange } />
    </p>
  </div>
  <div className="field">
    <label className="label">Interview Date</label>
    <p className="control">
      <input id="InterviewDate" className="input" type="date" placeholder="Date" value={ stage.InterviewDate } onChange={ handleChange } />
    </p>
  </div>

  <div className="field">
    <label className="label">Interview Time</label>
    <p className="control">
      <input id="InterviewTime" type="time" class="input" value={ stage.InterviewTime } onChange={ handleChange } />
    </p>
  </div>
</div>);

export default Submittal;