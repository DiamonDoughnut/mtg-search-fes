'use client'

import getCardsByQuery from "@/app/actions/searchByAdvanced";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Card, CardSearchOrder } from "scryfall-api";
import Image from "next/image";
import {useRouter} from 'next/navigation'
import CardComponent from "@/components/searchComponents/card";
import TopLine from "@/components/searchComponents/top-line";
import HeaderTwo from "@/components/searchComponents/header";
import 'mana-font'
import { MessageSquareWarningIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/searchComponents/footer";

export default function Page() {
    
    const [cards, setCards] = useState<Card[] | undefined>();
    const [number, setNumber] = useState<number | undefined>();
    const params = useSearchParams();
    const name = params.get('name');
    const o = params.get('o');
    const t = params.getAll('t');
    const c = params.get('c');
    const colorInvert = params.get('colorInvert')
    const id = params.get('id');
    const cost = params.get('cost');
    const mv = params.get('mv');
    const pow = params.get('pow');
    const tou = params.get('tou');
    const loy = params.get('loy');
    const game = params.get('game');
    const format = params.get('format');
    const sets = params.getAll('set');
    const rarity = params.get('rarity');;
    const lore = params.get('lore');
    const language = params.get('language');
    const [sort, setSort] = useState(params.get('sort') as CardSearchOrder || 'name');
    const [allPrints, setAllPrints] = useState(params.has('allPrints'));
    const extras = params.has('extras');


    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [perPage, setPerPage] = useState<25 | 50>(50);
    const [localPage, setLocalPage] = useState(1);
    const [localPageStart, setLocalPageStart] = useState(0);
    const [localPageEnd, setLocalPageEnd] = useState<number>(perPage - 1);
    const [currentCards, setCurrentCards] = useState<Card[] | undefined>();
    const [apiPage, setApiPage] = useState(Math.ceil(perPage / 175));

    const router = useRouter();
    

    // Simplified searchString useMemo
    const searchString = useMemo(() => {
        if (!name && !o && t.length === 0 && !c) return ''; // Return early if no search params

        const typesString = t.length > 1 ? '(' + t.join(' or ') + ')' : t[0];
        const setsString = sets.length > 1 ? '(' + sets.join(' or ') + ')' : sets[0];
        
        const searchParts = [];
        if (name) searchParts.push(name);
        if (o) searchParts.push(`o:${o}`);
        if (t.length > 0) searchParts.push(`t:${typesString}`);
        if (c && c.length > 0) searchParts.push(`${colorInvert !== null ? '-' : ''}c${c}`);
        if (id) searchParts.push(`id:${id}`);
        if (cost) searchParts.push(`mana:${cost}`);
        if (mv) searchParts.push(`mv:${mv}`);
        if (pow) searchParts.push(`pow:${pow}`);
        if (tou) searchParts.push(`tou:${tou}`);
        if (loy) searchParts.push(`loy:${loy}`);
        if (game) searchParts.push(`(game:${game})`);
        if (format) searchParts.push(format);
        if (sets.length > 0) searchParts.push(`set:${setsString}`);
        if (rarity) {
            const rarityString = rarity.length === 4 ? '' : 
                               rarity.length === 3 ? `(r:${rarity[0]} or r:${rarity[1]} or r:${rarity[2]})` :
                               rarity.length === 2 ? `(r:${rarity[0]} or r:${rarity[1]})` : 
                               `r:${rarity}`;
            if (rarityString) searchParts.push(rarityString);
        }
        if (lore) searchParts.push(`lore:${lore}`);
        if (language) searchParts.push(`lang:${language}`);
        if (allPrints) {searchParts.push('unique:prints');} else {searchParts.push('unique:cards');}

        return searchParts.join(' ');
    }, [name, o, t, c, colorInvert, id, cost, mv, pow, tou, loy, game, format, sets, rarity, lore, language, allPrints]);

    useEffect(() => {
        console.log('searchString changed: ', searchString);
    }, [searchString]);

    const fetchCards = useMemo(() => {
        return async () => {
            if (!searchString) return; // Guard clause
            console.log('fetchCards started')
            try {
                setIsLoading(true);
                console.log('loading started')
                const result = await getCardsByQuery({searchString, sort, extras, page: apiPage});
                console.log('fetch sent')
                if (result) {
                    console.log('result received')
                    setCards(result.cards);
                    setNumber(result.number);
                    const startIndex = localPageStart;
                    const endIndex = localPageEnd + 1;
                    console.log('local values set')
                    console.log(result.cards[1].name)
                    setCurrentCards(result.cards.slice(startIndex, endIndex));
                } else {
                    console.log('no result received')
                    const resultTwo = await getCardsByQuery({searchString, sort, extras, page: 100});
                    if (resultTwo) {
                        setCards(resultTwo.cards);
                        setNumber(resultTwo.number);
                        const startIndex = localPageStart;
                        const endIndex = localPageEnd + 1;
                        console.log('local values set')
                        setCurrentCards(resultTwo.cards.slice(startIndex, endIndex));
                    }
                }
            } catch (error) {
                setError(error as Error);
                console.error('[GET_CARDS_BY_QUERY_ERROR]: ', error);
            } finally {
                setIsLoading(false);
                console.log('loading finished')
            }
        };
    }, [searchString, sort, extras, apiPage, localPageStart, localPageEnd]);

    useEffect(() => {
        console.log('apiPage Changed: ',apiPage)
    }, [apiPage]);

    useEffect(() => {
        fetchCards();
    }, [fetchCards, apiPage]);

    const changePage = (page: number) => {
        const newApiPage = (Math.ceil((perPage * page)/350) * 2) - 1;
        console.log(newApiPage)
        if (newApiPage !== apiPage) {
            setCards(undefined);
            setCurrentCards(undefined);
        }
        
        setApiPage(newApiPage);
        setLocalPage(page);
        console.log(page % (350 / perPage))
        setLocalPageStart(perPage * ((page % (350 / perPage) !== 0 ? page % (350 / perPage) : (350 / perPage)) - 1));
        setLocalPageEnd((perPage * (page % (350 / perPage) !== 0 ? page % (350 / perPage) : (350 / perPage))) - 1);
        setCurrentCards(undefined)
    }

    useEffect(() => {
        console.log('cardLoading started')
        if (cards && !isLoading) {
            console.log('cards present, loading finished')
            const startIndex = localPageStart;
            const endIndex = localPageEnd + 1;
            const slicedCards = cards.slice(startIndex, endIndex);
            console.log('card array sliced')
            if(slicedCards.length > 0) {
              setCurrentCards(slicedCards);
              console.log('current cards set')
            }
        }
    }, [cards, isLoading, localPage, perPage, apiPage, localPageStart, localPageEnd]);

    const updateSearch = (search: string, param: 'sort' | 'options' | 'other') => {
        if (param === 'sort') {
            setSort(search as CardSearchOrder);
        }
        if (param === 'options') {
            setAllPrints(search === 'allPrints');
        }
        if (param === 'other') {
            const url = new URLSearchParams(search);
            router.push('/search/?' + url);
        }
    }

    if (error) {
        return (
            <div className="h-full page-background w-full relative min-h-screen min-w-screen flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0">
                <HeaderTwo searchString={searchString} />
                </div>
                <div className="flex flex-col mb-12 items-center justify-evenly min-h-96 min-w-96 rounded-3xl bg-slate-600/50">
                    <div className="flex flex-col items-center justify-center gap-y-8">
                    <MessageSquareWarningIcon className="text-red-600 text-3xl" size={80} />
                    <h3 className="text-2xl text-white">Oops! Something Went Wrong!</h3>
                    </div>
                    <p className="text-lg text-slate-200">{error.toString() || 'UNKNOWN ERROR'}</p>
                    <p className="text-slate-200">Please try again later!</p>
                </div>
                <Button onClick={() => router.replace('/')}>
                    Return Home
                </Button>
            </div>
        )
    }
    
    return (
        <div className="h-full page-background w-full min-h-screen min-w-screen flex flex-col items-center justify-center">
            <div className="page-header flex justify-between items-center h-20 w-full bg-slate-800">
                <HeaderTwo searchString={searchString} />
            </div>
            <div className="flex h-24 bg-slate-700 w-full mb-8 items-center px-8">
                <TopLine localStart={localPageStart} localEnd={localPageEnd} setSearch={updateSearch} currentOptions={allPrints ? 'prints': 'cards'} currentSort={sort} number={number || 0} page={localPage} perPage={perPage} setLocalPage={changePage} setPerPage={setPerPage} />
            </div>
            <div className="relative flex justify-center pr-8 items-center gap-8">
                <div className="min-h-screen max-h-fit max-w-[90%] grid mb-8 grid-cols-3 grid-flow-row-dense gap-8 mx-8">
                <Suspense fallback={
                    <div className="grid grid-cols-3 gap-8">
                        <div className="flex flex-col gap-y-2 relative">
                            <Image src={'/Magic_card_back.webp'} alt="LOADING..." />
                            <div className="text-sm font-bold text-center text-slate-300 loading">
                                Loading
                            </div>
                            <div className="text-sm text-center text-slate-300 loading">
                                Loading
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2 relative">
                            <Image src={'/Magic_card_back.webp'} alt="LOADING..." />
                            <div className="text-sm font-bold text-center text-slate-300 loading">
                                Loading
                            </div>
                            <div className="text-sm text-center text-slate-300 loading">
                                Loading
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2 relative">
                            <Image src={'/Magic_card_back.webp'} alt="LOADING..." />
                            <div className="text-sm font-bold text-center text-slate-300 loading">
                                Loading
                            </div>
                            <div className="text-sm text-center text-slate-300 loading">
                                Loading
                            </div>
                        </div>
                    </div>
                }>
                {currentCards?.map((card) => (
                    <div className="flex flex-col gap-y-2 mb-4 relative" key={card.id}>
                        <CardComponent card={card} loading={isLoading} key={card.id} />
                        <div className="text-sm font-bold text-center text-slate-300">
                            {
                                (card.name.slice(0, 2) === 'A-' && card.name.charAt(2).toUpperCase() === card.name.charAt(2)) ?
                                    card.name.slice(2).replace(' // A-', ' // ') : card.name
                            }
                        </div>
                        <div className="text-sm text-center text-slate-300">{card.type_line}</div>
                        <div className="flex justify-center items-center">
                            <i className={`ms ms-2x ms-ci ms-ci-${card.color_identity.length === 0 ? "1" : card.color_identity.length} ${card.color_identity.length !== 0 ? `ms-ci-${card.color_identity.join('').toLowerCase()}` : 'bg-gray-500'}`} />
                            <div className="flex flex-col justify-center items-end relative">
                                {
                                    card.type_line.includes('Creature') ? 
                                          <div className="flex ml-24 flex-col justify-center items-end text-slate-300">
                                            <div className="power toughness flex items-center justify-center">
                                                <i className={`ms ms-power px-2`}/>
                                                <p className="translate-y-[1px]">{(card.power ? card.power : (card.card_faces?.[0].power && card.card_faces?.[1].power ?  ("(" + card.card_faces?.[0].power + ' // ' + card.card_faces?.[1].power + ")") : card.card_faces?.[0].power || card.card_faces?.[1].power)) + ' / '}</p>
                                                <i className={`ms ms-toughness px-2`}/>
                                                <p className="translate-y-[1px]">{(card.toughness ? card.toughness : (card.card_faces?.[0].toughness && card.card_faces?.[1].toughness ?  ("(" + card.card_faces?.[0].toughness + ' // ' + card.card_faces?.[1].toughness + ")") : card.card_faces?.[0].toughness || card.card_faces?.[1].toughness))}</p>
                                            </div>
                                            {card.type_line.includes('Planeswalker') ? 
                                                <div className="loyalty flex items-center justify-center">
                                                    <i className={`ms ms-loyalty-start ms-loyalty-${(card.loyalty ? card.loyalty : (card.card_faces?.[0].loyalty && card.card_faces?.[1].loyalty ?  ("(" + card.card_faces?.[0].loyalty + ' // ' + card.card_faces?.[1].loyalty + ")") : card.card_faces?.[0].loyalty || card.card_faces?.[1].loyalty))} px-2`} />
                                                </div> :
                                                <div className="hidden w-0 h-0 absolute" />
                                            }
                                        </div> : 
                                        card.type_line.includes('Planeswalker') ?
                                            <div className="loyalty ml-24 flex items-center justify-center">
                                                <i className={`ms ms-loyalty-start ms-loyalty-${(card.loyalty ? card.loyalty : (card.card_faces?.[0].loyalty && card.card_faces?.[1].loyalty ?  ("(" + card.card_faces?.[0].loyalty + ' // ' + card.card_faces?.[1].loyalty + ")") : card.card_faces?.[0].loyalty || card.card_faces?.[1].loyalty))} px-2`} />
                                            </div> : <div className="hidden w-0 h-0 absolute" />
                                }
                                </div>
                        </div>
                    </div>
                ))}
                </Suspense>
                </div>
        </div>
        <div className="flex items-center justify-center h-24 w-full bg-slate-900">
            <Footer />
        </div>
        </div>
    )
  }