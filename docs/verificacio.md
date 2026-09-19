# Verificació de la primera versió

19 de setembre de 2026.

- Compilació de producció i comprovació TypeScript: correctes.
- Format del codi: correcte.
- 12 proves Playwright superades: 6 fluxos en Chrome d’escriptori i els mateixos 6 en mida de mòbil (Chromium). Filtres, modal i retorn de focus, preferència de lectura persistent, collita completa i reinici, joc amb error recuperable i final, navegació, càrrega d’imatges, amplada de pantalla i absència de veu catalana.
- Revisió visual a 1440 px i 390 px. Les tres opcions del joc es mostren juntes al mòbil. S’han corregit les majúscules als botons i els enquadraments de les il·lustracions.
- Auditoria automàtica axe-core: cap infracció detectada a la portada, l’activitat de cultiu, el joc, la fitxa de pastanaga i el diàleg de famílies després de corregir etiquetes ARIA i un text amb poc contrast. La portada i la fitxa conserven comprovacions de contrast que l’eina no resol per superposicions; no es declara conformitat WCAG completa.
- No s’han observat errors de JavaScript al navegador.

No s’ha fet una prova amb infants, amb un lector de pantalla real ni amb una veu catalana real. Tampoc s’ha provat Safari o un dispositiu iOS físic. La lectura en veu alta depèn de les veus instal·lades al sistema; es comprova l’alternativa quan no hi ha veu catalana.

La web no s’ha publicat a Internet. El projecte es conserva en un repositori privat a GitHub.

## Ampliació de 16 a 31 aliments — 19 de setembre de 2026

- TypeScript, compilació de producció i format: correctes.
- Suite actual: 10 proves Playwright superades amb `PLAYWRIGHT_CHANNEL=chrome npm test` (5 fluxos en ordinador i els mateixos 5 amb mida de mòbil). La prova del catàleg comprova les 31 imatges individuals, incloent-hi la càrrega diferida.
- Comprovació addicional sobre la compilació de producció a 1440 × 1100 i 390 × 844: obertura de les 15 fitxes noves, títol, part comestible, seccions de contingut, imatge carregada i retorn del focus amb Escape. També s’ha contrastat la presència o absència dels 15 aliments en cadascuna de les 4 estacions a totes dues mides (120 comprovacions).
- Revisió visual del catàleg i de la fitxa de mongeta tendra al mòbil. Il·lustracions recognoscibles, sense retalls d’aliments veïns; targetes alineades a dalt quan els textos ocupen diferents nombres de línies.
- Sense errors de JavaScript ni desbordament horitzontal als recorreguts comprovats.
- Quinze WebP nous de 540 × 480 px, amb un pes conjunt aproximat de 336 KiB. Fonts, criteris estacionals i prompts documentats.

Aquesta ampliació no inclou una nova auditoria axe-core, proves amb lector de pantalla ni proves en Safari o iOS físic.
