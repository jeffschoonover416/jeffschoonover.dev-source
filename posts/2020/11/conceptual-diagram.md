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
    - ___UNPUBLISHED___ki45b74b_zKUBTW4i7NijICW1ReTF0CNJ5Puo4n1t

---
A data model is...
Unified Modeling Language

There are so many tips and rules to follow to make your app as good as possible that if I try to follow them all while I'm making my data model progress will be slow.  Instead, I will make a model the best I can and then check it against all the rules and heuristics. 



The question is how to model this in an object-oriented way that makes sense.  Does it make sense to make Router, Step and Link extensions of an abstract class because they can all be created, edited, deleted, and are all children of Router?  If I do that, how to make the relationship with links clear (a link must be associated with both a source and a target node, otherwise it should be deleted - or should it??  That should be an option).