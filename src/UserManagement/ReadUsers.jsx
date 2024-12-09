import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReadUsers() {
  let { id } = useParams();
  const [formData, setformData] = useState({});
  const fetchData = () => {
    axios
      .get(`http://localhost:3002/users/${id}`)
      .then((res) => setformData(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>User Details</h1>
      <ul>
        <li>Name: {formData.name}</li>
        <li>Email: {formData.email}</li>
        <li>Role: {formData.role}</li>
        <li>Status: {formData.status}</li>
      </ul>
    </div>
  );
}

export default ReadUsers;
