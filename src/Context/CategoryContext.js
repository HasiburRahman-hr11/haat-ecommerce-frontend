import { createContext } from 'react'
import useCategory from '../hooks/useCategory';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {

    const allContext = useCategory();
    return (
        <CategoryContext.Provider value={allContext}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider;