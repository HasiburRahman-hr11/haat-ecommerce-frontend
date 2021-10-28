import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getOldCart } from "../utils/cartHandler";
import axios from 'axios';

const useCarts = () => {

  const { user } = useContext(AuthContext);

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      let myCart;
      if (user.token) {
        try {
          const { data } = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/cart/${user._id}`, {
            headers: {
              token: user.token
            }
          });
          setCarts(data.products);
        } catch (error) {
          console.log(error)
        }
      } else {
        myCart = getOldCart();
        setCarts(myCart);
      }


    }
    getCart();
  }, [user]);

  return { carts, setCarts }
}

export default useCarts;


