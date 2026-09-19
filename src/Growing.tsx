import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Droplets,
  HandHeart,
  RotateCcw,
  Shovel,
  Sprout,
  Sun,
  Timer,
} from "lucide-react";
import { growingSteps } from "./data";
import { Listen, primaryButton } from "./ui";

function PlantDiagram({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 520 370"
      role="img"
      aria-label={
        [
          "Terra preparada per sembrar",
          "Una llavor sota terra",
          "La llavor rep aigua",
          "Un brot amb arrels",
          "El rave creix sota terra",
          "El rave és a punt de collir",
          "El rave collit, fora de la terra",
        ][stage]
      }
      className="mx-auto w-full max-w-xl"
    >
      <circle cx="407" cy="62" r="28" fill="#e6bb59" />
      <g stroke="#d5a146" strokeWidth="3" strokeLinecap="round">
        <path d="M407 17v-8m0 106v-8m45-45h8m-106 0h8m15-31-6-6m64 64 6 6m-6-64 6-6m-64 64-6 6" />
      </g>
      <path
        d="M20 235q120-19 235 0t245 0v105q-111 13-246 0T20 340Z"
        fill="#b4845e"
      />
      <path
        d="M20 235q120-19 235 0t245 0"
        fill="none"
        stroke="#815c40"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[50, 110, 176, 350, 440, 480].map((x, i) => (
        <path
          key={x}
          d={`M${x} ${270 + (i % 2) * 28}l9 3m-1 28 6-2`}
          stroke="#8b6348"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {stage > 0 && stage < 3 && (
        <ellipse
          cx="255"
          cy="263"
          rx="11"
          ry="7"
          transform="rotate(-25 255 263)"
          fill="#5c3929"
        />
      )}
      {stage >= 2 && stage < 4 && (
        <g stroke="#6797a4" strokeWidth="5" strokeLinecap="round">
          <path d="m211 136-6 18m45-34-5 18m44 4-6 18m-45 17-4 15m-52-18-4 15m102-8-4 15" />
        </g>
      )}
      <g transform={stage === 6 ? "translate(0 -65)" : undefined}>
        {stage >= 3 && (
          <g fill="none" stroke="#ead0a8" strokeWidth="3" strokeLinecap="round">
            <path d="M255 249q-12 23 4 60m-5-34-19 13m22 6 15 8" />
          </g>
        )}
        {stage >= 4 && (
          <>
            <path
              d="M252 218c-60-2-59 57 1 76 54-24 57-77-1-76Z"
              fill="#c34f58"
            />
            <path
              d="M253 292q12 15-5 31"
              fill="none"
              stroke="#d9b1a1"
              strokeWidth="3"
            />
            <path
              d="M228 242q-7 11 0 20"
              fill="none"
              stroke="#e6a59d"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </>
        )}
        {stage >= 3 && (
          <g
            stroke="#416548"
            strokeWidth="5"
            strokeLinecap="round"
            fill="#789663"
          >
            <path d={stage === 3 ? "M255 237v-38" : "M254 233v-91"} />
            <path
              d={
                stage === 3
                  ? "M255 214c-37 0-44-26-37-30 23-1 40 11 37 30Z"
                  : "M252 195c-53-2-82-43-67-65 34-1 64 27 67 65Z"
              }
            />
            <path
              d={
                stage === 3
                  ? "M256 207c29 0 38-23 30-28-19 0-33 14-30 28Z"
                  : "M257 182c47-1 77-32 65-55-30-5-61 19-65 55Z"
              }
            />
            {stage >= 4 && (
              <path d="M254 155c-27-31-22-64-3-73 25 23 25 49 3 73Z" />
            )}
          </g>
        )}
      </g>
      {stage >= 5 && (
        <g stroke="#a16d3b" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="m163 177-11-7m196 18 12-7m-88-81 3-12" />
        </g>
      )}
    </svg>
  );
}

export default function Growing() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = growingSteps[step];
  const icons = [Shovel, Sprout, Droplets, HandHeart, Timer, Check];
  const Icon = icons[step];
  return (
    <section
      aria-labelledby="growing-title"
      className="mx-auto max-w-6xl px-5 py-10 sm:px-9 sm:py-14"
    >
      <div className="mb-9 text-center">
        <p className="mb-3 font-hand text-2xl text-clay">Ens arremanguem?</p>
        <h1 id="growing-title" className="font-hand text-4xl sm:text-6xl">
          Fem créixer un rave
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg">
          Una llavor petita. Molts dies de cura.
        </p>
      </div>
      <ol
        aria-label="El camí de la llavor a la collita"
        className="mx-auto mb-9 grid max-w-3xl grid-cols-6 gap-2"
      >
        {growingSteps.map((s, i) => {
          const I = icons[i];
          return (
            <li key={s.title} className="flex flex-col items-center gap-2">
              <div
                role="img"
                aria-current={i === step ? "step" : undefined}
                aria-label={`${i + 1}. ${s.title}${i === step ? ", pas actual" : ""}`}
                className={`flex size-11 items-center justify-center rounded-full border-2 sm:size-14 ${i === step ? "border-leaf bg-leaf text-paper" : i < step ? "border-leaf/30 bg-[#dfe6d0]" : "border-ink/15 text-ink/45"}`}
              >
                <I size={23} />
              </div>
              <span className="hidden text-center text-xs font-extrabold sm:block">
                {s.action}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="grid items-center gap-7 rounded-[32px] bg-[#e9e8d8] p-5 sm:p-9 md:grid-cols-[1.1fr_1fr]">
        <div>
          <PlantDiagram stage={done ? 6 : current.stage} />
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <Sun size={18} />
            <span>{current.time}</span>
          </div>
        </div>
        <div className="pb-3 md:pl-5" aria-live="polite" aria-atomic="true">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-paper">
            <Icon size={30} />
          </div>
          <p className="mb-2 text-sm font-extrabold text-[#566041]">
            Pas {step + 1} de 6
          </p>
          <h2 className="font-hand text-4xl">
            {done ? "Ja tenim una collita!" : current.title}
          </h2>
          <p className="mt-4 max-w-md text-xl leading-relaxed">
            {done
              ? "Hem cuidat la planta durant setmanes. Ara podem compartir el que hem collit."
              : current.text}
          </p>
          <div className="mt-3">
            <Listen
              text={`${current.title}. ${current.text} ${current.task}`}
            />
          </div>
          <p className="mt-5 border-l-2 border-[#a6b082] pl-4 text-base leading-relaxed">
            {done ? "Un hort creix amb la feina de moltes mans." : current.task}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {step > 0 && !done && (
              <button
                aria-label="Pas anterior"
                onClick={() => setStep(step - 1)}
                className="flex size-12 items-center justify-center rounded-full border border-leaf/30 hover:bg-paper"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            {done ? (
              <button
                onClick={() => {
                  setStep(0);
                  setDone(false);
                }}
                className={primaryButton}
              >
                <RotateCcw size={19} /> Tornem a sembrar
              </button>
            ) : (
              <button
                onClick={() => (step === 5 ? setDone(true) : setStep(step + 1))}
                className={primaryButton}
              >
                {step === 5 ? "Collim el rave" : growingSteps[step + 1].action}
                <ArrowRight size={19} />
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed">
        Aquí fem avançar el temps. A l’hort de veritat, cal tornar-hi molts
        dies!
      </p>
      <div className="mt-12 grid gap-6 border-t border-ink/15 pt-9 sm:grid-cols-3">
        {[
          {
            icon: Droplets,
            title: "L’aigua justa",
            text: "Si la terra és humida, potser avui no cal regar.",
          },
          {
            icon: HandHeart,
            title: "Mans que cuiden",
            text: "Observem les fulles i els animals de l’hort.",
          },
          {
            icon: Timer,
            title: "Temps per créixer",
            text: "No totes les plantes creixen igual de ràpid.",
          },
        ].map(({ icon: I, title, text }) => (
          <div key={title} className="flex gap-4">
            <I
              aria-hidden="true"
              className="mt-1 shrink-0 text-clay"
              size={26}
            />
            <div>
              <h3 className="text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-base leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
