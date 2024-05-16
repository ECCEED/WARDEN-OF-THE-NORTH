import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import contractimage from "../img/contract.avif";
import replogo from "../img/repairlogo.jpg";
import shoplogo from "../img/shoplogo.png";
import inslogo from "../img/W.png";

const Contracts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let componentMounted = true;

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
                <div style={{ height: "100%" }}>
                  <img src={contractimage} alt="contract" style={{ marginBottom: "20px", maxWidth: "100%" }} />
                  <h5 className="card-title">{contract.name.substring(0, 12)}</h5>
                  <p>Casse accidentelle</p>
                  <p>Court-Circuit</p>
                  <p>Oxydation & Humidité</p>
                  <p>Infiltration</p>
                  <p>Option vol</p>
                  <p className="card-text">{contract.description.substring(0, 90)}</p>
                  <div className="price">Price: {contract.price} DT</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Learn More About</h2>
            <hr />
            <div className="text-center my-3 d-flex justify-content-center">
              <div className="mx-5 text-center">
                <a href="/repair-services">
                  <img src={replogo} alt="Repair logo" style={{ maxWidth: "100px", height: "100px", borderRadius: "50%" }} />
                </a>
                <div>Repair Services</div>
              </div>
              <div className="mx-5 text-center">
                <a href="/insurance">
                  <img src={inslogo} alt="Insurance logo" style={{ maxWidth: "100px", height: "100px", borderRadius: "50%" }} />
                </a>
                <div>Insurance</div>
              </div>
              <div className="mx-5 text-center">
                <a href="/online-shopping">
                  <img src={shoplogo} alt="Online Shopping logo" style={{ maxWidth: "100px", height: "100px", borderRadius: "50%" }} />
                </a>
                <div>Online Shopping</div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <h2 className="display-5 text-center">Contracts</h2>
        <hr />
        <div className="row justify-content-center">{loading ? <Loading /> : <ShowContracts />}</div>
      </div>
    </div>
  );
};

export default Contracts;
