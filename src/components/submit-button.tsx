
import React from 'react'
import { Tags } from './tag-search';
import { buildSearchParamString, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { CardSearchOrder } from 'scryfall-api';
import { Button } from './ui/button';

interface SubmitButtonProps {
    name?: string;
    text?: string;
    types?: Tags[];
    white?: boolean;
    blue?: boolean;
    black?: boolean;
    red?: boolean;
    green?: boolean;
    colorless: boolean;
    colorOp?: string;
    whiteId?: boolean;
    blueId?: boolean;
    blackId?: boolean;
    redId?: boolean;
    greenId?: boolean;
    colorlessId: boolean;
    cost?: string;
    statSelect?: string;
    statOp?: string;
    statVal?: string;
    paper?: boolean;
    arena?: boolean;
    online?: boolean;
    legality?: string;
    format?: string;
    sets?: Tags[];
    common?: boolean;
    uncommon?: boolean;
    rare?: boolean;
    mythic?: boolean;
    lore?: string;
    language?: string;
    sort?: string;
    allPrints?: boolean;
    extras?: boolean;
}

const SubmitButton = ({
    name,
    text,
    types,
    white,
    blue,
    black,
    red,
    green,
    colorless,
    colorOp,
    whiteId,
    blueId,
    blackId,
    redId,
    greenId,
    colorlessId,
    cost,
    statSelect,
    statOp,
    statVal,
    paper,
    arena,
    online,
    legality,
    format,
    sets,
    common,
    uncommon,
    rare,
    mythic,
    lore,
    language,
    sort,
    allPrints,
    extras
}: SubmitButtonProps) => {

  const router = useRouter()
  
  const handleSubmit = () => {
      const urlRecord = buildSearchParamString(name, text, types, white, blue, black, red, green, colorless, colorOp, whiteId, blueId, blackId, redId, greenId, colorlessId, cost, statSelect, statOp, statVal, paper, arena, online, legality, format, sets, common, uncommon, rare, mythic, lore, language, sort as CardSearchOrder, allPrints, extras);
      const url = new URLSearchParams(urlRecord);
      router.push('/search/?' + url)
    }

    const buttonColor = () => {
        let colorString = ''
        if (
          white && blue ||
          white && black || 
          white && red ||
          white && green ||
          blue && black ||
          blue && red ||
          blue && green ||
          black && red ||
          black && green ||
          green && red || 
          whiteId && blueId ||
          whiteId && blackId || 
          whiteId && redId ||
          whiteId && greenId ||
          blueId && blackId ||
          blueId && redId ||
          blueId && greenId ||
          blackId && redId ||
          blackId && greenId ||
          greenId && redId
        ) {
          colorString = 'bg-yellow-600 text-amber-200'
        } else if (white || whiteId) {
          colorString = 'bg-[#F8E7B9] text-[#F9FAF4]'
        } else if (blue || blueId) {
          colorString = 'bg-[#B3CEEA] text-[#0E68AB]'
        } else if (black || blackId) {
          colorString = 'bg-[#A69F9D] text-[#150B00]'
        } else if (red || redId) {
          colorString = 'bg-[#EB9F82] text-[#D3202A]'
        } else if (green || greenId) {
          colorString = 'bg-[#C4D3CA] text-[#00733E]'
        } else if (colorless || colorlessId) {
          colorString = 'bg-[#C7BFBC] text-[#78695C]'
        }
        if (mythic) {
          if (rare && uncommon && common) {
            colorString += ' border-4 border-t-orange-500 border-r-gray-500 border-l-amber-400 border-b-black'
          } else if (rare && uncommon) {
            colorString += ' border-4 border-t-orange-500 border-r-gray-500 border-l-amber-400 border-b-orange-500'
          } else if (rare && common) {
            colorString += ' border-4 border-t-orange-500 border-r-orange-500 border-l-amber-400 border-b-black'  
          } else if (uncommon && common) {
            colorString += ' border-4 border-t-orange-500 border-r-gray-500 border-l-orange-500 border-b-black'
          } else if (rare) {
            colorString += ' border-4 border-t-orange-500 border-r-orange-500 border-l-amber-400 border-b-amber-400'
          } else if (uncommon) {
            colorString += ' border-4 border-t-orange-500 border-l-orange-500 border-r-gray-500 border-b-gray-500'
          } else if (common) {
            colorString += ' border-4 border-t-orange-500 border-r-orange-500 border-l-black border-b-black'
          } else {
            colorString += ' border-4 border-orange-500'
          }
        } else if (rare) {
          if (uncommon && common) {
            colorString += ' border-4 border-t-amber-400 border-l-amber-400 border-r-gray-500 border-b-black'
          } else if (uncommon) {
            colorString += ' border-4 border-t-amber-400 border-l-amber-400 border-r-gray-500 border-b-gray-500'
          } else if (common) {
            colorString += ' border-4 border-t-amber-400 border-l-amber-400 border-r-black border-b-black'
          } else {
            colorString += ' border-4 border-amber-400'
          }
        } else if (uncommon) {
          if (common) {
            colorString += ' border-4 border-t-gray-500 border-r-gray-500 border-l-black border-b-black'
          } else {
            colorString += ' border-4 border-gray-500'
          }
        } else if (common) {
          colorString += ' border-4 border-black'
        }
    
        return colorString
        
      }

  return (
    <div className='min-w-full h-fit justify-center items-center'>
      <Button className={cn('ml-9 px-4 text-xl font-bold border-4 border-transparent self-center justify-self-center', buttonColor())} onClick={handleSubmit}>Search With These Options</Button>
    </div>
  )
}

export default SubmitButton