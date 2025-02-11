import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { IoMenu } from 'react-icons/io5'
import Logo from './Logo'
import Links from './Links'
import Search from './Search'

export default function Menu() {
  return (
    <div className='inline md:hidden'>
        <Sheet>
            <SheetTrigger>
                <IoMenu className="text-2xl text-zinc-800" />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-center justify-center gap-12">
                <SheetTitle><Logo /></SheetTitle>
                <Links/>
                <Search />
            </SheetContent>
        </Sheet>
    </div>
  )
}
