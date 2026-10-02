import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HomeAnimations {
  refresh(): void;
  destroy(): void;
  setStoryPaused(paused: boolean): void;
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
  let storyTimeline: gsap.core.Timeline | undefined;
  let userPaused = false;
  let storyVisible = false;
  const syncPlayback = (): void => {
    if (!storyVisible || userPaused || document.hidden) storyTimeline?.pause();
    else storyTimeline?.play();
  };
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
        gsap.set(demo, { width: "100%", rotateY: 0, y: 0 });
        gsap.set(root.querySelector(".server-diagram"), { opacity: 1, y: 0 });
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

      reveal(
        ".responsive-section > .eyebrow, .project-checklist > .eyebrow, .stack-card > h3, .stack-card > p, .card-keywords, .hero-bottom",
        { y: mobile ? 12 : 24, duration: 0.75 },
      );
      root
        .querySelectorAll(
          ".steps article > span, .maintenance-items article > span, .checklist-grid article > span",
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
      };

      const server = root.querySelector(".server-diagram");
      const timeline = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.3,
        defaults: { ease: "power2.inOut" },
        onUpdate: () => updateStage(timeline.progress()),
      });
      storyTimeline = timeline;
      timeline
        .fromTo(
          root.querySelector(".story-visual"),
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0,
        )
        .fromTo(demo, { rotateY: -5 }, { rotateY: 0, duration: 1.3 }, 0)
        .fromTo(
          demo,
          { width: "100%" },
          { width: mobile ? "72%" : "52%", duration: 1.8 },
          4,
        )
        .fromTo(
          server,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.3 },
          8,
        )
        .fromTo(demo, { y: 0 }, { y: -12, duration: 1.3 }, 8)
        .to(
          root.querySelector(".story-visual"),
          { opacity: 0, duration: 0.4 },
          11.6,
        );
      updateStage(0);
      const playbackTrigger = ScrollTrigger.create({
        trigger: story,
        start: "top 85%",
        end: "bottom 15%",
        onToggle: (trigger) => {
          storyVisible = trigger.isActive;
          syncPlayback();
        },
      });
      storyVisible = playbackTrigger.isActive;
      syncPlayback();
      document.addEventListener("visibilitychange", syncPlayback);

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
        ".section-heading, .maintenance-intro, .project-checklist > h2, .faq-intro, .manifesto > p, .responsive-note, .contact > .eyebrow, .contact-bottom",
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
      return () => {
        document.removeEventListener("visibilitychange", syncPlayback);
        storyTimeline = undefined;
        gsap.killTweensOf([title, description]);
      };
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
    setStoryPaused(paused: boolean): void {
      userPaused = paused;
      syncPlayback();
    },
    destroy(): void {
      active = false;
      if (pendingRefresh !== undefined) cancelAnimationFrame(pendingRefresh);
      media.revert();
    },
  };
}

