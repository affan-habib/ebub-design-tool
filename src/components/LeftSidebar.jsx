import React, { useState } from 'react';

const LeftSidebar = () => {
    const [selectedTab, setSelectedTab] = useState(1);

    return (
        <div className="flex flex-col fixed left-0 top-[100px] bg-gray-500 w-[220px] h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
            <div className='flex'>
                <div className={`p-2 flex-1 border-gray-100 border text-center cursor-pointer ${selectedTab === 1 ? 'bg-gray-600 text-gray-50' : 'bg-gray-200 text-gray-600'}`} onClick={() => setSelectedTab(1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 15l-4 4 4 4" />
                    </svg>
                </div>
                <div className={`p-2 flex-1 border-gray-100 border text-center cursor-pointer ${selectedTab === 2 ? 'bg-gray-600 text-gray-50' : 'bg-gray-200 text-gray-600'}`} onClick={() => setSelectedTab(2)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className={`p-2 flex-1 border-gray-100 border text-center cursor-pointer ${selectedTab === 3 ? 'bg-gray-600 text-gray-50' : 'bg-gray-200 text-gray-600'}`} onClick={() => setSelectedTab(3)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
            {selectedTab === 1 && (
                <div className="flex flex-col overflow-auto gap-2 px-2 mt-4">
                    <img src="https://picsum.photos/200/300" alt="Image 1" style={{ width: '100%', height: 'auto', border: '1px solid black' }} />
                    <img src="https://picsum.photos/200/301" alt="Image 2" style={{ width: '100%', height: 'auto', border: '1px solid black' }} />
                    <img src="https://picsum.photos/200/302" alt="Image 3" style={{ width: '100%', height: 'auto', border: '1px solid black' }} />
                </div>
            )}
            {selectedTab === 2 && (
                <div className="flex flex-col overflow-auto gap-2 px-2 mt-4">
                    <video src="https://www.w3schools.com/tags/movie.mp4" controls style={{ width: '100%', height: 'auto', border: '1px solid black' }}></video>
                </div>
            )}
            {selectedTab === 3 && (
                <div className="flex overflow-auto gap-2 px-2 mt-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M9 15l-4 4 4 4" />
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

            )
            }
        </div >
    )
}

export default LeftSidebar