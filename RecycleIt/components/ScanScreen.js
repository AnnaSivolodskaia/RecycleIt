import { SafeAreaView, Text, TouchableOpacity, View, Button, Vibration, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firebaseApp, database } from './firebase';
import { getDatabase, ref, push, set, get } from 'firebase/database';

const ScanScreen = ({ navigation }) => {

const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [promptShown, setPromptShown] = useState(false);

// requesting camera permissions
useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}, []);

// function for processing the camera-captured barcode
const handleBarCodeScanned = async ({ type, data }) => {
  try {
    if (scanned || promptShown) {
      return;
    }
    // checking if the barcode is already in the database
    const dbEntry = await get(ref(database, `Products/${data}`));
    if (dbEntry.exists())
    {
      const pageContent = dbEntry.val();
      navigation.navigate('ProductInstruction', { pageContent });
    } else
    {
      setPromptShown(true);
      // if barcode doesn't exist
      Vibration.vibrate();
      // proposing to send a request for adding a barcode
      const userEnteredProposal = await new Promise((resolve) => {
        Alert.prompt(`Instructions for product with this barcode (${data}) wasn\'t prepared yet. You can request adding this barcode to the system. Provide some details (at least product name) and click \"OK\" to submit. Otherwise, \"Cancel\".`,
        null, resolve, 'plain-text');
      });
      // checking if the proposal was entered
      if (userEnteredProposal)
      {
        // pushing to the Proposals in the database
        const proposalsRef = ref(database, 'Proposals');
        const newProposalRef = push(proposalsRef);
        // setting the entered proposal as a value in the databse
        set(newProposalRef, {
          barcode: data,
          proposal: userEnteredProposal,
          timestamp: new Date().toISOString(),
        });
        Alert.alert('Proposal submitted successfully', `Your product's barcode: ${data}`);
      } else
        {
          Alert.alert('You did not enter any comment. Please try again.');
        }
    }
  } catch (error) {
    console.error('Error handling barcode scan:', error);
  } finally {
    setScanned(true);
    setPromptShown(false);
    Vibration.vibrate();
  }
};

// processing manually entered barcode
const handleManualBarcodeEntry = async () => {
  try {
    const barcode = await new Promise((resolve) => {
      Alert.prompt('Enter Barcode Manually', null, resolve, 'plain-text');
    });
    if (barcode)
    {
      handleBarCodeScanned({ data: barcode });
    }
  } catch (error) {
    console.error('Error handling manual barcode entry:', error);
  }
};

// camera permission is being checked
if (hasPermission === null) {
  return <View />;
}

// camera permission denied
if (hasPermission === false) {
  return <Text>No access to camera</Text>;
}

  return (
    <SafeAreaView style = {styles.container}>
      <Text>Scan Screen, Camera Accessed!</Text>
      <View style={styles.cameraContainer}>
        <View style={styles.cameraBorder}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          autoFocus={Camera.Constants.AutoFocus.on = "on"}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}/>
          </Camera>
          </View>
        </View>
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <TouchableOpacity
        style = {styles.enterBarCodeBtn}
        onPress={handleManualBarcodeEntry}
          >
          <Text style = {styles.enterBarCodeBtnText}>Enter barcode manually</Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default ScanScreen;
