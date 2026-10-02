import { MailLinkComponent } from "../../shared/mail-link/mail-link.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "app-site-footer",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MailLinkComponent],
  host: { style: "display: contents" },
  templateUrl: "./site-footer.component.html",
})
export class SiteFooterComponent {
  readonly year = new Date().getFullYear();
}
