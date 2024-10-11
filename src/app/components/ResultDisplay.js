import React from 'react'

function ResultDisplay({ winner }) {
    return (
        <div className='flex w-2/5 items-center justify-center gap-x-5 m-3 p-2 border-t-2'>
            <label className='uppercase font-bold tracking-widest'>
                Current Leader
            </label>
            <div className='flex flex-col'>
                {winner.map((candidate) => (
                    <h3 className='uppercase font-bold text-green-500'>
                        {candidate.name} - {candidate.votes}
                    </h3>
                ))}
            </div>

        </div>
    )
}

export default ResultDisplay
