import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TouchableOpacity, Image, View, ScrollView, Dimensions } from 'react-native';
import { styles } from './styles';
import ScanButton from './ScanButton.js'
import { firebaseApp, database } from './firebase';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import HTML from 'react-native-render-html';

const RulesScreen = ({navigation}) => {
const [pageContent, setPageContent] = useState(null);

// fetching General rules from the database
useEffect(() => {
  const dbData = async () => {
    const dbEntry = await get(ref(database, `GeneralRules`));
    setPageContent(dbEntry.val());
  };

dbData();
}, []);

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
    <SafeAreaView>
    <ScrollView style = {styles.scrollView}>
      <Text style = {styles.headerTextStyle}>General rules of recycling in Czech Republic</Text>
      {/* HTML element to display the content fetched from the database */}
      <HTML
        source={{ html: pageContent }}
        renderers={renderers}
        tagsStyles={tagsStyles}
        contentWidth={width* 0.95}
      />
    </ScrollView>
    </SafeAreaView>
  );
}

export default RulesScreen;
