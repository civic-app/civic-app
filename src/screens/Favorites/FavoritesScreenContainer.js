import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../auth/selectors';
import FavoritesScreen from './FavoritesScreen';
import WithAuthentication from '../../util/components/WithAuthentication';

const mapStateToProps = state => ({ isLoggedIn: getIsLoggedIn(state) });

const ScreenWithAuthentication = WithAuthentication('logout')(FavoritesScreen);

export default connect(mapStateToProps)(ScreenWithAuthentication);
