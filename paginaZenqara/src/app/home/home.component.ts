import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from "@angular/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: "app-home",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private media?: gsap.MatchMedia;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.animate());
  }

  private animate(): void {
    gsap.registerPlugin(ScrollTrigger);
    const root = this.host.nativeElement;
    const story = root.querySelector<HTMLElement>(".scroll-story");
    const demo = root.querySelector<HTMLElement>(".web-demo");
    const title = root.querySelector<HTMLElement>("#story-title");
    const description = root.querySelector<HTMLElement>("#story-description");
    if (!story || !demo || !title || !description) return;

    const stages = [
      [
        "Todo empieza<br>con una idea.",
        "Damos estructura a lo que quieres contar.",
      ],
      [
        "Una web que se adapta.<br>A ti. Y a tu cliente.",
        "Desarrollamos una experiencia para móvil, tablet y ordenador.",
      ],
      [
        "Y seguimos<br>cuidando de ella.",
        "Mantenemos el servidor de la web que hemos creado para ti.",
      ],
    ];
    const dots = root.querySelectorAll(".story-progress span");
    this.media = gsap.matchMedia();
    this.media.add(
      {
        desktop: "(min-width: 701px)",
        mobile: "(max-width: 700px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const reduced = context.conditions?.["reduced"];
        const mobile = context.conditions?.["mobile"];
        const cards = root.querySelectorAll(
          ".service-list article, .steps article, .contact h2, .device-layout article, .maintenance-items article, .checklist-grid article",
        );
        if (reduced) {
          gsap.set(demo, { "--build": 1, "--narrow": 0 });
          gsap.set(story, { "--server": 1 });
          gsap.set(cards, { opacity: 1, y: 0 });
          title.innerHTML = "Tu web.<br>De principio a fin.";
          description.textContent =
            "Diseño adaptable, desarrollo y mantenimiento de su servidor.";
          return;
        }

        let phase = -1;
        const updateStage = (progress: number): void => {
          const next = Math.min(2, Math.floor(progress * 3));
          if (next === phase) return;
          phase = next;
          story.dataset["phase"] = String(next);
          title.innerHTML = stages[next][0];
          description.textContent = stages[next][1];
          dots.forEach((dot, index) =>
            dot.classList.toggle("active", index === next),
          );
          gsap.fromTo(
            [title, description],
            { opacity: 0.35, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, overwrite: true },
          );
        };

        gsap.set(demo, { "--build": 0, "--narrow": 0 });
        gsap.set(story, { "--server": 0 });
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: story,
            start: "top top+=77",
            end: () =>
              `+=${Math.max(1, story.offsetHeight - window.innerHeight)}`,
            scrub: mobile ? 0.25 : 0.65,
            invalidateOnRefresh: true,
          },
          onUpdate: () => updateStage(timeline.progress()),
        });
        timeline
          .to(demo, { "--build": 1, duration: 0.3 }, 0)
          .to(demo, { "--narrow": 1, duration: 0.22 }, 0.36)
          .to(story, { "--server": 1, duration: 0.2 }, 0.7)
          .to({}, { duration: 0.1 }, 0.9);
        updateStage(0);

        gsap.fromTo(
          root.querySelector(".identity"),
          { y: 0, scale: 1 },
          {
            y: mobile ? 12 : 35,
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
        cards.forEach((card) =>
          gsap.from(card, {
            y: mobile ? 18 : 35,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }),
        );

        root
          .querySelectorAll(".word-reveal span")
          .forEach((word) =>
            gsap.fromTo(
              word,
              { opacity: 0.15, y: 30 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: word,
                  start: "top 85%",
                  end: "top 45%",
                  scrub: 0.5,
                },
              },
            ),
          );
        root.querySelectorAll(".stack-card").forEach((card, index) => {
          if (index < 2)
            gsap.to(card, {
              scale: mobile ? 0.97 : 0.94,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: card.nextElementSibling,
                start: "top 80%",
                end: "top 25%",
                scrub: 0.5,
              },
            });
        });
        gsap.fromTo(
          root.querySelector(".responsive-section h2"),
          { y: 30 },
          {
            y: -15,
            ease: "none",
            scrollTrigger: {
              trigger: ".responsive-section",
              start: "top 80%",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
        return () => gsap.killTweensOf([title, description]);
      },
      root,
    );
    document.fonts.ready.then(() => {
      if (this.media) ScrollTrigger.refresh();
    });
  }

  ngOnDestroy(): void {
    this.media?.revert();
    this.media = undefined;
  }
}
