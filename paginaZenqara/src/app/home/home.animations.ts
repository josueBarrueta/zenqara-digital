import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HomeAnimations {
  refresh(): void;
  destroy(): void;
}

export function createHomeAnimations(
  root: HTMLElement,
): HomeAnimations | undefined {
  gsap.registerPlugin(ScrollTrigger);
  const story = root.querySelector<HTMLElement>(".scroll-story");
  const demo = root.querySelector<HTMLElement>(".web-demo");
  const title = root.querySelector<HTMLElement>("#story-title");
  const description = root.querySelector<HTMLElement>("#story-description");
  if (!story || !demo || !title || !description) return undefined;

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
  const media = gsap.matchMedia();
  media.add(
    {
      desktop: "(min-width: 701px)",
      mobile: "(max-width: 700px)",
      reduced: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const reduced = context.conditions?.["reduced"];
      const mobile = context.conditions?.["mobile"];
      const cardSelector =
        ".service-list article, .steps article, .contact h2, .device-layout article, .maintenance-items article, .checklist-grid article";
      const cards = root.querySelectorAll(cardSelector);
      if (reduced) {
        gsap.set(demo, { "--build": 1, "--narrow": 0 });
        gsap.set(story, { "--server": 1 });
        gsap.set(cards, { opacity: 1, y: 0 });
        title.innerHTML = "Tu web.<br>De principio a fin.";
        description.textContent =
          "Diseño adaptable, desarrollo y mantenimiento de su servidor.";
        return;
      }

      const reveal = (
        selector: string,
        vars: gsap.TweenVars,
        start = "top 92%",
      ): void => {
        root.querySelectorAll(selector).forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            ease: "power3.out",
            ...vars,
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: "play none none reverse",
            },
          });
        });
      };

      // La línea acompaña el recorrido sin cambiar la distribución.
      root
        .querySelectorAll<HTMLElement>(
          "main section:not(.hero):not(.scroll-story)",
        )
        .forEach((section) => {
          gsap.fromTo(
            section,
            { "--section-progress": 0 },
            {
              "--section-progress": 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 65%",
                scrub: 0.6,
              },
            },
          );
        });
      reveal(
        ".responsive-section > .eyebrow, .project-checklist > .eyebrow, .stack-card > h3, .stack-card > p, .card-keywords, .hero-bottom",
        { y: mobile ? 12 : 24, duration: 0.75 },
      );
      root
        .querySelectorAll(
          ".steps article > span, .maintenance-items article > span, .checklist-grid article > span, .device-symbol",
        )
        .forEach((number) => {
          gsap.fromTo(
            number,
            { opacity: 0.25, y: 12 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: number,
                start: "top 88%",
                end: "top 55%",
                scrub: 0.4,
              },
            },
          );
        });

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
      reveal(
        ".section-heading, .maintenance-intro, .project-checklist > h2, .faq > h2, .faq > .eyebrow, .manifesto > p, .responsive-note, .contact > .eyebrow, .contact-bottom",
        { y: mobile ? 16 : 28, duration: 0.8 },
        "top 90%",
      );
      root.querySelectorAll(".faq details").forEach((item, index) => {
        gsap.from(item, {
          x: mobile ? 0 : -20,
          y: mobile ? 12 : 0,
          opacity: 0,
          duration: 0.55,
          delay: (index % 3) * 0.06,
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      });
      gsap.fromTo(
        root.querySelector(".responsive-section"),
        {
          clipPath: mobile
            ? "inset(0 8% 0 8% round 24px)"
            : "inset(0 18% 0 18% round 40px)",
        },
        {
          clipPath: "inset(0 0% 0 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".responsive-section",
            start: "top 100%",
            end: "top 20%",
            scrub: 0.5,
          },
        },
      );
      const adaptive = root.querySelector<HTMLElement>(".adaptive-visual");
      if (adaptive) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: adaptive,
              start: "top 85%",
              end: "bottom 25%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            adaptive,
            {
              "--screen-width": 100,
              "--screen-height": 230,
              "--screen-radius": 8,
              "--tile-columns": 3,
            },
            {
              "--screen-width": 65,
              "--screen-height": 270,
              "--screen-radius": 18,
              "--tile-columns": 2,
              duration: 1,
              ease: "none",
            },
          )
          .to(adaptive, {
            "--screen-width": 36,
            "--screen-height": 310,
            "--screen-radius": 28,
            "--tile-columns": 1,
            duration: 1,
            ease: "none",
          });
        root
          .querySelectorAll(".adaptive-labels span")
          .forEach((label, index) => {
            gsap.fromTo(
              label,
              { opacity: index === 0 ? 1 : 0.35 },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: adaptive,
                  start: "top " + (85 - index * 20) + "%",
                  end: "bottom 25%",
                  scrub: true,
                },
              },
            );
          });
      }
      reveal(
        cardSelector,
        { y: mobile ? 18 : 35, duration: 0.7, ease: "power2.out" },
        "top 88%",
      );

      root.querySelectorAll(".word-reveal span").forEach((word) =>
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
  let active = true;
  let pendingRefresh: number | undefined;
  const refresh = (): void => {
    if (!active || pendingRefresh !== undefined) return;
    pendingRefresh = requestAnimationFrame(() => {
      pendingRefresh = undefined;
      if (active) ScrollTrigger.refresh();
    });
  };
  document.fonts.ready.then(refresh);

  return {
    refresh,
    destroy(): void {
      active = false;
      if (pendingRefresh !== undefined) cancelAnimationFrame(pendingRefresh);
      media.revert();
    },
  };
}
