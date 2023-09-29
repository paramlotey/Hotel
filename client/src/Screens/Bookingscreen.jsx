import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";

const Bookingscreen = () => {
  const { roomid } = useParams();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = (await axios.post("/getroombyid", { roomid: roomid }))
          .data;
        setRoom(response);
        console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loader/>
        </>
      ) : error ? (
        <>
          <Error/>
        </>
      ) : (
        <>
          <div className="container "data-aos="flip-down">
            <div className="row bs m-5 p-5">
              <div className="col-sm-7">
                <h2>{room.roomname}</h2>
                {room.imageurls && room.imageurls.length > 0 ? (
                  <img
                    src={room.imageurls[0]}
                    alt="not-found"
                    className="img-fluid rounded"
                  />
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <div className="col-sm-5">
                <div className="">
                  <h2>Booking Details</h2>
                  <hr />
                  <h5>Name : </h5>
                  <h5>From Date : </h5>
                  <h5>To Date : </h5>
                  <h5>Max Count : {room.maxcount}</h5>

                  <br />

                  <h2>Amount</h2>
                  <hr />
                  <h5>Total Days : </h5>
                  <h5>Rent Per Day : {room.rentperday}</h5>
                  <h5>Total Amount : </h5>

                  <button className="btn btn-dark float-end">Pay Now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Bookingscreen;
