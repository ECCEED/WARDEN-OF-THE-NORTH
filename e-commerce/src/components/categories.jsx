import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <>
     
      <div className="container my-3 py-3">
        <hr />
        <h2 className="text-center py-4">Our Categories</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/household-appliances" className="btn btn-outline-primary d-block">
              <div className="card h-100">
                <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
                <div className="card-body">
                  <h5 className="card-title text-center">Household appliances</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/phones" className="btn btn-outline-primary d-block">
              <div className="card h-100">
                <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
                <div className="card-body">
                  <h5 className="card-title text-center">Phones</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/computers" className="btn btn-outline-primary d-block">
              <div className="card h-100">
                <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
                <div className="card-body">
                  <h5 className="card-title text-center">Computers</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Categories;
