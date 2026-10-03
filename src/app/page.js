import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
      </main>

      <footer className="bg-ink px-4 py-6 text-sm text-paper/60 md:px-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 itzfizz</p>
          <p>
            Made by{" "}
            <a
              href="https://github.com/gauravkal006"
              target="_blank"
              rel="noreferrer"
              className="text-paper underline-offset-4 hover:text-lime hover:underline"
            >
              gauravkal006
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
