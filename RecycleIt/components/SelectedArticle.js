import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TouchableOpacity, Image, View, Dimensions, ScrollView, Modal } from 'react-native';
import { styles } from './styles';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ScanButton from './ScanButton.js'
import { firebaseApp, database } from './firebase';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import HTML from 'react-native-render-html';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

const SelectedArticle = ({ navigation, route }) => {

const { article } = route.params;
const [articleContent, setArticleContent] = useState(null);
const [articleTitle, setArticleTitle] = useState(null);

// fetching data from the database
useEffect(() => {
  const fetchArticleContent = async () => {
    try {
      // fetching ArticleContent from the database
      const articleContentRef = ref(database, `Articles/${article.id}/ArticleContent`);
      const snapshot = await get(articleContentRef);

      // fetching ArticleTitle from the database
      const articleTitleRef = ref(database, `Articles/${article.id}/ArticleTitle`);
      const titleSnapshot = await get(articleTitleRef);

      if (snapshot.exists()) {
        setArticleContent(snapshot.val());
        setArticleTitle(titleSnapshot.val());
      } else {
        console.log("Article content not found");
      }
    } catch (error) {
      console.error('Error fetching article content:', error);
    }
  };

  fetchArticleContent();
}, [article.id]);

const { width, height } = Dimensions.get('window');

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
    <SafeAreaView style = {{backgroundColor: '#EEEDEB'}}>
      <ScrollView style = {styles.scrollView}>
      {/* HTML elements to display the content fetched from the database */}
        <HTML
          source={{ html: articleTitle }}
          renderers={renderers}
          tagsStyles={tagsStyles}
          contentWidth={width* 0.95}
        />
        <HTML
          source={{ html: articleContent }}
          renderers={renderers}
          tagsStyles={tagsStyles}
          contentWidth={width* 0.95}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectedArticle;
