import { BookOpen, ExternalLink, Heart, Sprout } from "lucide-react";

export default function Family() {
  return (
    <div className="space-y-8 normal-case">
      <p className="max-w-2xl text-lg leading-relaxed">
        Un hort per mirar, tocar i fer-se preguntes. Pensat per a infants de
        primer, amb frases curtes, il·lustracions i temps per descobrir.
      </p>
      <section className="rounded-2xl bg-[#e7e8d6] p-5">
        <h3 className="mb-3 flex items-center gap-3 text-xl font-extrabold">
          <Sprout size={23} /> De la pantalla a la terra
        </h3>
        <ul className="list-disc space-y-3 pl-5 leading-relaxed">
          <li>
            <strong>Un rave a classe.</strong> Sembreu raves en un test amb
            drenatge i bona llum. Observeu la terra abans de regar.
          </li>
          <li>
            <strong>Un dibuix cada setmana.</strong> Dibuixeu què ha canviat.
            Afegiu-hi la data i una paraula: llavor, brot, fulla...
          </li>
          <li>
            <strong>Una visita a l’hort.</strong> Pregunteu a un hortolà o una
            hortolana què fa cada dia i què li costa més.
          </li>
          <li>
            <strong>El cistell de temporada.</strong> Porteu un aliment,
            observeu-lo i busqueu quina part de la planta és.
          </li>
        </ul>
      </section>
      <section>
        <h3 className="mb-3 flex items-center gap-3 text-xl font-extrabold">
          <BookOpen size={23} /> Com fem servir les temporades
        </h3>
        <p className="leading-relaxed">
          És una selecció orientativa per a Catalunya, no un calendari de
          sembra. Les varietats, la zona i el temps fan variar les dates. Un
          aliment pot aparèixer en diverses estacions. La carbassa, la ceba
          seca, l’all sec i la patata també es conserven després de collir-los.
        </p>
        <p className="mt-3 leading-relaxed">
          El joc del rave resumeix el procés: els canvis de pantalla representen
          dies o setmanes, i la cura es repeteix. No tots els raves triguen el
          mateix a créixer.
        </p>
        <div className="mt-4 space-y-3">
          <a
            href="https://canalsalut.gencat.cat/ca/vida-saludable/alimentacio/fruites-hortalisses/calendaris-temporada/index.html"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 underline underline-offset-4"
          >
            Calendaris de temporada · Generalitat
            <ExternalLink size={16} />
          </a>
          <a
            href="https://canalsalut.gencat.cat/ca/vida-saludable/alimentacio/aliments/hortalisses/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 underline underline-offset-4"
          >
            Les parts de les hortalisses · Canal Salut
            <ExternalLink size={16} />
          </a>
        </div>
      </section>
      <section className="border-t border-ink/15 pt-6">
        <h3 className="mb-3 flex items-center gap-3 text-xl font-extrabold">
          <Heart size={22} /> Aprendre al seu ritme
        </h3>
        <p className="leading-relaxed">
          Sense cronòmetres, anuncis ni comptes. La preferència de lletra es
          desa només en aquest navegador. Les il·lustracions s’han generat per a
          aquest projecte.
        </p>
      </section>
    </div>
  );
}
