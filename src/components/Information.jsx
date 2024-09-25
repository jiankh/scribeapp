import React, { useState } from 'react'

export default function Information() {
    const [tab, setTab] = useState('transcription')

  return (
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 max-w-prose w-full mx-auto'>
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>
                Your 
                <span className='text-blue-400 bold'>
                    Transcription
                </span>
            </h1>

            <div className='grid grid-cols-2  mx-auto bg-white shadow rounded-full overflow-hidden'>
                <button className={'px-6 py-2 font-medium duration-200 ' + ( tab === 'transcription' ? 'bg-blue-400 text-white' : 'text-blue-400 hover:text-blue-600')}
                        onClick={()=> setTab('transcription')}>
                    Transcription
                </button>
                <button className={'px-6 py-2 font-medium duration-200 ' + ( tab === 'translation' ? 'bg-blue-400 text-white' : 'text-blue-400 hover:text-blue-600')}
                        onClick={()=> setTab('translation')}>
                    Translation
                </button>
            </div>
        
    </main>
  )
}
