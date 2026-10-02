import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-manifesto",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./manifesto.component.html",
})
export class ManifestoComponent {}
