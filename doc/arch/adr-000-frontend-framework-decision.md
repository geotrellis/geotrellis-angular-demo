# Frontend Framework Decision

## Context

The GeoTrellis Demo project is an Angular2 template project which is developed parallelly with its HTML demo template.

### Comparison

The project is a showcase of GeoTrellis, so the frontend framework should be stable within the lifespan of this project. Since the project will be given to another team at Azavea, the frontend framework should be chosen between React and AngularJS, which have been widely used here.

#### React

React is one popular framework used commonly in many our projects owing to its lightweightness and speed. However, besides its license issue, itself is more like a library than a full-featured framework.

Angular 2, by the contrast, is a full-featured framework and could be used in a cross-platform application. And it adopts a component-based convention similar to React, which would reduce the learning cost for teams using React.

#### AngularJS

AngularJS is another framework being used in projects such as Raster Foundry. 
But since the release of Angular 2, it could be forseen that AngularJS would no longer be supported. Though Google has not given a clear timeline for this, we should notice that eventually we have to move our AngularJS projects to Angular 2. 

Besides, Angular 2 has developed its own tools like [Angular CLI](https://cli.angular.io/), which allow us to quickly scaffold the project and provide wide support from generating the components to unit test. 

### Decision

So we decide to use Angular 2 in this project. Besides, in this relatively small project, we could try to gain more experiences so that we would support other teams migrating to Angular 2 if possible in the future.

### Angular 2 Features
#### TypeScript
It is likely that the type definitions of node modules are lagged behind and we need to add our own definitions to complete Typescript check. 

If that happens, one choice is to remove the original type definitions and move to `app/typings` folder (*configured in `tsconfig.json`). 

Another choice is to make a pull request to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), but may take some time.*

#### RxJS Library

RxJS could be used to do functional reactive programming.
As an Angular 2 dependency, all we need to do is to import RxJS operators.