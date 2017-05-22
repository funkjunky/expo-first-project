import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import SqlScreen from '../screens/SqlScreen';
import MapScreen from '../screens/MapScreen';
import Gl3dScreen from '../screens/Gl3d';
import ReglScreen from '../screens/Regl';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  sql: () => SqlScreen,
  map: () => MapScreen,
  gl3d: () => Gl3dScreen,
  regl: () => ReglScreen
}));
