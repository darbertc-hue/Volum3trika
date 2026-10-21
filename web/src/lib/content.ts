import { cache } from 'react';
import { createClient } from '@sanity/client';
import { z } from 'zod';
import initial from '../../content/initial.json';

export const sectors = ['Industrial', 'Residencial', 'Corporativo', 'Comercial'] as const;
const image = z.string().refine(v => v.startsWith('/images/') || /^https:\/\/cdn\.sanity\.io\/images\//.test(v));
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const serviceSchema = z.object({ slug, number: z.string(), verb: z.string(), title: z.string(), description: z.string(), body: z.string(), items: z.array(z.string()), image, imageIsReference: z.boolean() });
export const projectSchema = z.object({
  slug,
  title: z.string(),
  sector: z.enum(sectors),
  location: z.string(),
  summary: z.string(),
  scope: z.array(z.string()),
  impact: z.string().optional().default(''),
  serviceSlugs: z.array(slug),
  image,
  imageIsReference: z.boolean(),
  featured: z.boolean()
});

const settingsSchema = z.object({
  companyName: z.string(),
  legalName: z.string().optional().default('VOLUM3TRIKA² INGENIERÍA Y SERVICIOS, SRL.'),
  heroTitle: z.string(),
  heroDescription: z.string(),
  email: z.string().email(),
  directorEmails: z.array(z.string()).optional().default([]),
  phone: z.string(),
  additionalPhones: z.array(z.string()).optional().default([]),
  whatsapp: z.string().regex(/^\d{10,15}$/),
  address: z.string(),
  instagram: z.string().regex(/^[a-zA-Z0-9._]+$/),
  about: z.string(),
  mission: z.string(),
  vision: z.string().optional().default(''),
  targetAudiences: z.array(z.string()).optional().default([]),
  retailLogistics: z.object({
    title: z.string(),
    description: z.string(),
    pillars: z.array(z.object({
      name: z.string(),
      detail: z.string()
    }))
  }).optional(),
  team: z.array(z.object({
    name: z.string(),
    role: z.string(),
    description: z.string()
  }))
});
export type Service = z.infer<typeof serviceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export const getContent = cache(async (): Promise<{ settings: Settings; services: Service[]; projects: Project[] }> => {
  const fallback = { settings: settingsSchema.parse(initial.settings), services: z.array(serviceSchema).parse(initial.services), projects: z.array(projectSchema).parse(initial.projects) };
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return fallback;
  try {
    const client = createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2026-10-01', useCdn: true, perspective: 'published' });
    const content = await client.fetch(`{
      "settings": *[_type == "siteSettings"][0]{companyName,heroTitle,heroDescription,email,phone,whatsapp,address,instagram,about,mission,team[]{name,role,description}},
      "services": *[_type == "service"] | order(number asc){"slug":slug.current,number,verb,title,description,body,items,"image":coalesce(image.asset->url,fallbackImage),imageIsReference},
      "projects": *[_type == "project"] | order(order asc){"slug":slug.current,title,sector,"location":coalesce(location,""),summary,scope,"serviceSlugs":coalesce(serviceSlugs,[]),"image":coalesce(image.asset->url,fallbackImage),imageIsReference,featured}
    }`, {}, { next: { revalidate: 60 }, timeout: 5000 });
    const settings = settingsSchema.safeParse(content.settings);
    const services = z.array(serviceSchema).safeParse(content.services);
    const projects = z.array(projectSchema).safeParse(content.projects);
    return { settings: settings.success ? settings.data : fallback.settings, services: services.success && services.data.length ? services.data : fallback.services, projects: projects.success ? projects.data : fallback.projects };
  } catch { console.warn('Sanity no disponible: se usa el contenido inicial.'); return fallback; }
});
export function whatsappUrl(settings: Settings, service?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || settings.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent('Hola, VOLUM3TRIKA². Me gustaría solicitar una cotización' + (service ? ` para ${service}` : ' para mi proyecto') + '. ¿Podemos conversar?')}`;
}
export function siteUrl() { return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; }
