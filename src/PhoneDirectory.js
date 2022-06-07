import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import AddSubscriber from "./AddSubscriber";
import ShowSubscribers from "./ShowSubscribers";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./Footer";
import {SubscriberCountContext} from "./SubscriberCountContext";
import { TotalSubscribersReducer } from "./TotalSubscribersReducer";
import { useDispatch } from "react-redux";

export default function PhoneDirectory() {

    const [subscribersList, setSubscribersList] = useState([]);

     const [state, dispatchToTotalSubscribersReducer] = useReducer(TotalSubscribersReducer, {count : 0})

      const dispatch = useDispatch();
    async function loadData(){
        const rawResponse = await fetch("http://localhost:7081/api/contacts")
        const data = await rawResponse.json()
      
       dispatch({"type": "SET_SUBSCRIBERS", payload : data})
       dispatchToTotalSubscribersReducer({"type": "UPDATE_COUNT", payload: data.length})

        setSubscribersList(data);
    }
    useEffect(()=>{
         loadData();
    }, [])


    const deleteSubscriberHandler = useCallback(async (subscriberId)=>{
        const rawResponse = await fetch("http://localhost:7081/api/contacts/" + subscriberId, {method : "DELETE"})
        const data = await rawResponse.json();
        loadData();
    }, [subscribersList])
   

   async function addSubscriberHandler(newSubscriber) {
       const rawResponse = await fetch("http://localhost:7081/api/contacts", 
       {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newSubscriber)
    }
    );
        const data = await rawResponse.json();
        loadData();

    }

    return (
        <><Router>
            <Routes>
                <Route path='/' element={<ShowSubscribers deleteSubscriberHandler={(subscriberId) => deleteSubscriberHandler(subscriberId)} />} />
                <Route path='/add' element={<AddSubscriber addSubscriberHandler={(newSubscriber) => addSubscriberHandler(newSubscriber)} />} />
            </Routes>
        </Router>
            <SubscriberCountContext.Provider value={state.count}>
                <Footer />
            </SubscriberCountContext.Provider>


        </>
    )

}
