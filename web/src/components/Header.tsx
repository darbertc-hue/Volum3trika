'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
export default function Header() {
  const [open, setOpen] = useState(false); const path = usePathname();
  return <header className="header"><Link href="/" aria-label="VOLUM3TRIKA², inicio" onClick={()=>setOpen(false)}><Image className="logo" src="/images/logo.png" alt="VOLUM3TRIKA² Ingeniería y Servicios" width={367} height={175} priority /></Link><button className="menu" aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>Menú {open ? '−' : '+'}</button><nav id="main-nav" className={open?'navigation open':'navigation'} aria-label="Principal">{[['/servicios','Soluciones'],['/proyectos','Proyectos'],['/nosotros','Nosotros']].map(([href,label])=><Link key={href} href={href} aria-current={path.startsWith(href)?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/contacto" className="button small" onClick={()=>setOpen(false)}>Cotizar ↗</Link></nav></header>;
}
