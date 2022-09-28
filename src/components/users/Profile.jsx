import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { getUser, parseJwt } from "../../web-services";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  async function refreshUser() {
    if (!token) {
      navigate(-1);
    } else {
      let payload = parseJwt(token);
      let request = null;
      if (payload.roles.includes("CSR")) {
        request = await getUser(id);
      } else {
        request = await getUser("");
      }
      let result = await request.json();
      setUser(result);
      setLoaded(true);
    }
  }

  function userRoles() {
    if (user.roles.includes("CSR")) {
      return <p>Customer Service Representitive</p>;
    } else if (user.roles.includes("provisional")) {
      return <p>Provisional license holder</p>;
    } else if (user.roles.includes("learners")) {
      return <p>Learner's license holder</p>;
    } else {
      return <p>Licenceless customer</p>;
    }
  }

  if (!loaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>Email: {user.email}</p>
        <p>Mobile: {user.mobile}</p>
        <p>Date Of Birth: {user.dateOfBirth}</p>
        {userRoles()}
      </div>
    );
  }
}
