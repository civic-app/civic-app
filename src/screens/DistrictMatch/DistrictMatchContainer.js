import { connect } from 'react-redux';
import DistrictMatch from './DistrictMatch';
import { saveDistrict } from '../../user/redux';

const mapDispatchToProps = dispatch => ({
  saveDistrict: district => dispatch(saveDistrict(district)),
});

export default connect(
  null,
  mapDispatchToProps,
)(DistrictMatch);
