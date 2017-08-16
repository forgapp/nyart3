import { h, Component } from 'preact';

const Stats = ({ stat, label, children }) => (<div class="card is-fullwidth">
  <div class="card-content">
    <div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
      <div class="column is-narrow">
        { children }
      </div>
      <div class="column">
        <p><span class="is-size-4">{ stat }</span> { label }</p>
      </div>
    </div>
  </div>
</div>);

export default Stats;
