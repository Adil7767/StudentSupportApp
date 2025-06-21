import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = 'https://api-student-support-app.vercel.app/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const MentalHealthScreen = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/mental-health/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userId: user?.id }),
      });
      const data = await response.json();
      
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: data.response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        text: 'Sorry, I couldn\'t connect to the server. Please try again.', 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>AI Wellness Coach</Text>
            <Text style={styles.headerSubtitle}>Here to help, 24/7</Text>
        </View>

        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.chatContainer}
            keyboardVerticalOffset={90}
        >
            <ScrollView contentContainerStyle={styles.messagesContainer}>
                {messages.map(msg => (
                <View
                    key={msg.id}
                    style={[
                    styles.messageBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                    ]}
                >
                    <Text style={msg.sender === 'user' ? styles.userText : styles.aiText}>
                    {msg.text}
                    </Text>
                </View>
                ))}
                {loading && <ActivityIndicator style={{marginTop: 10}} size="small" color="#2196F3" />}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="How are you feeling?"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Icon name="arrow-up-circle" size={36} color="#2196F3" />
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#4CAF50',
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'white',
        opacity: 0.9,
        marginTop: 4,
    },
    chatContainer: {
        flex: 1,
    },
    messagesContainer: {
        padding: 10,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    userBubble: {
        backgroundColor: '#2196F3',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 5,
    },
    aiBubble: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 5,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    userText: {
        color: 'white',
        fontSize: 16,
    },
    aiText: {
        color: '#333',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        marginRight: 10,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MentalHealthScreen; 