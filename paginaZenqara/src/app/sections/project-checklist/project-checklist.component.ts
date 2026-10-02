import { Component, ViewEncapsulation, output } from "@angular/core";
@Component({
  selector: "app-project-checklist",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./project-checklist.component.html",
})
export class ProjectChecklistComponent {
  readonly layoutChange = output<void>();
  private readonly openCards = new Set<number>();

  isOpen(card: number): boolean {
    return this.openCards.has(card);
  }

  toggle(card: number): void {
    if (this.openCards.has(card)) this.openCards.delete(card);
    else this.openCards.add(card);
    this.layoutChange.emit();
  }

  onPanelTransition(event: TransitionEvent): void {
    if (
      event.target === event.currentTarget &&
      event.propertyName === "grid-template-rows"
    )
      this.layoutChange.emit();
  }
}
