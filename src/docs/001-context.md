Frontend Frameworks
===================
Context
-------
The GeoTrellis Demo project is an Angular2 template project which is developed parallelly with its HTML demo template with Scott.
### Framework Choice
The project is a showcase of GeoTrellis, so the frontend framework should be stable within the lifespan of this project. Since the project will be given to another team at Azavea, the frontend framework should be chosen between ReactJS and AngularJS, which have been widely used here.

Compared to ReactJS, which is more like a library, Angular is a full-featured framework. However, since the release of Angular 2, the Angular 1.X will no longer be supported. Though Google has not given a clear timeline for this, we should notice that eventually we have to move our Angular 1.X projects to Angular 2. 

Besides, Angular 2 has its own tools like Angular-CLI, which has been used in the project as well, could quickly scaffold the project and provide wide support from generating the components to unit test. 

So we decide to use Angular 2 in this project since that Angular 2 is adopting a component-based convention similar to React, which would reduce the learning cost for teams using React. Besides, in this relatively small project, we could try to gain more experiences so that we would support other teams migrating to Angular 2 if possible in the future.

### Structure
The project frontend structure mimics the one of Raster Foundry:
- ./src/app/pages: Every page with its child components are organized in the same folder;
- ./src/shared: Directives(for common components), pipes, services, models (definitions, useful for Typescript check);
- ./src/assets: Styles
*- ./src/@types: It is likely that the type definitions of node modules are lagged behind and we need to add our own definitions to complete Typescript check. If that happens, remove the original type definitions and move to this folder. The location of the folder could be defined in ./tsconfig.json typeRoots. Another choice is to make a pull request to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), but may take some time.*
*- ./.angular-cli.json is a simplified version of webpack configuration*

Besides, there are several points to be noticed due to the new component-based convention of Angular 2:
- No scope and controller
In Angular 1.X , a component is basically a directive with a template and a controller. In Angular 2 a component is a combination of directive encapsulating a controller class and a view.
- Style
As mentioned, a component is a set of functionalities grouped together including a view and a controller class that manages the functionality of the component. Besides, the team has made an effort to encapsulate independent style as well for each component. Chances are that we could write styles for each component and implement view encapsulation philosophy of Angular 2. Or we could stick to the status quo, put style files in an independent folder and import it for the root (adopted in this project for now).
*[Angular 2 Architecture Overview](https://angular.io/guide/architecture)*

### Development
This project consists of several demos, and the view of each model is assembled by the LayerCard Interface: Demo Name -> LayerCard[] -> Demo View with LayerCard[] (In Typescript, Interface might be more suitable than Class to describe the shape of the values.)

```export interface LayerCard {
	// model name, router param (/map-view/:model)
    model: string; 
    // official name displayed in the dashboard
    title: string; 
    // thumbnail displayed in the dashboard 
    thumb: string; 
    // (one-way data)
    info: {
	    // layer name
        name: string;
        // layer official name
        title: string;
        // (optional) preset models or values
        presets?: {
            text: string;
            value: string[] | number[];
        }[];
        // layer actions to open panel accordingly (info, weight, opacity)
        actions: string[];
        // (optional) e.g., summary
        optional?: string[];
        // text in info panel;
        infotext: string;
        // (optional) text displayed for each parameter in the weight panel, e.g.: bars, rail stops
        prtext?: string[];
        // (optional) weight range in the weight panel
        range?: number;
        // (optional) palette selection
        palettes?: string[];
        // zoom level
        zoom: number;
        // map center
        center: number[];
    };
    // two-way data
    // (optional) default value e.g. weights
    values?: number[] | string[];
    // whether the layer should be shown first (checked or unchecked)
    show: boolean;
    // layer opacity
    opacity: number;
    // (optional) mask (the mask property enables the draw functions)
    mask?: any;
    // (optional) parameters for API call, e.g.: bars, rail_stops
    params?: any;
    // server
    server: string;
    // (optional) default palette
    palette?: string[] | string;
    // (optional) default: undefined (when the summary is not undefined, the panel would be open)
    summary?: {
        layers: number[];
        total: number
    };
    // if one of the panels should be open by default, otherwise undefined
    expanded: string;
```
#### Reflection
##### Type Definition of LayerCard
The project begins with two weighted-overlay demos, which fits the LayerCard model well, however, with more types of demos, the definition has to be changed to adapt the new model. Please feel free to reorganize the definitions.

For example, some properties are duplicated in each layer for now. It could be a chance that we might need to open different maps for each layer (not synced), or probably not. So the final version of the definition should depend on the future demos.

##### RxJS Observable and Operators
The Angular 2 adopt observables and operators from [RxJS](http://reactivex.io/rxjs/), which has more functionalities than Promise.

#### To-Do
- Http/https protocols
In some of the older demos, we are using the http protocol, which needs to be changed in the loing run.