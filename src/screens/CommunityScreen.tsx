import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Alert,
} from 'react-native';
import { Appbar, Card, Paragraph, Avatar, FAB, ActivityIndicator, Text } from 'react-native-paper';
import { getEvents, getPosts, deleteEvent, deletePost } from '../services/api'; // Assuming delete functions are in api
import { useAuth } from '../contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { CommunityStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<CommunityStackParamList, 'CommunityList'>;

interface Item {
  _id: string;
  title: string;
  description?: string;
  content?: string;
  date?: string;
  createdAt: string;
  userId: string;
  userName?: string;
  type: 'event' | 'post';
}

const CommunityScreen = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsRes, postsRes] = await Promise.all([getEvents(), getPosts()]);
      // Ensure .data is always an array
      const eventsArr = Array.isArray(eventsRes) ? eventsRes : [];
      const postsArr = Array.isArray(postsRes) ? postsRes : [];
     
      // Assuming posts and events have a 'date' or 'createdAt' field to sort by
      const combined = [...eventsArr, ...postsArr].sort((a, b) => new Date(b.createdAt || b.date || 0).getTime() - new Date(a.createdAt || a.date || 0).getTime());
      console.log('Combined items for UI:', combined);
      setItems(combined);
    } catch (error) {
      console.error("Failed to fetch community data", error);
      Alert.alert("Error", "Could not load community data.");
      setItems([]); // Always set to array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleDelete = async (item: Item) => {
    Alert.alert(
      `Delete ${item.type}`,
      `Are you sure you want to delete "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (item.type === 'event') {
                await deleteEvent(item._id); // Assuming items have _id
              } else {
                await deletePost(item._id);
              }
              fetchData(); // Refresh list
            } catch (error) {
              console.error('Failed to delete item', error);
              Alert.alert('Error', 'Could not delete item.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Item }) => {
    const canModify = user && (user.id === item.userId || user.role === 'admin');
    const icon = item.type === 'event' ? 'calendar' : 'message-text';

    return (
      <Card style={styles.card}>
        <Card.Title
          title={item.title}
          subtitle={item.type === 'event' ? `Event on ${new Date(item.date || 0).toLocaleDateString()}` : `Posted by ${item.userName || 'a user'}`}
          left={(props) => <Avatar.Icon {...props} icon={icon} />}
        />
        <Card.Content>
          <Paragraph>{item.description || item.content}</Paragraph>
        </Card.Content>
        {canModify && (
          <Card.Actions>
            <FAB
              icon="pencil"
              style={styles.fabEdit}
              onPress={() => navigation.navigate('CreateItem', { item: item, type: item.type })}
            />
            <FAB
              icon="delete"
              style={styles.fabDelete}
              onPress={() => handleDelete(item)}
            />
          </Card.Actions>
        )}
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Community Hub" />
      </Appbar.Header>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Assuming items have _id
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No events or posts yet.</Text>}
      />
      {user && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('CreateItem')}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 80, // Space for FAB
  },
  card: {
    marginBottom: 15,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabEdit: {
    marginRight: 8,
    backgroundColor: '#4CAF50'
  },
  fabDelete: {
    backgroundColor: '#F44336'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  }
});

export default CommunityScreen; 