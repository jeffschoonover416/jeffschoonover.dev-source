---
title: null
description: null
published: false
author: 'Jeff Schoonover'
date: '2020-11-14'
tags:
    - null
slug: null
slugs:
    - ___UNPUBLISHED___khyd24io_AdsT77lPvI9H7RE2OsckrnWEJ4rUmY0V

---
## Conceptual diagrams

> Weeks of coding can save you hours of planning
>> *Unknown*

If I've heard it once, I've heard it a thousand times: you need to plan out software before you start coding.  Just like you need to outline a paper or talk before you start typing or making slides.  If you fail to plan, then plan to fail!  Think of starting construction on a house, bridge, or car before designing it.  So as much as I want to dive into the code, I will spend some time on the plan.

Coursera course on Conceptual design and object oriented programming.  Trying to find more perspectives on this led me to the work of Daniel Jackson at MIT, who is an advocate of designing software by concepts.  Check out one of his lectures on YouTube or lecture notes on his Software Design course website.

A data model is...
Unified Modeling Language

There are so many tips and rules to follow to make your app as good as possible that if I try to follow them all while I'm making my data model progress will be slow.  Instead, I will make a model the best I can and then check it against all the rules and heuristics.  

The first question to wrestle with in my data model is the relationship between tasks and steps.  Whenever I have thought about this in the past I've wondered about sub-steps and sub-tasks, umbrella tasks, etc.  How many levels should there be?  Can a task be a step in a larger task?  Can a step have sub-tasks?  What do I need to consider when deciding how to store data that can become many layers deep?

Jackson recommends using existing concepts whenever possible to avoid confusion.  Maybe tasks and steps are like folders and files.  A folder may have many layers of other folders inside it, and each folder can have lots of files, but a file does not have folders or other files inside it.  A task is actually a special kind of folder, in that it allows defined associations between steps and other tasks rather than just grouping them into one collection.  Since folders can be nested, Jackson recommends  

Templates - linked to sequenceItem structures