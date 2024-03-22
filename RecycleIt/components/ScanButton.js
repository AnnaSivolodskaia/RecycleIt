import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

const ScanButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.scanButton}
      onPress={() => navigation.navigate("Scan")}
    >
      <Image
        source={require('../assets/barcode.png')}
        style={styles.barcodeIcon}
      />
    </TouchableOpacity>
  );
};

export default ScanButton;
