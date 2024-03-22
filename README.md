# RecycleIt

### About

According to the latest data released on 12.12.2023 by the Czech Statistical Oce (CZSO), the number of legally residing foreigners has reached 1.12 million people, which now represents 10 percent of the population. Every person in this quite large group is coming from a different cultural background and it might be very difficult to catch up with all local rules, both written and not. Taking into consideration that waste management could be outside of a focus for a newcomer, such an important aspect of a daily life could be missed. 

This is how the idea of creating an application, where people could scan a barcode of a product and get an approved instruction on how to utilize it properly, appeared. It has been realized as a first version of the application called RecycleIt.

The first version of this app has been published as a Snack on the Expo Dev. 

You can find a recorded demo of this app here: https://youtu.be/hlwC7tEh-qg.

This application has been created as a final project for the _Mobile Development_ module in my Computer Science degree at UoL. 

### Technologies

I selected React Native and Expo for development, since these represent one of the standard components in the modern way of building mobile apps. Also, these were mentioned in the module requirements. 

All scripts with app-specific logic can be found in the components folder: `RecycleIt/components/`.

### How to use
#### Below are some instructions to make sure the app functions correctly:  
0. Make sure the snack is open with expo version v50.0.0 
1. Application is running on multiple platforms, though it has been created and tested on *iOS*. So please make sure to run it on iOS simulator for the best experience.

#### Expected "main" user flow
The main problem that this application is solving is to provide a utilization instruction for specific product. For that, I expect user to:
0. Open the app
1. Click on the main "barcode" button in the bottom of the screen
2. Use camera to read the barcode (or type it manually)
3. Get instruction or learn that this product wasn't added yet with a button to send an appropriate request to app owner.
 
#### Once the app is open, below are a few advices: 
0. On screens where burger menu icon is not available, use "back swipe" gesture to navigate to the previous screen.  
1. After every scan (including manually entered), do not forget to press "Tap to scan again" button on the Camera screen if you would like to scan another item.  
2. In order for you to test the existing in the database barcodes, here is the list of them: 
    * 4902505424090
    * 40555294
    * 80053828
    * 3083680086936
    * 4066447379174
    * 8004690172803
    * 4006381401135
    * 859803224206
