import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import {
  createLicense,
  getLicense,
  getUser,
  parseJwt,
} from "../../web-services";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const payload = parseJwt(token);
  const [user, setUser] = useState({});
  const [license, setLicense] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  async function refreshUser() {
    if (!token) {
      navigate(-1);
    } else {
      let request = null;
      if (payload.roles.includes("CSR")) {
        request = await getUser(id);
      } else {
        request = await getUser("");
      }
      let result = await request.json();
      setUser(result);
      if (
        result.roles.includes("provisional") ||
        result.roles.includes("learners")
      ) {
        let licenseRequest = await getLicense(result.email);
        let licenseResult = await licenseRequest.json();
        setLicense(licenseResult);
      }
      setLoaded(true);
    }
  }

  function userRoles() {
    if (user.roles.includes("CSR")) {
      return <p>Customer Service Representitive</p>;
    } else if (user.roles.includes("provisional")) {
      return <p>Provisional license ID: {license._id}</p>;
    } else if (user.roles.includes("learners")) {
      return <p>Learner's license ID: {license._id}</p>;
    } else {
      return <p>Licenceless customer</p>;
    }
  }

  function licenseButton() {
    if (payload.roles.includes("CSR")) {
      if (
        !user.roles.includes("provisional") &&
        user.roles.includes("learners")
      ) {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              newLicense();
            }}
          >
            Issue Learner License
          </button>
        );
      } else if (
        !user.roles.includes("provisional") &&
        !user.roles.includes("learners")
      ) {
        <button
          onClick={(e) => {
            e.preventDefault();
            upgradeLicense();
          }}
        >
          Issue Provisional License
        </button>;
      }
    }
  }

  async function newLicense() {
    await createLicense(user.email)
      .then((r) => {
        return r.json();
      })
      .then((j) => {
        alert(`License ID: ${j._id} has been created successfully!`);
      })
      .then(() => {
        window.location.reload(false);
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  async function upgradeLicense() {}

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
        {licenseButton()}
      </div>
    );
  }
}
