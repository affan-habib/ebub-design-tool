import React, { useState } from 'react'

const LeftSidebar = () => {
    const [selectedTab, setSelectedTab] = useState(1)

    return (
        <div className="flex flex-col fixed left-0 top-[100px] bg-gray-500 w-[220px] h-full ">
            <div className='flex p-2 m-2 mt-4'>
                <div className={`p-2 flex-1 border-gray-100 border text-center cursor-pointer ${selectedTab === 1 ? 'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-600'}`} onClick={() => setSelectedTab(1)}>Tab 1</div>
                <div className={`p-2 flex-1 border-gray-100 border text-center cursor-pointer ${selectedTab === 2 ? 'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-600'}`} onClick={() => setSelectedTab(2)}>Tab 2</div>
                <div className={`p-2 flex-1 border-gray-100 border text-center cursor-pointer ${selectedTab === 3 ? 'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-600'}`} onClick={() => setSelectedTab(3)}>Tab 3</div>
            </div>
        </div>
    )
}

export default LeftSidebar