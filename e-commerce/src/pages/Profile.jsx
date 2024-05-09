import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { Footer, Navbar, BasicCard } from '../components';

const ProfilePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');

  const [userData, setUserData] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      // Fetch user data
      axios.get(`http://localhost:7000/profile/${userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });

      axios.get(`http://localhost:7000/purchase/history/${userId}`)
        .then(response => {
          setPurchaseHistory(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching purchase history:', error);
        });
    }
  }, [userId]);

  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid
                  />
                  <div className="d-flex justify-content-center mb-2">
                    <Link to={`/Updateprofile?id=${userId}`}>
                      <MDBBtn outline className="ms-1">
                        Update profile
                      </MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBCardText>Full Name</MDBCardText>
                  <MDBCardText className="text-muted">
                    {userData ? userData.name : 'Loading...'}
                  </MDBCardText>
                  <hr />
                  <MDBCardText>Email</MDBCardText>
                  <MDBCardText className="text-muted">
                    {userData ? userData.email : 'Loading...'}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 d-flex flex-wrap">
                <MDBCardBody className="d-flex flex-wrap">
                  
                  {purchaseHistory.map((purchase, index) => (
                    <BasicCard
                      key={index}
                      name={purchase.product.name}
                      price={purchase.product.price}
                      description={purchase.product.description}
                      photo={purchase.product.imgID}
                      className="mb-3 me-3" 
                    />
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
};

export default ProfilePage;
