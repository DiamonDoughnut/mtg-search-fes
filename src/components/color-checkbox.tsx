'use client'
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import 'mana-font'

interface ColorCheckboxProps {
    color: 'White' | 'Blue' | 'Black' | 'Red' | 'Green' | 'Colorless'
    state: boolean;
    setState: (arg: boolean) => void;
}

const ColorCheckbox = ({ color, state, setState }: ColorCheckboxProps) => {
    
  return (
    <div className={`flex justify-center items-center gap-x-2 font-bold rounded-xl relative p-1 checkbox-${color.toLowerCase()}-${state}`}>
        <Checkbox value={color !== 'Blue' ? color[0] : 'U'} onCheckedChange={(checked) => {
            setState(checked !== 'indeterminate' ? checked : state); 
        }} />
        <Label className=''>{color}</Label>   
        <i className={`ms ms-cost right-1 top-1 ms-lg ms-shadow ms-${color === 'Blue' ? 'u' : color.slice(0, 1).toLowerCase()}`} /> 
    </div>
  )
}

export default ColorCheckbox