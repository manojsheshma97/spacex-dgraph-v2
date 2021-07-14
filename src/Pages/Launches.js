import React, { useState, useEffect, Fragment } from 'react'
import { useQuery, useMutation } from "@apollo/client";

import { GET_LAUNCHES, UPDATE_ADDTOCART } from "./GraphQLData";
import './index.css'
//import './iss.jpg'


const Launches = () => {
    //const [nowShowing, setNowShowing] = useState();
    const [shownLaunches, setShownLaunches] = useState([]);

    //const [updateLaunch] = useMutation(UPDATE_LAUNCH)
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
        //const setNowshowingFn = nowShowing => () => setNowShowing(nowShowing)

        // processLocationHash(history.location.hash)
        // history.listen((location, action) =>
        //     processLocationHash(location.hash)
        // )
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])



    const launchItems = shownLaunches.map(launch => {
        return (
            <div key={launch.id} >
                <div style={{backgroundImage:`url(${launch.imageSaved})`}} className="centered" >
                    <h1>{launch.mission.name}</h1>
                    <h3>{launch.rocket.name}</h3>
                </div>
                <br></br>
                <div className="buttonFlex">

                    {launch.isBooked ? 
                    <button className="buttonCSS" >Trip Already Booked</button>
                    
                    :

                        launch.isAddedToCart ? <div>
                            <button className="buttonCSS" value="added-to-cart" id={launch.id} onClick={e => {
                                e.preventDefault();
                                updateAddToCart({ variables: { launch: e.target.id, addedToCart: false } });
                            }}
                            >Remove from Cart</button>
                        </div> : <div>
                            <button className="buttonCSS" value="not-added-to-cart" id={launch.id} onClick={e => {
                                e.preventDefault();
                                updateAddToCart({ variables: { launch: e.target.id, addedToCart: true } });
                            }}>Add to Cart</button>
                        </div>
                    }
                </div>

            </div>

        )
    })

    /* {launch.isBooked ? <div>
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
                </div>}*/

    return (
        <Fragment>

            <div >
                <h1 className="mainkHeader">Home</h1>
                <div className="heading">
                    {launchItems}
                </div>
            </div>
        </Fragment>
    )
}



export default Launches


