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
    items: ["Tren Ollantaytambo → Aguas Calientes", "Bus a la ciudadela + tour guiado (verificar qué circuito al reservar)", "Noche en Aguas Calientes"] },
  { key: "day_8", date: "Día 8 · Sáb 23 may", title: "Vuelta a Cusco", loc: "Cusco",
    items: ["Tren a Cusco. Check-in, cena en San Blas."] },
  { key: "day_9", date: "Día 9 · Dom 24 may", title: "🌈 Rainbow Mountain", loc: "Cusco",
    items: ["Tour full day. Alternativa tranqui: Palcoyo o Laguna Humantay."] },
  { key: "day_10", date: "Día 10 · Lun 25 may", title: "Cusco ciudad", loc: "Cusco",
    items: ["Sacsayhuamán, Qorikancha, Plaza de Armas, San Blas, Mercado San Pedro"] },
  { key: "day_11", date: "Día 11 · Mar 26 may", title: "Vuelta a BA", loc: "Vuelta",
    items: ["Cusco → Lima 14:00 / Lima → BA 22:00 / llegamos 04:30 del miércoles"] },
];

/* URLs de búsqueda (Google) para lo que no tengo 100% verificado.
   El usuario confirma la oficial al clickear. Evita linkear a dominios que yo adiviné. */
const g = (q: string) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const CHECKLIST: ChecklistInfo[] = [
  {
    key: "chk_r1",
    title: "🏔️ Entradas Machu Picchu",
    owner: "Tomi",
    sub: "Circuitos cambiaron en 2024 — verificar cuál sirve (clásico tipo postal)",
    bookingUrl: g("Machu Picchu entradas oficial 2026"),
    bookingLabel: "Buscar sitio oficial",
  },
  {
    key: "chk_r2",
    title: "🚂 Tren a Aguas Calientes",
    owner: "Tomi",
    sub: "Desde Ollantaytambo · PeruRail o IncaRail",
    bookingUrl: "https://www.perurail.com",
    bookingLabel: "PeruRail",
  },
  {
    key: "chk_r3",
    title: "🍽️ Reserva restaurantes top Lima",
    owner: "Rami",
    sub: "Central, Maido, Kjolle, Rafael — 2–3 meses antes",
    bookingUrl: g("Central restaurante Lima reserva"),
    bookingLabel: "Buscar reserva",
  },
  {
    key: "chk_r4",
    title: "🛏️ Hotel Lima (3 noches)",
    owner: "Nati",
    bookingUrl: "https://www.booking.com/searchresults.es.html?ss=Miraflores%2C+Lima&checkin=2026-05-16&checkout=2026-05-19&group_adults=3",
    bookingLabel: "Booking Lima",
  },
  {
    key: "chk_r5",
    title: "🛏️ Hotel Valle Sagrado (3 noches)",
    owner: "Nati",
    bookingUrl: "https://www.booking.com/searchresults.es.html?ss=Valle+Sagrado%2C+Peru&checkin=2026-05-19&checkout=2026-05-22&group_adults=3",
    bookingLabel: "Booking Valle",
  },
  {
    key: "chk_r6",
    title: "🛏️ Hotel Aguas Calientes (1 noche)",
    owner: "Nati",
    bookingUrl: "https://www.booking.com/searchresults.es.html?ss=Aguas+Calientes%2C+Peru&checkin=2026-05-22&checkout=2026-05-23&group_adults=3",
    bookingLabel: "Booking Aguas Calientes",
  },
  {
    key: "chk_r7",
    title: "🛏️ Hotel Cusco (3 noches)",
    owner: "Nati",
    bookingUrl: "https://www.booking.com/searchresults.es.html?ss=Cusco+Centro&checkin=2026-05-23&checkout=2026-05-26&group_adults=3",
    bookingLabel: "Booking Cusco",
  },
  {
    key: "chk_r8",
    title: "🌈 Tour Rainbow Mountain",
    owner: "Todos",
    sub: "Full day desde Cusco. Alternativa: Palcoyo o Humantay.",
    bookingUrl: g("Rainbow Mountain Vinicunca tour Cusco"),
    bookingLabel: "Buscar tours",
  },
  {
    key: "chk_r9",
    title: "🛡️ Seguro de viaje",
    owner: "Todos",
    sub: "Cada uno el suyo. Cubrir altura y trekking.",
    bookingUrl: g("seguro de viaje internacional Peru trekking"),
    bookingLabel: "Comparar seguros",
  },
  {
    key: "chk_r10",
    title: "📘 Pasaportes vigentes",
    owner: "Todos",
    sub: "Validez mínima 6 meses desde fecha de entrada",
  },
  {
    key: "chk_r11",
    title: "✈️ Confirmar vuelos con Tomi",
    owner: "Rami",
    sub: "Pedir aerolínea, n° vuelo y código de reserva de cada tramo",
  },
  {
    key: "chk_r12",
    title: "💵 Comprar USD cash",
    owner: "Todos",
    sub: "Llevar en billetes, cambiar allá (no en aeropuerto)",
  },
];

/* Recomendaciones: uso búsquedas de Google para las que no tengo dominio 100% verificado.
   Así nunca hay un link roto y siempre caen en el sitio real actual. */
export const RECOS = {
  lima: [
    { label: "Central", href: g("Central restaurante Lima reserva") },
    { label: "Maido", href: g("Maido Lima reserva") },
    { label: "Kjolle", href: g("Kjolle Lima restaurante") },
    { label: "La Mar", href: g("La Mar cebichería Lima") },
    { label: "Rafael", href: g("Rafael restaurante Lima Osterling") },
    { label: "Isolina", href: g("Isolina Barranco Lima") },
  ],
  tickets: [
    { label: "Machu Picchu (oficial)", href: g("Machu Picchu entradas oficial 2026"), primary: true },
    { label: "PeruRail", href: "https://www.perurail.com" },
    { label: "IncaRail", href: "https://www.incarail.com" },
    { label: "Boleto Turístico Cusco", href: g("Boleto Turístico Cusco sitio oficial") },
  ],
  tours: [
    { label: "GetYourGuide", href: "https://www.getyourguide.com/s/?q=Cusco" },
    { label: "Civitatis", href: "https://www.civitatis.com/es/buscar/?q=cusco" },
    { label: "Viator", href: "https://www.viator.com/search/Cusco" },
  ],
  mapas: [
    { label: "Miraflores", href: "https://www.google.com/maps/search/Miraflores+Lima" },
    { label: "Barranco", href: "https://www.google.com/maps/search/Barranco+Lima" },
    { label: "Cusco centro", href: "https://www.google.com/maps/search/Centro+Historico+Cusco" },
    { label: "Valle Sagrado", href: "https://www.google.com/maps/search/Valle+Sagrado+Peru" },
    { label: "Ollantaytambo", href: "https://www.google.com/maps/search/Ollantaytambo" },
    { label: "Aguas Calientes", href: "https://www.google.com/maps/search/Aguas+Calientes+Peru" },
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
