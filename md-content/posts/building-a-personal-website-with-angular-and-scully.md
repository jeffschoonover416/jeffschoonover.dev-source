---
title: Building a personal website with Angular and Scully
description: Background on how I made the decision to build this website with Angular and Scully given the many different tools available for making websites these days
published: true
author: Jeff Schoonover
date: '2020-08-25'
---

## Building a personal website with Angular and Scully

This website exists to publish my journey of learning how to code and making Routerbase, software that will help me stay organized at work.  My goal was to use the process of building the website to learn things I would need to know anyway to make Routerbase.  I'm making Routerbase with [Angular](https://angular.io/), open source software for making web apps.  I figured as long as I'm learning Angular I might as well use it for the website too, even though it is a bit overkill.

Why overkill?  It takes a lot of complicated stuff to build and run a web app, because the internet was originally static views that did not change much, but applications have to update the view all the time.  The internet today runs with 3 programming languages:

1. HTML (Hypertext Markup Language), which provides the structure of a page
2. CSS (Cascading Style Sheets), which provides the colors and style
3. Javascript, which provides the interactivity (for example, what happens when you click a button to submit a form)

The way Angular allows dynamic interaction is by using Javascript to generate HTML code on the fly as the user interacts with the app.  The HTML is mostly built from scratch by your Javascript code whenever the app loads.  Not necessary for a blog or most personal websites.  But if you already know Angular, it is convenient to use it anyway because it has a lot of nice features to keep things organized.

[Scully](https://scully.io/) is a static site generator for Angular.  Why is this important?  Scully takes an Angular app and makes HTML files with everything the site needs to display when it first loads a new view, instead of rendering a new HTML file from Javascript on the fly (hence the term "pre-renderer").  This addresses several deficiencies associated with using Angular alone to build a website.  Here are just two of them:

1. *Speed* - Much faster to just load the HTML file (which is relatively small) than to wait for a Javascript file to download before your browser can paint the webpage.  Once the view is loaded, the Javascript you still need can load in the background so it is ready by the time the user is ready to click on something
2. *Search Engine Optimization* - When Google's web crawler looks at your website to see what is on there, it doesn't wait around for all that Javascript in a traditional Angular app to load either, so it will not give your website a very high ranking in search results.  By having a bunch of HTML pages for the web crawler to see, you improve SEO

If I wasn't familiar with Angular already, I would have gone a different route since Angular has a steep learning curve and was not designed for blogs and personal websites.  For a non-commercial site with minimal coding required, I might go with WordPress since it has a huge community and lots of support online.  I would use the free version of WordPress and follow their [hosting advice](https://wordpress.org/hosting/).  Be aware that it suffers from security issues, so you really have to stay on top of the latest patches for WordPress itself as well as all the plugins you inevitably will install.  [Squarespace](https://www.squarespace.com/) is really nice for a site that you are planning to make money on, but hard to justify the price otherwise.  If I was willing to get more into the code, I would use a static site generator such as [Hugo](https://gohugo.io/) that does not require Angular to use.

The "how-to-code-it" posts on this website will assume you are familiar with the Angular framework.  I think the easiest way to learn Angular today is through a Udemy course.  The [Angular course](https://www.udemy.com/course/the-complete-guide-to-angular-2/) I am taking is the most popular one on Udemy and I'm very satisfied, but I'm sure the others are good too.  Before taking this course I went through the freecodecamp.org HMTL, CSS and Javascript tutorials and am finding them helpful as prerequisites.

One nice feature that Scully has (as does Hugo and most SSGs) is that it can be configured to automatically convert Markdown files to HTML and put them wherever you want on your site.  Markdown is a very simple syntax for writing on the web.  John Gruber, the creater of Markdown, has a nice write-up on the goals, philosophy, and syntax of Markdown on his website [Daring Fireball](https://daringfireball.net/projects/markdown).  Markdown is extremely easy to learn, and completely readable on its own without being converted to HTML or a PDF.  It is perfect for writing blog posts.

The best resource I've found for using Scully and publishing your website is by far [Tara Manicsic's Netlify Blog](https://www.netlify.com/authors/tara-z.-manicsic/).  She has been posting about this since late 2019 when the first version of Scully was released, and has numerous articles with step by step instructions for getting a blog up on the web.  I would recommend reading all of her Angular-Jamstack-Scully related posts.

Another site I found helpful was [Corbin Crutchley's post](https://unicorn-utterances.com/posts/making-an-angular-blog-with-scully/) on manually adding Scully's blog support rather than having it automatically generated.  It really helps to understand what's going on under the hood, since you will probably want to customize something sooner rather than later!

The last site I will mention right now is a post on inDepth.dev by Stepan Suvorov: [How to migrate WordPress to Scully](https://indepth.dev/how-to-migrate-wordpress-to-scully/).  He goes into detail on ordering blog posts by date (I used his code!), adding tags and search (I plan to use his code!) and more.  It went beyond what was already on the web and was very helpful to me.

With this intro out of the way, my next posts will detail how I got this site up and running given the links above as a baseline.  My goal is to write the articles I wish I had found when I was searching.
