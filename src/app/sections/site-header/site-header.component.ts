import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-site-header",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  templateUrl: "./site-header.component.html",
})
export class SiteHeaderComponent {}
