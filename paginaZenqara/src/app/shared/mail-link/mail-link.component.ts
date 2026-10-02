import { Component } from "@angular/core";
@Component({
  selector: "a[appMailLink]",
  standalone: true,
  templateUrl: "./mail-link.component.html",
  host: {
    "[attr.href]": "composeUrl",
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label":
      "Escribir a zenqara.digital@gmail.com en Gmail (se abre en otra pestaña)",
  },
})
export class MailLinkComponent {
  readonly composeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=zenqara.digital%40gmail.com&su=Mi%20proyecto%20web";
}
