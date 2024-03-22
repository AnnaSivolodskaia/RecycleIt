export const Camera = {
  ...jest.requireActual('expo-camera'),
  // Mock any methods or properties you need for your tests
  takePictureAsync: jest.fn(),
};
