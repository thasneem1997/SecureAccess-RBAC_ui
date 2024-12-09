import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReadRole() {
  let { id } = useParams();
  const [formData, setformData] = useState({ permissions: [] });
  const fetchData = () => {
    axios
      .get(`http://localhost:3002/roles/${id}`)
      .then((res) => setformData(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("hhhh", formData);

  return (
    <div className="container mt-5">
      {" "}
      <h2>Role Details</h2>
      <p>Role Name: {formData.name}</p>
      <p>
        Role Permissions:{" "}
        {formData.permissions.length > 0 ? (
          <ul>
            {formData.permissions.map((permission, i) => (
              <li key={i}>{permission}</li>
            ))}
          </ul>
        ) : (
          <span>No permissions assigned</span>
        )}
      </p>
    </div>
  );
}

export default ReadRole;
