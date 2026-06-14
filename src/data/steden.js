// ============================================================
//  STEDEN — elke stad wordt automatisch een eigen SEO-pagina
//  op /photobooth-huren-<slug>.
//
//  Een nieuwe stad toevoegen? Voeg gewoon één regel toe.
//  lat/lng worden gebruikt voor de automatische "dichtstbijzijnde
//  stad"-detectie op de homepage.
// ============================================================

export const steden = [
  { slug: "gent",         naam: "Gent",          provincie: "Oost-Vlaanderen", lat: 51.0543, lng: 3.7174, thuisbasis: false },
  { slug: "brugge",       naam: "Brugge",        provincie: "West-Vlaanderen", lat: 51.2093, lng: 3.2247, thuisbasis: false },
  { slug: "eeklo",        naam: "Eeklo",         provincie: "Oost-Vlaanderen", lat: 51.1869, lng: 3.5636, thuisbasis: true  },
  { slug: "aalter",       naam: "Aalter",        provincie: "Oost-Vlaanderen", lat: 51.0917, lng: 3.4456, thuisbasis: false },
  { slug: "lochristi",    naam: "Lochristi",     provincie: "Oost-Vlaanderen", lat: 51.0958, lng: 3.8281, thuisbasis: false },
  { slug: "antwerpen",    naam: "Antwerpen",     provincie: "Antwerpen",       lat: 51.2194, lng: 4.4025, thuisbasis: false },
  { slug: "lokeren",      naam: "Lokeren",       provincie: "Oost-Vlaanderen", lat: 51.1031, lng: 3.9919, thuisbasis: false },
  { slug: "sint-niklaas", naam: "Sint-Niklaas",  provincie: "Oost-Vlaanderen", lat: 51.1650, lng: 4.1437, thuisbasis: false },
  { slug: "kortrijk",     naam: "Kortrijk",      provincie: "West-Vlaanderen", lat: 50.8279, lng: 3.2649, thuisbasis: false },
  { slug: "maldegem",     naam: "Maldegem",      provincie: "Oost-Vlaanderen", lat: 51.2069, lng: 3.4447, thuisbasis: false },
  { slug: "deinze",       naam: "Deinze",        provincie: "Oost-Vlaanderen", lat: 50.9853, lng: 3.5306, thuisbasis: false },
  { slug: "knokke",       naam: "Knokke",        provincie: "West-Vlaanderen", lat: 51.3506, lng: 3.2769, thuisbasis: false },
  { slug: "oudenaarde",   naam: "Oudenaarde",    provincie: "Oost-Vlaanderen", lat: 50.8472, lng: 3.6097, thuisbasis: false },
  { slug: "ninove",       naam: "Ninove",        provincie: "Oost-Vlaanderen", lat: 50.8278, lng: 4.0250, thuisbasis: false },
  { slug: "tielt",        naam: "Tielt",         provincie: "West-Vlaanderen", lat: 51.0017, lng: 3.3258, thuisbasis: false },
];

export function getStad(slug) {
  return steden.find((s) => s.slug === slug);
}
