export type WorkItem = {
  title: string;
  type: string;
  description: string;
  image: string;
  href?: string;
};

/** Capturas del portafolio público de David. Sin cifras de resultados. */
export const PROJECTS: readonly WorkItem[] = [
  { title: "Restore Chiropractic", type: "Salud · Charlotte, EE. UU.", description: "Web bilingüe con servicios, perfil profesional y acceso al sistema de citas.", image: "restore", href: "https://www.restorechiropracticcare.com/" },
  { title: "Jimmy Cevallos · Enfermería", type: "Servicios · Portoviejo", description: "Servicios de enfermería a domicilio y contacto directo por WhatsApp.", image: "enfermero", href: "https://enfermero-jimmy-cevallos.vercel.app/" },
  { title: "Of Essence", type: "Catálogo digital · Perfumería", description: "Catálogo interactivo para explorar una colección de perfumería exclusiva.", image: "of-essence", href: "https://of-essence.vercel.app/" },
  { title: "Teatro Bernarda", type: "Cultura · Proyecto académico", description: "Una plataforma de difusión para un proyecto de Artes Escénicas.", image: "bernarda", href: "https://teatrobernarda.vercel.app/" },
];

export const TEMPLATES: readonly WorkItem[] = [
  { title: "Estudio Axis", type: "Arquitectura", description: "Proyectos en primer plano y un alzado que se dibuja al recorrer la página.", image: "arqui-template" },
  { title: "Fitness", type: "Gimnasio", description: "Entrenamientos, planes y una presentación pensada para pasar a la acción.", image: "gym-template" },
  { title: "Dojo Academia", type: "Artes marciales", description: "Identidad tipográfica, disciplinas y una ruta clara hacia la inscripción.", image: "dojo-template" },
  { title: "La Burger", type: "Hamburguesería", description: "Menú, carrito y una hamburguesa que se arma mientras recorres la web.", image: "burguer-template" },
  { title: "Dulce Atelier", type: "Repostería", description: "Una vitrina de productos para convertir antojos en consultas y pedidos.", image: "reposteria-brun" },
  { title: "Barber Studio", type: "Barbería", description: "Servicios, estilo propio y reservas que llegan directamente a WhatsApp.", image: "jgbarberstudio" },
];
