import Link from 'next/link';
import React from 'react';



export default function Links() {
  return (
    <ul className="flex md:flex-row  md:text-[16px] text-2xl flex-col items-center gap-4 text-neutral-700">
      {links.map((link) => {
        return (
          <li key={link.label}>
            <Link  href={link.route}>
              {link.label}
            </Link>
        </li>
        )
      })}
    </ul>
  )
}


export const links = [
  {
    label: "Home", 
    route: "/"
  },
  {
    label: "Catalog", 
    route: "/catalog"
  },
  {
    label: "About us", 
    route: "/about"
  }  
]
