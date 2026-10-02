import { SiteHeaderComponent } from "../sections/site-header/site-header.component";
import { HeroComponent } from "../sections/hero/hero.component";
import { ScrollStoryComponent } from "../sections/scroll-story/scroll-story.component";
import { ServicesComponent } from "../sections/services/services.component";
import { ProcessComponent } from "../sections/process/process.component";
import { WebTypesComponent } from "../sections/web-types/web-types.component";
import { MaintenanceComponent } from "../sections/maintenance/maintenance.component";
import { FaqComponent } from "../sections/faq/faq.component";
import { ContactComponent } from "../sections/contact/contact.component";
import { SiteFooterComponent } from "../sections/site-footer/site-footer.component";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
} from "@angular/core";

import { createHomeAnimations, type HomeAnimations } from "./home.animations";

@Component({
  selector: "app-home",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteHeaderComponent,
    HeroComponent,
    ScrollStoryComponent,
    ServicesComponent,
    ProcessComponent,
    WebTypesComponent,
    MaintenanceComponent,
    FaqComponent,
    ContactComponent,
    SiteFooterComponent,
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private animations?: HomeAnimations;

  refreshScroll(): void {
    this.zone.runOutsideAngular(() => this.animations?.refresh());
  }
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.animations = createHomeAnimations(this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.animations?.destroy();
    this.animations = undefined;
  }
}
