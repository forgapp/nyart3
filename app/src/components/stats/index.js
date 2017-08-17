import { h, Component } from 'preact';
import { Link } from 'preact-router';

const Stats = ({ stat, label, children, index }) => (<div class="card is-fullwidth">
  <div class="card-content">
    <div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
      <div class="column is-narrow">
        { children }
      </div>
      <div class="column">
        <span class="is-size-4">{ stat }</span> { label }
        <Link class="pull-right" href={ `/search?q=RegistrationDate:[2017-08-01 TO 2017-08-31] AND _type:${index}` }>
          <span class="icon">
            <i class="fa fa-search"></i>
          </span>
        </Link>
      </div>
    </div>
  </div>
</div>);

export default Stats;
