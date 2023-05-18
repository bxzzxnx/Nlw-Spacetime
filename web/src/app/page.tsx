import { Hero } from '@/components/Hero'
import { Copyright } from '@/components/Copyright'
import { SignIn } from '@/components/SignIn'
import { Profile } from '@/components/Profile'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Stripes } from '@/components/Stripes'
import { Blur } from '@/components/Blur'

import { cookies } from 'next/headers'

export default function Home() {
  const isAuth = cookies().has('token')
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* left */}
      <div className=" relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        <Blur /> {/* blur */}
        <Stripes /> {/* stripes */}
        {isAuth ? <Profile /> : <SignIn />} {/* Ternário logado ou não */}
        <Hero /> {/* Hero Aqui */}
        <Copyright /> {/* Copyright Aqui */}
      </div>
      {/* right */}
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
