---
title: 'Measure the performance of your website with Lighthouse'
description: 'Lighthouse measures the performance of any website, right within Chrome Dev Tools!  It also will give you suggestions to improve your site''s speed, SEO, and accessibility.'
published: false
author: 'Jeff Schoonover'
slug: measure-the-performance-of-your-website-with-lighthouse
date: '2020-09-07'
slugs:
    - ___UNPUBLISHED___ketebcjo_h51A3nhHDcedX4Q3B6ihIiG8O1OgLIFC

---
Lighthouse measures the performance of any website, right within Chrome Dev Tools!  It will also give you suggestions to improve your site's speed, search engine optimization (SEO) and accessibility.  In many ways it lets you know how Google sees your website, which in turn will affect your rank in its search results.  Yoast has an introductory [article on Lighthouse](https://yoast.com/google-lighthouse/) that I found very helpful (did you know that Google prioritizes mobile user experience and site performance in its rankings?).  With that, let's take a look and see how my new website is doing and how I can improve.

To open Lighthouse, open Chrome Dev Tools by pressing ctrl-shift-I inside Chrome.  I'm currently using Chrome 85, and Lighthouse is the last menu option in line with Elements, Console, Sources, etc.  You probably have to click the double arrows to see the rest of the menu options.

Make sure to navigate to your website, click "Generate Report."  Here are my results:

To be honest, not as good as I was hoping for given such a simple website with very few graphics.  Let's look at what seems to be slowing things down:

I have two fonts loading from Google Fonts (which is a mistake - the site only uses one font), and a third font family for the icons.  This is costing time, but my guess is that these 3 load in parallel rather than in series.  I know you can host your own fonts, but I'll be surprised if getting fonts from the Google Fonts website is what is bringing me down to a 65 since that is the recommended way.  Let's disable all fonts and icons and see what my entitlement is if I do the work:

Better, but not that much.  The note about render-blocking resources is really pointing at the primary issue, which is that I don't have Angular and Scully configured correctly for my type of website.  Sam Vloeberghs has written about what is going on in a blog post on [Disabling Angular when statically generating with Scully](https://samvloeberghs.be/posts/disabling-angular-when-statically-generating-with-scully/).   