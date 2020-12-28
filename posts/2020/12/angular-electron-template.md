---
title: Introduction to the angular-electron open source starter template
description: The angular-electron template solves the problem of how to get Angular and Electron to play nicely together in the same app.  This post introduces the open source template that is actively maintained by Maxime Gris.
published: true
author: 'Jeff Schoonover'
date: '2020-12-27'
tags:
    - routernote
slug: angular-electron-template
---

Angular is great.  Electron is great.  Shouldn't Angular + Electron be 2 * great???

Angular is a front-end javascript framework used to make web apps.  Electron is a framework for creating desktop applications from web apps.  I've taken a [course on Angular](https://www.udemy.com/course/the-complete-guide-to-angular-2/) and am about halfway through a book on [testing in Angular](https://www.manning.com/books/testing-angular-applications).  I also have gone through a [book on Electron](https://www.manning.com/books/electron-in-action).  

The question is how to combine them, to use them together.  That could take forever for someone like me with no real experience and only a couple hours each night after the kids go to bed.  And, fortunately, someone has an open-source, up-to-date answer in the form of a template.  Thank you Maxime Gris for maintaining the [Angular-Electron template](https://github.com/maximegris/angular-electron) on Github, complete with typescript, hot reloading so you don't have to build your Angular project to see what it looks like in Electron, and testing set up.  

Let's look at how the template is organized.  There are lots of details I just won't see until I get into the project more, but here is what it looks like right now.

Electron has a Main process that interacts with the operating system, and Renderer processes that display the user interface.  A stand-alone Electron program usually starts up from a main.js file and loads an interface stored in an index.html file.  Here main.ts is a typescript file and is loaded into the build options in the angular.json file.  Inside the main.ts file, if the `--serve` flag is used Electron looks for the file from localhost:4200, which is the default Angular server.  If not, this means the app is in production and Electron loads from the index.html file.  The Main process starts up a desktop window (running Chromium behind the scenes) with the Angular app.

How to access the operating system in the app?  The template injects Electron as a service into the app component so you have the ipcRenderer (inter-process-communication, an event-emitter module that lets you send/receive messages with the Main process), webFrame (does things like control the zoom level of the window), remote (gives you remote access to Main process so you can copy/paste to the system clipboard, set up right-click context menus, and so on), and the Node.js fs (file system) module for opening and saving files to the local machine.

I'm going to take the strategy of "just-in-time learning" with this template - figure out how to do something when I actually need to do it.  For now, it looks like I can make Angular components and services mostly as usual, so it is time to start.
