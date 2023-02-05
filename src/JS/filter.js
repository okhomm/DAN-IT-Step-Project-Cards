

const filter = document.querySelector('#filter');

filter.addEventListener("click", (e) => {
    e.preventDefault();
    const form = e.target;

    setTimeout(() => {
        const cards = document.querySelectorAll('.col');
        const statusElem = document.querySelector("#filterStatusButtons");
        const searchPhrase = document.querySelector('#searchPhrase');

        // console.log(cards)
        for(const card of cards) {
            const cardPriority = card.querySelector('.Description').innerText.toLowerCase();
            const cardStatus = card.querySelector('.Status').innerText.toLowerCase();


            const cardDoctor = card.querySelector('#docName').innerText.toLowerCase();
            const cardPacientName = card.querySelector('#userName').innerText.toLowerCase();
            const cardTitle = card.querySelector('.Purpose').innerText.toLowerCase();
            const cardDescription = card.querySelector('.Notes').innerText.toLowerCase();

            if (
                (!cardStatus || cardStatus.includes(e.target.textContent.toLowerCase()) && e.target.tagName.toLowerCase() === "button") ||
                (!cardPriority || cardPriority.includes(e.target.textContent.toLowerCase()) && e.target.tagName.toLowerCase() === "button") ||
                (!cardDoctor || cardDoctor.includes(searchPhrase.value.toLowerCase()) && e.target.tagName.toLowerCase() === "button")
                // (!cardPacientName || cardPacientName.includes(searchPhrase.value.toLowerCase()) && e.target.tagName.toLowerCase() === "button") ||
                // (!cardTitle || cardTitle.includes(searchPhrase.value.toLowerCase()) && e.target.tagName.toLowerCase() === "button") ||
                // (!cardDescription || cardDescription.includes(searchPhrase.value.toLowerCase()) && e.target.tagName.toLowerCase() === "button")

            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
                // const allFilterButtons = filter.querySelector('button');
                // console.log(allFilterButtons)


            }


        }
    }, 300);


    // const inputElem = form.querySelector("#searchPhrase");
    // const title = inputElem.value;
    // console.log(inputElem.value)


    // const status = statusElem.innerHTML.toLowerCase();




    //
    // const priorityElem = form.querySelector("#filterUrgencyButtons");
    // const priority = priorityElem.value.toLowerCase();

    // console.log(title, status, priority);
    // showFilteredCards(title, status, priority);


});

filter.addEventListener("submit", (e) => {
    e.preventDefault();
});
filter.addEventListener("click", (e) => {
    e.preventDefault();
});

// showFiltredCards()