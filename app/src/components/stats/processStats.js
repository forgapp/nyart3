import { h, Component } from 'preact';
import { Link } from 'preact-router';
import Stat from './stat';

const RecordStats = ({ stats, period, recruiterName }) => {
const createDetailLink = type => `/search?q=Recruiter.Name:"${recruiterName}" AND RegistrationDate:${period} AND _type:${type}`

return (<div class="card is-fullwidth">
  <Stat label="Applications" stat={ stats.application || 0 } detailLink="#">
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stat>

					<Stat label="Submittals" stat={ stats.submittal || 0 } detailLink="#">
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stat>

					<Stat label="CCM1" stat={ stats.ccm1 || 0 } detailLink="#">
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stat>

					<Stat label="CCM2+" stat={ stats.ccm || 0 } detailLink="#">
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stat>

					<Stat label="Offers" stat={ stats.offer || 0 } detailLink="#">
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stat>

					<Stat label="Placements" stat={ stats.placement || 0 } detailLink="#">
						<span class="icon">
							<i class="fa fa-user-o"></i>
						</span>
					</Stat>
</div>);
}

export default RecordStats;
