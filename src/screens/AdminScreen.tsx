import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title, Paragraph } from 'react-native-paper';

const AdminScreen = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Admin Panel" />
      </Appbar.Header>
      <View style={styles.container}>
        <Title>Welcome, Admin!</Title>
        <Paragraph>
          This is the admin panel. You can add admin-specific functionalities here, such as managing users, viewing all content, or system analytics.
        </Paragraph>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
});

export default AdminScreen; 