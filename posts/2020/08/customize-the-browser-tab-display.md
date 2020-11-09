---
title: Customize the browser tab display with Angular
description: Here is how you change the icon and the text in the browser tab for your website with Angular
published: true
author: Jeff Schoonover
slug: customize-the-browser-tab-display-with-angular
date: '2020-08-31'
tags:
  - jeffschoonover.dev
---

## Customize the browser tab display with Angular

There are two components to the browser tab display: the icon and the text.  When you first generate your app, you will notice that the icon is an Angular icon and the text is the name of your project.  Here is how you can quickly change both of these:

1. Icon: the icon that Angular will use is favicon.ico, located in your src folder.  Simply replace that file with your custom icon and presto! it will be reflected in your next build.  These icons can and should be a pretty small file size for faster loading.  Search for "favicon" for all sorts of info and free generators, etc.
2. Text: the text is the `<title></title>` tag in the header of your index.html file, also in your src folder.

Remember to clear your browser cache to see changes, or refresh the Scully static server at least once!
