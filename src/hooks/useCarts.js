import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getOldCart } from "../utils/cartHandler";
import axios from 'axios';

const useCarts = () => {

  const { user } = useContext(AuthContext);

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      setLoading(true);
      let myCart;
      if (user.token) {
        try {
          const { data } = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/cart/${user._id}`, {
            headers: {
              token: user.token
            }
          });
          setCarts(data.products);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
      } else {
        myCart = getOldCart();
        setCarts(myCart);
        setLoading(false);
      }


    }
    getCart();
  }, [user]);

  return { carts, setCarts , loading }
}

export default useCarts;


