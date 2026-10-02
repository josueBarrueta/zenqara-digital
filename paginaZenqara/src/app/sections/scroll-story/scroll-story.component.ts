import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
@Component({
  selector: "app-scroll-story",
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  templateUrl: "./scroll-story.component.html",
})
export class ScrollStoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("showcase") showcase!: ElementRef<HTMLElement>;
  @ViewChildren("sceneProgress") bars!: QueryList<ElementRef<HTMLElement>>;
  private readonly zone = inject(NgZone);
  private readonly changes = inject(ChangeDetectorRef);
  readonly scenes = [
    {
      label: "Escuchamos",
      title: "Primero, tu visión.",
      duration: 8,
      text: "Hablamos contigo para entender tu negocio, tus clientes y lo que quieres conseguir. Reunimos ideas, referencias y necesidades; juntos damos una dirección al proyecto.",
      beats: [
        "Nos cuentas tu idea.",
        "Escuchamos tus necesidades.",
        "Conectamos ideas y referencias.",
        "Definimos contigo el proyecto.",
      ],
    },
    {
      label: "Construimos",
      title: "De la idea a una web real.",
      duration: 14,
      text: "Las piezas pasan del boceto a una página funcional: aparecen los contenidos y se conectan con los datos. Cada elemento ocupa su lugar hasta que el conjunto está listo.",
      beats: [
        "Trazamos la estructura.",
        "Damos forma al contenido.",
        "Conectamos la base de datos.",
        "El conjunto, construido y conectado.",
      ],
    },
    {
      label: "Acompañamos",
      title: "La web sigue. Nosotros también.",
      duration: 8,
      text: "Una consulta entra en la web, el servidor la procesa y la base de datos guarda o devuelve la información. El recorrido muestra lo que ocurre detrás de cada interacción y cómo nos haces llegar una nueva idea.",
      beats: [
        "Tu web recibe y envía información.",
        "El servidor conecta cada petición.",
        "Los datos se organizan y se consultan.",
        "¿Una nueva idea? Seguimos contigo.",
      ],
    },
  ];
  active = 0;
  elapsed = 0;
  paused = false;
  visible = false;
  reduced = false;
  pageVisible = !document.hidden;
  private frame?: number;
  private lastFrame = 0;
  private state = -1;
  private observer?: IntersectionObserver;
  private media?: MediaQueryList;
  private readonly constructionMilestones = [
    0.16, 0.28, 0.32, 0.36, 0.4, 0.46, 0.52, 0.55,
  ];
  get playing(): boolean {
    return this.visible && this.pageVisible && !this.paused && !this.reduced;
  }
  get current() {
    return this.scenes[this.active];
  }
  get progress() {
    return this.elapsed / this.current.duration;
  }
  get visualProgress() {
    return this.progress;
  }
  get beat() {
    return Math.min(3, Math.floor(this.visualProgress * 4));
  }
  select(index: number): void {
    this.active = index;
    this.elapsed = this.reduced ? this.current.duration * 0.99 : 0;
    this.updateView();
  }
  seek(index: number): void {
    this.elapsed = this.current.duration * (index / 4 + 0.01);
    this.updateView();
  }
  togglePlayback(): void {
    this.paused = !this.paused;
    this.syncPlayback();
  }
  private updateBars(): void {
    this.bars?.forEach((bar, index) => {
      if (index === this.active) {
        bar.nativeElement.style.transform = `scaleX(${this.progress})`;
      } else if (bar.nativeElement.style.transform !== "scaleX(0)") {
        bar.nativeElement.style.transform = "scaleX(0)";
      }
    });
  }
  private updateView(): void {
    this.updateBars();
    // Keep frame-by-frame progress outside Angular; render only at scene milestones.
    let milestone = 0;
    if (this.active === 1) {
      for (const point of this.constructionMilestones) {
        if (this.visualProgress < point) break;
        milestone++;
      }
    }
    const state = this.active * 100 + this.beat * 10 + milestone;
    if (state === this.state) return;
    this.state = state;
    this.zone.run(() => this.changes.markForCheck());
  }
  private readonly tick = (now: number): void => {
    this.frame = undefined;
    if (!this.playing) return;
    this.elapsed += (now - this.lastFrame) / 1000;
    this.lastFrame = now;
    while (this.elapsed >= this.current.duration) {
      this.elapsed -= this.current.duration;
      this.active = (this.active + 1) % this.scenes.length;
    }
    this.updateView();
    this.frame = requestAnimationFrame(this.tick);
  };
  private syncPlayback(): void {
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    this.frame = undefined;
    this.zone.run(() => this.changes.markForCheck());
    if (!this.playing) return;
    this.zone.runOutsideAngular(() => {
      this.lastFrame = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    });
  }
  private readonly visibilityChange = (): void => {
    this.pageVisible = !document.hidden;
    this.syncPlayback();
  };
  private readonly motionChange = () => {
    this.reduced = this.media?.matches ?? false;
    if (this.reduced) {
      this.paused = true;
      this.elapsed = this.current.duration * 0.99;
    }
    this.updateView();
    this.syncPlayback();
  };
  ngOnInit(): void {
    this.media = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.motionChange();
    this.media.addEventListener("change", this.motionChange);
  }
  ngAfterViewInit(): void {
    this.updateBars();
    this.zone.runOutsideAngular(() => {
      document.addEventListener("visibilitychange", this.visibilityChange);
      this.observer = new IntersectionObserver(
        ([entry]) => {
          this.visible = entry.isIntersecting;
          this.syncPlayback();
        },
        { threshold: 0.15 },
      );
      this.observer.observe(this.showcase.nativeElement);
    });
  }
  ngOnDestroy(): void {
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    document.removeEventListener("visibilitychange", this.visibilityChange);
    this.observer?.disconnect();
    this.media?.removeEventListener("change", this.motionChange);
  }
}
