'use server'

import * as scryfall from 'scryfall-api'

export default async function getCardById(id: string) {
    try {
        return await scryfall.Cards.byId(id)
    } catch (error) {
        console.log("[GET_CARD_BY_ID_ERROR]: ", error)
    }
}