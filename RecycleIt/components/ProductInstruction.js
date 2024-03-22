import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { firebaseApp, database } from './firebase';
import HTML from 'react-native-render-html';
import { styles } from './styles';


const ProductInstruction = ({ route }) => {
const { pageContent } = route.params;
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
        <Text style = {styles.htmlHeader}>{pageContent.ProductName} by {pageContent.Brand}</Text>
        {/* HTML element to display the content fetched from the database */}
        <HTML
          source={{ html: pageContent.ProductInstruction }}
          renderers={renderers}
          tagsStyles={tagsStyles}
          contentWidth={width* 0.95}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInstruction;
