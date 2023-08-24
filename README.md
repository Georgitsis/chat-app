# Chat-App

Chatting App is a mobile chatting application built using React Native. It enables users to engage in real-time chat conversations, share images, capture photos, and send their current location.

## Requirements

- Node.js
- A Firebase Account
- Expo CLI
- Mobile OS Emulator (e.g., Android Studio Emulator)
- Personal device (smartphone or tablet) with Expo Go app installed

## Setup and Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory using your terminal and install the dependencies (consult package.json)
3. Sign up for a Firebase account and set up your Firebase project as described below.
4. Download and install Android Studio to set up an Android emulator.
5. Sign up for Expo, install Expo Go on your mobile devices, and log in.
6. Run expo login in the terminal and complete the login process.
7. To start the project, use the following command: npx expo start

## Firebase Setup

- Visit Firebase and navigate to the console.
- Create a new project and proceed to the project settings.
- Under "Build," select "Firestore Database" and follow the prompts to set it up in production mode.
- In Firestore Database rules, update allow read, write: if false; to allow read, write: if true; and publish the changes.
- Go to "Project Settings" > "General" and select the web app (</>).
- Choose a nickname and follow the prompts. Copy the firebaseConfig code snippet provided and replace the existing configuration in App.js with this new configuration.

## Android Studio Setup

- Download and install Android Studio.
- Open Android Studio and navigate to "More Actions" > "Virtual Device Manager."
- Set up and install the desired Android device for emulation (e.g., Pixel 7 Pro).

## Expo Setup

- Create an account on the Expo website.
- Open the Android emulator set up in Android Studio.
- Install the Expo Go app from the Google Play Store and log in.
- Repeat the same steps on your physical mobile device to test the application.
- Now you're all set to use and test the Chatting App!
