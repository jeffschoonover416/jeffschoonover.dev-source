---
title: Improve your website's performance by embedding SVG icons
description: Learn how to reduce your website's load size by putting SVG icons directly into your HTML rather than embedding an externally hosted icon font!
published: true
author: Jeff Schoonover
slug: improve-website-performance-by-embedding-icons
date: '2020-09-14'
tags:
  - jeffschoonover.dev
---

As I am building this website, I am realizing that the less I depend on someone else (even Google) to load my website, the better off I'll be.  As a small example, I use a couple [Material Design Icons](https://material.io/resources/icons/) on this site, and the easiest way to use them is to have your website look them up on Google's servers whenever it loads.  It is only 42kb for all the icons, and it makes including them a breeze.  But there is a way to include the individual icons directly in your HTML code that does not require an external resource and uses much less bandwidth.  The icons are available as Scalar Vector Graphics files.

An SVG file is just text that allows you to draw shapes in a browser by specifying vectors.  It is an open graphics format in wide use on the web.  Since vectors can be increased in size without losing resolution, the images do not look pixelated at large scales.  Since you are drawing lines rather than telling the browser the shade of every individual pixel, the file size is small.  You can learn more about the SVG format, its advantages and how to make graphics with it by Googling, but a good first stop is the [SVG page](https://www.w3schools.com/graphics/svg_intro.asp) at W3schools.  (As a side note, the [D3 visualization library](https://d3js.org/) uses SVG to make amazing, interactive charts online).

The Material Design icons are all available for download on their website (linked above).  You can download them in 18, 24, 36, or 48dp sizes.  Open the files with a text editor.  Here are the Home icons in both 18 and 24dp sizes:

```html
<!-- 18dp -->
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="black" 
    width="18px" height="18px">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>

<!-- 24dp -->
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="black" 
    width="24px" height="24px">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>
```

You can see the only difference is the width and height.  This means that you can put this code wherever you need your icon, and if it needs to be a bit bigger or smaller you just adjust those values.

That's it!  One less external dependency for your website!
