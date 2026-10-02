import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HomeComponent } from "./home/home.component";
@Component({
  selector: "app-root",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeComponent],
  template: "<app-home />",
})
export class AppComponent {}
