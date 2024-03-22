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
import { Item, Cell, Section, TableView } from 'react-native-tableview-simple';

const HomeScreen = ({ navigation }) => {
const Stack = createNativeStackNavigator();

const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState(true);

// fetching Articles list from the database
useEffect(() => {
  const fetchData = async () => {
    try {
      const articlesRef = ref(getDatabase(), 'Articles');
      const snapshot = await get(articlesRef);

      if (snapshot.exists()) {
        const articlesData = snapshot.val();

        // converting articlesData into array, so we can further iterate through it
        const articlesArray = Object.entries(articlesData).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setArticles(articlesArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

const { width } = Dimensions.get('window');

// renderers for HTML elements
const renderers = useMemo(() => ({
  text: (htmlAttribs, children, convertedCSSStyles, passProps) => {
    return <Text key={passProps.key}>{children}</Text>;
  },
}), []);

// styling for HTML elements
const tagsStyles = {
  body: {
    color: '#747264',
    textAlign: 'center',
  },
};

const HomescreenCell = ({ article }) => (
  <Cell
    backgroundColor='#EEEDEB'
    highlightUnderlayColor='#ccc'
    onPress={() => navigation.navigate("SelectedArticle", { article })}

    cellContentView={
      <View style={styles.cellContainer}>
        <HTML source={{ html: article.ArticleTitle }} tagsStyles={tagsStyles} renderers={renderers} contentWidth={width * 0.8} />
      </View>
    }
  />
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TableView>
        <Text style = {styles.welcomeTextStyle}>Welcome to #RecycleIt!</Text>
          <Section
            header=" "
            hideSeparator={false}
            separatorTintColor= '#EEEDEB'>
              {isLoading ? (
                <Text>Loading...</Text>
              ) : (
                // iterating through articles to create HomescreenCells for every article
                articles.map((article) => <HomescreenCell key={article.id} article={article} />)
              )}
          </Section>
          {/*Blank space to prevent overlaping by scan button*/}
          <Text style = {{height: width*0.2}}/>

        </TableView>
      </ScrollView>
      <ScanButton navigation={navigation} />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default HomeScreen;
