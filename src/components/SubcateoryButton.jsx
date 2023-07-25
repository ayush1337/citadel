import React from 'react';
import subCategoryTab from '../helper/subCategoryTab';
function SubcateoryButton({ name, small }) {
    return small ? (
        <button
            className={`${subCategoryTab[name].color} ${subCategoryTab[name].hcolor} text-white text-[0.6rem] rounded-full px-2 font-normal py-0`}
        >
            {name}
        </button>
    ) : (
        <button
            className={`${subCategoryTab[name].color} ${subCategoryTab[name].hcolor} text-white px-4 py-1 rounded-full font-bold text-sm `}
        >
            {name}
        </button>
    );
}

export default SubcateoryButton;
