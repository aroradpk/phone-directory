import React, { useEffect } from "react";
import AddSubscriber from "./AddSubscriber";
import ShowSubscribers from "./ShowSubscribers";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from "react";
import Footer from "./Footer";
import {SubscriberCountContext} from "./SubscriberCountContext";

export default function PhoneDirectory() {

    const [subscribersList, setSubscribersList] = useState([]);

    async function loadData(){
        const rawResponse = await fetch("http://localhost:7081/api/contacts")
        const data = await rawResponse.json()
        setSubscribersList(data);
    }
    useEffect(()=>{
         loadData();
    }, [])

    async function deleteSubscriberHandler(subscriberId) {
        const rawResponse = await fetch("http://localhost:7081/api/contacts/" + subscriberId, {method : "DELETE"})
        const data = await rawResponse.json();
        loadData();
        // const newSubscribers = subscribersList.filter((subscriber) => subscriber.id !== subscriberId);
        // setSubscribersList(newSubscribers);
        
    }

   async function addSubscriberHandler(newSubscriber) {
       const rawResponse = await fetch("http://localhost:7081/api/contacts" , 
       {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(newSubscriber)
        }
        );
        const data = await rawResponse.json();
        loadData();

        // if (subscribersList.length > 0) {
        //     newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
        // }
        // else {
        //     newSubscriber.id = 1;
        // }
        // subscribersList.push(newSubscriber);
        // setSubscribersList(subscribersList);

    }

    return (
        <><Router>
            <Routes>
                <Route path='/' element={<ShowSubscribers subscribersList={subscribersList} deleteSubscriberHandler={(subscriberId) => deleteSubscriberHandler(subscriberId)} />} />
                <Route path='/add' element={<AddSubscriber addSubscriberHandler={(newSubscriber) => addSubscriberHandler(newSubscriber)} />} />
            </Routes>
        </Router>
            <SubscriberCountContext.Provider value={subscribersList.length}>
                <Footer />
            </SubscriberCountContext.Provider>


        </>
    )

}
