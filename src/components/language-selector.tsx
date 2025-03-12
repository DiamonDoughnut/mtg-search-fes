import React from 'react'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from './ui/select';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LanguageSelectProps {
    lang: string;
    setLang: (lang: string) => void;
}

const LanguageSelect = ({ lang, setLang }: LanguageSelectProps) => {
    const languages = [
        {value: 'en', current: 'Default', translated: '-'},
        {value: 'any', current: 'Any', translated: '-'},
        {value: 'en', current: 'English', translated: 'English'},
        {value: 'es', current: 'Spanish', translated: 'Español'},
        {value: 'fr', current: 'French', translated: 'Français'},
        {value: 'de', current: 'German', translated: 'Deutsch'},
        {value: 'it', current: 'Italian', translated: 'Italiano'},
        {value: 'pt', current: 'Portuguese', translated: 'Português'},
        {value: 'ja', current: 'Japanese', translated: '日本語'},
        {value: 'ko', current: 'Korean', translated: '한국어'},
        {value: 'ru', current: 'Russian', translated: 'Русский язык'},
        {value: 'zhs', current: 'Simplified Chinese', translated: '中文'},
        {value: 'zht', current: 'Traditional Chinese', translated: '汉语'},
        {value: 'he', current: 'Hebrew', translated: 'עברית'},
        {value: 'la', current: 'Latin', translated: 'Latinum'},
        {value: 'grk', current: 'Ancient Greek', translated: 'Ελληνικά'},
        {value: 'ar', current: 'Arabic', translated: 'اَلْعَرَبِيَّةُ'},
        {value: 'sa', current: 'Sanskrit', translated: 'संस्कृतम्'},
        {value: 'ph', current: 'Phyrexian', translated: '|fyrsRUDZ.'},
        {value: 'qya', current: 'Quenya', translated: 'Quenya'},
    ]

  return (
    <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {languages.map((language) => (
                            <SelectItem className='flex justify-center' value={language.value} key={language.current}>
                                <h3 className='text-xl text-slate-900 text-center font-bold'>{language.current}</h3>
                                {language.current !== 'Phyrexian' && language.current !== 'Quenya' ? (
                                    <h4 className='text-lg text-center'>{language.translated}</h4>
                                ) : (
                                    <h4 className={cn('text-lg text-center', language.current)}>{language.translated}</h4>
                                )}
                            </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
  )
}

export default LanguageSelect