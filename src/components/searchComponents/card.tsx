import Tilt from 'react-parallax-tilt'
import { Card } from 'scryfall-api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

export default function CardComponent({ card, loading }: { card: Card, loading: boolean }) {
    
    const router = useRouter()
    const scale = window.innerWidth > 768 ? 1.25 : 1
    const [cardImage, setCardImage] = useState((card.image_uris?.normal || card.card_faces?.[0].image_uris?.normal) || '/Magic_card_back.webp')
    const [doubleFaced, setDoubleFaced] = useState(false)
    const [cardBackFace, setCardBackFace] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (!loading && card) {
            if (card.image_uris) {
                if (card.image_uris.large) {
                    setCardImage(card.image_uris.large)
                } else {
                    setCardImage((card.image_uris?.normal || card.card_faces?.[0].image_uris?.normal) || '/Magic_card_back.webp');
                }
            } else if(card.card_faces) {
                setDoubleFaced(true);
                if (card.card_faces[0].image_uris) {
                    setCardImage(card.card_faces[0].image_uris.large || card.card_faces[0].image_uris.normal)
                    setCardBackFace((card.card_faces[1]?.image_uris?.large || card.card_faces[1]?.image_uris?.normal))
                } else {
                    setCardImage('/Magic_card_back.webp');
                    setCardBackFace('/Magic_card_back.webp');
                }
            }
        }
        if (loading) {
            setCardImage('/Magic_card_back.webp');
        }
    }, [loading, card])
        const flipCard = () => {
                if (doubleFaced) {
                    setCardBackFace(cardImage);
                    setCardImage(cardBackFace || '/Magic_card_back.webp');
                }
            }
            
        return (
            <Tilt glareEnable={true} glareMaxOpacity={0.6} glareColor='#FFFFFF' glarePosition='right' glareBorderRadius='20px' tiltReverse scale={scale} className='h-full col-span-1 mx-8 rounded-2xl' >
                <div className="flex flex-col w-full h-full">
                    <div className="relative flex-1 w-full h-full">
                        <Image
                            src={cardImage}
                            alt={card.name}
                            height={680}
                            width={480}
                            objectFit="contain"
                            className='rounded-2xl'
                            onClick={() => router.push(`/card/${card.name}?id=${card.id}`)}
                        />
                        {doubleFaced && (
                            <div className="absolute top-[11.5%] right-[8%] z-10">
                                <Button onClick={() => flipCard()} className="bg-gray-200/50 text-black h-12 w-12 rounded-full">
                                    <Image src='/arrow-flip.svg' alt='' height={80} width={80}/>
                                </Button> 
                            </div>
                        )}
                        {loading && (
                            <div className="bg-slate-200/10 h-full w-full absolute top-0 right-0 flex items-center justify-center rounded-2xl">
                                <LoaderCircle size={80} className='animate-spin' />
                            </div>
                        )}
                    </div>
                </div>
            </Tilt>
        )
    }
