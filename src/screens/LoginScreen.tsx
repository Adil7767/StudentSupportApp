import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { loginUser } from '../services/api';

const API_BASE_URL = 'https://api-student-support-app.vercel.app/api';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      await login(response.data.token, response.data.user);
    } catch (error: any) {
      console.error(error,'error')
      const message = error.response?.data?.message || 'An unknown error occurred.';
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Spinner visible={loading} textContent={'Logging In...'} textStyle={styles.spinnerTextStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={[styles.headerContainer, { backgroundColor: theme.colors.primary }]}>
            <Icon name="school" size={80} color="#fff" />
            <Text style={styles.headerTitle}>Student Support Hub</Text>
            <Text style={styles.headerSubtitle}>Your partner in success</Text>
        </View>

        <View style={styles.formContainer}>
            <TextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
            />
            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                labelStyle={styles.buttonText}
                loading={loading}
                disabled={loading}
            >
                Login
            </Button>
        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text style={[styles.linkText, { color: theme.colors.primary }]}>Register Now</Text>
                </Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
        opacity: 0.9
    },
    formContainer: {
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    input: {
        marginBottom: 15,
    },
    button: {
        paddingVertical: 8,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        padding: 20,
        justifyContent: 'flex-end',
        flex: 1
    },
    footerText: {
        fontSize: 14,
    },
    linkText: {
        fontWeight: 'bold',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default LoginScreen; 