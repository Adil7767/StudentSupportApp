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

const communityEvents = [
  {
    id: '1',
    title: 'Tech Club Meetup',
    description: 'Join us for a talk on the future of AI. All majors welcome.',
    icon: 'laptop-outline',
    date: 'Oct 28, 2023',
    url: 'https://example.com/event1',
  },
  {
    id: '2',
    title: 'Career Fair',
    description: 'Meet recruiters from top companies in the region.',
    icon: 'briefcase-outline',
    date: 'Nov 5, 2023',
    url: 'https://example.com/event2',
  },
  {
    id: '3',
    title: 'Campus Movie Night',
    description: 'Free screening of a blockbuster hit on the main lawn.',
    icon: 'film-outline',
    date: 'Nov 12, 2023',
    url: 'https://example.com/event3',
  },
];

const CommunityScreen = () => {
    const renderItem = ({ item }: { item: typeof communityEvents[0] }) => (
        <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(item.url)}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={30} color="#e67e22" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <View style={styles.dateContainer}>
              <Icon name="calendar-outline" size={16} color="#999" />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Community Hub</Text>
          </View>
          <FlatList
            data={communityEvents}
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
      backgroundColor: '#e67e22',
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
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    cardContent: {
      flex: 1,
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
      marginBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    dateText: {
        marginLeft: 5,
        fontSize: 12,
        color: '#666',
    },
  });

export default CommunityScreen; 