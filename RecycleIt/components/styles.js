import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEDEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    position: 'absolute',
    bottom: height * 0.01,
    width: width * 0.32,
    height: width * 0.32,
    borderRadius: 75,
    backgroundColor: '#747264',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  enterBarCodeBtn: {
    position: 'absolute',
    bottom: height * 0.25,
    width: width * 0.5,
    height: width * 0.15,
    borderRadius: 50,
    backgroundColor: '#747264',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterBarCodeBtnText: {
    fontSize: getFontSize(16),
    fontWeight: 'bold',
    color: '#EEEDEB',
  },
  barcodeIcon: {
    width: width * 0.23,
    height: width * 0.23,
    zIndex: 2,
  },
  cameraContainer: {
    position: 'absolute',
    top: height * 0.15,
    width: width * 0.8,
    height: width * 0.8,
  },
  cameraBorder: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#EEEDEB',
  },
  headerTextStyle: {
    marginTop: height*0.035,
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#747264',
  },
  welcomeTextStyle: {
    marginTop: height*0.015,
    fontSize: getFontSize(30),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#747264',
  },
  htmlText: {
    textAlign: 'center',
    color: 'pink',
    marginVertical: 8,
  },
  cellStyle: {
    alignItems: 'left',
    textAlign: 'left',
  },
  searchField: {
    height: height * 0.05,
    width: width * 0.9,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
  },
  cellContainer: {
    borderWidth: 3,
    borderColor: '#747264',
    borderRadius: 15,
    width: width*0.9,
    marginBottom: height*0.02,
  },
  submitFeedbackButton: {
    width: width * 0.3,
    height: width * 0.1,
    borderRadius: 75,
    backgroundColor: '#747264',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width*0.05,
    marginTop: height*0.01,
  },
  submitFeedbackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: getFontSize(12),
  },
  htmlHeader: {
    color: '#747264',
    fontWeight: 'bold',
    fontSize: getFontSize(18),
  },
});
export { styles };
