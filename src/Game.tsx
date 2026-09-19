import { useRef, useState } from "react";
import { ArrowRight, Check, Lightbulb, RotateCcw, Sprout } from "lucide-react";
import { questions, vegetables } from "./data";
import { VegetableArt, primaryButton } from "./ui";

export default function Game() {
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const focusQuestion = () =>
    requestAnimationFrame(() => questionHeading.current?.focus());
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const q = questions[index];
  const correct = choice === q.answer;
  function restart() {
    setIndex(0);
    setChoice(null);
    setComplete(false);
    focusQuestion();
  }
  return (
    <section
      aria-labelledby="game-title"
      className="mx-auto max-w-5xl px-5 py-12 sm:px-9"
    >
      <div className="text-center">
        <p className="font-hand text-2xl text-clay">
          Mirem, pensem i descobrim
        </p>
        <h1 id="game-title" className="mt-3 font-hand text-4xl sm:text-6xl">
          Detectius de l’hort
        </h1>
        <p className="mt-4 text-lg">
          Toca un aliment. Pots provar-ho tants cops com vulguis.
        </p>
      </div>
      <div
        role="img"
        className="mx-auto my-8 flex max-w-sm flex-wrap justify-center gap-3"
        aria-label={`${complete ? questions.length : index} descobertes de ${questions.length}`}
      >
        {questions.map((_, i) => (
          <Sprout
            key={i}
            aria-hidden="true"
            size={28}
            className={i < index || complete ? "text-leaf" : "text-ink/25"}
          />
        ))}
      </div>
      {complete ? (
        <div className="rounded-[32px] bg-[#e4e8d2] p-8 text-center sm:p-14">
          <Sprout className="mx-auto mb-5 text-leaf" size={70} />
          <h2
            ref={questionHeading}
            tabIndex={-1}
            className="font-hand text-4xl outline-none"
          >
            Quantes coses hem descobert!
          </h2>
          <p className="mx-auto mt-4 max-w-md text-xl">
            Arrels, bulbs, tubercles, brots, fulles, fruits, flors i llavors.
            L’hort és ple de sorpreses.
          </p>
          <button onClick={restart} className={`${primaryButton} mt-8`}>
            <RotateCcw size={20} /> Tornem a jugar
          </button>
        </div>
      ) : (
        <>
          <div className="mb-7 text-center">
            <h2
              ref={questionHeading}
              tabIndex={-1}
              className="font-hand text-3xl outline-none sm:text-4xl"
            >
              {q.prompt}
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {q.options.map((id) => {
              const v = vegetables.find((v) => v.id === id)!;
              return (
                <button
                  key={id}
                  disabled={correct}
                  onClick={() => setChoice(id)}
                  aria-pressed={choice === id}
                  className={`relative rounded-[20px] border-2 p-2 transition-colors sm:rounded-[25px] sm:p-4 ${choice === id ? (correct ? "border-leaf bg-[#e1e9cb]" : "border-clay bg-[#efded1]") : "border-transparent bg-[#eee6d6] hover:border-leaf/40"}`}
                >
                  <VegetableArt vegetable={v} className="mx-auto" />
                  <span className="mt-3 block font-hand text-base min-[380px]:text-lg sm:font-sans sm:text-xl sm:font-extrabold">
                    {v.name}
                  </span>
                  {choice === id && correct && (
                    <Check
                      aria-hidden="true"
                      className="absolute right-4 top-4"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div
            className="mt-7 min-h-36 text-center"
            aria-live="polite"
            aria-atomic="true"
          >
            {choice &&
              (correct ? (
                <>
                  <p className="flex items-center justify-center gap-2 text-xl font-bold">
                    <Check size={22} /> Ho has descobert!
                  </p>
                  <p className="mt-2 text-lg">{q.why}</p>
                  <button
                    onClick={() => {
                      if (index === questions.length - 1) setComplete(true);
                      else {
                        setIndex(index + 1);
                        setChoice(null);
                      }
                      focusQuestion();
                    }}
                    className={`${primaryButton} mt-5`}
                  >
                    {index === questions.length - 1
                      ? "Hem acabat!"
                      : "Una altra descoberta"}
                    <ArrowRight size={20} />
                  </button>
                </>
              ) : (
                <p className="inline-flex items-center gap-3 rounded-2xl bg-[#eee4cf] px-5 py-4 text-lg">
                  <Lightbulb size={23} className="shrink-0" />
                  Mira les formes. Prova un altre aliment!
                </p>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
