import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-faq",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./faq.component.html",
})
export class FaqComponent {}
