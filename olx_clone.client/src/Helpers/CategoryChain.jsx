import {getCategoryById} from "@/Api/categoryApi.js";
import {useState} from "react";

const buildCategoryChain = async (category) => {
    let chain = [category.title];

    while (category.parentId !== 0) {
        category = await getCategoryById(category.parentId);
        chain.unshift(category.title);
    }

    return chain.join('/');
};

export const CategoryChainComponent = ({ category }) => {
    const [categoryChain, setCategoryChain] = useState('');

    const fetchCategoryChain = async () => {
        const chainText = await buildCategoryChain(category);
        setCategoryChain(chainText);
    };

    if (categoryChain === '') {
        fetchCategoryChain();
    }

    return (
        <>
            {categoryChain || ''}
        </>
    );
};