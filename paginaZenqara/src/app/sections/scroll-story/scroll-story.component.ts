import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-scroll-story",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./scroll-story.component.html",
})
export class ScrollStoryComponent {}
