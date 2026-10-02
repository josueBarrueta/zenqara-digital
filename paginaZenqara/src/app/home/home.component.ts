import { SiteHeaderComponent } from "../sections/site-header/site-header.component";
import { HeroComponent } from "../sections/hero/hero.component";
import { ScrollStoryComponent } from "../sections/scroll-story/scroll-story.component";
import { ServicesComponent } from "../sections/services/services.component";
import { ProcessComponent } from "../sections/process/process.component";
import { ManifestoComponent } from "../sections/manifesto/manifesto.component";
import { WebTypesComponent } from "../sections/web-types/web-types.component";
import { ResponsiveComponent } from "../sections/responsive/responsive.component";
import { MaintenanceComponent } from "../sections/maintenance/maintenance.component";
import { ProjectChecklistComponent } from "../sections/project-checklist/project-checklist.component";
import { FaqComponent } from "../sections/faq/faq.component";
import { ContactComponent } from "../sections/contact/contact.component";
import { SiteFooterComponent } from "../sections/site-footer/site-footer.component";
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from "@angular/core";

import { createHomeAnimations, type HomeAnimations } from "./home.animations";

@Component({
  selector: "app-home",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SiteHeaderComponent,
    HeroComponent,
    ScrollStoryComponent,
    ServicesComponent,
    ProcessComponent,
    ManifestoComponent,
    WebTypesComponent,
    ResponsiveComponent,
    MaintenanceComponent,
    ProjectChecklistComponent,
    FaqComponent,
    ContactComponent,
    SiteFooterComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private animations?: HomeAnimations;

  setStoryPaused(paused: boolean): void {
    this.zone.runOutsideAngular(() => this.animations?.setStoryPaused(paused));
  }

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
