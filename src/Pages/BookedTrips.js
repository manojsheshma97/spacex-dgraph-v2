import React, { useState, useEffect, Fragment } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import { GET_LAUNCHES, UPDATE_LAUNCH } from "./GraphQLData";
import './index.css'


const BookedTrips = () => {
    //const [nowShowing, setNowShowing] = useState();
    const [shownLaunches, setShownLaunches] = useState([]);

    const [updateLaunch] = useMutation(UPDATE_LAUNCH)
  //  const [updateAddToCart] = useMutation(UPDATE_ADDTOCART)

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

 /*   useEffect(() => {
    
        getData()
    }, [data])*/

    useEffect(() => {
    
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const shownLaunches1= shownLaunches.filter(launch => launch.isBooked)
    const bookedItems = shownLaunches1.map(launch => {
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
                
            </div>

            </div>

        )
    })


    return (
        <Fragment>

            <div >
                <h1 className="mainkHeader">Booked Trips</h1>
                <div className="heading">
                    {bookedItems}
                </div>
            </div>
        </Fragment>
    )
}



export default BookedTrips


