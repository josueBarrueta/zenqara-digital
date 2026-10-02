import { ChangeDetectionStrategy, Component, output } from "@angular/core";
@Component({
  selector: "app-faq",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  templateUrl: "./faq.component.html",
})
export class FaqComponent {
  readonly layoutChange = output<void>();

  onTransition(event: TransitionEvent): void {
    if (event.target === event.currentTarget && event.propertyName === "height")
      this.layoutChange.emit();
  }
}
