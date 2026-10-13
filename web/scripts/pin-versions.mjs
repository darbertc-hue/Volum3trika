import { readFileSync,writeFileSync } from 'node:fs';
const manifest=JSON.parse(readFileSync('package.json','utf8'));
const lock=JSON.parse(readFileSync('package-lock.json','utf8'));
for(const section of ['dependencies','devDependencies']){
  for(const name of Object.keys(manifest[section])){
    const version=lock.packages[`node_modules/${name}`]?.version;
    if(!version)throw new Error(`No hay versión instalada de ${name}`);
    manifest[section][name]=version;
    lock.packages[''][section][name]=version;
  }
}
manifest.scripts.dev='next dev --webpack --hostname 127.0.0.1';
manifest.scripts.build='next build --webpack';
manifest.engines={node:'>=22.12.0'};
lock.packages[''].engines=manifest.engines;
writeFileSync('package.json',JSON.stringify(manifest,null,2)+'\n');
writeFileSync('package-lock.json',JSON.stringify(lock,null,2)+'\n');
console.log('Versiones fijadas a los paquetes instalados.');
