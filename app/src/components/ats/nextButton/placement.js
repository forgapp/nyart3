import { h, Component } from 'preact';

const Placement = ({ stage, handleChange }) => (<div>
  <div className="field">
    <label className="label">Registration</label>
    <p className="control">
      <input id="StageDate" className="input" type="date" placeholder="Date" value={ stage.StageDate } onChange={ handleChange } />
    </p>
  </div>
</div>);

export default Placement;
