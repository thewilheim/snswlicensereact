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
