import React from 'react'

function VotingForm(props) {

    /**
     * If wallet address has not voted yet, display the voting form to input vote.
     * Else, display the appropriate message.
     */
    return (
        <>
            {props.alreadyVoted ? (
                <div className='flex items-center justify-center border border-white my-5 p-3'>
                    <h4 className='tracking-wider'>You have already voted</h4>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-y-2 my-5">
                    <div className='flex gap-x-3'>
                        <label htmlFor="index-input" className='pt-2 font-medium tracking-wide text-lg'>
                            Candidate Index
                        </label>
                        <input type="number"
                            name='index-input'
                            placeholder='Enter Candidate Index'
                            onChange={props.onIndexChange}
                            value={props.index}
                            className='p-2 text-black'
                        />
                    </div>

                    <button
                        onClick={props.voteCandidate}
                        className='text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-2/5'>
                        Vote
                    </button>
                </div >
            )}
        </>
    )

}

export default VotingForm
