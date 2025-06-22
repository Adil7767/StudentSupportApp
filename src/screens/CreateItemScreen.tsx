import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Appbar, SegmentedButtons } from 'react-native-paper';
import { createEvent, createPost, updateEvent, updatePost } from '../services/api';
import { StackScreenProps } from '@react-navigation/stack';
import { CommunityStackParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<CommunityStackParamList, 'CreateItem'>;

const CreateItemScreen = ({ route, navigation }: Props) => {
  const params = route.params || {};
  const { item, type: initialType } = params;
  const isEditing = !!item;

  const [type, setType] = useState(initialType || 'post');
  const [title, setTitle] = useState(item?.title || '');
  const [content, setContent] = useState(item?.content || item?.description || '');
  const [date, setDate] = useState(item?.date ? new Date(item.date).toISOString().substring(0, 10) : '');
  const [category, setCategory] = useState(item?.category || '');
  const [location, setLocation] = useState(item?.location || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    if (type === 'event' && !date) {
      Alert.alert('Error', 'Please provide a date for the event.');
      return;
    }

    setLoading(true);

    let data: any = { title };

    if (type === 'post') {
      data.content = content;
      data.category = category;
    } else {
      data.description = content;
      data.date = new Date(date).toISOString();
      data.category = category;
      data.location = location;
    }


    try {
      if (isEditing) {
        if (type === 'event') {
          await updateEvent(item._id, data);
        } else {
          await updatePost(item._id, data);
        }
      } else {
        if (type === 'event') {
          await createEvent(data);
        } else {
          await createPost(data);
        }
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to submit item', error);
      Alert.alert('Error', 'An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEditing ? 'Edit Item' : 'Create Item'} />
      </Appbar.Header>
      <View style={styles.form}>
        {!isEditing && (
            <SegmentedButtons
                value={type}
                onValueChange={(value) => setType(value as 'post' | 'event')}
                buttons={[
                    { value: 'post', label: 'Post' },
                    { value: 'event', label: 'Event' },
                ]}
                style={styles.input}
            />
        )}
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label={type === 'event' ? 'Description' : 'Content'}
          value={content}
          onChangeText={setContent}
          mode="outlined"
          multiline
          numberOfLines={5}
          style={styles.input}
        />
        <TextInput
          label="Category"
          value={category}
          onChangeText={setCategory}
          mode="outlined"
          style={styles.input}
        />
        {type === 'event' && (
          <>
            <TextInput
              label="Event Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={styles.input}
            />
          </>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});

export default CreateItemScreen; 