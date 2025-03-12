'use client'
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import 'mana-font'
import '../app/resources/keyrune/css/keyrune.min.css'
import { cn } from '@/lib/utils';

interface RarityCheckboxProps {
    rarity: 'common' | 'uncommon' | 'rare' | 'mythic';
    state: boolean;
    setState: (arg: boolean) => void;
}

const RarityCheckbox = ({ rarity, state, setState}: RarityCheckboxProps) => {

  return (
    <div className={`flex justify-center items-center gap-x-2 font-bold rounded-xl relative p-1 checkbox-${rarity.toLowerCase()}-${state}`}>
        <Checkbox value={rarity } onCheckedChange={(checked) => {
            setState(checked !== 'indeterminate' ? checked : state); 
        }} />
        <Label className='text-md'>{rarity !== 'mythic' ? rarity[0].toUpperCase() + rarity.slice(1) : 'Mythic Rare'}</Label>   
        <i className={cn(`ss ss-${rarity} ss-bcore rounded-3xl bg-slate-100 p-1`, rarity !== 'common' && 'ss-grad')} /> 
    </div>
  )
}

export default RarityCheckbox