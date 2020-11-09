---
title: Decrease your website's initial load size by lazy loading modules
description: Angular by default loads everything it needs for your entire website as soon as someone visits it.  You can reduce this initial load size (and improve initial performance) by lazy loading modules
published: true
author: Jeff Schoonover
slug: decrease-initial-load-size-by-lazy-loading-modules
date: '2020-09-17'
tags:
  - jeffschoonover.dev
---

## Decrease your website's initial load size by lazy loading modules

Initially I had this site organized with just the app module (which every Angular project has) and a Blog module that was set up by the Scully schematics.  Every other page was a component in the app module.  By default, Angular loads all the data for these components as soon as someone visits the site, which increases the initial load size.  Right now for me it is not too much, but every example of an Angular/Scully project that I've seen has each page set apart in its own module, and each module is lazy loaded.  This means that Angular only loads the data for that module when that page is navigated to.  From the [Angular website](https://angular.io/guide/lazy-loading-ngmodules):

>By default, NgModules are eagerly loaded, which means that as soon as the app loads, so do all the NgModules, whether or not they are immediately necessary. For large apps with lots of routes, consider lazy loading—a design pattern that loads NgModules as needed. Lazy loading helps keep initial bundle sizes smaller, which in turn helps decrease load times.

I find that Angular documentation is hit-or-miss, but the link above on lazy loading is actually quite good.  Even though my site is small, it took a couple hours to move everything over to being lazy loaded.  

Let's compare performance before and after implementing lazy loading.  I've actually worked on the website since then, but this is where the Github/Netlify publishing workflow really shines.  Github keeps track of every change made to every file in your repository, and Netlify keeps track of every time it publishes your site to the web **and** allows you to publish any old version of your site on the Netlify domain at any time!  Here are the Lighthouse Mobile and Network numbers (which vary a bit from test to test):

- Before lazy loading
  - Lighthouse: Performance 62, FCP 1.6s, Speed index 1.6s, LCP 4.0s, TTI 4.3s, TBT 1360ms
  - Network: 205 kB transferred, 664 kB resources

- After lazy loading
  - Lighthouse: Performance 58, FCP 2.3s, Speed Index 2.3s, LCP 4.5s, TTI 4.8s, TBT 1150ms
  - Network: 197 kB transferred, 636 kB resources

Hmm, worse and it looks like the initial load size is larger after lazy loading!  I think that my website is too small to really see the benefits of lazy loading just yet.  It needs a little extra javascript initially to load the feature modules on-demand.  I'm also starting to question the Lighthouse performance score as I read more about it and measure the performance of lots of websites.  Lots of sites with a poor score seem fine to me.  Another thing I've found is that it is very dependent on the computer you are using.  On my older computer the current version of my site gets a 66, and on my newer computer with the same settings it scores 88.

Something to keep an eye on as the site grows!
