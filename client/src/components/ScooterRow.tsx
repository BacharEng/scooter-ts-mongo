import React from "react";
import { Scooter } from "../store/useScooterStore";

interface ScooterRowProps {
  scooter: Scooter;
  deleteItem: (id: string) => void;
}
const ScooterRow: React.FC<ScooterRowProps> = ({ scooter, deleteItem }) => {
  return (
    <>
      <div className="row m-top20">
        <div className="col-lg-10">{scooter.scooterModel}</div>
        <div className="col-lg-2">
          <button
            onClick={() => deleteItem(scooter._id || "")}
            className="btn btn-sm btn-danger"
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ScooterRow;
