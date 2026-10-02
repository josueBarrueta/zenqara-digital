import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-hero",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./hero.component.html",
})
export class HeroComponent {}
