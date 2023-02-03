import {Modal} from "./Modal.js";
import {Visit} from "./Visit.js";


let token = "ea883a2a-cfb9-4881-8548-380bd89f98a1"
const CARDS_API = "https://ajax.test-danit.com/api/v2/cards";


const lowButton = document.querySelector('#filterLow');
const visitsCard = document.querySelector('#visitsCard');
const dashboardCards = document.querySelector('#dashboardCards');
const emptyVisit = document.createElement('p');
emptyVisit.id = 'dashboardText';
emptyVisit.classList.add('pb-5', 'pt-5', 'display-6', 'text-secondary');
emptyVisit.innerHTML = 'Немає візитів';


const getAllCards = async () => {
    const response = await fetch(CARDS_API, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    });
    const data = await response.json();
    return data;
};

const allCards = await getAllCards();

const filterStatusButtons = document.querySelector('#filterStatusButtons');

filterStatusButtons.addEventListener('click', async (e) => {
    e.preventDefault();
    const filterOpenBtn = document.querySelector("#filterOpenBtn");
    const filterDoneBtn = document.querySelector("#filterDoneBtn");


    if (e.target.id === "filterOpenBtn" && e.target.tagName.toLowerCase() === "button") {

        filterDoneBtn.disabled = false;
        filterDoneBtn.classList.remove('btn-danger');
        filterDoneBtn.classList.add('btn-outline-danger');
        filterOpenBtn.classList.remove('btn-outline-danger');
        filterOpenBtn.classList.add('btn-danger');
        filterOpenBtn.disabled = true;

        visitsCard.innerHTML = '';

        allCards.forEach(el => {
            if (el.status === 'open') {
                el.doctor === "Стоматолог" ? new VisitDentist().render.call(el) : false
                el.doctor === "Кардіолог" ? new VisitCardiologist().render.call(el) : false
                el.doctor === "Терапевт" ? new VisitTherapist().render.call(el) : false

                visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');
            } else {
                dashboardCards.classList.add('bg-light');
                visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');
                visitsCard.innerHTML = '<p id="dashboardText" class="empty-text pb-5 pt-5 display-6 text-secondary">Немає візитів</p>';
            }
        })

    }
    if (e.target.id === "filterDoneBtn" && e.target.tagName.toLowerCase() === "button") {
        filterOpenBtn.disabled = false;
        filterOpenBtn.classList.remove('btn-danger');
        filterOpenBtn.classList.add('btn-outline-danger');
        filterDoneBtn.classList.remove('btn-outline-danger');
        filterDoneBtn.classList.add('btn-danger');
        filterDoneBtn.disabled = true;

        visitsCard.innerHTML = '';

        allCards.forEach(el => {
            if (el.status === 'done') {
                el.doctor === "Стоматолог" ? new VisitDentist().render.call(el) : false
                el.doctor === "Кардіолог" ? new VisitCardiologist().render.call(el) : false
                el.doctor === "Терапевт" ? new VisitTherapist().render.call(el) : false

                visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');
            } else {
                dashboardCards.classList.add('bg-light');
                visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');
                visitsCard.innerHTML = '<p id="dashboardText" class="empty-text pb-5 pt-5 display-6 text-secondary">Немає візитів</p>';
            }
        })
    }
})

// ---------------------------------------------------------------------
// Filter By Urgency
// ---------------------------------------------------------------------
const filterUrgencyButtons = document.querySelector('#filterUrgencyButtons');

filterUrgencyButtons.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === "filterHigh" && e.target.tagName.toLowerCase() === "button") {

        filterNormal.disabled = false;
        filterNormal.classList.remove('btn-danger');
        filterNormal.classList.add('btn-outline-danger');

        filterLow.disabled = false;
        filterLow.classList.remove('btn-danger');
        filterLow.classList.add('btn-outline-danger');

        filterHigh.classList.remove('btn-outline-danger');
        filterHigh.classList.add('btn-danger');
        filterHigh.disabled = true;

        visitsCard.innerHTML = '';
        dashboardCards.classList.add('bg-light');
        visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');


        allCards.forEach(el => {

            if (el.description.toLowerCase() === 'high') {
                emptyVisit.innerHTML = '';
                emptyVisit.remove();
                el.doctor === "Стоматолог" ? new VisitDentist().render.call(el) : false
                el.doctor === "Кардіолог" ? new VisitCardiologist().render.call(el) : false
                el.doctor === "Терапевт" ? new VisitTherapist().render.call(el) : false
                visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');

            } else {
                visitsCard.append(emptyVisit);
            }
        })
    }

    if (e.target.id === "filterNormal" && e.target.tagName.toLowerCase() === "button") {

        filterHigh.disabled = false;
        filterHigh.classList.remove('btn-danger');
        filterHigh.classList.add('btn-outline-danger');

        filterLow.disabled = false;
        filterLow.classList.remove('btn-danger');
        filterLow.classList.add('btn-outline-danger');

        filterNormal.classList.remove('btn-outline-danger');
        filterNormal.classList.add('btn-danger');
        filterNormal.disabled = true;

        visitsCard.innerHTML = '';
        dashboardCards.classList.add('bg-light');
        visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');


        allCards.forEach(el => {

            if (el.description.toLowerCase() === 'normal') {
                emptyVisit.innerHTML = '';
                emptyVisit.remove();
                el.doctor === "Стоматолог" ? new VisitDentist().render.call(el) : false
                el.doctor === "Кардіолог" ? new VisitCardiologist().render.call(el) : false
                el.doctor === "Терапевт" ? new VisitTherapist().render.call(el) : false
                visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');

            } else {
                visitsCard.append(emptyVisit);
            }
        })
    }

    if (e.target.id === "filterLow" && e.target.tagName.toLowerCase() === "button") {

        filterHigh.disabled = false;
        filterHigh.classList.remove('btn-danger');
        filterHigh.classList.add('btn-outline-danger');

        filterNormal.disabled = false;
        filterNormal.classList.remove('btn-danger');
        filterNormal.classList.add('btn-outline-danger');

        filterLow.classList.remove('btn-outline-danger');
        filterLow.classList.add('btn-danger');
        filterLow.disabled = true;

        visitsCard.innerHTML = '';
        dashboardCards.classList.add('bg-light');
        visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');


        allCards.forEach(el => {

            if (el.description.toLowerCase() === 'low') {
                emptyVisit.innerHTML = '';
                emptyVisit.remove();
                el.doctor === "Стоматолог" ? new VisitDentist().render.call(el) : false
                el.doctor === "Кардіолог" ? new VisitCardiologist().render.call(el) : false
                el.doctor === "Терапевт" ? new VisitTherapist().render.call(el) : false
                visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');

            } else {
                visitsCard.append(emptyVisit);
            }
        })
    }
})