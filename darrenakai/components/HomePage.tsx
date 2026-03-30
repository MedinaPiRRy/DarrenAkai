"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { easeOut } from "motion";

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  const aboutInView = useInView(aboutRef, { amount: 0.3 });
  const footerInView = useInView(footerRef, { amount: 0.3 });

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setShowNavbar(heroBottom <= 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-black text-white">
      {showNavbar && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#home" className="text-sm font-semibold tracking-[0.2em] uppercase">
              Darren Akai
            </a>

            <div className="flex gap-6 text-sm text-zinc-300">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          </div>
        </motion.nav>
      )}

      <section
        id="home"
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center px-6"
      >
        <motion.div
          initial="hidden"
          animate="visible"
         variants={staggerContainer}
          className="max-w-4xl text-center"
        >
          <motion.p
           variants={fadeUp}
            className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-400"
          >
            Portfolio
          </motion.p>

          <motion.h1
           variants={fadeUp}
            className="text-5xl font-bold md:text-7xl"
          >
            Darren Akai
          </motion.h1>

          <motion.p
           variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300"
          >
            Creative developer crafting modern, elegant digital experiences.
          </motion.p>

          <motion.div
           variants={fadeUp}
            className="mt-8 flex justify-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 text-black transition hover:scale-105"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white px-6 py-3 transition hover:bg-white hover:text-black"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{
            opacity: { duration: 1, delay: 0.2 },
            y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-zinc-400">
            <span className="mb-2 text-xs uppercase tracking-[0.25em]">
              Scroll
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </motion.a>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="flex min-h-screen items-center px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-5xl"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
            About
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Building premium digital experiences.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            Darren Akai is a creative developer focused on elegant interfaces,
            strong branding, immersive web interactions, and modern user
            experiences that feel polished and memorable.
          </p>
        </motion.div>
      </section>

      <section
        id="projects"
        className="min-h-screen px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
            Projects
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Selected work
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((project) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8"
              >
                <h3 className="text-2xl font-semibold">Project {project}</h3>
                <p className="mt-4 text-zinc-400">
                  A premium web experience with smooth interactions, bold layout,
                  and strong visual identity.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="contact"
        ref={footerRef}
        className="border-t border-white/10 px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
            Contact
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Let’s build something unforgettable.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
            Reach out for collaborations, projects, or creative partnerships.
          </p>

          <a
            href="mailto:hello@darrenakai.com"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-black transition hover:scale-105"
          >
            Send an Email
          </a>
        </motion.div>
      </footer>
    </main>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      className="group relative text-sm text-zinc-300 transition hover:text-white"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <span>{children}</span>

      <motion.span
        variants={{
          rest: { scaleX: 0, originX: 0 },
          hover: { scaleX: 1, originX: 0 },
        }}
        transition={{ duration: 0.25 }}
        className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-white"
      />
    </motion.a>
  );
}