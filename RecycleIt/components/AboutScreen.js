import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TouchableOpacity, Image, View, Dimensions, ScrollView, Vibration, Alert } from 'react-native';
import { styles } from './styles';
import ScanButton from './ScanButton.js'
import { firebaseApp, database } from './firebase';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import HTML from 'react-native-render-html';

const AboutScreen = ({navigation}) => {
const [pageContent, setPageContent] = useState(null);

// fetching the About data from the database
useEffect(() => {
  const dbData = async () => {
    const dbEntry = await get(ref(database, `About`));
    setPageContent(dbEntry.val());
  };

dbData();
}, []);

const { width, height } = Dimensions.get('window');

const submitFeedback = async () => {
  const userEnteredFeedback = await new Promise((resolve) => {
    Alert.prompt(`Please enter your feedback below and click \"OK\".`,
    null, resolve, 'plain-text');
  });
  // checking if the user has entered the feedback
  if (userEnteredFeedback) {
    // pushing the user's text into the Feedback in the database
    const feedbackRef = ref(database, 'Feedback');
    const newFeedbackRef = push(feedbackRef);

    // setting the feedback as a value in the database
    set(newFeedbackRef, {
      feedbackContent: userEnteredFeedback,
      timestamp: new Date().toISOString(),
    });
    Alert.alert('Your feedback was submitted successfully.', `Thank you!`);
  }
};

// renderers for HTML elements
const renderers = useMemo(() => ({
  text: (htmlAttribs, children, convertedCSSStyles, passProps) => {
    return <Text key={passProps.key}>{children}</Text>;
  },
}), []);

// styling for HTML elements
const tagsStyles = {
  body: {
    backgroundColor: '#EEEDEB',
    marginHorizontal: width*0.05,
    color: '#747264',
  },
};

  return (
    <SafeAreaView>
      <ScrollView style = {styles.scrollView}>
        <Text style = {styles.headerTextStyle}>Welcome to RecycleIt: your go-to mobile application for making recycling easy ! 🌿</Text>
        {/* HTML element to display the content fetched from the database */}
        <HTML
          source={{ html: pageContent }}
          renderers={renderers}
          tagsStyles={tagsStyles}
          contentWidth={width* 0.95}
        />
        <TouchableOpacity
          style={styles.submitFeedbackButton}
          onPress = {() => submitFeedback()}
          >
            <Text style={styles.submitFeedbackButtonText}>Submit feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AboutScreen;
