import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';

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

  const handleRegister = async () => {
    if (!name || !email || !password || !studentId) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, studentId }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully! Logging you in...');
        await login(data.token, data.user);
      } else {
        Alert.alert('Registration Failed', data.message || 'An error occurred.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} textContent={'Creating Account...'} textStyle={styles.spinnerTextStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
        </View>

        <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Icon name="person-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} placeholderTextColor="#999" />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#999" />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="id-card-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Student ID" value={studentId} onChangeText={setStudentId} placeholderTextColor="#999" />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={22} color="#666" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#999" />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerText}>
                    Already have an account? <Text style={styles.linkText}>Login</Text>
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
        backgroundColor: '#f0f4f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15,
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    formContainer: {
        padding: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    inputIcon: {
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#FF9800',
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        marginTop: 30,
    },
    footerText: {
        color: '#666',
        fontSize: 14,
    },
    linkText: {
        color: '#2196F3',
        fontWeight: 'bold',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default RegisterScreen; 