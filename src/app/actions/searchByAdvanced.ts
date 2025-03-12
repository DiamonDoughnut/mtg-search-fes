'use server'

import * as scryfall from 'scryfall-api'

export default async function getCardsByQuery(
    {
        searchString,
        sort = 'name',
        extras = false,
        page = 1
    }: {searchString: string,
    sort: scryfall.CardSearchOrder,
    extras: boolean,
    page: number}
) {

    try {
        const cardList = scryfall.Cards.search(searchString, {include_extras: extras, order: sort, page: page ? ((page * 2) - 1) : 1})
        const cards = await cardList.get(350);
        const number = cardList.count;
        if (number === 0) {
            const secondTry = scryfall.Cards.search(searchString, {include_extras: extras ? extras : true, order: sort, page: page ? ((page * 2) - 1) : 1});
            const secondCards = await secondTry.get(350);
            const secondNumber = secondTry.count;
            if (secondNumber === 0) {
                const finalTry = scryfall.Cards.search(searchString, {include_extras: extras, order: sort, page: page ? ((page * 2) - 1) : 1})
                const finalCards = await finalTry.all();
                const finalNumber = finalTry.count;
                return {cards: finalCards, number: finalNumber}
            }
            return {cards: secondCards, number: secondNumber}
        }
        return {cards, number}
        
    } catch (error) {
        console.log('[GET_CARDS_BY_QUERY_ERROR]: ', error)
    }
}