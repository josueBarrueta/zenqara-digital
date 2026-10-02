import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-site-header",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./site-header.component.html",
})
export class SiteHeaderComponent {}
