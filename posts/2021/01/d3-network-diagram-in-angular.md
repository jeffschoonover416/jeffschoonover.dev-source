---
title: 'Implementing a reusable D3 chart in Angular'
description: 'Using the D3 visualization library, here is an Angular component that allows the user to create their own reusable charts.'
published: true
author: 'Jeff Schoonover'
date: '2021-01-24'
tags:
    - routernote
slug: d3-chart-in-angular
---

This post documents my process of getting a reusable chart (as defined by Marco Iglesias in his book [Pro D3.js](https://play.google.com/store/books/details?id=DCe7DwAAQBAJ)) to work in Angular.  I'm implementing a directed network graph for a web app, but this post is general to any D3 chart.

The Router Details page (see #2 in the [wireframes post](/posts/2020/12/primary-wireframes-for-routernote/)) of the Routernote app is the core screen of the app.  This is where the primary data actually gets generated.  Everything else in the app revolves around organizing, finding, and displaying that data.  So the network diagram is where I will start, and this can be made with the D3.js visualization library, which is used to make interactive SVG charts on the web.

A terrific starting point for what I'm looking to implement is an example by Colorado Reed titled ["Interactive tool for creating directed graphs using d3.js"](https://bl.ocks.org/cjrd/6863459).  Among its functionality is adding nodes and links, adjusting their location, selecting and deselecting, deleting, and the ability to zoom/pan.  It also looks like it was written in a modular way.

To get this into Angular I will do the following:

## 1. Add the D3 library to the project

```bash
 terminal
 
 > npm install d3
 > npm install @types/d3
```

<br>

This will add D3 and the D3 type definitions.  VS code (and most other code editors) will use the type info to check your code and also provide context menus to help you select from available functions and variables.

## 2. Make networkD3.js and networkD3.spec.ts in a new folder assets/networkD3

I made the test file with a Typescript extension so that Angular will automatically find it when we test our project.

## 3. Add the pieces of the chart one by one, writing a failing test before adding each piece that passes after you add it  

We start with the boilerplate code in the previous post [Make reusable, testable D3 charts with Javascript closures](/posts/2021/01/d3-reusable-charts-made-with-closures) in networkD3.js.  Here is the starter code for the test file, with a test to see if the base `<svg>` element has been rendered.  Since there may be more than one `<svg>`, we look for the one with the class we will assign in networkD3.js.  Again, this code is from the Pro D3.js book:

```js
//networkD3.spec.ts


import * as d3 from 'd3';
import networkD3 from './networkD3';

describe('network graph', () => {

  let network;
  let container;

  beforeEach(() => {
    const fixture = '<div id="fixture"><div class="container"></div></div>';
    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  afterEach(() => {
    if(document.getElementById('fixture')) {
      document.body.removeChild(document.getElementById('fixture'));
    }
  });

  describe('Render', () => {
    beforeEach(() => {
      network = networkD3();
      container = d3.select('.container').call(network);
    });
    
    it('should render the SVG container', () => {
      const expected = 1;
      const actual = container.select('.network-graph').size();
  
      expect(actual).toEqual(expected);

    });
  });
});
```

<br>

Run `ng test` and this test should fail.  Here is updated code for networkD3.js that will make this test pass:

```js
//networkD3.js


import * as d3 from 'd3';

function networkD3() {
    let data;
    let svg;
    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };
    let width = 960;
    let height = 500;
    let chartWidth;
    let chartHeight;

    function exports(_selection) {
        _selection.each(function(_data) {
            data = _data;
            chartHeight = height - margin.top - margin.bottom;
            chartWidth = width - margin.left - margin.right;
     
            buildSVG(this);
        });
    };

    function buildSVG(container) {
        if (!svg) {
            svg = d3.select(container)
                .append('svg')
                    .classed('network-graph', true);
        }

        svg
            .attr('width', width)
            .attr('height', height);
    };

    return exports;
};

export default networkD3;
```

<br>

Quick note: I spent a some time getting ESLint to agree to let me use javascript module files like this in an Angular project.  If you use ESLint and run into any problems, here is a simplified version of my .eslintrc.json file.  Note that in the root of the file (not just in the overrides section unless you have a `*.js` override section), you can specify sourceType="module" under parserOptions.

```json
// .eslintrc.json

{
  "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "es2017": true
  },
  "parserOptions": {
    "sourceType": "module",
  },
  "overrides": [
    {
      "files": ["*.ts"],
      ...
    }
    {
      "files": ["*.component.html"],
      ...
    }
  ]
}
```

<br>

## 4. Generate an Angular module and component to hold the chart

I followed the instructions on the Angular website for [generating feature modules](https://angular.io/guide/feature-modules) to make a RouterDetails module, with RouterDetails and NetworkGraph components.

## 5. Set up the Angular component that will host the embedded chart

It is typical to wrap the chart in a `<div>` in your component html file with a specific class that you can reference.  I used `<div class="network-container"></div>`.  The component.ts file needs to import d3 as well as your javascript module.  Then you can call the module in ngOnInit so it renders right away:  

```js
//network-graph.component.ts

import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import networkD3 from '../../../assets/networkD3/networkD3.js';

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.scss']
})
export class NetworkGraphComponent implements OnInit {

  networkGraph = networkD3();

  constructor() { }

  ngOnInit(): void {
    d3.select('.network-container').call(this.networkGraph);
  }

}
```

<br>

So far all we have is an empty `<svg>` inside the `<div>`.  But we are now set up to make the rest of the chart!
