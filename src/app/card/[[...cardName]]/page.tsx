'use client'

import getCardById from "@/app/actions/searchById";
import CardComponent from "@/components/searchComponents/card";
import HeaderTwo from "@/components/searchComponents/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MessageSquareWarningIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react";
import { Card, CardFace } from "scryfall-api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import 'mana-font'
import 'keyrune'
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Footer from "@/components/searchComponents/footer";

export default function Page () {
  const searchParams = useSearchParams();
  const [error, setError] = useState<Error | null>(null);
  const [card, setCard] = useState<Card | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedCards, setRelatedCards] = useState<(Card | undefined)[]>();
  const [doubleFaced, setDoubleFaced] = useState(false)
  const [flipped, setFlipped] = useState(false);
  const [cardFront, setCardFront] = useState<CardFace | undefined>(undefined)
  const [cardBack, setCardBack] = useState<CardFace | undefined>(undefined)
  const id = searchParams.get('id');
  const router = useRouter();
  const formats = [
    'Standard',
    'Alchemy',
    'Pioneer',
    'Explorer',
    'Modern',
    'Historic',
    'Legacy',
    'Brawl',
    'Vintage',
    'Timeless',
    'Commander',
    'Pauper',
    'Oathbreaker',
    'Penny',
  ]
  const fetchCard = useMemo(() => {
    return async () => {
      if (!id){
        setError(new Error('No id provided'));
      return
      }
      try {

        const fetchedCard = await getCardById(id)
        if (!fetchedCard){
          setError(new Error('Card not found'));
          return
        }
        setCard(fetchedCard);
        if (fetchedCard.all_parts) {
          const relatedCards = fetchedCard.all_parts.filter((card) => card.id !== id && card.name.slice(2) !== card.name);
          const fetchedRelatedCards = await Promise.all(relatedCards.map((card) => getCardById(card.id)));
          setRelatedCards(fetchedRelatedCards);
        }
        if (fetchedCard.card_faces) {
          setDoubleFaced(true);
          setCardFront(fetchedCard.card_faces[0]);
          setCardBack(fetchedCard.card_faces[1]);
        }

      } catch (error) {
        setError(error as Error);
        return
      } finally {
        setIsLoading(false);
      }
    }
    
  }, [id])

  useEffect(() => {fetchCard()}, [fetchCard]);

  if (error) {
    return (
      
      <div className="h-full page-background w-full relative min-h-screen min-w-screen flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0">
          <HeaderTwo searchString={card ? `id:${card.id}` : ''} />
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
  <div className="flex flex-col">
    <div className="flex items-center justify-evenly relative page-background min-h-screen min-w-screen">
      <div className="flex w-full h-fit absolute top-0 left-0">
        <HeaderTwo searchString={card?.name || ''} />
      </div>
        {card && 
        <div className="flex items-start justify-evenly w-full h-fit mt-36 ">
          <div className="card max-w-80">
            <CardComponent card={card} loading={isLoading} />
          </div>
          <div className="info text-slate-300 text-lg w-2/5">
            <div className="title flex justify-between rounded-t-xl border-2 p-2 pb-0 bg-slate-800/50">
              <h3 className="text-2xl text-slate-200 font-bold mb-2 mr-24">
                {
                  doubleFaced ?
                    cardFront?.name ? (cardFront.name.slice(0, 2) === 'A-' ? cardFront.name.slice(2) : cardFront.name) : null
                  :
                    card?.name ? (card.name.slice(0,2) === 'A-' ? card.name.slice(2) : card.name) : null
                }
              </h3>
              <div className="flex justify-between items-center -mt-4 mr-2">
                {
                    (card.name.slice(0, 2) === 'A-' ? (
                      <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger>
                      <div className="bg-yellow-700 rounded-full drop-shadow-lg mr-4 mt-2 relative">
                        <i className="ss ss-2x ss-parl3 ss-rare ss-grad outline-black p-2 relative z-20 " />
                        <i className="ss ss-2x ss-parl3 text-black absolute top-0 left-0.5 p-2 " />
                      </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-lg text-slate-200">Rebalanced for Alchemy (Mtg Arena Only)</p> 
                        </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : null)
                }
              {card.mana_cost ? card.mana_cost.split('}').filter((mana) => mana.length > 0).map((mana, index) => {
                return (
                  <i key={index} className={`mt-2 ms ms-cost ms-shadow ms-${mana.replace('{', '').replace('/', '').toLowerCase().trim()}`} />
                )}) : (doubleFaced ? (
                  <div className="flex items-center justify-center">
                  {cardFront?.mana_cost ? cardFront.mana_cost.split('}').filter((mana) => mana.length !== 0).map((mana, index) => (
                    <i key={index} className={`mt-2 ms ms-cost ms-shadow ms-${mana.replace('{', '').replace('/', '').toLowerCase()}`} />
                  )) : null}
                </div>) : null) }
                </div>
              </div>
            <div className="type flex justify-between border-2 p-2 pb-0 bg-slate-800/50">
              <h4 className="text-lg text-slate-200 mb-2">
                  {
                    doubleFaced ? (
                      <div className="flex items-center justify-center">
                        {cardFront?.type_line ? cardFront.type_line : null}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {card?.type_line ? card.type_line : null}
                      </div>
                    )
                  }
              </h4>
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <i className={`ss ss-2x -mt-1 mr-2 ss-${card.set} ss-${(card.rarity === 'special' ? 'timeshifted' : card.rarity === 'bonus' ? 'rare' : card.rarity)} ${(card.rarity === 'rare' || card.rarity === 'mythic' || card.rarity === 'special' || card.rarity === 'bonus') ? 'ss-grad' : ''}`} />    
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-lg text-slate-200">{card.set_name}</p>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text flex border-2 p-2 pb-0 bg-slate-800/50">
              <div className="flex flex-col gap-y-4">
              <h5 className="text-base text-slate-200 mb-2">
                {
                  doubleFaced ? (
                    <div className="flex items-center justify-center">
                      {cardFront?.oracle_text ?( cardFront.oracle_text ): null}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      {card?.oracle_text ? card.oracle_text : null}
                    </div>
                  )
                }
              </h5>
                {
                  doubleFaced ? (
                    <div className="flex items-center justify-center text-slate-200">
                      {cardFront?.flavor_text ?( cardFront.flavor_text ): null}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-slate-200">
                      {card?.flavor_text ? card.flavor_text : null}
                    </div>
                  )
                }
                </div>
            </div>
            <div className="stats flex border-2 p-2 pb-0 bg-slate-800/50">
              <div className="flex flex-col gap-y-4 items-center justify-center">
                <h5 className="text-base text-slate-200 mb-2">
                  {
                   doubleFaced ? (
                      cardFront?.type_line?.includes('Planeswalker') ? (
                        <div className="flex justify-center items-center">
                          <i className={`ms ms-loyalty-start ms-loyalty-${cardFront.loyalty}`}/>
                        </div>
                      ) : cardFront?.type_line?.includes('Creature') ? (
                        <div className="flex justify-center items-center">
                          <i className={`ms ms-power mx-2 -mt-1`}/>
                          <p>{cardFront.power + ' / '}</p>
                          <i className="ms ms-toughness mx-2 -mt-1"/>
                          <p>{cardFront.toughness}</p>
                        </div>
                      ) : null
                   ) : (
                      card?.type_line?.includes('Planeswalker') ? (
                        <div className="flex justify-center items-center">
                          <i className={`ms ms-loyalty-start ms-loyalty-${card.loyalty}`}/>
                        </div>
                      ) : card?.type_line?.includes('Creature') ? (
                        <div className="flex justify-center items-center">
                          <i className={`ms ms-power mx-2 -mt-1`}/>
                          <p>{card.power + ' / '}</p>
                          <i className="ms ms-toughness mx-2 -mt-1"/>
                          <p>{card.toughness}</p>
                        </div>
                      ) : null
                   )
                  }
                </h5>
                </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                {
                  doubleFaced ? (
                    <div className="title bg-slate-800/50 flex w-full justify-between border-2 p-2 pb-0">
              <h3 className="text-2xl text-slate-200 font-bold mb-2 mr-24">
                {
                    cardBack?.name ? (cardBack.name.slice(0, 2) === 'A-' ? cardBack.name.slice(2) : cardBack.name) + '      ' : null
                }
                <span className="text-sm align-middle pl-4 text-left italic">{"(Reverse Side)"}</span>
              </h3>
              <div className="flex justify-center items-center -mt-4 mr-2 w-fit">
                {cardBack?.mana_cost ? cardBack.mana_cost.split('}').filter((mana) => mana.length !== 0).map((mana, index) => (
                    <i key={index} className={`mt-2 ms ms-cost ms-shadow ms-${mana.replace('{', '').replace('/', '').toLowerCase()}`} />
                  )) : null}
                </div>
              </div> ) : null
                }
                {
                  doubleFaced ? (
                    <div className="backType bg-slate-800/50 flex border-2 p-2 pb-0 w-full">
                      <h5 className="text-base text-slate-200 mb-2">
                      <div className="flex items-center justify-center">
                        {cardBack?.type_line ? cardBack.type_line : null}
                      </div>
                      </h5>
                    </div>
                  ): null
                }
                {
                  doubleFaced ? (
                    <div className="backText bg-slate-800/50 flex border-2 p-2 pb-0 w-full">
                      <h5 className="text-base text-slate-200 mb-2">
                      <div className="flex items-center justify-center">
                      {cardBack?.oracle_text ?( cardBack.oracle_text ): null}
                    </div>
                    <div className="flex items-center justify-center text-slate-200">
                      {cardBack?.flavor_text ?( cardBack.flavor_text ): null}
                    </div>
                      </h5>
                    </div>
                  ): null
                }
                {
                  doubleFaced ? (
                    <div className="backStats bg-slate-800/50 flex border-2 p-2 pb-0 w-full">
                      <h5>
                      {cardBack?.type_line?.includes('Planeswalker') ? (
                        <div className="flex justify-center items-center">
                          <i className={`ms ms-loyalty-start ms-loyalty-${cardBack.loyalty}`}/>
                        </div>
                      ) : cardBack?.type_line?.includes('Creature') ? (
                        <div className="flex justify-center items-center">
                          <i className={`ms ms-power mx-2 -mt-1`}/>
                          <p>{cardBack.power + ' / '}</p>
                          <i className="ms ms-toughness mx-2 -mt-1"/>
                          <p>{cardBack.toughness}</p>
                        </div>
                      ) : null}
                      </h5>
                    </div>
                  ): null
                }
                <div className="author bg-slate-800/50 flex border-2 pb-2 p-4 w-full align-middle items-center italic text-sm">
                  Illustration by {card?.artist}
                </div>
                <div className="legalities bg-slate-800/50 flex flex-wrap border-2 rounded-b-xl mb-12 pb-2 p-4 pl-4 w-full items-start">
                  {formats.map((format) => {
                    return (
                      <div key={card.id + format} className="w-1/2 flex justify-start gap-x-4 my-1">
                        <Badge className={cn('w-1/3 justify-center flex',
                          card?.legalities?.[format.toLowerCase() as keyof typeof card.legalities] === 'legal' && 'bg-green-600',
                          card?.legalities?.[format.toLowerCase() as keyof typeof card.legalities] === 'restricted' && 'bg-yellow-500',
                        )}>
                        {card?.legalities?.[format.toLowerCase() as keyof typeof card.legalities].toUpperCase().split('_').join(' ')}
                        </Badge>
                        <p >{format}</p>
                      </div>
                    )
                  })}
                </div>
            </div>
          </div>
          <div className="flex flex-col related items-center justify-center ml-12 w-1/3">
            <div className="w-full h-fit flex gap-x-2 bg-slate-800 items-center py-2 text-slate-200">
                  <i className={`ss ss-3x ss-${card?.set} ml-2`} />
                  <div className="flex flex-col">
                    <h3 className="text-lg">{card.set_name + '  (' + card.set.toUpperCase() + ')'}</h3>
                    <ul className="flex gap-x-1 font-sm">
                      <li> {'-  #' + card.collector_number}</li>
                      <li> {card.rarity === 'common' ? '-  Common' : card.rarity === 'uncommon' ? '-  Uncommon' : card.rarity === 'rare' ? '-  Rare' : card.rarity === 'mythic' ? '-  Mythic Rare' : "-  " + card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}</li>
                      <li> {'-  ' + card.lang.toUpperCase()} </li>
                    </ul>
                  </div>
            </div>
            <div className="all-parts flex flex-col mt-4 w-full bg-slate-800">
              <div className="border-2 p-2 w-full text-slate-200">
                <p>Faces, Tokens, & Other Parts</p>
              </div>
              {relatedCards ? (relatedCards.length > 0 ? (relatedCards.map((relatedCard) => (
                <div className="border-2 p-2 w-full text-slate-800 bg-slate-200" key={relatedCard?.id}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                          <p>{relatedCard?.name + '    #' + relatedCard?.collector_number}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <Image src={(relatedCard?.card_faces ? relatedCard.card_faces[0].image_uris?.normal : relatedCard?.image_uris?.normal) || '/Magic_card_back.webp'} alt="" height={340} width={240} />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))) : null) : null}
            </div>
            <div className="prices flex flex-col mt-4 w-full bg-slate-800">
              <div className="border-2 p-2 w-full text-slate-200">Recent Prices</div>
              {Object.keys(card.prices).map((price) => {
                if (card.prices[price as keyof typeof card.prices] !== null) {
                  return(
                    <div className="flex items-center justify-start pl-4 bg-slate-200 text-slate-800 border-2 border-slate-800 border-t-0 hover:bg-slate-400 hover:text-blue-500" key={card.id + price}>
                      {price.split('_').join(' ').toUpperCase() + ':  ' + card.prices[price as keyof typeof card.prices]}
                    </div>
                  )
                } else return (
                  <TooltipProvider key={card.id+price}>
                    <Tooltip>
                      <TooltipTrigger  className="flex items-center justify-start pl-4 bg-slate-200 text-slate-800 border-2 border-slate-800 border-t-0">
                          {price.split('_').join(' ').toUpperCase()}: NONE LISTED
                      </TooltipTrigger>
                      <TooltipContent>
                          No pricing information for Arena or MTGOnline
                      </TooltipContent>
                    </Tooltip>
                    <hr />
                  </TooltipProvider>
                )
              })}
            </div>
            <div className="relatedSites flex flex-col mt-4 w-full">
              {card.related_uris.tcgplayer_infinite_articles && (
                <div className="flex items-center justify-start px-4">
                <Button asChild className="w-full my-2 bg-slate-400 text-slate-950 font-bold hover:bg-slate-100 hover:text-blue-500">
                  <a href={card.related_uris.tcgplayer_infinite_articles}>TCGPlayer Infinite Articles about this card</a>
                </Button>
              </div>
              )}
              {card.related_uris.tcgplayer_infinite_decks && (
                <div className="flex items-center justify-start px-4">
                <Button asChild className="w-full my-2 bg-slate-400 text-slate-950 font-bold hover:bg-slate-100 hover:text-blue-500">
                  <a href={card.related_uris.tcgplayer_infinite_decks}>TCGPlayer Infinite Decks including this card</a>
                </Button>
              </div>
              )}
              {card.related_uris.tcgplayer_decks && (
                <div className="flex items-center justify-start px-4">
                <Button asChild className="w-full my-2 bg-slate-400 text-slate-950 font-bold hover:bg-slate-100 hover:text-blue-500">
                  <a href={card.related_uris.tcgplayer_decks}>TCGPlayer Decks including this card</a>
                </Button>
              </div>
              )}
              {card.related_uris.mtgtop8 && (
                <div className="flex items-center justify-start px-4">
                <Button asChild className="w-full my-2 bg-slate-400 text-slate-950 font-bold hover:bg-slate-100 hover:text-blue-500">
                  <a href={card.related_uris.mtgtop8}>Search for this card on MTGTop8</a>
                </Button>
              </div>
              )}
              {card.related_uris.gatherer && (
                <div className="flex items-center justify-start px-4">
                <Button asChild className="w-full my-2 bg-slate-400 text-slate-950 font-bold hover:bg-slate-100 hover:text-blue-500">
                  <a href={card.related_uris.gatherer}>View this card on the Gatherer</a>
                </Button>
              </div>
              )}
              {card.related_uris.edhrec && (
                <div className="flex items-center justify-start px-4">
                <Button asChild className="w-full my-2 bg-slate-400 text-slate-950 font-bold hover:bg-slate-100 hover:text-blue-500">
                  <a href={card.related_uris.edhrec}>View this card&apos;s analysis on EDHREC</a>
                </Button>
              </div>
              )}
            </div>
          </div>
        </div>
        }
      
    </div>
    <div className="bg-black py-4">
    <Footer />
    </div>
    </div>
  )
}