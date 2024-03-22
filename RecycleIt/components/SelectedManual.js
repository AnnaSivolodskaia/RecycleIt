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

const SelectedManual = ({ navigation, route }) => {

const { product } = route.params;
const [productInstruction, setProductInstruction] = useState(null);
const [productName, setProductName] = useState(null);

// fetching data from the database
useEffect(() => {
  const fetchProductInstruction = async () => {
    try {
      // fetching product instructions from the database
      const productInstructionRef = ref(database, `Products/${product.id}/ProductInstruction`);
      const snapshot = await get(productInstructionRef);

      // fetching product's names from the database
      const productNameRef = ref(database, `Products/${product.id}/ProductName`);
      const productNameSnapshot = await get(productNameRef);

      if (snapshot.exists()) {
        setProductInstruction(snapshot.val());
        setProductName(productNameSnapshot.val());
      } else {
        console.log("Product instructions not found");
      }
    } catch (error) {
      console.error('Error fetching product instructions:', error);
    }
  };

  fetchProductInstruction();
}, [product.id]);

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
      {/* HTML elements to display the content fetched from the database */}
        <HTML
          source={{ html: productName }}
          renderers={renderers}
          tagsStyles={tagsStyles}
          contentWidth={width* 0.95}
        />
        <HTML
          source={{ html: productInstruction }}
          renderers={renderers}
          tagsStyles={tagsStyles}
          contentWidth={width* 0.95}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectedManual;
