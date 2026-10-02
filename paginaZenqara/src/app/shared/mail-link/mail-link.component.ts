import { ChangeDetectionStrategy, Component } from "@angular/core";
@Component({
  selector: "a[appMailLink]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./mail-link.component.html",
  host: {
    "[attr.href]": "composeUrl",
    target: "_blank",
    rel: "noopener noreferrer",
    "[attr.aria-label]": "label",
  },
})
export class MailLinkComponent {
  private readonly email = "zenqara.digital@gmail.com";
  readonly label = `Escribir a ${this.email} en Gmail (se abre en otra pestaña)`;
  readonly composeUrl = `https://mail.google.com/mail/?${new URLSearchParams({
    view: "cm",
    fs: "1",
    to: this.email,
    su: "Mi proyecto web",
  })}`;
}
