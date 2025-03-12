import React from 'react'
import { Tags } from './tag-search'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { XIcon } from 'lucide-react'

interface TagsProps {
    value: Tags,
    operator: boolean
    changeOperator: (arg: boolean) => void;
    removeTag: (arg: Tags) => void;
}

const TagButton = ({ value, operator, changeOperator, removeTag }: TagsProps) => {
  return (
    <div className={cn('flex gap-x-1 mx-2 justify-center items-center border-slate-800 border-solid rounded-xl border-spacing-1 border-x-2 border-y-2 p-1')}>
        <Button className={cn("h-full" ,operator ? 'bg-green-500' : 'bg-red-600')} onClick={() => changeOperator(!operator)}>{operator ? "IS" : "NOT"}</Button>
        <h4 className={cn("text-center font-bold")}>{value.label}</h4>
        <Button onClick={() => removeTag(value)} variant={'ghost'} className='text-red-600' size={'icon'}>
            <XIcon />
        </Button>
    </div>
  )
}

export default TagButton