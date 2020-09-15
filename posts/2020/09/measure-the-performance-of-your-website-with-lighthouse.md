---
title: 'Measure the performance of your website with Lighthouse'
description: 'Lighthouse measures the performance of any website, right within Chrome Dev Tools!  It also will give you suggestions to improve your site''s speed, SEO, and accessibility.'
published: true
author: 'Jeff Schoonover'
slug: measure-the-performance-of-your-website-with-lighthouse
date: '2020-09-08'
---

## Measure the performance of your website with Lighthouse

Lighthouse measures the performance of any website, right within Chrome Dev Tools!  It will also give you suggestions to improve your site's speed, search engine optimization (SEO) and accessibility.  In many ways it lets you know how Google sees your website, which in turn will affect your rank in its search results.  Yoast has an introductory [article on Lighthouse](https://yoast.com/google-lighthouse/) that I found very helpful (did you know that Google prioritizes mobile user experience and site performance in its rankings?).  With that, let's take a look and see how my new website is doing and how I can improve.

To open Lighthouse, open Chrome Dev Tools by pressing ctrl-shift-I inside Chrome.  I'm currently using Chrome 85, and Lighthouse is the last menu option in line with Elements, Console, Sources, etc.  You probably have to click the double arrows to see the rest of the menu options:

![Lighthouse ready to analyze jeffschoonover.dev](https://res.cloudinary.com/dmntqdxsy/image/upload/v1599537664/jsdevblog/post-lighthouse/2020-09-05-lighthouse-1_tferh4.png)

Make sure to navigate to your website, click "Generate Report."  Here are my results:

![Lighthouse first report](https://res.cloudinary.com/dmntqdxsy/image/upload/v1599536166/jsdevblog/post-lighthouse/2020-09-05-lighthouse-2_vuprtg.png)

To be honest, not as good as I was hoping for given such a simple website with very few graphics.  Let's look at what seems to be slowing things down:

![Lighthouse analysis](https://res.cloudinary.com/dmntqdxsy/image/upload/v1599536166/jsdevblog/post-lighthouse/2020-09-05-lighthouse-3_snsz8z.png)

I have two fonts loading from Google Fonts (which is a mistake - the site only uses one font), and a third font family for the icons.  This is costing time, but my guess is that these 3 load in parallel rather than in series.  I know you can host your own fonts, but I'll be surprised if getting fonts from the Google Fonts website is what is bringing me down to a 65 since that is the recommended way.  Let's disable all fonts and icons and see what my entitlement is if I do the work:

![Lighthouse report no fonts](https://res.cloudinary.com/dmntqdxsy/image/upload/v1599536166/jsdevblog/post-lighthouse/2020-09-05-lighthouse-4_no_fonts_or_icons_jbdqcm.png)

Better, but not that much.  The note about render-blocking resources is really pointing at the primary issue, which is that I must not have Angular and Scully configured correctly for my type of website.  I will have to look into this more, but two relatively easy ways to take action on my Lighthouse report are to use scalar vector graphic (SVG) versions of the icons so I don't have to download those each time, and add a `<meta name="description" content="your website's description">` tag to the index.html header.  After a couple short posts on those topics I'll come back to try to figure out the big issue.

Happy Coding!
