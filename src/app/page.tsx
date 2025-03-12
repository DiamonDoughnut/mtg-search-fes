'use client'

import Image from "next/image";
import "mana-font";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import AdvancedSearch from "@/components/Responsive/advanced-search";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Footer from "@/components/searchComponents/footer";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('')

  const handleBasicSearch = (search: string) => {
    console.log(search)
    const searchParams = new URLSearchParams()
    searchParams.append('name', search)
    console.log(searchParams)
    router.push('/search?' + searchParams);
  }
  return (
    <div className='relative grid grid-rows-[20px_1fr_20px] overflow-hidden overflow-y-hidden  items-center justify-items-center min-h-screen md:max-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <div className='absolute top-0 left-0 z-0'>
        <Image
          src={"/080224-article-BG.webp"}
          alt=''
          width={1920}
          height={1080}
          className='z-0'
        />
      </div>
      <div className='absolute top-0 left-0 z-10 bg-gradient-to-b from-transparent via-slate-900 to-slate-900 min-h-[1080px] min-w-full'></div>
      <main className='z-20 flex flex-col gap-y-8 row-start-2 -translate-y-24 justify-center mx-auto items-center sm:items-start'>
        <div className='bg-slate-300/40 rounded-2xl w-full pb-24 pt-12 flex items-center justify-center'>
          <Image
            className='flex'
            src='/logo.png'
            alt='MTG Search logo'
            width={442/2}
            height={443/2}
            priority
          />
        </div>
        <div className='flex items-center justify-center text-2xl ms-mechanic -translate-y-12 text-center sm:text-left w-full h-fit -my-16'>
          <div className='flex items-center justify-center'>
            <Image 
              className="w-1/3 pr-4"
              src={'/Magic-The-Gathering-Logo.png'}
              alt="Magic: The Gathering&copy;"
              height={384}
              width={216}
            />
            {"Card Search"}
          </div>
        </div>
        <div className='flex gap-4 items-center flex-col w-full mt-2'>
          <div className='rounded-full border flex-col w-full border-solid border-transparent relative transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'>
            <Input
              type='text'
              className='bg-transparent mr-2 text-slate-300 border-none focus:bg-slate-300 focus:border-none focus:ring-0 w-full text-2xl placeholder:text-slate-500 focus:text-slate-950 placeholder:text-base pl-4'
              placeholder='Enter Card Name'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleBasicSearch(search)
                }
              }}
            />
            <Button variant={'ghost'} className="px-2.5 absolute top-[10%] right-1 rounded-full" onClick={() => handleBasicSearch(search)} disabled={search.length < 1}>
              <SearchIcon size={32} className="text-2xl h-full w-full" />
            </Button>
          </div>
          <h3 className='text-2xl font-bold'> OR </h3>
              <AdvancedSearch />
        </div>
      </main>
      <div className="row-start-3 flex gap-6 flex-wrap">
        <Footer />
      </div>
    </div>
  );
}
