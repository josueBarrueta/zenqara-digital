import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-maintenance",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  templateUrl: "./maintenance.component.html",
})
export class MaintenanceComponent {}
