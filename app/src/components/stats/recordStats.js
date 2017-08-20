import { h, Component } from 'preact';
import { Link } from 'preact-router';
import Stat from './stat';

const RecordStats = ({ stats, period, recruiterName }) => {
const createDetailLink = type => `/search?q=Recruiter.Name:"${recruiterName}" AND RegistrationDate:${period} AND _type:${type}`

return (<div class="card is-fullwidth">
  <Stat label="Candidates" stat={ stats.Candidate || 0 } detailLink={ createDetailLink('Candidate') }>
        <span class="icon">
            <i class="fa fa-user-o"></i>
        </span>
    </Stat>

    <Stat label="Jobs" stat={ stats.Job || 0 } detailLink={ createDetailLink('Job') }>
        <span class="icon">
            <i class="fa fa-briefcase"></i>
        </span>
    </Stat>

    <Stat label="Contacts" stat={ stats.ClientContact || 0 } detailLink={ createDetailLink('ClientContact') }>
        <span class="icon">
            <i class="fa fa-users"></i>
        </span>
    </Stat>

    <Stat label="Companies" stat={ stats.Company || 0 }  detailLink={ createDetailLink('Company') }>
        <span class="icon">
            <i class="fa fa-building-o"></i>
        </span>
    </Stat>
</div>);
}

export default RecordStats;
