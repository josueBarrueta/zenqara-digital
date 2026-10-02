import { Component, ViewEncapsulation, output } from "@angular/core";
@Component({
  selector: "app-faq",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./faq.component.html",
})
export class FaqComponent {
  readonly layoutChange = output<void>();

  onTransition(event: TransitionEvent): void {
    if (event.propertyName === "height") this.layoutChange.emit();
  }
}
