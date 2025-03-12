import React from 'react'
import { Tags } from './tag-search'
import { CommandItem } from './ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagItemProps {
    Tag: Tags
    changeTag: (arg: Tags) => void;
    selected: boolean
}

const TagItem = ({Tag, changeTag, selected}: TagItemProps) => {
  return (
    <CommandItem value={Tag.value} onSelect={() => changeTag(Tag)}>
        <div className="flex items-center justify-between">
        {Tag.label}
        <Check className={cn('ml-auto', selected ? "opacity-100" : 'opacity-0')} />
        </div>
    </CommandItem>
  )
}

export default TagItem