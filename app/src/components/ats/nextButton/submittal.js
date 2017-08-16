import { h, Component } from 'preact';

const Submittal = ({ stage, handleChange }) => (<div>
  <div className="field">
    <label className="label">Registration</label>
    <p className="control">
      <input id="StageDate" className="input" type="date" placeholder="Date" value={ stage.StageDate } onChange={ handleChange } />
    </p>
  </div>
  <div className="field">
    <label className="label">Method</label>
    <div class="select is-fullwidth">
      <select id="Method" value={ stage.Method || '' } onChange={ handleChange }>
        <option>Email</option>
        <option>Phone</option>
        <option>Face-to-Face</option>
      </select>
    </div>
  </div>
</div>);

export default Submittal;
