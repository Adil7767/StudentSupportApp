import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Auth Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Main App Screens
import HomeScreen from '../screens/HomeScreen';
import AcademicScreen from '../screens/AcademicScreen';
import FinancialScreen from '../screens/FinancialScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MentalHealthScreen from '../screens/MentalHealthScreen';

// Define Param List for each navigator
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type MainTabParamList = {
  Home: undefined;
  Academic: undefined;
  Financial: undefined;
  Community: undefined;
  'Mental Health': undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = '';

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Academic') {
          iconName = focused ? 'school' : 'school-outline';
        } else if (route.name === 'Financial') {
          iconName = focused ? 'cash' : 'cash-outline';
        } else if (route.name === 'Community') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'Mental Health') {
          iconName = focused ? 'heart' : 'heart-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <MainTab.Screen name="Home" component={HomeScreen} />
    <MainTab.Screen name="Academic" component={AcademicScreen} />
    <MainTab.Screen name="Financial" component={FinancialScreen} />
    <MainTab.Screen name="Community" component={CommunityScreen} />
    <MainTab.Screen name="Mental Health" component={MentalHealthScreen} />
  </MainTab.Navigator>
);

const AuthScreens = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const AppNavigator = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <NavigationContainer>
    {isAuthenticated ? <MainTabs /> : <AuthScreens />}
  </NavigationContainer>
);

export default AppNavigator; 