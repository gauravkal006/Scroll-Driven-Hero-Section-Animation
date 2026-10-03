"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Car from "./Car";
import StatCard from "./StatCard";
import { statsTop, statsBottom } from "@/data/stats";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WORDS = ["WELCOME", "ITZFIZZ"];

// paint edge sits this far into the car (fraction of car width)
const PAINT_LEAD = 0.3;

function Headline({ variant }) {
  const tone = variant === "ghost" ? "headline-ghost" : "text-ink";
  return (
    <div
      aria-hidden
      className={`headline font-wide absolute inset-0 flex items-center justify-between pl-[calc(var(--road-h)*0.62)] pr-[4vw] font-extrabold ${tone}`}
    >
      {WORDS.map((word, w) => (
        <Fragment key={word}>
          {w > 0 && <span className="w-[0.35em]" />}
          {word.split("").map((ch, i) => (
            <span key={i} className="letter inline-block">
              {ch}
            </span>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

// only care about width changes (mobile url bar changes height)
function useViewportWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let timer;
    let last = window.innerWidth;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.innerWidth !== last) {
          last = window.innerWidth;
          setWidth(last);
        }
      }, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return width;
}

export default function Hero() {
  const root = useRef(null);
  const road = useRef(null);
  const paint = useRef(null);
  const paintInner = useRef(null);
  const carIntro = useRef(null);
  const car = useRef(null);
  const tilt = useRef(null);
  const streaks = useRef(null);
  const bandTop = useRef(null);
  const bandBottom = useRef(null);
  const hint = useRef(null);

  const viewportWidth = useViewportWidth();

  // scroll animation
  useGSAP(
    () => {
      const W = road.current.clientWidth;
      const roadLeft = road.current.getBoundingClientRect().left;
      const cw = car.current.offsetWidth;
      const lead = cw * PAINT_LEAD;

      const x0 = -cw * 0.64;
      const x1 = W + cw * 0.1;
      // timeline progress when the paint edge reaches x
      const at = (x) => gsap.utils.clamp(0, 1, (x - lead - x0) / (x1 - x0));
      const paintDone = at(W);

      const headStyle = getComputedStyle(road.current.querySelector(".headline"));
      const centreShift = (parseFloat(headStyle.paddingLeft) - parseFloat(headStyle.paddingRight)) / 2;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.6,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(car.current, { x: x0 }, { x: x1, duration: 1 }, 0)
        .fromTo(paint.current, { x: x0 + lead - W }, { x: 0, duration: paintDone }, 0)
        .fromTo(paintInner.current, { x: W - x0 - lead }, { x: 0, duration: paintDone }, 0)
        // center the headline after the car leaves
        .to(
          paintInner.current.querySelector(".headline"),
          { x: -centreShift, duration: 1 - paintDone, ease: "power2.inOut" },
          paintDone,
        )
        .to(hint.current, { autoAlpha: 0, y: 12, duration: 0.06 }, 0)
        .to(bandTop.current, { y: -28, duration: 1 }, 0)
        .to(bandBottom.current, { y: 28, duration: 1 }, 0);

      // fill each card when the car passes it
      gsap.utils.toArray(".stat", root.current).forEach((card) => {
        const rect = card.getBoundingClientRect();
        const t = at(rect.left + rect.width / 2 - roadLeft);
        tl.fromTo(
          card.querySelector(".stat-fill"),
          { scaleY: 0 },
          { scaleY: 1, duration: 0.08, ease: "power2.out" },
          t,
        );
        if (card.dataset.tone === "ink") {
          tl.to(card.querySelector(".stat-body"), { color: "#ffffff", duration: 0.05 }, t + 0.02);
        }
      });

      tl.to({}, { duration: 0.12 });

      // tilt the car based on scroll speed
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const rotateTo = gsap.quickTo(tilt.current, "rotation", { duration: 0.6, ease: "power3.out" });
      const streakTo = gsap.quickTo(streaks.current, "scaleX", { duration: 0.45, ease: "power2.out" });
      let lastY = window.scrollY;
      let velocity = 0;
      let lastRot = 0;

      const tick = () => {
        const y = window.scrollY;
        velocity += (y - lastY - velocity) * 0.18;
        lastY = y;
        if (Math.abs(velocity) < 0.05) velocity = 0;

        const rot = gsap.utils.clamp(-3.5, 3.5, velocity * 0.18);
        if (Math.abs(rot - lastRot) > 0.01) {
          lastRot = rot;
          rotateTo(rot);
          streakTo(gsap.utils.clamp(0, 1, Math.abs(velocity) / 22));
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root, dependencies: [viewportWidth], revertOnUpdate: true },
  );

  // intro animation on load
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current, { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const nums = gsap.utils.toArray(".stat-num");
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

        tl.set(root.current, { autoAlpha: 1 })
          .from(".intro-nav > *", { y: -12, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0)
          .from(".asphalt", { scaleX: 0, transformOrigin: "0% 50%", duration: 1.15, ease: "expo.inOut" }, 0.05)
          .from(".road-line", { scaleX: 0, transformOrigin: "0% 50%", duration: 1.3, ease: "expo.inOut", stagger: 0.1 }, 0.2)
          .from(
            ".headline-ghost .letter",
            { yPercent: 110, autoAlpha: 0, duration: 1, ease: "power4.out", stagger: 0.04 },
            0.6,
          )
          .from(carIntro.current, { x: () => -car.current.offsetWidth * 1.1, duration: 1.6, ease: "power3.out" }, 0.75)
          .from(".stat", { y: 34, autoAlpha: 0, duration: 1, stagger: 0.14 }, 1.15);

        nums.forEach((el, i) => {
          tl.from(
            el,
            { textContent: 0, snap: { textContent: 1 }, duration: 1.4, ease: "power2.out" },
            1.15 + i * 0.14,
          );
        });

        tl.from(".hint-inner", { y: 8, autoAlpha: 0, duration: 0.8 }, 1.8);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero relative h-svh min-h-[580px] w-full overflow-hidden bg-paper">
      <h1 className="sr-only">Welcome to Itzfizz</h1>

      <header className="intro-nav absolute inset-x-0 top-0 z-20 flex h-14 items-center justify-between px-4 md:h-16 md:px-10">
        <span className="font-wide text-lg font-extrabold tracking-tight md:text-xl">
          itzfizz<span className="text-flame">.</span>
        </span>
      </header>

      <div className="flex h-full flex-col pt-14 md:pt-16">
        {/* top cards */}
        <div
          ref={bandTop}
          className="grid flex-1 grid-cols-2 content-end gap-3 px-4 pb-4 md:grid-cols-12 md:gap-5 md:px-10 md:pb-6"
        >
          <StatCard {...statsTop[0]} className="md:col-span-3 md:col-start-7" />
          <StatCard {...statsTop[1]} className="md:col-span-3 md:col-start-10" />
        </div>

        {/* road */}
        <div ref={road} className="relative h-[var(--road-h)] w-full shrink-0 overflow-hidden">
          <div className="asphalt absolute inset-0 bg-road" />
          <div className="road-line absolute inset-x-0 top-[10px] h-px bg-white/10" />
          <div className="road-line absolute inset-x-0 bottom-[10px] h-px bg-white/10" />

          <Headline variant="ghost" />

          <div ref={paint} className="absolute inset-0 overflow-hidden will-change-transform">
            <div ref={paintInner} className="absolute inset-0 bg-lime will-change-transform">
              <Headline variant="solid" />
            </div>
          </div>

          <div ref={carIntro} className="absolute inset-y-[18%] left-0 z-10">
            <div ref={car} className="aspect-[11/5] h-full will-change-transform">
              <div ref={tilt} className="relative h-full">
                <div
                  ref={streaks}
                  aria-hidden
                  className="absolute right-[92%] top-0 flex h-full w-[60%] origin-right flex-col justify-center gap-[14%]"
                  style={{ transform: "scaleX(0)" }}
                >
                  <span className="h-[2px] w-full bg-gradient-to-r from-transparent to-white/45" />
                  <span className="ml-[30%] h-[2px] w-[70%] bg-gradient-to-r from-transparent to-white/30" />
                  <span className="h-[2px] w-full bg-gradient-to-r from-transparent to-white/45" />
                </div>
                <Car className="relative block h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* bottom cards */}
        <div
          ref={bandBottom}
          className="grid flex-1 grid-cols-2 content-start gap-3 px-4 pt-4 md:grid-cols-12 md:gap-5 md:px-10 md:pt-6"
        >
          <StatCard {...statsBottom[0]} className="md:col-span-3 md:col-start-3" />
          <StatCard {...statsBottom[1]} className="md:col-span-3 md:col-start-7" />
        </div>
      </div>

      <div ref={hint} className="absolute bottom-5 left-4 md:bottom-7 md:left-10">
        <div className="hint-inner flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 md:text-[11px]">
          Scroll to drive
          <span className="relative h-px w-11 bg-ink/20">
            <span className="scroll-dot absolute -top-[2px] left-0 h-[5px] w-[5px] rounded-full bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}
