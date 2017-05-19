import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import SqlScreen from '../screens/SqlScreen';
import MapScreen from '../screens/MapScreen';
import Gl3d from '../screens/Gl3d';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  sql: () => SqlScreen,
  map: () => MapScreen,
  gl3d: () => Gl3d
}));
