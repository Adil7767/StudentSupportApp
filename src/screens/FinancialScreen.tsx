import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Linking,
} from 'react-native';
import { Appbar, Card, Paragraph, Avatar } from 'react-native-paper';

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
    <Card
      style={styles.card}
      onPress={() => Linking.openURL(item.url)}
    >
        <Card.Title
            title={item.title}
            left={(props) => <Avatar.Icon {...props} icon={item.icon} />}
        />
        <Card.Content>
            <Paragraph>{item.description}</Paragraph>
        </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
          <Appbar.Content title="Financial Resources" />
      </Appbar.Header>
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
  },
  listContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
  },
});

export default FinancialScreen; 