import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-process",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  templateUrl: "./process.component.html",
})
export class ProcessComponent {}
