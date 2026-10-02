import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-project-checklist",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./project-checklist.component.html",
})
export class ProjectChecklistComponent {}
