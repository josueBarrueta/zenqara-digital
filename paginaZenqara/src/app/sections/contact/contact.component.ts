import { MailLinkComponent } from "../../shared/mail-link/mail-link.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-contact",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MailLinkComponent],
  host: { style: "display: contents" },
  templateUrl: "./contact.component.html",
})
export class ContactComponent {}
