import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-web-types",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./web-types.component.html",
})
export class WebTypesComponent {}
