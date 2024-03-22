import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ScanButton from './components/ScanButton';
import ProductInstruction from './components/ProductInstruction';
import HomeScreen from './components/HomeScreen';
import App from './App';

describe('<ScanButton />', () => {
  it('should match snapshot', () => {
    const snap = renderer.create(<ScanButton />).toJSON();
    expect(snap).toMatchSnapshot();
  });
});

jest.mock('./components/firebase', () => ({
  firebaseApp: jest.fn(),
  database: {
    ref: jest.fn(),
    get: jest.fn(() => Promise.resolve({ exists: () => true, val: () => ({}) })),
  },
}));


test('navigates to SelectedArticle screen', () => {
  const { getByText } = render(<App />);
  fireEvent.press(getByText('Article Title'));
  expect(getByText('Selected Article')).toBeDefined();
});


export const Camera = {
  ...jest.requireActual('expo-camera'),
  useWebQRScanner: jest.fn(),
  createWorkerAsyncFunction: jest.fn(),
  takePictureAsync: jest.fn(),
};

test('navigation to SelectedArticle works', () => {
  const { getByText, getByTestId } = render(<HomeScreen />);
  fireEvent.press(getByTestId('article-sampleArticleId'));
  expect(getByText('SelectedArticle')).toBeTruthy();
});
