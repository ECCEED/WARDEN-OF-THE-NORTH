import React, { useState } from "react";
import { Footer, Navbar } from "../components";

const Claim = () => {
  const [stolen, setStolen] = useState(false);

  const handleStolenChange = () => {
    setStolen(!stolen);
  };
  
  

  

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">CLAIM</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>

              <div className="form my-3">
              <label htmlFor="ADD A CLAIM">ADD A CLAIM </label>

                  <hr className="my-4" />


                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="stolen"
                    checked={stolen}
                    onChange={handleStolenChange}
                  />
                  <label className="form-check-label" htmlFor="stolen">
                    Stolen
                  </label>
                  <hr className="my-4" />

                </div>
              </div>

              <div className="form  my-3">
                <label htmlFor="Description">DESCRIPTION</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="Description"
                  placeholder="Enter your message"
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                  disabled
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Claim;
