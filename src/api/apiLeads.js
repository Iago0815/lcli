import {API} from '../config'

export const sendLeads = (leads) => {


    console.log(leads);

    return fetch(`${API}/leads/create`, {

        method:"POST",
        headers: {

             Accept: 'application/json',
              "Content-Type": "application/json"            
        },

        body: JSON.stringify(leads)

    }).then(res => {

         return res.json();

    }).catch(error => {

        console.log(error);
    })
}

export const sendLeadsTest = (leads) => {


    console.log(leads);

    return fetch(`${API}/leads/create`, {

        method:"POST",
        headers: {

             Accept: 'application/json',
              "Content-Type": "application/json"            
        },

        body: JSON.stringify(leads)

    }).then(res => {

         return res.json();

    }).catch(error => {

        console.log(error);
    })
}