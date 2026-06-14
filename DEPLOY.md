# Online zetten via Vercel + GitHub

Deze gids zet de site live op **www.lensevent.be** en koppelt je VS Code-workflow:
elke keer je naar GitHub pusht, gaat de site automatisch live (binnen ~1 min).

> Belangrijk: stappen 2–4 vereisen inloggen op je eigen accounts (GitHub, Vercel,
> Wix/domeinbeheer). Die moet je zelf uitvoeren — niemand anders heeft je wachtwoorden.

---

## 1. Project naar GitHub pushen

Open de map `lensevent` in VS Code en in de terminal:

```bash
git init
git add .
git commit -m "Lens Event website"
```

Maak daarna een lege repo op github.com (bv. `lensevent`, mag privé), en:

```bash
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/lensevent.git
git branch -M main
git push -u origin main
```

(Of gebruik in VS Code de knop **Source Control → Publish to GitHub**.)

## 2. Importeren in Vercel

1. Ga naar [vercel.com](https://vercel.com) en log in **met je GitHub-account**.
2. Klik **Add New… → Project** en kies de `lensevent`-repo.
3. Vercel herkent automatisch **Astro** (Build Command `npm run build`,
   Output Directory `dist`). Niets aan te passen.
4. Klik **Deploy**. Na ~1 minuut krijg je een live test-URL zoals
   `lensevent.vercel.app`. Controleer er even of alle pagina's werken,
   bv. `lensevent.vercel.app/photobooth-huren-gent`.

## 3. Je domein lensevent.be koppelen in Vercel

1. In je Vercel-project: **Settings → Domains**.
2. Voeg toe: **`www.lensevent.be`** én **`lensevent.be`**.
   Stel `www.lensevent.be` in als primair (de site verwijst zo naar www).
3. Vercel toont nu de exacte DNS-records die je moet instellen, meestal:
   - **A-record** voor `lensevent.be` → `76.76.21.21`
   - **CNAME** voor `www` → `cname.vercel-dns.com`

   (Gebruik altijd de waarden die Vercel zelf toont — die zijn leidend.)

## 4. Wix afkoppelen en de DNS naar Vercel laten wijzen

Je domein blijft van jou; je wijzigt enkel waar het naartoe wijst.

1. Log in op je **Wix-dashboard → Domains** en selecteer `lensevent.be`.
2. Open **Advanced / DNS-records bewerken** (Wix beheert je DNS als je het
   domein via Wix kocht).
3. Vervang de bestaande A-record(s) en de `www`-CNAME door de waarden uit
   stap 3 (verwijder de oude Wix-records voor `@` en `www`).
4. Bewaar. De koppeling met de Wix-site valt weg zodra het domein naar Vercel
   wijst. (Twijfel je over Wix-specifieke stappen? Wix-support kan de records
   voor je openzetten — je hoeft je domein niet te verhuizen.)

> Tip: laat de Wix-site nog even bestaan tot de nieuwe site bevestigd live staat,
> en zeg pas daarna eventueel je Wix-abonnement op.

**Propagatie:** DNS-wijzigingen zijn meestal binnen enkele minuten tot enkele uren
actief. Vercel zet daarna automatisch gratis HTTPS (slotje) aan.

---

## Je dagelijkse workflow (push = live)

1. Pas aan in VS Code (teksten in `src/data/`, stijl in `src/styles/global.css`, …).
2. Bekijk lokaal live: `npm run dev` → http://localhost:4321
3. Klaar? Push het:

```bash
git add .
git commit -m "tekst aangepast"
git push
```

Vercel bouwt en publiceert automatisch — binnen ~1 minuut staat je wijziging
live op www.lensevent.be. Geen verdere handelingen nodig.

## Opmerking

Het hulpbestandje `shot.cjs` en `public/images/site-screenshot.png` zijn
restjes van het maken van de screenshots en mogen weg vóór je pusht.
