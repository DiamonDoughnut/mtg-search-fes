import React from 'react'
import { Tags } from './tag-search';
import { CommandGroup } from './ui/command';
import TagItem from './tag-item';

interface TagGroupProps {
    groupLabel: string;
    groupTags: Tags[];
    data?: Tags[];
    changeData: (arg: Tags) => void;
}

const TagGroup = ({groupLabel, groupTags, data, changeData}: TagGroupProps) => {
  return (
    <CommandGroup heading={groupLabel}>
        {groupTags.map((tag) => {
            return (
                <TagItem key={tag.value} Tag={tag} changeTag={changeData} selected={data?.some(item => item === tag) ? true : false}/>
            )
        })}
    </CommandGroup>
  )
}

export default TagGroup