# React Native - Front End Mobile App
This is a React-Native project built for an assignment. This front-end app accesses the back-end API service which is running on the docker kubernetes environment. 
> If you haven't deployed the back-end service, check the document here: 
> https://github.com/sosereyboth/backend-api


## Requirements
To run this application on your machine, you have to install the following softwares:
* Git/Git Bash (Optional): for cloning source codes from the github.
* Node JS : for building and compiling source code.
* iOS simulator for Mac or Android Emulator for Android

## Technologies
This application was built from the following technologies:
* React Navtive - Cross platform mobile app development
* Axios - To access back-end API through Http protocol

## Let's Start
### Step 1: Cloning Project
On your machine, open the terminal or git bash and then run this command to clone the project from the git hub:
```
git clone https://github.com/sosereyboth/RNFrontEndApp.git
```
> When the clone completed, you'll get a folder named "RNFrontEndApp".

### Step 2: Building and Compiling Project
Open the downloaded project "RNFrontEndApp" with the VS Code IDE (or any code editor you like). To open in the VS Code, run this command:
```
cd RNFrontEndApp

code .
```
Now edit the file named "axios.js" under the folder "/api" by defining the "baseURL" as the IP of the machine which is running your back-end API service (in this case the kubernetes machine). For example, baseURL: 'http://192.168.1.8:30002'
> Remember: The 30002 port number is the Kubernetes service port on which you deployed your application.

I think now it's time run the application. To do it, open a terminal on the VSCode editor, and type this command:
```
npm install
```
Then
```
react-native run-ios          //For iOS simulator
react-native run-android      //For android emulator
```
When the app runs, you can test the login using this default username and password:
> Username: user1

> Password: pwd1

### Enjoy your test!
