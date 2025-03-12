import React, { useState } from 'react'
import { Input } from '../ui/input'
import Link from 'next/link'
import Image from 'next/image'
import AdvancedSearch from '../Responsive/advanced-search'
import { SearchIcon } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import 'mana-font'
import { Button } from '../ui/button'
import { Cards } from 'scryfall-api';
import { useRouter } from 'next/navigation'


const HeaderTwo = ( {searchString}: {searchString: string} ) => {
    const [search, setSearch] = useState(searchString)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleRandomSearch = async () => {
        setLoading(true);
        try {
            const randomCard = await Cards.random()
            const id = randomCard.id
            const name = randomCard.name
            router.push('/card/' + name + "?id=" + id);
        } catch (error) {
            console.log("[GET_RANDOM_CARD_ERROR]: ", error)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className='flex justify-between items-center mx-8 my-4 w-full'>
        <div className="flex justify-start items-center ml-4 w-3/5">
            <div className="flex justify-start items-center mr-4  w-1/3 max-h-full">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link href={'/'} className='flex justify-start items-center border-2 rounded-full pr-2 border-gray-700 hover:bg-gray-700'>
                            <Image src={'/logo.png'} alt='' height={70} width={70} />
                            <div className='text-lg text-slate-200 ms-mechanic ml-2 font-bold flex flex-col max-h-full'>
                                 Card Search
                            </div>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Return Home</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </div>
            <div className="flex flex-col justify-center items-start min-w-fit w-2/3 mr-4">
                <div className="flex justify-center items-center relative text-lg pb-1 pt-5 w-full text-slate-300">
                    <Input onChange={(e) => setSearch(e.target.value)} value={search} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            router.push('/search?' + search)
                        }
                    }} placeholder='Search for a card' className='bg-slate-950 border-slate-200 rounded-xl' />
                    <SearchIcon className='absolute top-[42%] right-2 cursor-pointer' />
                </div>
                <div className="flex items-center ml-2 justify-start text-sm text-slate-200/80">
                    <p>Search syntax is the same as <a href="https://scryfall.com/docs/syntax" target='_blank' className='underline text-violet-600'>Scryfall.com</a></p>
                </div>
            </div>
        </div>
        <div className="flex justify-end items-center mx-4 w-2/5">
            <div className="w-fit h-fit bg-slate-950 rounded-2xl">
                <AdvancedSearch />
            </div>
            <Button onClick={() => handleRandomSearch()} className=' p-6 rounded-2xl bg-slate-950 ml-4' disabled={loading}>Random Card</Button>
        </div>
    </div>
  )
}

export default HeaderTwo