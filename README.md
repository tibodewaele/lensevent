# Lens Event — photobooth website

Converterende landingspagina voor photobooth-verhuur, gebouwd met [Astro](https://astro.build).
Eén homepage + 15 automatische stadspagina's (SEO) + automatische locatiedetectie.

## Snel starten (in VS Code)

```bash
npm install        # eenmalig: installeert alles
npm run dev        # start de live preview op http://localhost:4321
```

Open de map in VS Code, draai `npm run dev` en elke wijziging die je opslaat
verschijnt meteen in je browser (hot reload) — net zoals je gewend bent.

```bash
npm run build      # maakt de kant-en-klare site in /dist
npm run preview    # bekijkt de gebouwde site lokaal
```

## Waar pas ik wat aan?

| Wat | Bestand |
|-----|---------|
| Teksten, prijzen, pakketten, FAQ, contact, reviews | `src/data/site.js` |
| Lijst van steden (nieuwe stad = 1 regel toevoegen) | `src/data/steden.js` |
| Kleuren & lettertypes (huisstijl) | bovenaan `src/styles/global.css` (`:root`) |
| Foto's | `public/images/` en `public/partners/` |
| Losse secties (hero, pakketten, formulier …) | `src/components/` |

### Een nieuwe stad toevoegen
Voeg één regel toe in `src/data/steden.js` (met de coördinaten van die stad).
De pagina `/photobooth-huren-<stad>` wordt automatisch aangemaakt, met eigen
titel, H1 en SEO-beschrijving. Ook de footer en locatiedetectie pikken hem op.

## Het boekingsformulier koppelen (Formspree)

Het formulier is klaar om te versturen, maar moet nog aan jouw mailbox gekoppeld worden:

1. Maak een gratis account op [formspree.io](https://formspree.io).
2. Maak een nieuw formulier aan met als ontvanger **contact@lensevent.be**.
3. Kopieer je endpoint-URL (vorm: `https://formspree.io/f/abcdwxyz`).
4. Plak die in `src/data/site.js` bij `formspreeEndpoint`.

Vanaf dan belandt elke aanvraag (naam, mail, telefoon, gekozen booth, stad, datum)
rechtstreeks in je mailbox. Zolang dit niet is ingesteld, toont het formulier een
melding i.p.v. te verzenden.

> Alternatief: gebruik je hosting op Netlify, dan kan je ook Netlify Forms gebruiken.

## Online zetten (hosting)

De site is volledig statisch en kan gratis live op **Netlify** of **Vercel**:

- **Netlify**: sleep de `dist`-map op [app.netlify.com/drop](https://app.netlify.com/drop),
  of koppel je Git-repo. Build command: `npm run build`, publish directory: `dist`.
- **Vercel**: importeer de repo, Astro wordt automatisch herkend.

Koppel daarna je domein **lensevent.be** aan de hosting (DNS aanpassen).

## SEO

- Elke stadspagina heeft een eigen URL, `<title>`, H1 en meta-beschrijving.
- `LocalBusiness` structured data (schema.org) zit in de `<head>`.
- Pas `site:` in `astro.config.mjs` aan als je domein wijzigt.

## Beeldmateriaal

Alle foto's en logo's komen uit de bestaande Wix-site en staan in `public/`.
Vervang ze gerust door nieuwe versies met dezelfde bestandsnaam.
