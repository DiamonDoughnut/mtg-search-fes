import React from 'react'
import 'mana-font'
import Link from 'next/link'
import Image from 'next/image'

const Resources = () => {
  return (
    <div className='flex flex-col min-h-screen min-w-screen items-center mx-auto'>
        <div className='relative h-24 mx-auto max-w-[1290px] px-auto w-full flex justify-center items-center bg-slate-900 rounded-b-2xl z-10'>
            <div className="h-full w-fit flex items-center ml-12 absolute top-0 left-0">
                <Link href={'/'} className='flex justify-evenly items-center'><i className="ms ms-g ms-3x ms-planeswalker ms-mechanic ms-fw" />
                <h3 className="ms-mechanic"> Search </h3></Link>
            </div>
            <div className="text-3xl font-bold ms-mechanic">
                <h2 className="">Resource Attribution</h2>
            </div>
        </div>
        <div className='h-full w-fit max-w-[1290px] mx-auto my-24 flex flex-col'>
            <div className="vecteezy flex items-center justify-center w-full h-fit gap-x-8 border-slate-300 border-2 px-4">
                <div className="h-full w-1/3 gap-y-4 border-r-2 border-slate-300 px-8">
                    <Image src={'/common-border.png'} alt='common border' width={250} height={48} className='py-4' />
                    <Image src={'/uncommon-border.png'} alt='uncommon border' width={250} height={48} className='py-4' />
                    <Image src={'/rare-border.png'} alt='rare border' width={250} height={48} className='py-4' />
                    <Image src={'/mythic-border.png'} alt='mythic border' width={250} height={48} className='py-4' />
                </div>
                <div className="h-full w-2/3 flex items-center justify-center">
                <a href="https://www.vecteezy.com/free-vector/name-border">Name Border Vectors by <span className="text-blue-600 underline"> Vecteezy </span></a>
                </div>
            </div>
            <div className="vecteezy flex items-center justify-center w-full h-fit gap-x-8 border-slate-300 border-2 px-4">
                <div className="h-full w-1/3 gap-y-4 border-r-2 border-slate-300 px-8">
                    <Image src={'/d47szth-7f064cf1-7922-459d-89b3-b9fb7538ac80.png'} alt='white mana' width={250} height={48} className='py-4' />
                    <Image src={'/d47sxso-e0ce5d9e-f338-410d-bfc5-19fea10badbc.png'} alt='blue mana' width={250} height={48} className='py-4' />
                    <Image src={'/d47szo1-91e79d96-9972-4c84-a7bf-f0c47c8cd594.png'} alt='black mana' width={250} height={48} className='py-4' />
                    <Image src={'/d47szfw-91c06e18-1224-42e8-9c92-25d14149939e.png'} alt='red mana' width={250} height={48} className='py-4' />
                    <Image src={'/d47syof-49513b5e-bcd6-4289-bbce-1aa3228fd9d6.png'} alt='green mana' width={250} height={48} className='py-4' />
                </div>
                <div className="h-full w-2/3 flex items-center justify-center">
                <a href="https://www.deviantart.com/mallanaga/gallery/39054329/magic-the-gathering">Mana Symbols by <span className="text-blue-600 underline"> Mallanaga </span> on DeviantArt</a>
                </div>
            </div>
            <div className="vecteezy flex items-center justify-center w-full h-fit gap-x-8 border-slate-300 border-2 px-4">
                <div className="h-full w-1/3 gap-y-4 border-r-2 border-slate-300 px-8">
                    <Image src={'/Magic-The-Gathering-Logo.png'} alt='MTG logo' width={250} height={48} className='py-4' />
                    <Image src={'/Magic_card_back.webp'} alt='MTG Card Back' width={250} height={48} className='my-4 rounded-2xl' />
                    <Image src={'/createcard.jpg'} alt='MTG Blank Card' width={250} height={48} className='my-4 rounded-2xl' />
                </div>
                <div className="h-full w-2/3 flex flex-col items-center justify-center">
                <a href="https://magic.wizards.com/en">All direct MTG symbols <span className="text-blue-600 underline"> &copy; Wizards of the Coast </span></a>
                <p className='text-slate-600 text-center'>Use of low-res images are assumed fair-use when there are no alternate free-use versions available</p>
                </div>
            </div>
            <div className="vecteezy flex items-center justify-center w-full h-fit gap-x-8 border-slate-300 border-2 px-4">
                <div className="h-full w-1/3 gap-y-4 border-r-2 border-slate-300 px-8">
                    <Image src={'/080224-article-BG.webp'} alt='card pile' width={250} height={48} className='py-4' />
                </div>
                <div className="h-full w-2/3 flex items-center justify-center">
                <a href="https://lovethynerd.com/wp-content/uploads/2024/08/080224-article-BG.jpg">Image by <span className="text-blue-600 underline"> LoveThyNerd </span></a>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Resources