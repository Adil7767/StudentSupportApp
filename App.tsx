/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';

const AppContent = () => {
  const { token, loading } = useAuth();
  console.log('TEST LOG: This should appear in the browser console!');
  console.error('TEST ERROR: This should also appear in the browser console!');
  console.warn('TEST WARNING: This should appear in the browser console!');
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator isAuthenticated={!!token} />;
}

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <AuthProvider>
          <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
          <AppContent />
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
