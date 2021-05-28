import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliveryLocations } from '../actions/productActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function LocationListScreen() {
    // const [location, setLocation] = useState([]);

    const dispatch = useDispatch();
    const locationList = useSelector((state) => state.locationList);
    const { loading, error, locations } = locationList;

    // useEffect(() => {
    //     setLocation(DeliveryLocations());
    //     console.log(location);
    // }, [])

    useEffect(() => {
        dispatch(deliveryLocations());
      }, [dispatch]);


    return (
        <div>
          <h1>Delivery Locations</h1>
          {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>VAT</th>
                  </tr>
              </thead>
              <tbody>
              {locations.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.name}</td>
                <td>₦{l.price}</td>
                <td>₦{l.vat}</td>
              </tr>
            ))}
                  </tbody>

          </table>
        </>
      )}
          
          </div>
        )
}

