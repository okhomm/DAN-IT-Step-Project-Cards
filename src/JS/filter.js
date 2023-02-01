

import {Visit, VisitDentist, VisitTherapist, VisitCardiologist} from "./visit.js";

let token = "691806b3-1577-40fb-81e4-044162f4d5b6"

const lowButton = document.querySelector('#filterLow');

const getAllCards = () => {}

lowButton.addEventListener('click',  (ev) => {
    ev.preventDefault();

    document.body.querySelectorAll('.col').forEach(el => el.remove())


    fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .then(data => data.forEach(el => {

            el.doctor === "Стоматолог" && el.description === "Low" ? new VisitDentist().render.call(el) : false
            el.doctor === "Кардіолог" && el.description === "Low" ? new VisitCardiologist().render.call(el) : false
            el.doctor === "Терапевт" && el.description === "Low" ? new VisitTherapist().render.call(el) : false

        }))
})

