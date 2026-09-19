# La classe de l’hort

Un petit hort digital en català per a infants de primer. Il·lustracions originals en gouache suau, fons de paper beix, textos curts i lletra de pal activada per defecte.

## Posar-lo en marxa

Cal Node.js 22.12 o posterior.

```sh
npm install
npm run dev
```

Obre l’adreça que apareix al terminal. Per generar el web estàtic: `npm run build`. La carpeta `dist/` es pot servir amb qualsevol allotjament de webs estàtiques. `npm run preview` permet comprovar aquesta versió localment.

## Què hi ha

- **Explorem l’hort:** 16 aliments, filtre per estacions i fitxes amb la part comestible, una pista de cultiu i una dada breu.
- **Fem d’hortolans:** sis moments de la vida d’un rave, amb un esquema de l’arrel sota terra i el pas dels dies.
- **Juguem:** cinc descobertes visuals, amb oportunitats de rectificar, sense temps límit ni penalitzacions.
- **Lectura:** majúscules/minúscules amb preferència local, i veu en català si el dispositiu en té una.
- **Famílies i mestres:** propostes d’aula, fonts del contingut i criteris de lectura i privacitat.

## Decisions pedagògiques

La temporada és una orientació per al consum i la disponibilitat a Catalunya, no una data de sembra. Les hortalisses poden pertànyer a més d’una estació. La carbassa i la ceba seca es poden conservar; per això temporada de consum i collita no sempre coincideixen.

La simulació resumeix dies i setmanes. Regar, observar i cuidar són tasques repetides, no accions que només es facin una vegada. El rave s’ha escollit perquè permet observar canvis en poques setmanes, segons la varietat i les condicions.

No hi ha comptes, publicitat, analítica ni servidor de dades. Només es desa la preferència de lletra en aquest navegador. La veu depèn del dispositiu i pot emprar serveis del sistema amb connexió. Si no hi ha veu catalana, s’explica i es manté tot el text visible.

## Estructura

React, TypeScript, Vite i Tailwind CSS. Les tipografies Nunito i Patrick Hand se serveixen des del mateix projecte.

- `src/data.ts`: aliments, estacions, textos i preguntes.
- `src/App.tsx`: exploració, navegació i fitxes.
- `src/Growing.tsx`: el recorregut de cultiu i l’esquema.
- `src/Game.tsx`: joc de descobertes.
- `src/Family.tsx`: espai per als adults.
- `public/images/`: il·lustracions originals en WebP.
- `docs/projecte.md`: intenció educativa, idees i continuïtat.
- `docs/fonts.md`: fonts de contingut i criteris.
- `docs/illustracions.md`: procedència i prompts de les il·lustracions.

## Comprovacions

```sh
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Si tens Chrome instal·lat, pots evitar la descàrrega amb `PLAYWRIGHT_CHANNEL=chrome npm test`. Les proves cobreixen ordinador i mida de mòbil amb Chromium: filtres, fitxes, focus després de tancar, preferència de lectura, recorregut del rave, joc complet, navegació, imatges i absència de desbordament horitzontal. Això no equival a una prova en un iPhone físic ni en Safari.

El lector de pantalla i la qualitat de la veu catalana necessiten una comprovació amb el dispositiu real de l’aula.

## Estat

Primera versió funcional. Repositori privat a [GitHub](https://github.com/marciobarrios/la-classe-de-l-hort), sense desplegament públic de la web. No cal cap clau ni compte extern per executar-la localment.
