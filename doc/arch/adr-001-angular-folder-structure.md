# Angular Folder Structure

## Context

The starting point of this project a series of existing demos implementing a uniformed UI design.

### Considerations

With a strong sense that: 
- New demo could be added, and each demo should be replaced or removed at ease. 
- UI components should be reusable in each demo.

We decided to export each demo as an [NgModule](https://angular.io/guide/ngmodule), and the shared UI components a shared module.

In that case, it is easier to extend the current framework with capabilities to switch the demos. And these sub modules can be lazy loaded asynchronously by the router.

## Decisions

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
│   │   ├── foo
│   │   │   ├── foo-demo.ts
│   │   │   ├── foo.component.ts
│   │   │   ├── foo.module.ts
│   │   │   └── foo.service.ts
│   │   └── ...
│   ├── shared
│   │   ├── components
│   │   │   ├── foo
│   │   │   |   ├── foo.component.ts
│   │   │   |   ├── foo.component.html
|   │   │   │   └── ...
│   │   |   └── ...
│   │   ├── directives
│   |   │   └── foo.directive.ts
│   │   ├── pipes
│   |   │   └── foo.pipe.ts
│   │   ├── shared.module.ts
│   |   └── foo.d.ts
│   ├── gd-routing.module.ts
│   ├── gd.component.ts
│   └── gd.module.ts
├── assets
├── environmemts
│   ├── environment.prod.ts
│   └── environment.ts
└── typings
```
### Issues and Decisions

#### Why DashboardModule (landing page) isn't shared?

SharedModule exists to make commonly used components, directives, and pipes available for use in the templates of components in many other modules.

However, the `DashboardComponent` is used only once by the `DashboardModule`. So there's no good reason sharing it.

## Consequences

To add/remove the demo:
- Build the demo folder under `app/demos` and export each demo module with its component, service and model.
- Include the `Foo-demo.ts` in `app/demos/demos.ts` to display the info in the dashboard.

## To-do

- Dynamic Component Loader
The template uses lost of ngIf directives to check if the piece fits the demo's requirement. But, it could be much elegant to dynamic load that component as described [here](https://angular.io/guide/dynamic-component-loader).
However, following the tutorial, the component generated does not reponsive to the data binded. It has been an issue on the GitHub.

We could wait the Angular team to fix that issue, or we could find other way round.

## Further reading

- (Angular CLI)[https://cli.angular.io/]