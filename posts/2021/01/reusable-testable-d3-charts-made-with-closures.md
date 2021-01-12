---
title: Make reusable, testable D3 charts with Javascript closures
description: A quick summary of the motivation and implementation of closures to make reusable, testable, more readable D3 charts by separating the data and configuration options from the chart building function itself.
published: true
author: 'Jeff Schoonover'
date: '2021-01-11'
tags:
    - routernote
slug: d3-reusable-charts-made-with-closures
---

The D3 visualization library is terrific because it is built on top of SVG, which means that the stuff you learn on D3 will be pretty transferable elsewhere.  Still, the syntax is a bit to get used to, and there is definitely a "D3 way" of doing things.  The web is full of example code for various visualizations, and the typical approach is to find an example that is close to what you want to do and use it as your starting point.  However, there are a few downsides to this approach, as Marcos Iglesias writes about in his book [Pro D3.js](https://play.google.com/store/books/details?id=DCe7DwAAQBAJ) as well as a series of blog posts [Leveling up D3: The Reusable Chart API](https://www.eventbrite.com/engineering/leveling-up-d3-the-reusable-chart-api/).  Here is a partial list:

1. Hard to modify: if you want to change a color or an axis you have to go in and change the hard-coded value.  If you change it, you don't really know if it is still working everywhere because there are no tests, and it is hard to test typical D3 code
2. Not reusable: if you needed several instances of the same chart (maybe with different data or colors), it would be a lot of copy/paste, which makes it exponentially harder to maintain and test.  Now if you change the chart you have to change it the exact same in all your duplicate code.  It violates the DRY (Don't Repeat Yourself) rule of writing good, maintainable code

Back in 2012, Mike Bostock (the creator of D3) addressed this issue in an article [Towards Reusable Charts](https://bost.ocks.org/mike/chart/) that is the foundation of most/all of the reusable D3 chart libraries out there.  His solution is to use closures.  Here is the skeleton of the code (this goes in a separate .js file that will be imported later into your Angular component, and is taken from the Pro D3.js book):  

```js
//network-diagram.js

function makeNetwork() {
    const width = 600;
    const height = 400;
    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    let svg;
    let chartWidth;
    let chartHeight;
    // Rest of variables

    function exports(_selection) {
        _selection.each(function(_data) {
            chartWidth = width - margin.left - margin.right;
            chartHeight = height - margin.top - margin.bottom;

            //Chart creation code here
        });
    }

    return exports;
};

export default makeNetwork;
```

<br>

First off, notice that this code is in a separate file with an `export` tag.  This is a Javascript module that will need to be imported into our Angular component in order to use it.  There can be only one default export per module, but we only need one and it is the top level function `makeNetwork`.  That function actually returns the `exports` function which builds the chart.  The `exports` function is a closure, a function inside another one that has access to the outer function's scope (its data).  The `exports` function knows that width = 600, for example, and can use those variables to build a custom chart.  We will add getter/setter functions so that back in your Angular component, you will be able to access and modify these values when you call `makeNetwork()`.  

You could just make one function with all the arguments you need like this:

```js
function makeNetwork(width, height, margin, etc...) {
    //make the chart
}
```

<br>

But if you implemented it this way, then every time you want to update the chart you would have to pass in all the arguments again.  The nice thing about using a closure with getter-setter methods is that it separates the data and configuration options from the method.  The [MDN doc on "Closures"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#practical_closures) says it this way: *Closures are useful because they let you associate data (the lexical environment) with a function that operates on that data.* It is much easier to call this in our Angular component than a traditional function.  

But how to get this chart into Angular and start building it, testing it along the way?  We will tackle that next.
