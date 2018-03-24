# jest-slim-output
3-lined jest output for watch mode on small screens

## Usage
```
$ jest --watch --json | ./slim-pipe.js

middlewares/Webviews/actions monitorWebview should dispatch OBVIOUS_ERROR upon `did-fail-load`
ReferenceError: OBVIOUS_ERROR is not defined
    at Array.webview.addEventListener.error (/middlewares/Webviews/actions.js:5:15)
```
