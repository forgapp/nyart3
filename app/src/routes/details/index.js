import { h, Component } from 'preact';
import CandidateDetails from '../../components/candidate/details';
import ClientContactDetails from '../../components/clientContact/details';
import CompanyDetails from '../../components/company/details';
import JobDetails from '../../components/job/details';

export default class Details extends Component {
  displayDetails(type, id) {
    switch (type) {
      case 'candidate':
        return <CandidateDetails id={ id } />;
      case 'job':
        return <JobDetails id={ id } />;
      case 'company':
        return <CompanyDetails id={ id } />;
      case 'clientcontact':
        return <ClientContactDetails id={ id } />;
      default:
        return (<p>No View for this type.</p>);
    }
  }

	render({ type, id }, state) {
		return this.displayDetails(type, id);
	}
}