import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Linking,
} from 'react-native';
import { Appbar, Card, Title, Paragraph, Avatar } from 'react-native-paper';

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
          <Appbar.Content title="Academic Support" />
      </Appbar.Header>
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
  },
  listContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
  },
});

export default AcademicScreen; 