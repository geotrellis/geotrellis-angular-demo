import { Component } from '@angular/core';

@Component({
  selector: 'gd-root',
  template: `
  <div class="root">
    <router-outlet></router-outlet>
  </div>
`
})

export class AppComponent {

  constructor() { }
}
