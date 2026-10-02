import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-maintenance",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./maintenance.component.html",
})
export class MaintenanceComponent {}
