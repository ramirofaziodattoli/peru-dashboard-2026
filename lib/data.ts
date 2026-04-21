import type { FlightInfo, HotelInfo, DayInfo, ChecklistInfo } from "./types";

export const FLIGHTS: FlightInfo[] = [
  { key: "flight_eze_lim", title: "Buenos Aires → Lima", date: "Sáb 16 may 2026", time: "14:30 – 20:00", meta: "Ida internacional" },
  { key: "flight_lim_cuz", title: "Lima → Cusco", date: "Mar 19 may 2026", time: "11:00 – 15:00", meta: "Doméstico" },
  { key: "flight_cuz_lim", title: "Cusco → Lima", date: "Mar 26 may 2026", time: "14:00 – 18:00", meta: "Doméstico" },
  { key: "flight_lim_aep", title: "Lima → Buenos Aires (AEP)", date: "Mar 26 · 22:00 → Mié 27 · 04:30", time: "Nocturno", meta: "Vuelta internacional" },
];

export const HOTELS: HotelInfo[] = [
  {
    key: "hotel_lima",
    title: "Lima · Miraflores o Barranco",
    meta: "3 noches · 16, 17, 18 may",
    links: [
      { label: "🔍 Booking", href: "https://www.booking.com/searchresults.es.html?ss=Miraflores%2C+Lima&checkin=2026-05-16&checkout=2026-05-19&group_adults=3" },
      { label: "🔍 Airbnb", href: "https://www.airbnb.com/s/Miraflores--Lima/homes?checkin=2026-05-16&checkout=2026-05-19&adults=3" },
    ],
  },
  {
    key: "hotel_valle",
    title: "Valle Sagrado · Urubamba u Ollantaytambo",
    meta: "3 noches · 19, 20, 21 may",
    links: [
      { label: "🔍 Booking", href: "https://www.booking.com/searchresults.es.html?ss=Valle+Sagrado%2C+Peru&checkin=2026-05-19&checkout=2026-05-22&group_adults=3" },
    ],
  },
  {
    key: "hotel_aguas",
    title: "Aguas Calientes",
    meta: "1 noche · 22 may · base Machu Picchu",
    links: [
      { label: "🔍 Booking", href: "https://www.booking.com/searchresults.es.html?ss=Aguas+Calientes%2C+Peru&checkin=2026-05-22&checkout=2026-05-23&group_adults=3" },
    ],
  },
  {
    key: "hotel_cusco",
    title: "Cusco · Centro o San Blas",
    meta: "3 noches · 23, 24, 25 may",
    links: [
      { label: "🔍 Booking", href: "https://www.booking.com/searchresults.es.html?ss=Cusco+Centro&checkin=2026-05-23&checkout=2026-05-26&group_adults=3" },
      { label: "🔍 Airbnb", href: "https://www.airbnb.com/s/Cusco/homes?checkin=2026-05-23&checkout=2026-05-26&adults=3" },
    ],
  },
];

export const DAYS: DayInfo[] = [
  { key: "day_1", date: "Día 1 · Sáb 16 may", title: "Llegada a Lima", loc: "Lima",
    items: ["Llegamos 20:00 a LIM. Uber o taxi oficial al hotel.", "Cena cerca del hotel, dormir."] },
  { key: "day_2", date: "Día 2 · Dom 17 may", title: "Miraflores & Barranco", loc: "Lima",
    items: ["Malecón, Parque del Amor, acantilados", "Huaca Pucllana (ruina en medio de la ciudad)", "Barranco: Puente de los Suspiros, arte callejero", "Almuerzo ceviche: La Mar, Canta Rana o Isolina"] },
  { key: "day_3", date: "Día 3 · Lun 18 may", title: "Centro histórico & gastro", loc: "Lima",
    items: ["Plaza Mayor, Catedral, Monasterio San Francisco", "Cena top: Central, Maido, Kjolle o Rafael (reservar ya)"] },
  { key: "day_4", date: "Día 4 · Mar 19 may", title: "Vuelo a Cusco → directo al Valle", loc: "Valle Sagrado",
    items: ["Vuelo 11:00–15:00. Bajamos al Valle (2800m) — mejor que Cusco (3400m) para aclimatar.", "Mate de coca, caminar suave, cenar liviano, dormir temprano."] },
  { key: "day_5", date: "Día 5 · Mié 20 may", title: "Pisac + Ollantaytambo", loc: "Valle Sagrado",
    items: ["Mañana: ruinas + mercado de Pisac", "Tarde: fortaleza de Ollantaytambo"] },
  { key: "day_6", date: "Día 6 · Jue 21 may", title: "Maras, Moray & Salineras", loc: "Valle Sagrado",
    items: ["Moray (terrazas incas) + Salineras (4000 pozos de sal)"] },
  { key: "day_7", date: "Día 7 · Vie 22 may", title: "🏔️ Machu Picchu", loc: "Aguas Calientes",
    items: ["Tren Ollantaytambo → Aguas Calientes", "Bus a la ciudadela + tour guiado (circuito 2)", "Noche en Aguas Calientes"] },
  { key: "day_8", date: "Día 8 · Sáb 23 may", title: "Vuelta a Cusco", loc: "Cusco",
    items: ["Tren a Cusco. Check-in, cena en San Blas."] },
  { key: "day_9", date: "Día 9 · Dom 24 may", title: "🌈 Rainbow Mountain", loc: "Cusco",
    items: ["Tour full day. Alternativa tranqui: Palcoyo o Laguna Humantay."] },
  { key: "day_10", date: "Día 10 · Lun 25 may", title: "Cusco ciudad", loc: "Cusco",
    items: ["Sacsayhuamán, Qorikancha, Plaza de Armas, San Blas, Mercado San Pedro"] },
  { key: "day_11", date: "Día 11 · Mar 26 may", title: "Vuelta a BA", loc: "Vuelta",
    items: ["Cusco → Lima 14:00 / Lima → BA 22:00 / llegamos 04:30 del miércoles"] },
];

export const CHECKLIST: ChecklistInfo[] = [
  { key: "chk_r1", title: "🏔️ Entradas Machu Picchu", owner: "Tomi", subHtml: 'Oficial y barato: <a class="text-accent underline" href="https://tuboleto.cultura.pe" target="_blank">tuboleto.cultura.pe</a> · Circuito 2' },
  { key: "chk_r2", title: "🚂 Tren a Aguas Calientes", owner: "Tomi", subHtml: '<a class="text-accent underline" href="https://www.perurail.com" target="_blank">PeruRail</a> o <a class="text-accent underline" href="https://www.incarail.com" target="_blank">IncaRail</a>' },
  { key: "chk_r3", title: "🍽️ Reserva Central / Maido / Kjolle", owner: "Rami", sub: "2–3 meses de anticipación" },
  { key: "chk_r4", title: "🛏️ Hotel Lima (3 noches)", owner: "Nati" },
  { key: "chk_r5", title: "🛏️ Hotel Valle Sagrado (3 noches)", owner: "Nati" },
  { key: "chk_r6", title: "🛏️ Hotel Aguas Calientes (1 noche)", owner: "Nati" },
  { key: "chk_r7", title: "🛏️ Hotel Cusco (3 noches)", owner: "Nati" },
  { key: "chk_r8", title: "🌈 Tour Rainbow Mountain", owner: "Todos" },
  { key: "chk_r9", title: "🛡️ Seguro de viaje", owner: "Todos", sub: "C/u el suyo. Cubrir altura y trekking." },
  { key: "chk_r10", title: "📘 Pasaportes vigentes", owner: "Todos", sub: "Validez mínima 6 meses" },
  { key: "chk_r11", title: "✈️ Confirmar vuelos con Tomi", owner: "Rami" },
  { key: "chk_r12", title: "💵 Comprar USD cash", owner: "Todos" },
];

export const RECOS = {
  lima: [
    { label: "Central", href: "https://centralrestaurante.com.pe" },
    { label: "Maido", href: "https://maido.pe" },
    { label: "Kjolle", href: "https://kjolle.com" },
    { label: "La Mar", href: "https://lamarcebicheria.com" },
    { label: "Rafael", href: "https://rafaelosterling.pe" },
    { label: "Isolina", href: "https://isolina.pe" },
  ],
  tickets: [
    { label: "Machu Picchu (oficial)", href: "https://tuboleto.cultura.pe", primary: true },
    { label: "PeruRail", href: "https://www.perurail.com" },
    { label: "IncaRail", href: "https://www.incarail.com" },
    { label: "Boleto Turístico Cusco", href: "https://boletoturisticodelcusco.com" },
  ],
  tours: [
    { label: "GetYourGuide", href: "https://www.getyourguide.es/peru-l169194/" },
    { label: "Civitatis", href: "https://www.civitatis.com/es/cusco/" },
    { label: "Viator", href: "https://www.viator.com/Peru/d26" },
  ],
  mapas: [
    { label: "Miraflores", href: "https://www.google.com/maps/search/Miraflores+Lima" },
    { label: "Barranco", href: "https://www.google.com/maps/search/Barranco+Lima" },
    { label: "Cusco centro", href: "https://www.google.com/maps/search/Centro+Historico+Cusco" },
    { label: "Valle Sagrado", href: "https://www.google.com/maps/search/Valle+Sagrado+Peru" },
  ],
};

export const FLIGHT_FIELDS = [
  { key: "airline", label: "Aerolínea" },
  { key: "flight_no", label: "N° vuelo" },
  { key: "code", label: "Código reserva" },
  { key: "url", label: "Link", isUrl: true },
] as const;

export const HOTEL_FIELDS = [
  { key: "name", label: "Hotel / Airbnb" },
  { key: "code", label: "Código reserva" },
  { key: "url", label: "Link", isUrl: true },
  { key: "notes", label: "Notas" },
] as const;
