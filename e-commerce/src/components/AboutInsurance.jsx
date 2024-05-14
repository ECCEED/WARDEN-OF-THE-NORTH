import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import contractimage from "../img/contract.avif";

const Contracts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  useEffect(() => {
    const getContracts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:7000/contract/allcontracts");
        if (componentMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setLoading(false);
      }
    };

    getContracts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  const ShowContracts = () => {
    return (
      <>
        {data.map((contract) => (
          <div key={contract._id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <div
                  style={{
                    padding: "40px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    height: "100%",
                  }}
                >
                  <img src={contractimage} alt="contract" style={{ marginBottom: "20px", maxWidth: "100%" }} />
                  <h5 className="card-title">{contract.name.substring(0, 12)}...</h5>
                  <p className="card-text">{contract.description.substring(0, 90)}...</p>
                  <div className="price">Price: ${contract.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Contracts</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">{loading ? <Loading /> : <ShowContracts />}</div>
    </div>
  );
};

export default Contracts;
