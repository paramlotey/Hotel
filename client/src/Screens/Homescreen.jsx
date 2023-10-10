import axios from "axios";
import React, { useEffect, useState } from "react";
import Rooms from "../Components/Rooms";
import Loader from "../Components/Loader";
import moment from "moment";
import "antd/dist/reset.css";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();

  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplicaterooms, setDuplicaterooms] = useState([]);

  const [searchkey, setSearchkey] = useState('')
  const [type, setType] = useState("All")

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = (await axios.get("/allrooms")).data;
        setRooms(response);
        setDuplicaterooms(response);
        console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filterbydate = (dates) => {
    // console.log((dates[0]).format('DD-MM-YYYY'));
    // console.log((dates[1]).format('DD-MM-YYYY'));
    setFromdate(dates[0].format("DD-MM-YYYY"));
    setTodate(dates[1].format("DD-MM-YYYY"));

    var tempRooms = [];

    for (const room of duplicaterooms) {
      var availability = false;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[0].format("DD-MM-YYYY") !== booking.todate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[1].format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }

      if (availability === true || room.currentbookings.length == 0) {
        tempRooms.push(room);
      }
    }

    setRooms(tempRooms);
  };

  const filterbysearch =()=>{
    const temprooms = duplicaterooms.filter(room=>room.roomname.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(temprooms);
  }
  const filterbytype = (e)=>{

    setType(e)

    if(e != "All"){
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setRooms(temprooms)
    }
    else{
      setRooms(duplicaterooms)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-4">
            <RangePicker format="DD-MM-YYYY" onChange={filterbydate} className="w-100" style={{padding: "0.375rem 0.75rem"}}/>
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Search Rooms" 
            value={searchkey}
            onChange={(e)=>{setSearchkey(e.target.value)}} onKeyUp={filterbysearch}/>
          </div>
          <div className="col-md-4">
            <select className="form-control" value={type} onChange={(e)=>{filterbytype(e.target.value)}}>
              <option value="All">All</option>
              <option value="Delux">Delux</option>
              <option value="Non-Delux">Non-Delux</option>
            </select>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          {loading ? (
            <Loader />
          ) : (
            rooms.map((room) => {
              return (
                <div
                  className="col-md-9"
                  key={room._id}
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                >
                  <Rooms room={room} fromdate={fromdate} todate={todate} />
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
