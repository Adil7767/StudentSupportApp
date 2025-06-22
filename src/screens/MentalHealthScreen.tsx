import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Appbar, TextInput, IconButton, Text, Card, Paragraph } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { sendChatMessage } from '../services/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const MentalHealthScreen = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', text: 'Hello! I am your AI Wellness Coach. How are you feeling today?', sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage({ message: messageToSend, userId: user?.id });
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: response.data.response, sender: 'ai' };
      setMessages(prev => [...prev, userMessage, aiMessage]);

    } catch (error: any) {
      const errorMessageText = error.response?.data?.message || 'Sorry, I couldn\'t connect to the server. Please try again.';
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        text: errorMessageText, 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, userMessage, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Appbar.Header>
            <Appbar.Content title="AI Wellness Coach" subtitle="Here to help, 24/7" />
        </Appbar.Header>

        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.chatContainer}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView 
              ref={scrollViewRef}
              contentContainerStyle={styles.messagesContainer}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map(msg => (
                  <View
                      key={msg.id}
                      style={[
                        styles.messageWrapper,
                        msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper,
                      ]}
                  >
                    <Card style={[
                        styles.messageBubble,
                        msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                    ]}>
                        <Paragraph style={msg.sender === 'user' ? styles.userText : styles.aiText}>
                            {msg.text}
                        </Paragraph>
                    </Card>
                  </View>
                ))}
                {loading && <ActivityIndicator style={{marginTop: 10}} size="small" />}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="How are you feeling?"
                    multiline
                />
                <IconButton
                    icon="send"
                    size={28}
                    onPress={handleSendMessage}
                    disabled={loading}
                />
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
    chatContainer: {
        flex: 1,
    },
    messagesContainer: {
        padding: 10,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    userWrapper: {
        justifyContent: 'flex-end',
    },
    aiWrapper: {
        justifyContent: 'flex-start',
    },
    messageBubble: {
        maxWidth: '85%',
        padding: 8,
        borderRadius: 12,
    },
    userBubble: {
        backgroundColor: '#2196F3',
    },
    aiBubble: {
        backgroundColor: '#FFFFFF',
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
        padding: 8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        borderRadius: 20,
        paddingHorizontal: 12,
        fontSize: 16,
        maxHeight: 100
    },
});

export default MentalHealthScreen; 