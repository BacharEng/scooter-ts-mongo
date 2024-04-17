import React, { useState, useEffect } from "react";
import { useScooterStore } from "../store/useScooterStore";
import ScooterRow from "../components/ScooterRow";
import { ToastContainer, toast } from "react-toastify";

const Scooter = () => {
  const [scooterModel, setScooterModel] = useState("");
  const [scootertype, setScooterModeltype] = useState("");
  const [scooterbattery, setScooterbattery] = useState(100);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { scooters, addScooter, updateScooter, deleteScooter, fetchScooters } =
    useScooterStore();

  const createScooter = async () => {
    await addScooter({
      scooterModel: scooterModel,
      scooterType: scootertype,
      scooterBattery: scooterbattery,
      location: { lat: latitude, long: longitude },
    });

    setLatitude(0);
    setLongitude(0);
    setScooterModel("");
    setScooterModeltype("");
    setScooterbattery(100);
    toast.success("Scooter added successfully!");
  };

  const deleteItem = async (id: string) => {
    await deleteScooter(id);
  };

  useEffect(() => {
    fetchScooters();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row m-top20">
          <div className="col-lg-3">
            <h2>Add new scooter &#128640;</h2>
            <br />
            <input
              value={scooterModel}
              onChange={(e) => setScooterModel(e.target.value)}
              className="form-control"
              placeholder="Scooter Model"
            />
            <select
              value={scootertype}
              onChange={(e) => setScooterModeltype(e.target.value)}
              className="form-select"
            >
              <option value="">Please select an option...</option>
              <option value="scooter">Scooter</option>
              <option value="bicycle">Bicycle</option>
            </select>
            <input
              type="number"
              value={scooterbattery}
              onChange={(e) => setScooterbattery(parseInt(e.target.value))}
              className="form-control"
              placeholder="Scooter Battery"
            />
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(parseInt(e.target.value))}
              className="form-control"
              placeholder="Latitude"
            />
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(parseInt(e.target.value))}
              className="form-control"
              placeholder="Longitude"
            />
            <button onClick={createScooter} className="btn btn-lg btn-success">
              Create new scooter
            </button>
          </div>
          <div className="col-lg-9">
            <h2>Scooter List</h2>
            <br />
            {scooters.map((scooter) => (
              <ScooterRow
                key={scooter._id}
                scooter={scooter}
                deleteItem={deleteItem}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Scooter;
