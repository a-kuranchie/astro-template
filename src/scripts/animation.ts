import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const initPageAnimations =
  () => {
    initLenis();
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        const tl = gsap.timeline({
          duration: 1.15,
          ease: "power3.inOut",
        });

        tl.add(indexTween())
          .add(headerTween())
          .add(footerTween(), "<");
      },
    );
  };

const initLenis = () => {
  const lenis = new Lenis({
    autoRaf: true,
  });

  lenis.on(
    "scroll",
    ScrollTrigger.update,
  );

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.addEventListener(
    "astro:after-swap",
    () => {
      lenis?.scrollTo(0, {
        immediate: true,
      });
      ScrollTrigger.refresh();
    },
  );
};

const indexTween = () => {
  const tl = gsap.timeline();
  tl.set("main", {
    autoAlpha: 1,
  });
  tl.from("h1", {
    autoAlpha: 0,
    y: "2rem",
  }).from(
    "p",
    {
      autoAlpha: 0,
      y: "1rem",
    },
    "-=0.15",
  );
  return tl;
};

const headerTween = () => {
  const tl = gsap.timeline({});

  tl.set("nav", { autoAlpha: 1 });
  tl.from(".logo", {
    autoAlpha: 0,
    y: "-2rem",
  }).from(
    ".nav-links li",
    {
      autoAlpha: 0,
      y: "-2rem",
      stagger: 0.1,
    },
    "<",
  );
  return tl;
};

const footerTween = () => {
  const tl = gsap.timeline({});

  tl.set("footer", { autoAlpha: 1 });
  tl.from(
    "footer div",
    {
      autoAlpha: 0,
      y: "2rem",
      stagger: 0.1,
    },
    "<",
  );

  return tl;
};
