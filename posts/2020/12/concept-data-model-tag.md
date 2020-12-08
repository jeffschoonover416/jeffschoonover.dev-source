---
title: Concept data model for Tag
description: As part of designing software by concepts, defining the Tag concept for Routernote and adding it to the data model
published: true
author: 'Jeff Schoonover'
date: '2020-12-7'
tags:
    - routernote
slug: concept-data-model-tag
---

This post is a continuation of a series of posts on designing my app Routerbase using concepts.

The concept of a tag is familiar.  I'm going to use Jackson's analysis of the Gmail Label to define:

1. **Name**: Tag
2. **Purpose**: Organize items for easy retrieval
3. **Structure**: Tags are associated with Nodes.  One mode can have multiple tags, and a tag can be used on multiple nodes
4. **Actions**: mark an item with a label, un-mark an item with a label, find items with a given label
5. **Operational principle**: if an item I is marked with Label A, then if you find all A the result will contain I

Gmail also has categories, a mistake that I will avoid, but I do want to have categories for my tags to make for easy organization and filtering (similar to the left sidebar on Amazon).  So a Tag object will consist of its name and category.

Since tags are associated with nodes, I will make the data model with a regular arrow and a descriptive name for the relationship:
![data model with tags added](https://res.cloudinary.com/dmntqdxsy/image/upload/v1607055152/jsdevblog/2020Dec/20201202-data-model-router-step-link-template-tag_ftcja6.png)
<br>

I want to be able to group my tags into categories, and those categories should have sub-categories.  To handle that I introduce another superset as a generalization:
![data model with tag categories](https://res.cloudinary.com/dmntqdxsy/image/upload/v1607394390/jsdevblog/2020Dec/20201207-data-model-router-step-link-template-tag-category_oawarl.png)
<br>

Here is what I came up with for the tagCategory concept:

1. **Name**: tagCategory
2. **Purpose**: Group tags for fast filtering
3. **Structure**: tagCategoryName: [tags]
4. **Actions**: Add/create tagNode to tagCategory, remove/delete tagNode from tagCategory
5. **Operational principle**: if a tagCategory contains a set of tags S, then if you filter the data by S, you will retrieve all data with at least one of the tags in S.

That's it for the data model, for now!  Next will be wireframes - simple sketches that provide an outline of the screens and dialogs in the app.
