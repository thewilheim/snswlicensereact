export const server = "http://localhost:8080";

export async function loginAsync(email, password) {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  return fetch(server + "/login", config)
    .then((r) => {
      if (r.status !== 200) {
        throw Error("Invalid Login");
      }
      return r.json();
    })
    .then((j) => {
      localStorage.setItem("token", j);
      return j;
    });
}

export async function getUser(id) {
  if (!id) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    return fetch("http://localhost:8080/user", requestOptions).catch((error) =>
      console.log("error", error)
    );
  } else {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    return fetch(`http://localhost:8080/user/${id}`, requestOptions).catch(
      (error) => console.log("error", error)
    );
  }
}

export async function getUserId() {
    var id = null;
    var request = await getUser()
    var result = await request.json()
    id = await result._id;
    return id;
}

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function createLicense(user) {
  let payload = parseJwt(localStorage.getItem("token"));
  let date = new Date();
  let date2 = date.toISOString().slice(0, 16);

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      userEmail: user.email,
      issuedBy: payload.email,
      issuedDate: date2,
    }),
  };

  let fetch1 = fetch(`${server}/issue/learner`, config);

  let configUser = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ ...user, roles: [...user.roles, "learners"] }),
  };

  fetch(`${server}/user`, configUser).catch((e) => console.log("error", e));

  return fetch1;
}

export async function upgradeLicense(user) {
  let config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ ...user, roles: [...user.roles, "provisional"] }),
  };

  return fetch(`${server}/user`, config).catch((e) => console.log("error", e));
}

export function getLicense(email) {
  let payload = parseJwt(localStorage.getItem("token"));
  var config = {
    method: "GET",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  return fetch(`${server}/license/${email}`, config);
}

export function addEntry(logbook) {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(logbook),
  };
  return fetch(`${server}/logbook/create`, config);
}

export function findEntry(userInfo) {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(userInfo),
  };
  return fetch(`${server}/search`, config);
}

export function logout() {
  localStorage.removeItem("token");
}

export function convertTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;

  minutes = minutes % 60;

  return `${Math.round(hours)} hour and ${Math.round(minutes)} minutes`;
}

export function getHours(milliseconds) {
  return milliseconds / 1000 / 60 / 60;
}
