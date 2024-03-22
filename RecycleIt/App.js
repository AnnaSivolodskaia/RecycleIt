import 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import ScanScreen from './components/ScanScreen';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import ManualsScreen from './components/ManualsScreen';
import RulesScreen from './components/RulesScreen';
import ProductInstruction from './components/ProductInstruction';
import SelectedArticle from './components/SelectedArticle';
import SelectedManual from './components/SelectedManual';

const screenNames = ["Home", "Scan", "AboutScreen", "RulesScreen", "ManualsScreen"];
const componentNames = [HomeScreen, ScanScreen, AboutScreen, RulesScreen, ManualsScreen];
const headerTitles = ["Home", "Scan", "About RecycleIt", "Recycling Rules", "Available Manuals"];

// mapping screen names to the functional components
const screenComponents = {
  Home: HomeScreen,
  Scan: ScanScreen,
  AboutScreen: AboutScreen,
  RulesScreen: RulesScreen,
  ManualsScreen: ManualsScreen,
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
  {/* mapping through screenNames to create Drawer.Screen for every screen with the corresponding attributes */}
    {screenNames.map((name, i) => (
      <Drawer.Screen
        key={i}
        name={name}
        component={screenComponents[name]}
        options={{
          drawerLabel: headerTitles[i],
          title: headerTitles[i],
          headerStyle: {
            backgroundColor: '#EEEDEB',
          },
          headerShown: true,
        }}
      />
    ))}
  </Drawer.Navigator>
);

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="RecycleIt" component={DrawerNavigator} />
        <Stack.Screen name="ProductInstruction" component={ProductInstruction} />
        <Stack.Screen name="SelectedArticle" component={SelectedArticle}/>
        <Stack.Screen name="SelectedManual" component={SelectedManual} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
