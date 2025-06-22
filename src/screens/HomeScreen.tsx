import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { Text, Appbar, Card, Avatar } from 'react-native-paper';

type TabParamList = {
  Home: undefined;
  Academic: undefined;
  Financial: undefined;
  Community: undefined;
  'Mental Health': undefined;
};

type HomeScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const features = [
    { name: 'Academic Support', icon: 'school', screen: 'Academic' },
    { name: 'Financial Aid', icon: 'cash', screen: 'Financial' },
    { name: 'Community Hub', icon: 'people', screen: 'Community' },
    { name: 'Wellness Coach', icon: 'heart', screen: 'Mental Health' },
  ];

  return (
    <SafeAreaView style={styles.container}>
        <Appbar.Header>
            <Appbar.Content title={`Welcome, ${user?.name || 'Student'}`} subtitle="How can we help you?" />
            <Appbar.Action icon="logout" onPress={logout} />
        </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <Card
              key={feature.name}
              style={styles.featureCard}
              onPress={() => navigation.navigate(feature.screen as keyof TabParamList)}
            >
                <Card.Content style={styles.cardContent}>
                    <Avatar.Icon size={50} icon={feature.icon} style={styles.cardIcon} />
                    <Text style={styles.featureText}>{feature.name}</Text>
                </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  featureCard: {
    width: '48%',
    marginBottom: 15,
    height: 150,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
  },
  cardIcon: {
      marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen; 