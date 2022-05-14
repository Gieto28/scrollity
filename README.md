<p align="center">
  <img width=200px height=200px src="https://i.imgur.com/fa3C1VZ.png" alt="Scrollity"></a>
  
</p>
<h2 align="center"><strong>Scrollity</strong></h2>
<br />
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/gieto28/Scrollity.svg)](https://github.com/gieto28/Scrollity/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/gieto28/Scrollity.svg)](https://github.com/gieto28/Scrollity/pulls)

<!-- [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE) -->

</div>

---

<p align="center"> Scroll infinitely for the last time with the new Scrollity app. <br> Share Photos video or share a story whenever wherever!
    <br> 
</p>

## Navigation

- [About](#about)
- [Getting Started](#gettingStarted)
- [Deployment](#deployment)
- [Built Using](#builtUsing)
- [Authors](#authors)
- [Acknowledgments](#acknowledgements)

# About <a id="about" name = "about"></a>

React Native application focused on sharing content. You're able to share videos, photos and text and like posts

# Getting Started <a id = "gettingStarted" name = "gettingStarted"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project.

**IMPORTANT**

**This README was created taking in consideration that the app was developed on a windows OS, therefore somethings might be different in a MAC OS.**

## Prerequisites <a id = "prerequisites" name = "prerequisites"></a>

> Please read [Setting up the development environment](https://reactnative.dev/docs/environment-setup)

- Follow React Native CLI Quickstart
- Choose Development Operating system
- Choose Android as Target OS
- Make sure you have an Android or IOS simulator on your machine.
- Follow documentation

I used VS Code and used VDM from Android Studio to simulate an Android phone on my machine to develop this app.

Once you have your android or IOS simulator running and followed the documentation, exactly like it's written, you can head over to **Deployment**

## Deployment <a id = "deployment" name = "deployment"></a>

- Go to [Scrollity repository home page](https://github.com/Gieto28/scrollity)
  - Click on Code and choose a method to clone the project
  - If you're having trouble [click here for help](https://www.google.com/search?q=how+to+clone+a+github+repository&oq=how+to+clone+a+github+repoir&aqs=chrome.1.69i57j0i13l9.4498j0j7&sourceid=chrome&ie=UTF-8)

### Install node_modules

```
npm install
```

- Make sure it installed a folder called node_modules
- Make sure, **again**, you have your Android or IOS simulator running before continuing

### Start app

```
npm start
```

- if app doesn't run on simulator go to [errors](#errors)

# Errors <a id = "errors" name = "errors"></a>

## Read below for list of possibly, but possibly not all, errors

- [Human error with installation](#humanError)
- [App starts but nothing happens](#appRunsError)
- [Port in use](#portInUse)

## Human Error with installation <a id = "humanError" name = "humanError"></a>

Common error has to do with setting up your environment, please head over to [Prerequisites](#prerequisites) and start over, if you've done this either continue reading Errors or go to [Last resort](#lastResort)

## App runs but nothing happens <a id = "appRunsError" name = "appRunsError"></a>

Make sure Android or IOS simulator is running before running `npm start`

If app is running but nothing happens press `ctrl + c` on the terminal to stop app

- restart app with `npm start` on the terminal

If app is running but nothing happens press `ctrl + c` on the terminal to stop app

- restart app with

  - `npm android` for Android Simulator
  - `npm ios` for IOS Simulator

if app is running but nothing happens

- go to [last resort](#lastResort)

## Port in use <a id = "portInUse" name = "portInUse"></a>

I've had this issue in the past, app keeps running on port 8081 and `ctrl + c` on terminal doesn't kill it.

Here's how to fix it on Windows

- Click on Windows button
- Write CMD in the search bar
- Run CMD

Use the following commands in CMD

If you want to get all information on connections and ports:

- by using this method you'll have to scroll to find the correct port.

```
netstat -ano
```

If you want to get specific port:

```
netstat -ano | findstr 8081
```

Both will end up showing you this, with the PID possibly being a different number

<img src="https://i.imgur.com/YsE6DKu.png" alt="Scrollity"></a>
<img src="https://i.imgur.com/NBK17OV.png" alt="Scrollity"></a>

After you get this information you're going to kill the connection using PID also on CMD:

```
taskkill /F /pid 7268
```

- If this did not fix your problem please head over to [last resort](#lastResort)

## Last resort <a id = "lastResort" name = "lastResort"></a>

If none of these fix your problem please click [here](https://www.google.com) to fix your error

# Developed Using <a id = "builtUsing" name = "builtUsing"></a>

- [React Native](https://https://reactnative.dev/) - Javascript FrameWork

# Creator <a id = "authors" name = "authors"></a>

- [@gieto28](https://github.com/Gieto28) - Web Developer

See also the list of [contributors](https://github.com/gieto28/Scrollity/contributors) who participated in this project.

# Acknowledgements <a id = "acknowledgements" name = "acknowledgements"></a>

- Huge thanks to [@Francisco Costa](https://github.com/jfcpcosta) for being such an admirable role model, being the best teacher I could ask for and for the remarkable effort he put into inspiring passing on knowledge not just me but the students of the 2021/2022 Web Development class of [ETIC](https://www.etic.pt).
