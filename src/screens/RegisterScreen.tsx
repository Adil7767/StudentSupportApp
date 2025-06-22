import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAuth } from '../contexts/AuthContext';
import { TextInput, Button, Appbar, Text, useTheme } from 'react-native-paper';
import { registerUser } from '../services/api';

const API_BASE_URL = 'https://api-student-support-app.vercel.app/api';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const theme = useTheme();

  const handleRegister = async () => {
    if (!name || !email || !password || !studentId) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await registerUser({ name, email, password, studentId });
      Alert.alert('Success', 'Account created successfully! Logging you in...');
      await login(response.data.token, response.data.user);
    } catch (error: any) {
      const message = error.response?.data?.message || 'An error occurred.';
      Alert.alert(`Registration Failed', ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Spinner visible={loading} textContent={'Creating Account...'} textStyle={styles.spinnerTextStyle} />
      
      <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Create Account" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
            <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
            />
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
                label="Student ID"
                value={studentId}
                onChangeText={setStudentId}
                style={styles.input}
                left={<TextInput.Icon icon="card-account-details" />}
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
                onPress={handleRegister}
                style={styles.button}
                labelStyle={styles.buttonText}
                loading={loading}
                disabled={loading}
            >
                Register
            </Button>
            
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerText}>
                    Already have an account?{' '}
                    <Text style={[styles.linkText, { color: theme.colors.primary }]}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: 30,
    },
    input: {
        marginBottom: 20,
    },
    button: {
        paddingVertical: 8,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        marginTop: 30,
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

export default RegisterScreen; 