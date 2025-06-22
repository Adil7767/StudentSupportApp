import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
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
import CreateItemScreen from '../screens/CreateItemScreen';
import AdminScreen from '../screens/AdminScreen';

import { useAuth } from '../contexts/AuthContext';


// Define Param List for each navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type CommunityStackParamList = {
  CommunityList: undefined;
  CreateItem: { item?: any; type?: 'event' | 'post' } | undefined;
};

type MainTabParamList = {
  Home: undefined;
  Academic: undefined;
  Financial: undefined;
  Community: undefined;
  'Mental Health': undefined;
  Admin: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const CommunityStackNav = createStackNavigator<CommunityStackParamList>();

const CommunityStack = () => (
  <CommunityStackNav.Navigator screenOptions={{ headerShown: false }}>
    <CommunityStackNav.Screen name="CommunityList" component={CommunityScreen} />
    <CommunityStackNav.Screen name="CreateItem" component={CreateItemScreen} />
  </CommunityStackNav.Navigator>
);

const MainTabs = () => {
  const { user } = useAuth();
  return (
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
          } else if (route.name === 'Admin') {
            iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (routeName === 'CreateItem') {
            return { display: 'none' };
          }
          return {};
        })(route),
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Academic" component={AcademicScreen} />
      <MainTab.Screen name="Financial" component={FinancialScreen} />
      <MainTab.Screen name="Community" component={CommunityStack} />
      <MainTab.Screen name="Mental Health" component={MentalHealthScreen} />
      {user?.role === 'admin' && (
        <MainTab.Screen name="Admin" component={AdminScreen} />
      )}
    </MainTab.Navigator>
  );
}

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