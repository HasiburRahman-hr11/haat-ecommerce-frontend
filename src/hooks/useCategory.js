import { useEffect, useState } from "react";
import axios from 'axios';

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getAllCategories = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/category');
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllCategories();
    }, []);
    return { categories, setCategories, loading, setLoading }
}

export default useCategory;