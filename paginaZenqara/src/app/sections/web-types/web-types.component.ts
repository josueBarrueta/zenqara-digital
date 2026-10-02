import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-web-types",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  templateUrl: "./web-types.component.html",
})
export class WebTypesComponent {}
