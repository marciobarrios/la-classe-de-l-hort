# Verificació de la primera versió

19 de setembre de 2026.

- Compilació de producció i comprovació TypeScript: correctes.
- Format del codi: correcte.
- 12 proves Playwright superades: 6 fluxos en Chrome d’escriptori i els mateixos 6 en mida de mòbil (Chromium). Filtres, modal i retorn de focus, preferència de lectura persistent, collita completa i reinici, joc amb error recuperable i final, navegació, càrrega d’imatges, amplada de pantalla i absència de veu catalana.
- Revisió visual a 1440 px i 390 px. Les tres opcions del joc es mostren juntes al mòbil. S’han corregit les majúscules als botons i els enquadraments de les il·lustracions.
- Auditoria automàtica axe-core: cap infracció detectada a la portada, l’activitat de cultiu, el joc, la fitxa de pastanaga i el diàleg de famílies després de corregir etiquetes ARIA i un text amb poc contrast. La portada i la fitxa conserven comprovacions de contrast que l’eina no resol per superposicions; no es declara conformitat WCAG completa.
- No s’han observat errors de JavaScript al navegador.

No s’ha fet una prova amb infants, amb un lector de pantalla real ni amb una veu catalana real. Tampoc s’ha provat Safari o un dispositiu iOS físic. La lectura en veu alta depèn de les veus instal·lades al sistema; es comprova l’alternativa quan no hi ha veu catalana.

No s’ha publicat a Internet ni s’ha creat cap repositori remot.
