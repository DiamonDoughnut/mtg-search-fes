import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface TopLineProps {
    setSearch: (search: string, param:'sort' | 'options' | 'other') => void;
    currentOptions: string;
    currentSort: string;
    number: number;
    page: number;
    perPage: number;
    setPerPage: (perPage: 25 | 50) => void;
    setLocalPage: (page: number) => void;
    localStart: number;
    localEnd: number;
}

export default function TopLine({ localStart, localEnd, setSearch, currentOptions, currentSort, number, page, setPerPage, perPage, setLocalPage }: TopLineProps) {
    const handleChange = (change: string, type: 'sort' | 'options' | 'other') => {
        setSearch(change, type);
    }
    return (
        <div className="h-full w-full flex items-center justify-between">
            <div className="flex flex-col justify-center items-start w-1/2">
                <div className="gap-x-4 w-full flex items-center justify-start mb-2 text-slate-300">
                    <Select defaultValue={currentOptions} onValueChange={(value) => handleChange(value, 'options')}>
                        <SelectTrigger className="w-fit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cards">Cards</SelectItem>
                            <SelectItem value="prints">Prints</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="w-fit text-nowrap">{" sorted by "}</span>
                    <Select defaultValue={currentSort} onValueChange={(value) => handleChange(value, 'sort')}>
                        <SelectTrigger className="w-fit">
                            <SelectValue  />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="set">Set</SelectItem>
                            <SelectItem value="rarity">Rarity</SelectItem>
                            <SelectItem value="color">Color</SelectItem>
                            <SelectItem value="cmc">CMC</SelectItem>
                            <SelectItem value="power">Power</SelectItem>
                            <SelectItem value="toughness">Toughness</SelectItem>
                            <SelectItem value="edhrec">EDHREC</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="gap-x-4 flex items-center justify-center text-slate-300">
                    <span className="text-lg">{"Showing "}<span className="text-violet-400">{localStart}{" - "}</span><span className="text-violet-400">{localEnd}</span>{" of "}<span className={cn("text-indigo-400 underline", !number && 'loading')}>{number!== 0 && number}</span>{" cards that match your search."}</span>
                </div>
            </div>
            <div className="flex flex-col justify-center items-end w-1/2">
            <div className="gap-x-4 text-slate-300 flex items-center justify-center">
                <Button disabled={page === 1} className={cn("border-2 text-indigo-400 border-violet-900 bg-slate-800/30", page === 1 && 'border-gray-950 opacity-50 bg-slate-200/30 text-slate-300 ')} variant={'ghost'} onClick={() => setLocalPage(1)}>
                    {'<<'}
                </Button>
                <Button disabled={page === 1} className={cn("border-2 text-indigo-400 border-violet-900 bg-slate-800/30", page === 1 && 'border-gray-950 opacity-50 bg-slate-200/30 text-slate-300 ')} variant={'ghost'} onClick={() => setLocalPage(page - 1)}>
                    {`< Previous ${perPage}`}
                </Button>
                <Button variant={'ghost'} className="text-xl text-violet-400 font-bold border-2">
                    {`${page}`}
                </Button>
                <Button disabled={page === (Math.ceil(number/perPage))} className={cn("border-2 text-indigo-400 border-violet-900 bg-slate-800/30", page === (Math.ceil(number/perPage)) && 'border-gray-950  text-slate-300 opacity-50 bg-slate-200/30')} variant={'ghost'} onClick={() => setLocalPage(page + 1)}>
                    {`Next ${perPage} >`}
                </Button>
                <Button disabled={page === (Math.ceil(number/perPage))} className={cn("border-2 text-indigo-400 border-violet-900 bg-slate-800/30", page === (Math.ceil(number/perPage)) && 'border-gray-950  text-slate-300 opacity-50 bg-slate-200/30')} variant={'ghost'} onClick={() => setLocalPage(Math.ceil(number / perPage))}>
                    {'>>'}
                </Button>
            </div>
                <div className="flex gap-x-2 text-slate-300 mt-2 w-fit justify-center items-center">
                    {"Show "}
                    <Select defaultValue={perPage.toString()} onValueChange={(value) => setPerPage(parseInt(value) as 25 | 50)}>
                        <SelectTrigger className="w-fit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'25'}>25</SelectItem>
                            <SelectItem value={'50'}>50</SelectItem>
                        </SelectContent>
                    </Select>
                    {" cards per page."}
                </div>
            </div>
        </div>
    )
}