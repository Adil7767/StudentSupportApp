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

const financialResources = [
  {
    id: '1',
    title: 'Scholarship Portal',
    description: 'Find and apply for scholarships and grants.',
    icon: 'ribbon',
    url: 'https://example.com/scholarships',
  },
  {
    id: '2',
    title: 'Financial Aid Office',
    description: 'Get help with loans, grants, and work-study programs.',
    icon: 'briefcase',
    url: 'https://example.com/financial-aid',
  },
  {
    id: '3',
    title: 'Part-Time Job Board',
    description: 'Browse on-campus and local part-time job opportunities.',
    icon: 'search',
    url: 'https://example.com/jobs',
  },
  {
    id: '4',
    title: 'Budgeting Tools',
    description: 'Access resources to manage your personal finances.',
    icon: 'calculator',
    url: 'https://example.com/budgeting',
  },
];

const FinancialScreen = () => {
  const renderItem = ({ item }: { item: typeof financialResources[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Linking.openURL(item.url)}
    >
      <Icon name={item.icon} size={30} color="#27ae60" />
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
        <Text style={styles.headerTitle}>Financial Resources</Text>
      </View>
      <FlatList
        data={financialResources}
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
    backgroundColor: '#27ae60',
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

export default FinancialScreen; 