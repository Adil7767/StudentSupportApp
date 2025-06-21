import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const resources = [
  {
    id: '1',
    title: 'University Library',
    description: 'Access digital archives, research papers, and more.',
    icon: 'library',
    url: 'https://example.com/library',
  },
  {
    id: '2',
    title: 'Tutoring Center',
    description: 'Get help with challenging subjects from peer tutors.',
    icon: 'school',
    url: 'https://example.com/tutoring',
  },
  {
    id: '3',
    title: 'Writing Center',
    description: 'Improve your essays and academic writing skills.',
    icon: 'create',
    url: 'https://example.com/writing-center',
  },
  {
    id: '4',
    title: 'Study Group Finder',
    description: 'Connect with classmates to form study groups.',
    icon: 'people',
    url: 'https://example.com/study-groups',
  },
];

const AcademicScreen = () => {
  const renderItem = ({ item }: { item: typeof resources[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Linking.openURL(item.url)}
    >
      <Icon name={item.icon} size={30} color="#2196F3" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      <Icon name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Academic Support</Text>
      </View>
      <FlatList
        data={resources}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardContent: {
    flex: 1,
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default AcademicScreen; 