import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-responsive",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./responsive.component.html",
})
export class ResponsiveComponent {}
