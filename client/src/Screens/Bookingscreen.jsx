import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from "moment";
import Swal from "sweetalert2"

const Bookingscreen = () => {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate()
  
  const firstdate = moment(fromdate , 'DD-MM-YYYY')
  const lastdate = moment(todate , 'DD-MM-YYYY')
  
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1
  const [totalamount,setTotalamount] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = (await axios.post("/getroombyid", { roomid: roomid }))
          .data;
        setTotalamount(response.rentperday * totaldays)
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

  const bookroom = async ()=>{
    const bookingdetails = {
      room,
      userid:JSON.parse(localStorage.getItem('currentUser')).id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try {
      setLoading(true)
      const result = await axios.post('/bookroom',bookingdetails)
      setLoading(false)
      Swal.fire('Congratulations',"You have successfully booked the room","success").then(() =>{
        navigate("/bookings")
      })
      console.log(result)
    } catch (error) {
      console.log(error)
      setLoading(false)
      Swal.fire('Error',"An error occurred","error")
    }
  }

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : error ? (
        <>
          <Error />
        </>
      ) : (
        <>
          <div className="container " data-aos="flip-down">
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
                  <h5>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</h5>
                  <h5>From Date : {fromdate}</h5>
                  <h5>To Date : {todate}</h5>
                  <h5>Max Count : {room.maxcount}</h5>

                  <br />

                  <h2>Amount</h2>
                  <hr />
                  <h5>Total Days : {totaldays}</h5>
                  <h5>Rent Per Day : &#8377; {room.rentperday}</h5>
                  <h5>Total Amount : &#8377; {totalamount}</h5>

                  <button className="btn btn-dark float-end" onClick={bookroom}>Pay Now</button>
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
