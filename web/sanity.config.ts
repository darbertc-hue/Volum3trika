import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schema';
export default defineConfig({name:'volum3trika',title:'VOLUM3TRIKA² · Contenido',projectId:process.env.SANITY_STUDIO_PROJECT_ID||process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'configure-project',dataset:process.env.SANITY_STUDIO_DATASET||process.env.NEXT_PUBLIC_SANITY_DATASET||'production',plugins:[structureTool({structure:S=>S.list().title('Contenido').items([S.listItem().title('Identidad y contacto').child(S.document().schemaType('siteSettings').documentId('site-settings')),...S.documentTypeListItems().filter(item=>item.getId()!=='siteSettings')])})],schema:{types:schemaTypes}});
