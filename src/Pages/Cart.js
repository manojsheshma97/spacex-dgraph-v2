import React, { useState, useEffect, Fragment } from 'react'
import { useQuery, useMutation } from "@apollo/client";


import { GET_LAUNCHES, UPDATE_LAUNCH, UPDATE_ADDTOCART } from "./GraphQLData";


const Cart = () => {
    //const [nowShowing, setNowShowing] = useState();
    const [shownLaunches, setShownLaunches] = useState([]);

    const [updateLaunch] = useMutation(UPDATE_LAUNCH)
    const [updateAddToCart] = useMutation(UPDATE_ADDTOCART)

    const { loading, error, data } = useQuery(GET_LAUNCHES);
    const getData = () => {
        if (loading) {
            return "Loading....";
        }
        if (error) {
            console.log(`GET_LAUNCHES error: ${error}`);
            return `Error: ${error.message}`
        }
        if (data.queryLaunch) {
            setShownLaunches(data.queryLaunch)
        }
    }

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

   
    const bookALL=<button className="buttonCSS" onClick = {e => {
        e.preventDefault()
        // eslint-disable-next-line no-lone-blocks
        {shownLaunches.map(launch=>{
           if( launch.isAddedToCart ) updateLaunch({variables: {launch : launch.id, addedToCart: false, booked: true}})
           // :updateLaunch({variables: {launch: launch.id, addedToCart: false, booked: false}})
           return null
        })}
    }}>Book All Trips</button>

    const shownLaunches1= shownLaunches.filter(launch => launch.isAddedToCart)
    const cartItems = shownLaunches1.map(launch => {
        return (
            <div key={launch.id}>
            <div style={{backgroundImage:`url(${launch.imageSaved})`}} className="centered">
                    <h1>{launch.mission.name}</h1>
                    <h3>{launch.rocket.name}</h3>
                </div>
            <br></br>
            <div className="buttonFlex">
            {launch.isBooked ? <div>
                    <button className="buttonCSS" value="booked" id={launch.id} onClick={e => {
                        e.preventDefault();
                        updateLaunch({ variables: { launch: e.target.id, booked: false, addedToCart: false } });
                    }
                    }>Cancel Trip</button>
                </div> : <div>
                    <button className="buttonCSS" value="not-booked" id={launch.id} onClick={e => {
                        e.preventDefault();
                        updateLaunch({ variables: { launch: e.target.id, booked: true, addedToCart: false } });
                    }}>Book Trip</button>
                </div>}
                <div>
                    <button className="buttonCSS" value="added-to-cart" id={launch.id} onClick={e => {
                        e.preventDefault();
                        updateAddToCart({ variables: { launch: e.target.id, addedToCart: false } });
                    }
                    }>Remove from Cart</button>
                </div> 
            </div>

            </div>

        )
    })


  

    return (
        <Fragment>
            <div >
                <h1 className="mainkHeader">Cart</h1>
                <div className="heading">
                    {cartItems}
                </div>
                <div>
                    <br></br>
                    <br></br>
                    {bookALL}
                </div>
            </div>
        


        </Fragment>
    )
}



export default Cart


