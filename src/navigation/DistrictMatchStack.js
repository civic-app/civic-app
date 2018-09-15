import { createStackNavigator } from 'react-navigation';
import DistrictMatchScreen from '../screens/DistrictMatch';

import styles from './styles';

const DistrictMatchStack = createStackNavigator(
  {
    Main: DistrictMatchScreen
  },
  {
    navigationOptions: {
      title: 'District Match',
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
    },
  },
);

export default DistrictMatchStack;
