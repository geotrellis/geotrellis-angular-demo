# React Project Structure

## Context

The starting point of this project a series of existing demos implementing a uniformed UI design.

### Consideration

With a strong sense that: 
- New demo could be added, and each demo should be replaced or removed at ease. 
- UI components should be reusable in each demo.

We decided to export each demo as an [NgModule](https://angular.io/guide/ngmodule), and the shared UI components a shared module.
In that case, it is easier to extend the current framework with capabilities to switch the demos.

## Decision

We decided to use `shared` as the folder name that houses shared resources (components, directives, etc...).

Considering these changes, the new project structure looks like this:

```
.
├── app
│   ├── dashboard
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.ts
│   │   │   └── dashboard.module.ts
│   ├── demos
│   │   ├── demo.component.html
│   │   ├── demos.ts
│   │   ├── demo1
│   │   │   ├── demo1-demo.ts
│   │   │   ├── demo1.component.ts
│   │   │   ├── demo1.module.ts
│   │   │   └── demo1.service.ts
│   │   ├── demo2
│   │   │   ├── demo2-demo.ts
│   │   │   ├── demo2.component.ts
│   │   │   ├── demo2.module.ts
│   │   │   └── demo2.service.ts
│   │   └── ...
│   ├── shared
│   │   ├── components
│   │   ├── demos.ts
│   │   ├── demo1
│   │   │   ├── demo1-demo.ts
│   │   │   ├── demo1.component.ts
│   │   │   ├── demo1.module.ts
│   │   │   └── demo1.service.ts
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