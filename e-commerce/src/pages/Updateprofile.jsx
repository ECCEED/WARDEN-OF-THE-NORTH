import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Footer, Navbar } from '../components';

const Updateprofile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:7000/profile/${userId}`)
        .then(response => {
          const { name, email } = response.data;
          setValues({ ...values, name, email });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    let updatedValues = { ...values };
    if (newPassword !== '') {
      updatedValues.password = newPassword;
    }
    if (repeatNewPassword !== '') {
      updatedValues.repeatPassword = repeatNewPassword;
    }

    try {
      await axios.put(`http://localhost:7000/Updateprofile/${userId}`, updatedValues);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  const handleNameChange = (e) => {
    setValues({ ...values, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setValues({ ...values, email: e.target.value });
  };

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
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <form onSubmit={handleUpdateProfile}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBInput
                          type="text"
                          value={values.name}
                          onChange={handleNameChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBInput
                          type="email"
                          value={values.email}
                          onChange={handleEmailChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>New Password</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBInput
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Repeat New Password</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBInput
                          type="password"
                          value={repeatNewPassword}
                          onChange={(e) => setRepeatNewPassword(e.target.value)}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <MDBBtn type="submit">Update Profile</MDBBtn>
                </form> 
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
};

export default Updateprofile;
