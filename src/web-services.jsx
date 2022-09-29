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
    if(!id) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          };
          
          return fetch("http://localhost:8080/user", requestOptions)
            .catch(error => console.log('error', error));
    } else {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          };
          
          return fetch(`http://localhost:8080/user/${id}`, requestOptions)
            .catch(error => console.log('error', error));
    }
    
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

export function createLicense(email) {
    let payload = parseJwt(localStorage.getItem("token"));
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(email, payload.email, new Date()),
    };
    return fetch(`${server}/issue/learner`, config);
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
