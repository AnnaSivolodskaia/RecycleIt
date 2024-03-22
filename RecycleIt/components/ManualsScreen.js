import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TouchableOpacity, Image, View, ScrollView, Dimensions, TextInput} from 'react-native';
import { styles } from './styles';
import ScanButton from './ScanButton.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { firebaseApp, database } from './firebase';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import HTML from 'react-native-render-html';

const ManualsScreen = ({ navigation }) => {

const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [filteredProducts, setFilteredProducts] = useState([]);

// fetching Products from the database
useEffect(() => {
  const fetchData = async () => {
    try {
      const productsRef = ref(getDatabase(), 'Products');
      const snapshot = await get(productsRef);

      if (snapshot.exists()) {
        const productsData = snapshot.val();

        // converting productsData into array, so we can further iterate through it
        const productsArray = Object.entries(productsData).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setProducts(productsArray);
        setFilteredProducts(productsArray);
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
    textAlign: 'left',
  },
};

const ManualsScreenCell = ({ product }) => (
  <Cell
    highlightUnderlayColor='#ccc'
    onPress={() => navigation.navigate("SelectedManual", { product })}
    cellContentView={
      <View style = {styles.cellStyle}>
        <View style={{ width: width * 0.85 }}>
          <HTML source={{ html: product.Brand }} tagsStyles={tagsStyles} renderers={renderers} contentWidth={width * 0.8} />
          <HTML source={{ html: product.ProductName }} tagsStyles={tagsStyles} renderers={renderers} contentWidth={width * 0.8} />
        </View>
      </View>
    }
  />
);

const [searchText, setSearchText] = useState('');

const handleSearch = (text) => {
  setSearchText(text);
    const filtered = products.filter((product) =>
      product.Brand.toLowerCase().includes(text.toLowerCase()) || product.ProductName.toLowerCase().includes(text.toLowerCase()));
  setFilteredProducts(filtered);
};

const SearchField = () => (
  <TextInput
    style={styles.searchField}
    autoCorrect={false}
    onChangeText={handleSearch}
    autoFocus={true}
    value={searchText}
    placeholder={"Search for product..."}
    enterKeyHint={"search"}
  />
);

  return (
    <SafeAreaView style={styles.container}>
      <SearchField />
      <ScrollView keyboardShouldPersistTaps="handled">
        <TableView>
          <Section
            header=" "
            hideSeparator={false}>
              {isLoading ? (
                <Text>Loading...</Text>
              ) : (
                // mapping through filtered products to create ManualscreenCells for every product
                filteredProducts.map((product) => (<ManualsScreenCell key={product.id} product={product} />))
              )}
          </Section>
        </TableView>
      </ScrollView>
      <ScanButton navigation={navigation} />
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default ManualsScreen;
