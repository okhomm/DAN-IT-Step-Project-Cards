

import {Visit, VisitDentist, VisitTherapist, VisitCardiologist} from "./visit.js";

let token = "691806b3-1577-40fb-81e4-044162f4d5b6"

const lowButton = document.querySelector('#filterLow');

lowButton.addEventListener('click',  (ev) => {
    ev.preventDefault();

    fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .then(data => data.forEach(el => {

            document.body.querySelector('#visitsCard').childNodes.forEach(el => el.remove());

            el.description === "Low" && el.doctor === "Стоматолог" ? new VisitDentist().render.call(el) : false
            el.description === "Low" && el.doctor === "Кардіолог" ? new VisitCardiologist().render.call(el) : false
            el.description === "Low" && el.doctor === "Терапевт" ? new VisitTherapist().render.call(el) : false

        }))

})

