import React from 'react';
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from 'react-redux';
import { addPage, displayColorPicker, setMargin } from '../store/pagesSlice';
import CustomButton from '../components/CustomButton';

const RightSidebar = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.pages.pages[state.pages.currentPageIndex]);

    const handleMarginChange = (e) => {
        dispatch(setMargin(e.target.value));
    };

    return (
        <div className="fixed right-0 top-[80px] bg-gray-800 w-[260px] h-full">
            <div className="w-64 text-white p-4">
                <CustomButton iconType="akar-icons:plus" buttonText="Add Page" onClick={() => { dispatch(addPage()) }} />
                <div className="mt-6">
                    <h3 className="text-gray-400 text-sm uppercase">Page Settings</h3>
                    <div className="mt-4 space-y-2">
                        <CustomButton iconType="mdi:palette" buttonText="Change Background" onClick={() => dispatch(displayColorPicker(true))} />
                        <CustomButton iconType="mdi:format-color-fill" buttonText="Change Color" onClick={() => { }} />
                        <CustomButton iconType="mdi:format-size" buttonText="Set Margin" onClick={() => { }} />
                        <input
                            className="w-full bg-gray-700 text-white font-medium py-2 px-3 rounded mt-2"
                            placeholder="Enter margin here"
                            value={currentPage.margin}
                            onChange={handleMarginChange}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-gray-400 text-sm uppercase">More Settings</h3>
                    <div className="mt-4 space-y-2">
                        <CustomButton iconType="mdi:view-list" buttonText="Setup 1" onClick={() => { }} />
                        <CustomButton iconType="mdi:view-list" buttonText="Setup 2" onClick={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
