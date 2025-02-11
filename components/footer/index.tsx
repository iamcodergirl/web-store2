import React from 'react'
import Logo from '../navbar/Logo'
import { links } from '../navbar/Links'
import Link from 'next/link'
import { LuFacebook } from 'react-icons/lu'
import { FaInstagram } from 'react-icons/fa'
import { MdMailOutline } from 'react-icons/md'

export default function Footer() {
  return (
    <div className='md:grid md:grid-cols-4 flex flex-col gap-4 border-t border-primary/10 items-start px-4 py-12'>
      <Logo />
      <div className="space-y4">
        <span className="font-semibold text-xl">LINKS</span>
        <ul className=''>
          {links.map(link=>(
            <li key={link.label}><Link href={link.route} >{link.label}</Link></li>
          ))}
          <li><Link href="/admin" className='underline'>Admin</Link></li>
        </ul>
      </div>

      <div className="space-y-4">
        <span className="font-semibold text-xl">LOCATION</span>
        <div>
          <p>COMPTON</p>
          <p>CALIFORNIA</p>
        </div>        
        <div>
          <p>iamcoder@gmail.com</p>
          <p>+12345678</p>
        </div>
      </div>

      <div className="space-y-4">
        <span className="font-semibold text-xl">OUR SOCIAL MEDIAS</span>
        <ul className='flex items-center gap-3 text-3xl'>
          <li>
            <Link href="/#facebook">
              <LuFacebook />
            </Link>
          </li>
          <li>
            <Link href="/#instagram">
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link href="/#email">
              <MdMailOutline />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
