import {Modal} from "./Modal.js";
import {Visit, VisitDentist, VisitCardiologist, VisitTherapist} from "./Visit.js";

const CARDS_API = "https://ajax.test-danit.com/api/v2/cards";

const visitsCard = document.querySelector('#visitsCard');
const dashboardCards = document.querySelector('#dashboardCards');
const emptyVisit = document.createElement('p');
emptyVisit.id = 'dashboardText';
emptyVisit.classList.add('pb-5', 'pt-5', 'display-6', 'text-secondary');
emptyVisit.innerHTML = 'Немає візитів';


const getAllCards = async () => {
    const response = await fetch(CARDS_API, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
    });
    const data = await response.json();
    return data;
};

const allCards = await getAllCards();

const filterStatusButtonsStyle = (button1, button2) => {

    button1.disabled = false;
    button1.classList.remove('btn-danger');
    button1.classList.add('btn-outline-danger');

    button2.classList.remove('btn-outline-danger');
    button2.classList.add('btn-danger');
    button2.disabled = true;

    visitsCard.innerHTML = '';
    visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');
}

const filterUrgencyButtonsStyle = (button1, button2, button3) => {

    button1.disabled = false;
    button1.classList.remove('btn-danger');
    button1.classList.add('btn-outline-danger');

    button2.disabled = false;
    button2.classList.remove('btn-danger');
    button2.classList.add('btn-outline-danger');

    button3.classList.remove('btn-outline-danger');
    button3.classList.add('btn-danger');
    button3.disabled = true;

    visitsCard.innerHTML = '';
    visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');
}

const filtredStatusCardShow = (filterWord) => {
    allCards.forEach(el => {
        if (el.status === filterWord) {
            emptyVisit.innerHTML = '';
            emptyVisit.remove();
            el.doctor === "Стоматолог" ? new Visit().createCard.call(el) : false
            el.doctor === "Кардіолог" ? new Visit().createCard.call(el) : false
            el.doctor === "Терапевт" ? new Visit().createCard.call(el) : false

            visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');
        } else {
            visitsCard.append(emptyVisit);
        }
    })
};

const filtredUrgencyCardShow = (filterWord) => {
    allCards.forEach(el => {

        if (el.description.toLowerCase() === filterWord) {
            emptyVisit.innerHTML = '';
            emptyVisit.remove();
            el.doctor === "Стоматолог" ? new Visit().createCard.call(el) : false
            el.doctor === "Кардіолог" ? new Visit().createCard.call(el) : false
            el.doctor === "Терапевт" ? new Visit().createCard.call(el) : false
            visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');

        } else {
            visitsCard.append(emptyVisit);
        }
    })
}

const searchFilter = () => {
    visitsCard.innerHTML = '';
    visitsCard.classList.add('d-flex', 'justify-content-center', 'text-center');

    if (!searchPhrase.value) {
        searchPhrase.classList.add('border', 'border-danger', 'text-danger');
        searchPhrase.value = 'Помилка! Будь-ласка введіть фразу для пошуку';

        searchPhrase.addEventListener('click', () => {
            searchPhrase.value = '';
            searchPhrase.classList.remove('border', 'border-danger', 'text-danger');
        })
    }

    allCards.forEach(el => {
        if (el.purpose.trim().toLowerCase().match(searchPhrase.value.trim().toLowerCase()) ||
            el.name.trim().toLowerCase().match(searchPhrase.value.trim().toLowerCase()) ||
            el.doctor.trim().toLowerCase().match(searchPhrase.value.trim().toLowerCase()) ||
            el.notes.trim().toLowerCase().match(searchPhrase.value.trim().toLowerCase())) {
            emptyVisit.innerHTML = '';
            emptyVisit.remove();
            el.doctor === "Стоматолог" ? new Visit().createCard.call(el) : false
            el.doctor === "Кардіолог" ? new Visit().createCard.call(el) : false
            el.doctor === "Терапевт" ? new Visit().createCard.call(el) : false
            visitsCard.classList.remove('d-flex', 'justify-content-center', 'text-center');
        } else {
            visitsCard.append(emptyVisit);
        }
    })
}

// ---------------------------------------------------------------------
// Filter By Status
// ---------------------------------------------------------------------

const filterStatusButtons = document.querySelector('#filterStatusButtons');
filterStatusButtons.addEventListener('click', async (e) => {
    e.preventDefault();
    const filterOpenBtn = document.querySelector("#filterOpenBtn");
    const filterDoneBtn = document.querySelector("#filterDoneBtn");

    if (e.target.id === "filterOpenBtn" && e.target.tagName.toLowerCase() === "button") {
        filterStatusButtonsStyle(filterDoneBtn, filterOpenBtn);
        filtredStatusCardShow('open');
    }

    if (e.target.id === "filterDoneBtn" && e.target.tagName.toLowerCase() === "button") {
        filterStatusButtonsStyle(filterOpenBtn, filterDoneBtn);
        filtredStatusCardShow('done');
    }
})

// ---------------------------------------------------------------------
// Filter By Urgency
// ---------------------------------------------------------------------
const filterUrgencyButtons = document.querySelector('#filterUrgencyButtons');

filterUrgencyButtons.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === "filterHigh" && e.target.tagName.toLowerCase() === "button") {
        filterUrgencyButtonsStyle(filterNormal, filterLow, filterHigh);
        filtredUrgencyCardShow('high');
    }

    if (e.target.id === "filterNormal" && e.target.tagName.toLowerCase() === "button") {
        filterUrgencyButtonsStyle(filterHigh, filterLow, filterNormal);
        filtredUrgencyCardShow('normal');
    }

    if (e.target.id === "filterLow" && e.target.tagName.toLowerCase() === "button") {
        filterUrgencyButtonsStyle(filterHigh, filterNormal, filterLow);
        filtredUrgencyCardShow('low');
    }
})

// ---------------------------------------------------------------------
// Search Filter
// ---------------------------------------------------------------------

const filterSearchBtn = document.querySelector('#filterSearchBtn');
const searchPhrase = document.querySelector('#searchPhrase');
filterSearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchFilter();
});


