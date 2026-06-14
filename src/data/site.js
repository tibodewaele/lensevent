// ============================================================
//  LENS EVENT — centrale inhoud
//  Pas hier teksten, prijzen en contactgegevens aan.
//  Alles wat je hier wijzigt verschijnt automatisch op elke pagina.
// ============================================================

export const site = {
  naam: "Lens Event",
  slogan: "OOOH! Samen herinneringen maken",
  // Formulier: vervang dit door je eigen Formspree-endpoint (zie README).
  // Tot dan toont het formulier een melding i.p.v. te verzenden.
  formspreeEndpoint: "https://formspree.io/f/JOUW_ID_HIER",
  telefoon: "+32 492 528 448",
  telefoonHref: "tel:+32492528448",
  email: "contact@lensevent.be",
  adres: {
    straat: "22 AVS-Straat",
    postcode: "9900",
    gemeente: "Eeklo",
  },
  social: {
    instagram: "https://www.instagram.com/lensevent/",
    youtube: "https://www.youtube.com/channel/UCISs8_KjEYCvhk-W4N210Ig",
  },
};

// --- De 3 stappen -------------------------------------------------
export const stappen = [
  { nr: "1", titel: "Boek jouw booth", tekst: "Vul het formulier in en kies je pakket. We contacteren je in een flits.", afbeelding: "/images/website-boeken-realistisch.png", vullend: true, cta: { label: "Boek jouw booth", url: "#boeken" } },
  { nr: "2", titel: "Kies een template", tekst: "We personaliseren je fotostrip volledig in jouw stijl of huisstijl.", afbeelding: "/images/overshoulder-booth-closeup.png", vullend: true, cta: { label: "Ontdek onze templates", url: "/templates" } },
  { nr: "3", titel: "Ready to party", tekst: "Wij leveren, installeren en zorgen dat alles vlekkeloos draait.", afbeelding: "/images/zomerfeest-booth.png", vullend: true },
];

// --- Pakketten ----------------------------------------------------
export const pakketten = [
  {
    naam: "Gold Photobooth",
    prijs: "340",
    populair: false,
    omschrijving: "Alles wat je nodig hebt voor een onvergetelijk feest.",
    features: [
      { tekst: "Onbeperkt professionele DSLR-foto's", inbegrepen: true },
      { tekst: "250 prints inbegrepen", inbegrepen: true },
      { tekst: "Direct delen via SMS, QR-code of e-mail", inbegrepen: true },
      { tekst: "Digitaal album", inbegrepen: true },
      { tekst: "Foto- & GIF-opties", inbegrepen: true },
      { tekst: "Gepersonaliseerde template", inbegrepen: true },
      { tekst: "Levering tot 100 km inbegrepen", inbegrepen: true },
      { tekst: "Backdrop bij te huren (+€50)", inbegrepen: true },
    ],
  },
  {
    naam: "Luxe Photobooth",
    prijs: "400",
    populair: true,
    omschrijving: "De totaalbeleving — onbeperkt prints en al onze extra's.",
    features: [
      { tekst: "Onbeperkt professionele DSLR-foto's", inbegrepen: true },
      { tekst: "Onbeperkt prints inbegrepen", inbegrepen: true },
      { tekst: "Direct delen via SMS, QR-code of e-mail", inbegrepen: true },
      { tekst: "Digitaal album", inbegrepen: true },
      { tekst: "Foto- & GIF-opties", inbegrepen: true },
      { tekst: "Gepersonaliseerde template", inbegrepen: true },
      { tekst: "Levering tot 100 km inbegrepen", inbegrepen: true },
      { tekst: "Backdrop bij te huren (+€50)", inbegrepen: true },
      { tekst: "Feestelijke attributen (optioneel extra)", inbegrepen: true },
    ],
  },
];

// --- Backdrop -----------------------------------------------------
export const backdrop = {
  // Optie 1: backdrop bijhuren bij een photobooth-boeking
  huurPrijs: "50",
  // Optie 2: eigen branded backdrop op maat (aankoop)
  brandedPrijs: "700",
  afmetingBreedte: "200",
  afmetingHoogte: "230",
  gebruik: ["het feest", "beurzen", "reclame", "presentaties", "andere bedrijfsactiviteiten"],
  levertijd: "Minstens 30 dagen op voorhand te bestellen.",
};

// --- Vergelijking met traditionele providers ----------------------
export const vergelijking = [
  {
    kenmerk: "Totaalbeleving",
    lens: "Eén vaste prijs — alles wat we in huis hebben is inbegrepen.",
    anderen: "Vaak upgrades en bijbetalen voor extra features.",
  },
  {
    kenmerk: "Gepersonaliseerd",
    lens: "Volledig gepersonaliseerde template inbegrepen. Wat jij wil is mogelijk.",
    anderen: "Niet inbegrepen in de prijs.",
  },
  {
    kenmerk: "Digitale opslag",
    lens: "Online galerij + digitaal scannen via QR-code.",
    anderen: "Beperkt tot een online galerij.",
  },
  {
    kenmerk: "Backdrop",
    lens: "Grote backdrop van hoge kwaliteit (hout of zwart) bij te huren aan slechts €50 — of laat je eigen branded backdrop maken.",
    anderen: "Vaak niet beschikbaar of duur als losse optie.",
  },
  {
    kenmerk: "Noodservice",
    lens: "Telefonische ondersteuning, en bij nood komt iemand ter plaatse.",
    anderen: "Wanneer er een probleem opduikt, blijft het onopgelost.",
  },
];

// --- FAQ ----------------------------------------------------------
export const faq = [
  {
    vraag: "Tot waar leveren jullie de photobooth?",
    antwoord: "Levering tot 100 km is altijd inbegrepen in de prijs. We zijn gevestigd in Eeklo en bedienen heel Oost- en West-Vlaanderen, Antwerpen en omstreken.",
  },
  {
    vraag: "Hoe snel krijgen mijn gasten hun foto's?",
    antwoord: "Meteen. Elke foto wordt direct gedeeld via SMS, QR-code of e-mail, en achteraf krijg je een digitaal album met alle beelden.",
  },
  {
    vraag: "Wat is het verschil tussen Gold en Luxe?",
    antwoord: "Bij Gold (€340) zitten 250 prints inbegrepen. Bij Luxe (€400) print je onbeperkt én krijg je een grote 8x8 backdrop in hout of zwart. Beide hebben onbeperkt professionele DSLR-foto's en een gepersonaliseerde template.",
  },
  {
    vraag: "Hoe lang op voorhand moet ik boeken?",
    antwoord: "Geef je gewenste leverdatum minstens 30 dagen op voorhand door, dan stemmen we ons waar mogelijk volledig op jouw moment af. Vroeg boeken verzekert je van beschikbaarheid in het drukke seizoen.",
  },
  {
    vraag: "Wat als er iets misgaat tijdens het feest?",
    antwoord: "Je krijgt steeds telefonische ondersteuning. Raakt het probleem niet opgelost, dan komt er iemand ter plaatse. Je staat er nooit alleen voor.",
  },
  {
    vraag: "Zijn de prijzen incl. of excl. btw?",
    antwoord: "De vermelde prijzen (€340 en €400) zijn exclusief btw.",
  },
];

// --- Levertijden --------------------------------------------------
export const levertijden = {
  tijden: [
    { dag: "Vrijdag", uren: "17:00u en 18:00u" },
    { dag: "Zaterdag", uren: "14:00u en 18:00u" },
    { dag: "Zondag", uren: "14:00u en 18:00u" },
  ],
  toelichting:
    "Stel je minstens 30 dagen op voorhand een leverdatum voor, dan passen we ons waar mogelijk aan. Wordt er geen datum voorgesteld, dan gelden bovenstaande tijden.",
};

// --- Google reviews ----------------------------------------------
// Echte reviews van het Google-profiel. Voeg er gerust meer toe in dezelfde vorm.
export const googleReviews = {
  score: "5,0",
  aantal: "22",
  // Link naar je Google-profiel (waar bezoekers alle reviews zien / zelf reviewen)
  url: "https://www.google.com/maps/search/Lens+Event+Eeklo",
};

export const reviews = [
  {
    tekst:
      "Superleuke ervaring voor mijn dochter haar 18de verjaardag! Het was een mega succes! Iedereen, klein en groot, vond het geweldig!",
    naam: "An Casie",
    bedrijf: "Verjaardagsfeest",
  },
  {
    tekst:
      "Heel vlotte en supervriendelijke bediening. De fotobooth was echt een toffe verrassing en gaf ons feest net dat beetje extra. Communicatie en service top!",
    naam: "Svenja Van Kerrebroeck",
    bedrijf: "Feest",
  },
  {
    tekst:
      "Topservice en hoge kwaliteit van de producten! Een geweldige toevoeging aan ons evenement “Kerstmagie Laarne”.",
    naam: "Maud",
    bedrijf: "Kerstmagie Laarne",
  },
];

// --- Partners (logo's staan in /public/partners) ------------------
export const partners = [
  { src: "/partners/envision.jpeg", alt: "Envision Community" },
  { src: "/partners/funkey.jpeg", alt: "Funkey" },
  { src: "/partners/partner3.webp", alt: "Partner" },
  { src: "/partners/partner2.png", alt: "Partner" },
];
