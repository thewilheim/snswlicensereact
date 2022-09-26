const server = 'http://localhost:8080'

export async function loginAsync(username,password) {

    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),
    }
    return fetch(server + "/login", config)
        .then(r=> {
            if(r.status !== 200) {
                throw Error("Invalid Login")
            }
            return r.json();
        })
        .then(j=> {
            localStorage.setItem('token', j)
            return j;
        })
}