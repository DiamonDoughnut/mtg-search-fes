import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <div className='z-20 row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4 text-slate-300'
          href='https://scryfall.com/docs/api'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          API Documentation
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4 text-slate-300'
          href='/resources'
          target='_blank'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Resource Accreditation
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4 text-slate-300'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Written in NextJS
        </a>
      </div>
      <div className="flex justify-center items-center text-slate-300">
        Copyright &copy;DiamonDoughnut 2025
      </div>
    </div>
  )
}

export default Footer