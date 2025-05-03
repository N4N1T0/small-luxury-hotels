import { getCollection, type CollectionEntry } from "astro:content";

// Tipo para las entradas de blog
export type BlogEntry = CollectionEntry<"blog">;

/**
 * Obtiene todas las entradas de blog ordenadas por fecha de publicación (más recientes primero)
 * @returns Array de entradas de blog
 */
export const getAllBlogs = async (): Promise<BlogEntry[]> => {
  const blogs = await getCollection("blog");
  return blogs.sort((a, b) => {
    return (
      new Date(b.data.publishDate).getTime() -
      new Date(a.data.publishDate).getTime()
    );
  });
};

/**
 * Obtiene un blog específico por su slug
 * @param slug El slug del blog a buscar
 * @returns La entrada de blog o undefined si no se encuentra
 */
export const getBlogBySlug = async (
  slug: string,
): Promise<BlogEntry | undefined> => {
  const blogs = await getCollection("blog");
  return blogs.find((blog) => blog.slug === slug);
};

/**
 * Obtiene los blogs destacados
 * @param limit Número máximo de blogs a devolver (opcional)
 * @returns Array de blogs destacados
 */
export const getFeaturedBlogs = async (
  limit?: number,
): Promise<BlogEntry[]> => {
  const blogs = await getCollection("blog");
  const featured = blogs
    .filter((blog) => blog.data.featured)
    .sort((a, b) => {
      return (
        new Date(b.data.publishDate).getTime() -
        new Date(a.data.publishDate).getTime()
      );
    });

  return limit ? featured.slice(0, limit) : featured;
};

/**
 * Obtiene blogs por categoría
 * @param category La categoría a filtrar
 * @returns Array de blogs de la categoría especificada
 */
export const getBlogsByCategory = async (
  category: string,
): Promise<BlogEntry[]> => {
  const blogs = await getCollection("blog");
  return blogs
    .filter((blog) => blog.data.category === category)
    .sort((a, b) => {
      return (
        new Date(b.data.publishDate).getTime() -
        new Date(a.data.publishDate).getTime()
      );
    });
};

/**
 * Obtiene blogs relacionados basados en tags compartidos
 * @param currentBlog El blog actual para el que buscar relacionados
 * @param limit Número máximo de blogs relacionados a devolver
 * @returns Array de blogs relacionados
 */
export const getRelatedBlogs = async (
  currentBlog: BlogEntry,
  limit = 3,
): Promise<BlogEntry[]> => {
  const allBlogs = await getCollection("blog");
  const currentTags = currentBlog.data.tags || [];

  // Excluir el blog actual y ordenar por relevancia (número de tags coincidentes)
  const related = allBlogs
    .filter((blog) => blog.slug !== currentBlog.slug)
    .map((blog) => {
      const blogTags = blog.data.tags || [];
      const commonTags = currentTags.filter((tag) => blogTags.includes(tag));
      return {
        blog,
        relevance: commonTags.length,
      };
    })
    .filter((item) => item.relevance > 0)
    .sort(
      (a, b) =>
        b.relevance - a.relevance ||
        new Date(b.blog.data.publishDate).getTime() -
          new Date(a.blog.data.publishDate).getTime(),
    )
    .map((item) => item.blog);

  return related.slice(0, limit);
};

/**
 * Formatea una fecha en formato legible
 * @param dateString La fecha en formato string
 * @param locale El locale a utilizar (por defecto 'es-ES')
 * @returns La fecha formateada
 */
export const formatBlogDate = (
  dateString: string,
  locale = "es-ES",
): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Function to get all unique tags from blogs
export const getAllTags = async (): Promise<string[]> => {
  const blogs = await getCollection("blog");
  const tagsSet = new Set<string>();
  blogs.forEach((blog) => {
    const tags = blog.data.tags || [];
    tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

// Function to get all blogs with a specific tag
export const getBlogsByTag = async (tag: string): Promise<BlogEntry[]> => {
  const blogs = await getCollection("blog");
  return blogs.filter((blog) => blog.data.tags && blog.data.tags.includes(tag));
};
