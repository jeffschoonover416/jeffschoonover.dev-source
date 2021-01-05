---
title: 'Implementing a D3 directed graph or network diagram in Angular'
description: 'Using the D3 visualization library, here is an Angular component that allows the user to create their own directed graphs.'
published: false
author: 'Jeff Schoonover'
date: '2021-01-29'
tags:
    - routernote
slugs:
    - ___UNPUBLISHED___kjjh79hu_kIz0Rd5RLUkfD9eFvlmc8VvVQ4ZUIJz0

---
slug: d3-network-diagram-in-angular






The Router Details page (see #2 in the [wireframes post](/posts/2020/12/primary-wireframes-for-routernote/)) of the Routernote app is the core screen of the app.  This is where the primary data actually gets generated.  Everything else in the app revolves around organizing, finding, and displaying that data.  So the network diagram is where I will start, and this can be made with the d3.js visualization library, which is used to make interactive SVG charts on the web.

The network diagram / directed graph should have these behaviors, to start.  Once these are working I will add more behaviors:

1. When you left-click on an empty space in the network diagram, a new step is created where you click
2. When you left-click drag the mouse from one step to another, a new link is created between the two steps.  The link is directional and flows from the source step to the target step.
3. You can select a step or link by clicking on it.  There is a visual indication on the selected object, and it is stored in a variable for use by other parts of the app (such as the Step Details view).

D3 has a steep learning curve, and the typical way to get started is to go through an introductory tutorial(s) and then modify an example on the web that is close to what you want to do.  I made it pretty far that way, but found that the code gets pretty long and it was easy to get lost in my own code (even easier in someone else's code!).  Also, I was not sure how to test it.  Searching for how to test D3 code I found a great set of articles by Marcos Iglesias on writing testable, reusable D3 code.  It starts with [Leveling up D3: The Reusable Chart API](https://www.eventbrite.com/engineering/leveling-up-d3-the-reusable-chart-api/).

A terrific starting point for what I'm looking to implement is an example by Colorado Reed titled ["Interactive tool for creating directed graphs using d3.js"](https://bl.ocks.org/cjrd/6863459).  Among its functionality is adding nodes and links, adjusting their location, selecting and deselecting, deleting, and the ability to zoom/pan, so way ahead of my first 3 behaviors above.  It also looks like it was written in a modular way.

My next step is to import d3 into the angular project and start making tests for the chart, adding in (and modifying for Angular and Typescript as necessary) the relevant pieces of Colorado's code to make the tests pass.

npm install d3

create a new component

import d3 into component

tests:

1. did it create a chart?
2. Did it create a chart with an input node?
