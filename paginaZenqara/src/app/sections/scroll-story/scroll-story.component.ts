import { Component, ViewEncapsulation, output } from "@angular/core";
@Component({
  selector: "app-scroll-story",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./scroll-story.component.html",
})
export class ScrollStoryComponent {
  readonly playbackChange = output<boolean>();
  paused = false;
  togglePlayback(): void {
    this.paused = !this.paused;
    this.playbackChange.emit(this.paused);
  }
}
