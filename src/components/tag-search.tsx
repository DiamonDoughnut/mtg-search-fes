'use client'

import React, { useState } from 'react'
import { Popover } from './ui/popover';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { Command,  CommandInput } from './ui/command';
import { CommandEmpty, CommandList } from 'cmdk';
import TagButton from './tags';
import TagGroup from './tag-group';

export type Tags = {
    value: string,
    label: string
}


interface TagSearchProps {
    value: Tags[];
    data: {label: string, value: Tags[]}[];
    section: string;
    setValue: (arg: Tags[]) => void;
}

const TagSearch = ({ value, data, section, setValue }: TagSearchProps) => {
  
  const [open, setOpen] = useState<boolean>(false)
  const [operators, setOperators] = useState<boolean[]>([true])

  const handleOperators = (index: number) => {
    if (operators[index]) {
      const newArr = operators;
      newArr[index] = !newArr[index];
      setOperators(newArr)
    } else {
      const newArr = operators;
      newArr[index] = false;
      setOperators(newArr)
    }
  }

  const currentSection = "#" + (section !== 'types' && section)
  

  return (
    <>
    <div className='flex flex-col items-center w-full h-full relative z-50' >
      <div className='flex items-center justify-center flex-wrap mb-2'>
        {value?.map((val, index) => (
          <TagButton value={val} operator={operators![value.indexOf(val)]} changeOperator={() => handleOperators(index)} removeTag={(val) => setValue((value.filter((i) => val.value !== i.value)))} key={val.value} />
        ))}
      </div>
      <Popover open={open} onOpenChange={(e) => {setOpen(e)} }>
        <PopoverTrigger asChild>
          <div className='flex justify-center items-center'>
          <Button asChild>
            <a href={currentSection}>
              Select a Value
            </a>
          </Button>  
          <ChevronsUpDown className='opacity-50' />
          </div>
        </PopoverTrigger>  
        <PopoverContent className='h-52'>
          <Command>
            <CommandInput placeholder='Search List' />
              <CommandList className='overflow-y-scroll'>
                <CommandEmpty>Not Found</CommandEmpty>
                {data.map((tags) => (
                  <TagGroup key={tags.label} groupLabel={tags.label} groupTags={tags.value} data={value} changeData={(arg) => {
                    if (value?.length) {
                      if (value.some(item => item === arg)) {
                        return;
                      }
                      const newArray = [...value, arg];
                      setValue(newArray);
                      setOpen(false);
                    } else {
                      setValue([arg]);
                      setOpen(false);
                    }
                  }} />
                ))}
              </CommandList>
          </Command>
        </PopoverContent>
      </Popover>        
    </div>
    </>
  )
}

export default TagSearch