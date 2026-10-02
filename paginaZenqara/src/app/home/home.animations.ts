import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HomeAnimations {
  refresh(): void;
  destroy(): void;
}

export function createHomeAnimations(root: HTMLElement): HomeAnimations {
  gsap.registerPlugin(ScrollTrigger);
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
        ".service-list article, .steps article, .maintenance-items article";
      const cards = root.querySelectorAll(cardSelector);
      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
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
        ".stack-card > h3, .stack-card > p, .card-keywords, .hero-bottom",
        { y: mobile ? 12 : 24, duration: 0.75 },
      );
      root
        .querySelectorAll(
          ".steps article > span, .maintenance-items article > span",
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
        ".section-heading, .maintenance-intro, .faq-intro",
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
      reveal(
        cardSelector,
        { y: mobile ? 18 : 35, duration: 0.7, ease: "power2.out" },
        "top 88%",
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
    },
    root,
  );
  let active = true;
  const movingSections = root.querySelectorAll<HTMLElement>(
    ".hero, .service-list article, .maintenance-section",
  );
  const visibleSections = new Set<HTMLElement>();
  const updateMotion = (): void => {
    movingSections.forEach((element) => {
      const animated = String(visibleSections.has(element) && !document.hidden);
      if (element.dataset["animated"] !== animated)
        element.dataset["animated"] = animated;
    });
  };
  const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) visibleSections.add(element);
      else visibleSections.delete(element);
    });
    updateMotion();
  });
  movingSections.forEach((element) => motionObserver.observe(element));
  document.addEventListener("visibilitychange", updateMotion);
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
      motionObserver.disconnect();
      document.removeEventListener("visibilitychange", updateMotion);
      movingSections.forEach((element) => delete element.dataset["animated"]);
      if (pendingRefresh !== undefined) cancelAnimationFrame(pendingRefresh);
      media.revert();
    },
  };
}
