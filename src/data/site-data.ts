export const navbarItems = [
  {
    label: "Hoteles",
    link: "/hoteles",
    megamenu: true,
  },
  {
    label: "Experiencias",
    link: "/experiencias",
    megamenu: true,
  },
  {
    label: "Nosotros",
    link: "/nosotros",
  },
  {
    label: "Blog",
    link: "/blog",
  },
];

export const contactInfo = {
  title: "Contáctanos",
  subtitle: "Estamos aquí para ayudarte con cualquier consulta.",
  email: {
    title: "Correo",
    description: "Envíanos un mensaje y te responderemos lo antes posible.",
    address: "info@nuestrohotel.com",
  },
  social: {
    title: "Síguenos",
    description: "Mantente al día con nuestras últimas novedades y ofertas.",
    networks: [
      { name: "Facebook", url: "https://facebook.com/" },
      { name: "Instagram", url: "https://instagram.com/" },
      { name: "LinkedIn", url: "https://linkedin.com/" },
    ],
  },
  phone: {
    title: "Teléfono",
    description: "Llámanos para reservas o consultas inmediatas.",
    numbers: [
      { label: "+1 (555) 123-4567 - WhatsApp", value: "+15551234567" },
      {
        label: "+1 (555) 123-4567 - Atención al Cliente",
        value: "+15551234567",
      },
    ],
  },
  location: {
    title: "Ubicaciones",
    description: "Visítanos en cualquiera de nuestras ubicaciones.",
    link: "/ubicaciones",
  },
};

export const footerData = {
  companyInfo: {
    name: "Small Luxury Hotels",
    description:
      "Experiencias únicas en destinos exclusivos. Descubre el lujo en cada detalle.",
    copyright: "© 2023 Small Luxury Hotels. Todos los derechos reservados.",
    address: "Calle Principal 123, Ciudad, País",
  },
  quickLinks: [
    { label: "Inicio", link: "/" },
    { label: "Hoteles", link: "/hoteles" },
    { label: "Experiencias", link: "/experiencias" },
    { label: "Galería", link: "/galeria" },
  ],
  legal: [
    { label: "Términos y Condiciones", link: "/legal/terminos-y-condiciones" },
    { label: "Política de Privacidad", link: "/legal/politica-de-privacidad" },
    { label: "Política de Cookies", link: "/legal/politica-de-cookies" },
    { label: "Aviso Legal", link: "/legal/aviso-legal" },
  ],
  newsletter: {
    title: "Suscríbete a nuestro newsletter",
    description:
      "Recibe ofertas exclusivas y noticias sobre nuestros hoteles directamente en tu bandeja de entrada.",
  },
};
