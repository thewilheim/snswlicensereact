import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import {
  convertTime,
  createLicense,
  getHours,
  getLicense,
  getUser,
  getUserId,
  parseJwt,
  upgradeLicense,
} from "../../web-services";
import "./styles.css";

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
      return (
        <>
          <p>Learner's license ID</p>
          <p className="data w-full">{license._id}</p>
          <div className="mt-2">
            Total Hours Completed : {convertTime(license.totalTime)}
            <div className="progressBar">
              <div
                className="progressBar-Blue"
                style={{ width: `${(license.totalTime / 432000000) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            Total Night Hours Completed : {convertTime(license.totalNightTime)}
            <div className="progressBar">
              <div
                className="progressBar-Purple"
                style={{
                  width: `${(license.totalNightTime / 72000000) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </>
      );
    } else {
      return <p>Licenceless customer</p>;
    }
  }

  function licenseButton() {
    if (payload.roles.includes("CSR")) {
      if (
        !user.roles.includes("provisional") &&
        !user.roles.includes("learners")
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
        user.roles.includes("learners") &&
        new Date(
          new Date(user.dateOfBirth).getTime() + 788923800000
        ).getTime() < new Date().getTime() &&
        getHours(license.totalTime) >= 120 &&
        getHours(license.totalNightTime) >= 20
      ) {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              upgradeLicenseLocal();
            }}
          >
            Issue Provisional License
          </button>
        );
      }
    }
  }

  async function newLicense() {
    await createLicense(user)
      .then((r) => {
        return r.json();
      })
      .then((j) => {
        var test = window.confirm(
          "Has this user passed the knowledge check? 'Ok' for yes, 'Cancel' for no."
        );
        if (test) {
          alert(`License ID: ${j._id} has been created successfully!`);
        }
      })
      .then(() => {
        window.location.reload(false);
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  async function upgradeLicenseLocal() {
    upgradeLicense(user);
  }

  if (!loaded) {
    return <h1 className="heading">Loading...</h1>;
  } else {
    return (
      <div className="container">
        <div>
          <h1 className="heading">{`${user.firstName} ${user.lastName}'s Profile`}</h1>
          <div className="float-left w-1/2">
            <p>First Name</p>
            <p className="data w-11/12">{user.firstName}</p>
            <p>Date Of Birth</p>
            <p className="data w-11/12">{user.dateOfBirth}</p>
          </div>
          <div className="float-right w-1/2">
            <p>Last Name</p>
            <p className="data w-full">{user.lastName}</p>
            <p>Mobile</p>
            <p className="data w-full">{user.mobile}</p>
          </div>
          <p>Email</p>
          <p className="data w-full">{user.email}</p>
          {userRoles()}
          {licenseButton()}
        </div>
      </div>
    );
  }
}
