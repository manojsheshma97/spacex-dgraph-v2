import React, { useState, useEffect, Fragment } from 'react'
import { useQuery, useMutation } from "@apollo/client";

import { GET_LAUNCHES, UPDATE_LAUNCH, UPDATE_ADDTOCART } from "./GraphQLData";
import './index.css'

//import Cart from './Cart';
//import { Footer, Header } from './components';

const Launches = () => {
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
        //const setNowshowingFn = nowShowing => () => setNowShowing(nowShowing)

        // processLocationHash(history.location.hash)
        // history.listen((location, action) =>
        //     processLocationHash(location.hash)
        // )
        getData()
    }, [data])

    // const save = (launchToSave, text) => {
    //     updateLaunch({
    //       variables: {
    //         taskID: launchToSave.id,
    //         task: {
    //           title: text
    //         }
    //       },
    //       refetchQueries: [{
    //         query: GET_LAUNCHES
    //       }]
    //     })
    // }
    let count = 0
    const launchItems = shownLaunches.map(launch => {
        return (
            <tr key={launch.id}>
                <td>
                    {launch.id}
                </td>
                <td>
                    {launch.site}
                </td>
                <td>
                    {launch.mission.name}
                </td>
                <td>
                    {launch.rocket.name}
                </td>
                <td>
                    {launch.rocket.type}
                </td>
                {launch.isBooked ? <td>Booked</td> : <td>Not Booked</td>}
                {launch.isBooked ? <td>
                    <button value="booked" id={launch.id} onClick={e => {
                        e.preventDefault();
                        updateLaunch({ variables: { launch: e.target.id, booked: false, addedToCart: false } });
                    }
                    }>Cancel Trip</button>
                </td> : <td>
                    <button value="not-booked" id={launch.id} onClick={e => {
                        e.preventDefault();
                        updateLaunch({ variables: { launch: e.target.id, booked: true, addedToCart: false } });
                    }}>Book Trip</button>
                </td>}
                {launch.isAddedToCart ? <td>
                    <button value="added-to-cart" id={launch.id} onClick={e => {
                        e.preventDefault();
                        updateAddToCart({ variables: { launch: e.target.id, addedToCart: false } });
                    }
                    }>Remove from Cart</button>
                </td> : <td>
                    <button value="not-added-to-cart" id={launch.id} onClick={e => {
                        e.preventDefault();
                        updateAddToCart({ variables: { launch: e.target.id, addedToCart: true } });
                    }}>Add to Cart</button>
                </td>}
            </tr>
            
        )
    })

   /* const cartItems = shownLaunches.map(launch => {
        return (
            <div key={launch.id}>
                {launch.isAddedToCart ? <h3>
                    {launch.id} - {launch.mission.name} - {launch.rocket.name}
                </h3> : null}
            </div>
        )
    });
    const bookALL=<button onClick = {e => {
        e.preventDefault()
        // eslint-disable-next-line no-lone-blocks
        {shownLaunches.map(launch=>{
           if( launch.isAddedToCart ) updateLaunch({variables: {launch : launch.id, addedToCart: false, booked: true}})
           // :updateLaunch({variables: {launch: launch.id, addedToCart: false, booked: false}})
        })}
    }}>Book All Trips</button>*/
  

    return (
        <Fragment>
           
            <div>
                <h1 className="heading">Home</h1>
                <table style={{ border: '1px solid black' }} className="tableData"> 
                    <thead style={{ border: '1px solid black' }} >
                        <tr>
                            <th>Launch ID</th>
                            <th>Site</th>
                            <th>Mission</th>
                            <th>Rocket</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody >
                        {launchItems}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}



export default Launches


