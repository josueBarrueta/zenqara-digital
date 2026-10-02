import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-process",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./process.component.html",
})
export class ProcessComponent {}
