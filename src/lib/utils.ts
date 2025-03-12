import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Tags } from "./tags"
import * as scryfall from 'scryfall-api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formats = [
  {value: 'standard', label: 'Standard'},
  {value: 'future', label: 'Future Standard'},
  {value: 'historic', label: 'Historic'},
  {value: 'timeless', label: 'Timeless'},
  {value: 'gladiator', label: 'Gladiator'},
  {value: 'pioneer', label: 'Pioneer'},
  {value: 'explorer', label: 'Explorer'},
  {value: 'modern', label: 'Modern'},
  {value: 'legacy', label: 'Legacy'},
  {value: 'pauper', label: 'Pauper'},
  {value: 'vintage', label: 'Vintage'},
  {value: 'penny', label: 'Penny Dreadful'},
  {value: 'commander', label: 'Commander'},
  {value: 'oathbreaker', label: 'Oathbreaker'},
  {value: 'standardbrawl', label: 'Standard Brawl'},
  {value: 'brawl', label: 'Brawl'},
  {value: 'alchemy', label: 'Alchemy'},
  {value: 'paupercommander', label: 'Pauper Commander'},
  {value: 'duel', label: 'Duel Commander'},
  {value: 'oldschol', label: 'Old School 93/94'},
  {value: 'premodern', label: 'Premodern'},
  {value: 'predh', label: 'PreDH'},
]

export const buildSearchParamString = (
  name?: string,
  text?: string,
  types?: Tags[],
  white?: boolean,
  blue?: boolean,
  black?: boolean,
  red?: boolean,
  green?: boolean,
  colorless?: boolean,
  colorOp?: string,
  whiteId?: boolean,
  blueId?: boolean,
  blackId?: boolean,
  redId?: boolean,
  greenId?: boolean,
  colorlessId?: boolean,
  cost?: string,
  statSelect?: string,
  statOp?: string,
  statVal?: string,
  paper?: boolean,
  arena?: boolean,
  online?: boolean,
  legality?: string,
  format?: string,
  sets?: Tags[],
  common?: boolean,
  uncommon?: boolean,
  rare?: boolean,
  mythic?: boolean,
  lore?: string,
  language?: string,
  sort?: scryfall.CardSearchOrder,
  allPrints?: boolean,
  extras?: boolean,
) => {
  const paramsObj = {
    sort: sort as string,
    name: name || '',
    o: text || '',
    t: types ? types.map((type) => type.value).join(',') : '',
    c: colorless ? 'c' : (colorOp !== '-' && colorOp) + (white ?  'w' : '') + (blue ? 'u' : '') + (black ? 'b' : '') + (red ? 'r' : '') + (green ? 'g' : ''),
    colorInvert: colorOp === '-' && true || '',
    id: colorlessId ? 'c' : (whiteId ? 'w' : '') + (blueId ? 'u' : '') + (blackId ? 'b' : '') + (redId ? 'r' : '') + (greenId ? 'g' : ''),
    cost: cost || '',
    stats: statVal ? (statSelect! + statOp! + statVal) : '',
    game: (paper ? 'paper' : '') +  (arena ? 'arena' : '') + (online ? 'online' : ''),
    legality: format ? legality + ':' + format : '',
    set: sets ? sets.map((set) => set.value).join(',') : '',
    r: (common ? 'c' : '') + (uncommon ? 'u' : '') + (rare ? 'r' : '') + (mythic ? 'm' : ''),
    lore: lore || '',
    lang: language || '',
    prints: allPrints ? 'true' : '',
    extras: extras ? 'true' : '',
  }
  const searchParams = new URLSearchParams(paramsObj as Record<string, string>);
if (!name) searchParams.delete('name');
if (!text) searchParams.delete('o');
if (!types) searchParams.delete('t');
if (!colorless && !white && !blue && !black && !red && !green) searchParams.delete('c');
if (colorOp !== '-' || !colorless && !white && !blue && !black && !red && !green) searchParams.delete('colorInvert')
if (!colorlessId && !whiteId && !blueId && !blackId && !redId && !greenId) searchParams.delete('id');
if (!cost) searchParams.delete('cost');
if (!statVal) searchParams.delete('stats');
if (!paper && !arena && !online) searchParams.delete('game');
if (!format) searchParams.delete('legality');
if (!sets) searchParams.delete('set');
if (!common && !uncommon && !rare && !mythic) searchParams.delete('r');
if (!lore) searchParams.delete('lore');
if (!language) searchParams.delete('lang');
if (!allPrints) searchParams.delete('prints');
if (!extras) searchParams.delete('extras');
    
  return searchParams
}