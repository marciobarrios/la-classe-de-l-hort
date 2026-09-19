import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  Flower2,
  Heart,
  Leaf,
  Puzzle,
  Shovel,
  Snowflake,
  Sprout,
  Sun,
} from "lucide-react";
import { seasons, vegetables, type Season, type Vegetable } from "./data";
import { Modal, VegetableArt, primaryButton } from "./ui";
import Growing from "./Growing";
import Game from "./Game";
import Family from "./Family";

type Page = "explorem" | "hortola" | "juguem";
const nav = [
  { id: "explorem", label: "Explorem l’hort", icon: Sprout },
  { id: "hortola", label: "Fem d’hortolans", icon: Shovel },
  { id: "juguem", label: "Juguem", icon: Puzzle },
] as const;
const seasonIcons = {
  primavera: Flower2,
  estiu: Sun,
  tardor: Leaf,
  hivern: Snowflake,
};
function getPage(): Page {
  const h = location.hash.slice(1);
  return h === "hortola" || h === "juguem" ? h : "explorem";
}
function getLetterSetting() {
  try {
    return localStorage.getItem("hort-lletra-pal") !== "false";
  } catch {
    return true;
  }
}

function Explore({ onChoose }: { onChoose: (v: Vegetable) => void }) {
  const [season, setSeason] = useState<Season | "totes">("tardor");
  const shown =
    season === "totes"
      ? vegetables
      : vegetables.filter((v) => v.seasons.includes(season));
  const seasonLabel = seasons.find((s) => s.id === season);
  return (
    <>
      <section
        aria-labelledby="welcome-title"
        className="mx-auto grid max-w-6xl items-center gap-7 px-5 pb-9 pt-8 sm:px-9 md:grid-cols-[0.8fr_1.2fr] md:gap-2 md:pb-10 md:pt-10"
      >
        <div className="relative z-10 py-3 md:py-8">
          <div className="mb-5 flex items-center gap-2 font-hand text-xl text-clay">
            <span className="h-px w-7 bg-clay/60" />
            Hola, petits hortolans!
          </div>
          <h1
            id="welcome-title"
            className="max-w-lg font-hand text-[clamp(2.6rem,4.2vw,4rem)] leading-[1.1]"
          >
            Què creix
            <br />
            al nostre hort?
          </h1>
          <p className="mt-5 max-w-sm text-lg leading-relaxed">
            Mirem de prop.
            <br />
            Cuidem la terra. Descobrim junts.
          </p>
          <a
            href="#aliments"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("aliments")?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              });
              document
                .getElementById("aliments-title")
                ?.focus({ preventScroll: true });
            }}
            className={`${primaryButton} mt-7 text-base`}
          >
            Descobrim els aliments
            <ArrowDown size={18} />
          </a>
        </div>
        <div className="relative">
          <img
            src="/images/hort.webp"
            width="1440"
            height="960"
            fetchPriority="high"
            alt="Una hortolana i un infant cuiden un hort amb tomàquets, enciams, pastanagues i una carbassa."
            className="aspect-[3/2] w-full rounded-[43%_28%_31%_16%/21%_30%_22%_30%] object-cover mix-blend-multiply"
          />
          <span className="absolute -bottom-3 right-4 flex -rotate-3 items-center gap-2 rounded-lg bg-[#faf6ea] px-4 py-2 font-hand text-lg shadow-[0_3px_9px_#3b4a3010] sm:right-8">
            <Heart size={17} className="text-clay" />
            Amb les mans i amb el cor
          </span>
        </div>
      </section>
      <section
        id="aliments"
        aria-labelledby="aliments-title"
        className="mx-auto max-w-6xl scroll-mt-5 px-5 pb-12 pt-6 sm:px-9"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            id="aliments-title"
            tabIndex={-1}
            className="font-hand text-3xl outline-none sm:text-4xl"
          >
            Cada estació té bon gust
          </h2>
          <button
            aria-pressed={season === "totes"}
            onClick={() => setSeason("totes")}
            className={`min-h-11 rounded-full px-4 text-sm font-extrabold underline-offset-4 ${season === "totes" ? "bg-leaf text-paper" : "underline hover:bg-leaf/10"}`}
          >
            Tot l’hort <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
          role="group"
          aria-label="Tria una estació"
        >
          {seasons.map((s) => {
            const Icon = seasonIcons[s.id];
            return (
              <button
                key={s.id}
                onClick={() => setSeason(s.id)}
                aria-pressed={season === s.id}
                className={`flex min-h-14 items-center justify-center gap-3 rounded-xl border px-3 py-3 text-sm font-extrabold transition-colors sm:text-base ${season === s.id ? "border-leaf bg-leaf text-paper" : "border-ink/20 bg-transparent hover:bg-[#e8e8d6]"}`}
              >
                <Icon size={22} strokeWidth={1.7} />
                {s.name}
                {season === s.id && <Check size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <div
          className="mb-6 mt-5 flex flex-wrap items-center justify-between gap-2"
          aria-live="polite"
        >
          <p className="text-base">
            {seasonLabel?.line ?? "Tot un món sota les fulles."}
          </p>
          <span className="text-sm text-[#59634e]">
            {shown.length} aliments per descobrir
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-x-6">
          {shown.map((v) => (
            <button
              key={v.id}
              onClick={() => onChoose(v)}
              aria-label={`Descobreix: ${v.name}`}
              className="group text-left"
            >
              <div
                className="relative overflow-hidden rounded-[22px_30px_20px_27px] p-3 transition-colors group-hover:bg-[#e3dec8]"
                style={{ backgroundColor: v.color }}
              >
                <VegetableArt
                  vegetable={v}
                  className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-rotate-3 motion-safe:group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-paper/80 text-leaf"
                >
                  <ArrowRight size={17} />
                </span>
              </div>
              <h3 className="mt-3 px-1 text-base font-extrabold sm:text-lg">
                {v.name}
              </h3>
              <p className="mt-1 px-1 text-sm text-[#5a624f]">{v.part}</p>
            </button>
          ))}
        </div>
        <p className="mt-7 flex items-start gap-2 text-sm leading-relaxed text-[#59634e]">
          <Sprout size={18} className="shrink-0" />
          Alguns aliments ens acompanyen més d’una estació.
        </p>
      </section>
      <section className="border-y border-ink/10 bg-[#e7e7d5]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-8 sm:flex-row sm:items-center sm:px-9">
          <div className="flex items-center gap-5">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-leaf/25">
              <Shovel size={29} strokeWidth={1.4} />
            </span>
            <div>
              <h2 className="font-hand text-3xl">I si plantem una llavor?</h2>
              <p className="mt-2 text-base">
                Descobrim tot el que cal per fer-la créixer.
              </p>
            </div>
          </div>
          <a
            href="#hortola"
            className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full border border-leaf px-5 py-3 font-extrabold hover:bg-leaf hover:text-paper"
          >
            Fem d’hortolans
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage);
  const [uppercase, setUppercase] = useState(getLetterSetting);
  const [selected, setSelected] = useState<Vegetable | null>(null);
  const [family, setFamily] = useState(false);
  useEffect(() => {
    const handle = () => {
      setPage(getPage());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("hort-lletra-pal", String(uppercase));
    } catch {
      /* Reading works when storage is unavailable. */
    }
  }, [uppercase]);
  return (
    <div
      className={`${uppercase ? "uppercase tracking-[0.015em]" : ""} [&_button]:[text-transform:inherit]`}
    >
      <a
        href="#contingut"
        className="sr-only z-50 rounded-lg bg-leaf p-4 text-paper focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        Salta al contingut
      </a>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-9 sm:py-7">
        <a
          href="#explorem"
          aria-label="La classe de l’hort, inici"
          className="flex items-center gap-3"
        >
          <img
            src="/favicon.svg"
            width="47"
            height="47"
            alt=""
            className="size-10 sm:size-12"
          />
          <div className="font-hand text-[22px] leading-[1.05] sm:text-[28px]">
            La classe
            <br />
            <span>de l’hort</span>
          </div>
        </a>
        <div className="flex items-center gap-2 sm:gap-5">
          <button
            onClick={() => setUppercase(!uppercase)}
            aria-label="Lletra de pal"
            aria-pressed={uppercase}
            className="flex min-h-11 items-center gap-2 rounded-full border border-ink/25 px-3 py-2 hover:bg-ink/5 sm:px-4"
          >
            <span
              aria-hidden="true"
              className="text-lg font-extrabold normal-case"
            >
              {uppercase ? "AA" : "Aa"}
            </span>
            <span className="hidden text-xs font-extrabold sm:inline">
              Lletra de pal
            </span>
            <span
              aria-hidden="true"
              className={`flex h-5 w-8 items-center rounded-full p-[3px] ${uppercase ? "bg-leaf" : "bg-ink/20"}`}
            >
              <span
                className={`size-3.5 rounded-full bg-paper ${uppercase ? "translate-x-3" : ""}`}
              />
            </span>
          </button>
          <button
            aria-label="Per a famílies i mestres"
            onClick={() => setFamily(true)}
            className="flex size-11 items-center justify-center rounded-full hover:bg-ink/10"
          >
            <BookOpen size={23} strokeWidth={1.6} />
          </button>
        </div>
      </header>
      <nav aria-label="Navegació principal" className="border-y border-ink/15">
        <div className="mx-auto grid max-w-6xl grid-cols-3 px-2 sm:flex sm:justify-center sm:gap-14 sm:px-9">
          {nav.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={page === id ? "page" : undefined}
              className={`relative flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-3 text-center text-[11px] font-extrabold sm:flex-row sm:gap-3 sm:px-4 sm:text-sm ${page === id ? "text-leaf after:absolute after:inset-x-4 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-leaf" : "text-[#66705c] hover:text-leaf"}`}
            >
              <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </nav>
      <main id="contingut" tabIndex={-1} className="outline-none">
        {page === "explorem" ? (
          <Explore onChoose={setSelected} />
        ) : page === "hortola" ? (
          <Growing />
        ) : (
          <Game />
        )}
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-7 text-center sm:flex-row sm:px-9">
        <p className="flex items-center gap-2 font-hand text-lg">
          <Sprout size={21} />
          Petites mans, grans descobertes.
        </p>
        <button
          onClick={() => setFamily(true)}
          className="min-h-11 text-xs font-bold underline underline-offset-4 hover:text-clay"
        >
          Per a famílies i mestres
        </button>
      </footer>
      {selected && (
        <Modal title={selected.article} onClose={() => setSelected(null)}>
          <div
            className="mx-auto mb-5 max-w-64 rounded-[28px] p-3"
            style={{ backgroundColor: selected.color }}
          >
            <VegetableArt vegetable={selected} />
          </div>
          <p className="text-center text-xl leading-relaxed">{selected.fact}</p>
          <div className="mt-5 space-y-4 rounded-2xl bg-[#e5e7d6] p-5">
            <div>
              <h3 className="mb-1 text-sm font-bold text-[#59664b]">
                Què ens mengem?
              </h3>
              <p className="text-xl font-extrabold">{selected.part}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-bold text-[#59664b]">
                Una pista de l’hort
              </h3>
              <p className="text-lg leading-relaxed">{selected.care}</p>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="mb-3 text-sm font-bold">
              Em trobes de temporada a...
            </h3>
            <div className="flex flex-wrap gap-2">
              {selected.seasons.map((s) => {
                const Icon = seasonIcons[s];
                return (
                  <span
                    key={s}
                    className="flex items-center gap-2 rounded-full border border-ink/20 px-3 py-2 text-xs font-bold"
                  >
                    <Icon size={16} />
                    {seasons.find((x) => x.id === s)?.name}
                  </span>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
      {family && (
        <Modal
          title="Per a famílies i mestres"
          onClose={() => setFamily(false)}
          wide
        >
          <Family />
        </Modal>
      )}
    </div>
  );
}
