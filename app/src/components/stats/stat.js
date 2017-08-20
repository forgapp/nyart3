import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { statContent } from './style.css'

const Stat = ({ stat, label, children, detailLink }) => (
  <div class={ `card-content ${statContent}` }>
    <div class="columns is-mobile flex-is-justify-content-center flex-is-align-items-center">
      <div class="column is-narrow">
        { children }
      </div>
      <div class="column">
        <span class="is-size-4">{ stat }</span> 
        <Link href={ detailLink }>
          { label }
        </Link>
      </div>
    </div>
  </div>
);

export default Stat;

//  `/search?q=Recruiter.Name:"${recruiterName}" AND RegistrationDate:${period} AND _type:${index}`