import React from 'react'

const Loading = () => {
    return (

        <>
            <div className="flex min-h-screen p-8 justify-center items-center h-112.5">
                <div className="text-center space-y-6">
                    <div
                        className="w-24 h-24 border-4 border-t-highlight border-gray-700 rounded-full animate-spin mx-auto"
                    ></div>
                    <div
                        className="text-highlight font-semibold text-4xl opacity-90 animate-fadeIn"
                    >
                        Loading...
                    </div>
                    <div className="text-[#9e9e9e] text-sm opacity-80 animate-fadeIn">
                        <p>We're getting everything ready for you...</p>
                        <p>Sit tight for just a moment.</p>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Loading
