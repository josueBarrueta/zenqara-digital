import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-hero",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  templateUrl: "./hero.component.html",
})
export class HeroComponent {}
