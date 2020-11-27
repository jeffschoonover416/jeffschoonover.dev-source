---
title: You can ignore these error messages at the end of Scully builds in Windows
description: There is an error at the end of a Scully build that can be ignored.  It is a NodeJS issue.  "ERROR The process "3748" not found."
published: true
author: Jeff Schoonover
slug: ignore-these-error-messages-scully-build-windows
date: '2020-09-26'
tags:
  - jeffschoonover.dev
---

If you are using Windows, you will probably see a family of errors at the end of your Scully builds.  They look like this:

```bash
⠴ ERROR: The process with PID 5036 (child process of PID 5604) could not be terminated.
Reason: There is no running instance of the task.
Reason: There is no running instance of the task.
ERROR: The process with PID 5604 (child process of PID 5828) could not be terminated.
Reason: There is no running instance of the task.

ERROR: The process "3748" not found.

```

This is not a Scully issue, but rather a NodeJS issue on Windows (not a bug, and doesn't affect Scully in any way).  You can read about it in [Scully Github Issue #79](https://github.com/scullyio/scully/issues/79).  
