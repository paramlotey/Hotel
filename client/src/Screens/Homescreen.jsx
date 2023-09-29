import axios from "axios";
import React, { useEffect, useState } from "react";
import Rooms from "../Components/Rooms";
import Loader from "../Components/Loader";
import Error from "../Components/Error";

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = (await axios.get("/allrooms")).data;
        setRooms(response);
        console.log(response);
        setTimeout(()=>{
          setLoading(false)
        },1000)
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
      <div className="container" >
        <div className="row justify-content-center mt-5" >
          {loading ? (
            <Loader/>
          ) : error ? (
            <Error/>
          ) : (
            rooms.map((room) => {
              return (
                <div className="col-md-9" key={room._id} data-aos="zoom-in" data-aos-duration="1500" >
                  <Rooms room={room} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Homescreen;
