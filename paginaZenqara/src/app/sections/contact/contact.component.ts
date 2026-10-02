import { MailLinkComponent } from "../../shared/mail-link/mail-link.component";
import { Component, ViewEncapsulation } from "@angular/core";
@Component({
  selector: "app-contact",
  standalone: true,
  imports: [MailLinkComponent],
  encapsulation: ViewEncapsulation.None,
  host: { style: "display: contents" },
  templateUrl: "./contact.component.html",
})
export class ContactComponent {}
