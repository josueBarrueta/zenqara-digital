import { MailLinkComponent } from "../../shared/mail-link/mail-link.component";
import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-site-footer",
  standalone: true,
  imports: [MailLinkComponent],
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./site-footer.component.html",
})
export class SiteFooterComponent {}
