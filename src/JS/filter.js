import {Visit, VisitDentist, VisitTherapist, VisitCardiologist} from "./visit.js";

let token = "ea883a2a-cfb9-4881-8548-380bd89f98a1"
const CARDS_API = "https://ajax.test-danit.com/api/v2/cards";

const lowButton = document.querySelector('#filterLow');

const doctorCardRender = (doctor) => {
    if(doctor === 'Стоматолог') {
        console.log('Cтоматолог');
        new VisitDentist().render();
    }
    if(doctor === 'Кардіолог') {
        console.log('Кардіолог');
        new VisitCardiologist().render();
    }
    if(doctor === 'Терапевт') {
        console.log('Терапевт');
        new VisitTherapist().render();
    }
}


const getAllCards = async () => {
    const response = await fetch(CARDS_API, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    });
    const data = await response.json();
    return data;
};

const filterCardsByStatus = async (btn) => {
    const allCards = await getAllCards();
    allCards.forEach(({status, doctor}) => {
        if(btn === 'filterOpenBtn' && status === 'open') {
            // console.log('open 1')
            doctorCardRender(doctor);
        }
        if(btn === 'filterDoneBtn' && status === 'done') {
            // console.log('done 2')
            doctorCardRender(doctor);
        }

    })
    // console.log(allCards)
}

const filterStatusButtons = document.querySelector('#filterStatusButtons');



filterStatusButtons.addEventListener('click', (e) => {
    e.preventDefault();
    const filterOpenBtn = document.querySelector("#filterOpenBtn");
    const filterDoneBtn = document.querySelector("#filterDoneBtn");

    if(e.target.id === "filterOpenBtn" && e.target.tagName.toLowerCase() === "button") {

        filterDoneBtn.disabled = false;
        filterDoneBtn.classList.remove('btn-danger');
        filterDoneBtn.classList.add('btn-outline-danger');
        filterOpenBtn.classList.remove('btn-outline-danger');
        filterOpenBtn.classList.add('btn-danger');
        filterOpenBtn.disabled = true;
        // filterDoneBtn.addEventListener('click', filterCardsByStatus);

        filterCardsByStatus('filterOpenBtn');
        // console.log("open")
    }
    if(e.target.id === "filterDoneBtn" && e.target.tagName.toLowerCase() === "button") {
        filterOpenBtn.disabled = false;
        filterOpenBtn.classList.remove('btn-danger');
        filterOpenBtn.classList.add('btn-outline-danger');
        filterDoneBtn.classList.remove('btn-outline-danger');
        filterDoneBtn.classList.add('btn-danger');
        filterDoneBtn.disabled = true;

        filterCardsByStatus('filterDoneBtn');
        // console.log("done")
    }

})



// filterCardsByStatus()



// lowButton.addEventListener('click', (ev) => {
//     ev.preventDefault();
//
//     document.body.querySelectorAll('.col').forEach(el => el.remove())
//
//
//     fetch("https://ajax.test-danit.com/api/v2/cards", {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         },
//     })
//         .then(response => response.json())
//         .then(data => data.forEach(el => {
//
//             el.doctor === "Стоматолог" && el.description === "Low" ? new VisitDentist().render.call(el) : false
//             el.doctor === "Кардіолог" && el.description === "Low" ? new VisitCardiologist().render.call(el) : false
//             el.doctor === "Терапевт" && el.description === "Low" ? new VisitTherapist().render.call(el) : false
//
//         }))
// })

