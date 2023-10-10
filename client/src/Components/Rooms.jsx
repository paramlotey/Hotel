import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Rooms = ({ room, fromdate, todate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="row bs m-3 p-4 ">
        <div className="col-md-4 col-sm-8">
          <img src={room.imageurls[0]} alt="" className="img-fluid rounded" />
        </div>
        <div className="col-md-7 col-sm-12">
          <h1>{room.roomname}</h1>
          <p>Max Count : {room.maxcount}</p>
          <p>Phone Number : {room.phonenumber}</p>
          <p>Type : {room.type}</p>

          <div className="float-end">
            {fromdate && todate && (
              <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                <button className="btn btn-dark mx-1">Book Now</button>
              </Link>
            )}

            <button className="btn btn-dark mx-1" onClick={handleShow}>
              More Info
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{room.roomname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel fade indicators={false}>
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item key={room._id}>
                  <img className="img-fluid" src={url} alt="First slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-dark" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Rooms;
