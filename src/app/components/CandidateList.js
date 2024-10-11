import React from 'react'

function CandidateList({ candidates }) {
    return (
        <div className='flex flex-col items-center justify-center w-1/3 my-7'>
            <table className='table-auto w-full border border-gray-500 border-separate border-spacing-2'>
                <thead className='bg-slate-200 text-black tracking-wider'>
                    <tr>
                        <th className='px-4 py-2 border border-slate-600'>Index</th>
                        <th className='px-4 py-2 border border-slate-600'>Candidate Name</th>
                        <th className='px-4 py-2 border border-slate-600'>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate, index) => (
                        <tr key={index}>
                            <td className='px-4 py-2 text-center border border-gray-600'>{candidate.index}</td>
                            <td className='px-4 py-2 font-medium text-base tracking-wider'>{candidate.name}</td>
                            <td className='px-4 py-2 text-center font-semibold'>{candidate.votes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CandidateList
