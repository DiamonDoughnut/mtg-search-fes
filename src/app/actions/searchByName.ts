'use server'
import * as scryfall from 'scryfall-api'

export async function getCardsByName (name: string, page: number = 1) {
    try {
        let cardList = await scryfall.Cards.search(name, 1)
        if (!cardList) {
            cardList = await scryfall.Cards.search(name, {include_extras: true})
        } if (!cardList) {
            cardList = await scryfall.Cards.search(name, {include_multilingual: true})
        } if (!cardList) {
            cardList = await scryfall.Cards.search(name, {include_extras: true, include_multilingual: true})
        }
        const cards = await cardList.all();
        const number = cardList.count;
        return {cards, number};
    } catch (error) {
        console.log('[GET_CARD_BY_NAME_ERROR]: ', error)
        return undefined;
    }
}