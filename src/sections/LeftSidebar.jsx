import React, { useState } from 'react'
import { Icon } from "@iconify/react";
import Designs from '../components/Designs';
import PagePreview from '../components/PagePreview';
import StuddyAids from '../components/StuddyAids';
import Uploads from '../components/Uploads';
const LeftSidebar = () => {
    const [selectedTab, setSelectedTab] = useState(1)

    return (
        <div className="flex fixed left-0 top-[80px] bg-gray-600 w-[260px] h-full ">
            <div className=' w-1/3 flex flex-col align-center ml-1 mt-1'>
                <div className=''>
                    <div className={`p-2 flex flex-col items-center justify-center border-gray-400 border cursor-pointer ${selectedTab === 1 ? 'bg-gray-800 text-white' : ' text-white'} w-20`} onClick={() => setSelectedTab(1)}>
                        <Icon icon="mdi:palette" className="mb-2" />
                        <span className="text-sm text-center">Design</span>
                    </div>
                    {/* <div className={`p-2 flex flex-col items-center justify-center border-gray-400 border cursor-pointer ${selectedTab === 2 ? 'bg-gray-800 text-white' : ' text-white'} w-20`} onClick={() => setSelectedTab(2)}>
                            <Icon icon="akar-icons:eye" className="mb-2" />
                            <span className="text-sm text-center">Page Preview</span>
                        </div> */}
                    <div className={`p-2 flex flex-col items-center justify-center border-gray-400 border cursor-pointer ${selectedTab === 3 ? 'bg-gray-800 text-white' : ' text-white'} w-20`} onClick={() => setSelectedTab(3)}>
                        <Icon icon="mdi:book-open" className="mb-2" />
                        <span className="text-sm text-center">Study Aids</span>
                    </div>
                    <div className={`p-2 flex flex-col items-center justify-center border-gray-400 border cursor-pointer ${selectedTab === 4 ? 'bg-gray-800 text-white' : ' text-white'} w-20`} onClick={() => setSelectedTab(4)}>
                        <Icon icon="mdi:upload" className="mb-2" />
                        <span className="text-sm text-center">Uploads</span>
                    </div>
                </div>
            </div>
            <div className='w-2/3 flex flex-col p-1 gap-1 overflow-y-auto cursor-pointer bg-gray-800'>
                {selectedTab === 1 && <Designs />}
                {selectedTab === 2 && <PagePreview />}
                {selectedTab === 3 && <StuddyAids />}
                {selectedTab === 4 && <Uploads />}
            </div>
            <div className='bg-gray-600'>

            </div>



        </div>
    )
}

export default LeftSidebar