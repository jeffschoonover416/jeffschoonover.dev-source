---
title: Adding a email subscription to your website
description: There are lots of email subscription services you can use to let people know when your website is updated with new content.  How I chose and added a Substack newsletter to this site.   
published: true
author: Jeff Schoonover
slug: adding-an-email-subscription-to-your-website
date: '2020-09-07'
---

## Adding a email subscription to your website

I really wanted to add a way for people following along with me to get an email when the site updates, instead of having to visit all the time.  Back in the day, RSS (Really Simple Syndication) feeds were all the rage, but they have gone down in popularity and I've always preferred email anyways.  But making a form to capture email addresses and then manually maintaining a list was not something I was interested in.  There are tons of services out there and I was looking for something simple.  Don't need a landing page and I don't plan on heavy marketing, it is just a service for those interested in my site.  I checked 2 of my favorite websites to see what they did:

1. [Mr. Money Mustache](https://www.mrmoneymustache.com/) blogs about finance and early retirement.  He uses WordPress, which automatically creates an RSS feed for your blog that you can then use to send emails.  The service he uses is a Google service called Feedburner, which is free to use and really simple.  What stopped me is that it requires an RSS feed, and I don't care enough about them to build one right now.
2. [Tania Rascia](https://www.taniarascia.com/) blogs about web development.  She uses Substack, a service for any author who wants to put out a newsletter.  It is free to use until you start charging your subscribers, after which it looks like they take 10%.  

So I decided to go with [Substack](https://substack.com/) for now.  The sign-up process is pretty standard, and they provide code to embed in your website that has a form input for the email address to subscribe to (which I prefer over a link with the same form).  The only question was where to put it.  After experimenting for awhile, I made a separate JoinEmailComponent.  The extra link to add made me rethink the right hand toolbar menu, so I simplified it by making it always a drop-down menu from the "hamburger" icon to the with 3 horizontal bars.  
