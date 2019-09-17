import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Screens/Home';
import Maps from './Screens/Map';

const MainNavigation = createStackNavigator({
  Home: {screen: Home},
  Maps: {screen: Maps},
});

const App = createAppContainer(MainNavigation);

export default App;
