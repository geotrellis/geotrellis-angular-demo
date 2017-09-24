# React Project Structure

## Context

This is somewhat of a follow up to PWD Stormdrain Markings (SM) [ADR 001 "React Project Structure"](https://github.com/azavea/pwd-stormdrain-marking/blob/develop/doc/arch/adr-001-react-project-structure.md).

While implementing the design decisions made in that ADR, a few issues came up.

### Core vs Common

The SM app ADR called for a common directory for shared components and a core directory with some files that wire things together in the app. After working through this change in the context of the SM app and this app, and following a discussion in Slack, it appeared that there wasn't much of a difference between the two folders and that they should be combined. This project has a `core` folder already, but it may not be the best name.

### Root reducer

In the Stormdrain Marking ADR, each module has it's own reducer file. This works well with Redux, which has a function for merging multiple reducers called `combineReducers`.

However, the file that merges the reducers needs to reference each individual module reducer. A tenet of the project structure employed here is that modules don't reference other modules, only files in the common module. Files in the common module shouldn't reference other modules.

## Decision

### Core vs Common

We decided to use `common` as the folder name that houses shared resources because it describes the contents and intent of the folder better than core.

### Root reducer

The root reducer will live at the same level as `main.js`, the only other file that needs to reference multiple modules.

### Other improvements

* Module container - In practice, each module only has one container. Therefore it's simpler to have a container file at the root-level within a folder instead of a file nested within a folder. Also, this file should be named `index.jsx` to make it easier to reference the module from `main.js`. If more containers are needed, we should create a `containers` folder in the module, and store any additional containers there.
* PascalCase for React components file names - Within the React documentation, PascalCase is used. It is also used in the [style guide](https://github.com/airbnb/javascript/tree/master/react#naming) our eslint settings are based on.
* Use `index.jsx` as the filename for the root component of a module - Consistent, easy to find. It also can be imported from the module container as `./components/` instead of `./components/index.jsx`.
* Move `store.js` to the top-level. This file is not referenced by any other file except `main.js`, so it does not belong in common but along side `main.js`.

Considering these changes, the new project structure looks like this:

```
.
├── common
│   ├── components
│   │   ├── map
│   │   │   ├── index.jsx
│   │   │   ├── LegendControl.jsx
│   │   │   └── LayerControl.jsx
│   │   ├── Tooltip.jsx
│   │   └── Modal.jsx
│   └── utils.js
│   └── settings.js
├── detail
│   ├── actions.js
│   ├── components
│   │   ├── index.jsx
│   │   └── Foo.jsx
│   ├── index.jsx
│   └── reducers.js
├── home
│   ├── actions.js
│   ├── components
│   │   ├── index.jsx
│   │   └── Bar.jsx
│   ├── index.jsx
│   └── reducers.js
├── main.js
├── reducer.js
└── store.js
```

## Consequences

It is possible that further reorganizations of the code may need to be done in the future. Each time we reorganize, it has the potential to block other work from being done concurrently, or at least make conflict resolution difficult. It also makes project history harder to track.

Two specific things that we may need to consider in the future:

- Eliminate the root component. It is possible that the root component for a module could be combined with the root container of a module. This could simplify the structure of a module.
- Separating out reducers and actions on a per module basis may result in redundant reducers and actions. We may need to have a top-level actions file along with the top-level reducer to hold shared actions and reducer functions, or to at least connect the various action files.

## Further reading

[Slack discussion of these changes.](https://azavea.slack.com/archives/pwd/p1469197052000323)
