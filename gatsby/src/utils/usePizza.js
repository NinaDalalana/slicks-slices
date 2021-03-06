import { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";

export default function usePizza({ pizzas, values}) {
    //create some state to hold our order
    //we gor tid of the line below because we moved useState up to the provider to access both state and updater function
    //const [order, setOrder] = useState([]);
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    //make a function add things to order
    function addToOrder(orderedPizza){
        setOrder([...order, orderedPizza]);
    }
    //make a function to remove things from order
    function removeFromOrder(index){
        setOrder([
            //everything before the item we want to remove
            ...order.slice(0,index),
            //everything after the item we want to remove
            ...order.slice(index +1)
        ]);
    }
    //functions that is run when someone submits the form
    async function submitOrder(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        //setMessage(null);
        // gather data
        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            maple: values.maple,
        };
        //send this data the serverless functions when they check out
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );

        const text = JSON.parse(await res.text());
        // check if everything works
        if(res.status >= 400 && res.status < 600) {
            setLoading(false); // turn off loading
            setError(text.message);
        } else {
            //it worked!
            setLoading(false);
            setMessage('Success! Come on down for your pizza');
        }
    }

    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder,
    };
}

