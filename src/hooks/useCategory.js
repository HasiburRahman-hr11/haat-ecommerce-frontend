import { useEffect, useState } from "react";
import axios from 'axios';

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getAllCategories = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('https://hidden-crag-34912.herokuapp.com/api/category');
                setCategories(data.categories);
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