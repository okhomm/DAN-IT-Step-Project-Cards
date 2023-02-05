
import {Modal} from "./Modal.js";


export class Visit {

    createVisit () {
        new Modal().blurEffect()
        const element = document.createElement('div')
        const blur = document.body.querySelector('#idBlur')
        element.id = 'userVisit';

        element.innerHTML = `
            <div class="new-visit-popup text-center">
                <label for="basic-url" class="form-label text-uppercase text-dark">
                    <h2 id="newVisit">Новий візит</h2>
                </label>  
                <form name="visit">

                    <div class="row mb-3">
                        <label for="inputDoctor" class="col-sm-2 col-form-label">Лікар</label>
                        <div class="col-sm-10">
                            <select class="form-select" name="inputDoctor" id="inputDoctor" aria-label="Default select example">
                                <option selected>Оберіть лікаря</option>
                                <option value="Cardiologist">Кардіолог</option>
                                <option value="Dentist">Стоматолог</option>
                                <option value="Therapist">Терапевт</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputName" class="col-sm-2 col-form-label">ПІБ</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputName" id="inputName" placeholder="Прізвище Ім'я По батькові">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputPurpose" class="col-sm-2 col-form-label">Ціль візита</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputPurpose" id="inputPurpose" placeholder="Введіть ціль свого візиту">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputNotes" class="col-sm-2 col-form-label">Короткі замітки</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" name="inputNotes" id="inputNotes" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="row mb-3" id="lastElem">
                        <label for="inputUrgency" class="col-sm-2 col-form-label">Терміновість візита</label>
                        <div class="col-sm-10">
                            <select class="form-select" name="inputUrgency" id="inputUrgency" aria-label="Default select example">
                                <option selected>Оберіть терміновість</option>
                                <option value="Low">Звичайна</option>
                                <option value="Normal">Пріоритетна</option>
                                <option value="High">Невідкладна</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="buttons-block d-flex justify-content-center align-items-center">
                        <button id="visitClose" type="button" class="btn btn-secondary me-2" style="width: 100px">Закрити</button>
                        <button id="visitReady" type="submit" class="btn btn-danger" style="width: 100px">Готово</button>
                    </div>
                </form>
            </div>
        `

        element.style.cssText = 'max-width: 900px; margin: 0 auto; position: relative; top: 50%; transform: translateY(-50%); background-color: white; padding: 30px; border-radius: 15px;';
        blur.append(element)

        document.querySelector("#visitClose").addEventListener("click", () => blur.remove())

        const userVisit = document.forms.visit

        userVisit.inputDoctor.addEventListener("change", (ev) => {
            ev.target.value === "Dentist" ? new VisitDentist().dentist() : document.querySelector('#dentistItem') ? document.querySelector('#dentistItem').remove() : false
            ev.target.value === "Cardiologist" ? new VisitCardiologist().cardiologist() : document.querySelector('#cardiologistItem') ? document.querySelector('#cardiologistItem').remove() : false
            ev.target.value === "Therapist" ? new VisitTherapist().therapist() : document.querySelector('#therapistItem') ? document.querySelector('#therapistItem').remove() : false
        })





        userVisit.addEventListener('submit', function (ev) {
            ev.preventDefault();

            new Visit().clear()

            const warning = document.createElement('div')
            const firstItem = document.body.querySelector('#newVisit')
            warning.id = "warning"

            warning.innerHTML = `
          <div>
             <h4 style="color: red">Усі поля мають бути заповнені</h4>
          </div>
          `


            let fields
            document.forms.visit.querySelectorAll("input").forEach(el => el.value === "" ? fields = false : fields = true)

            document.body.querySelector("#warning") ? document.body.querySelector("#warning").remove() : false

            if (inputDoctor.selectedIndex === 0 ||
                inputUrgency.selectedIndex === 0 ||
                inputNotes.value === "" || fields === false) {

                firstItem.after(warning)
            } else {
                userVisit.inputDoctor.value === "Dentist" ? new VisitDentist().render() : false
                userVisit.inputDoctor.value === "Cardiologist" ? new VisitCardiologist().render() : false
                userVisit.inputDoctor.value === "Therapist" ? new VisitTherapist().render() : false
                blur.remove()
            }
        })


    }

    listAllCards () {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (localStorage.getItem("token")) {
                    data.forEach(el => {
                        new Visit().clear()
                        el.doctor === "Стоматолог" ? new Visit().createCard.call(el) : false
                        el.doctor === "Кардіолог" ? new Visit().createCard.call(el) : false
                        el.doctor === "Терапевт" ? new Visit().createCard.call(el) : false
                    })
                }
            })
    }

    clear () {
        const dashboardCards = document.body.querySelector('#dashboardCards')
        dashboardCards.classList = "cards-dashboard rounded mt-4 p-3 h-100 w-100"

        const visitsCard = document.body.querySelector('#visitsCard')
        visitsCard.classList = "row row-cols-1 row-cols-md-3 g-4"

        const dashboardText = document.body.querySelector('#dashboardText')
        dashboardText ? dashboardText.remove() : false
    }
    emptyVisits () {
        const dashboardCards = document.body.querySelector('#dashboardCards')
        dashboardCards.classList = "cards-dashboard rounded mt-4 p-3 h-100 w-100 bg-light"

        const visitsCard = document.body.querySelector('#visitsCard')
        visitsCard.classList = "row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center text-center"
        visitsCard.replaceChildren()

        const warning = document.createElement('p')
        warning.id = "dashboardText"
        warning.classList = "empty-text pb-5 pt-5 display-6 text-secondary"

        warning.innerText = "Немає візитів"

        visitsCard.append(warning)
    }

    cardsOver () {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    this.emptyVisits()
                }


            })


    }

    createCard (obj) {
        const doctorCard = document.createElement('div')
        const element = document.body.querySelector('#visitsCard')
        doctorCard.classList = "col"

        doctorCard.id = this.id

        let color = ""

        this.description === "High" ? color = "danger" : this.description === "Low" ? color = "primary" : color = "warning"

        doctorCard.innerHTML = `
                    <div class="card border-${color} mb-3 h-100">
                        <div class="card-header bg-${color} border-${color}"></div>
                        <div class="card-body text-dark">

                            <div class="doctor-block d-flex align-items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     class="bi bi-heart-pulse-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9H1.475Z"/>
                                    <path
                                        d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.88Z"/>
                                </svg>
                                <h4 id="docName" class="doc-name ms-2">${this.doctor}</h4></p>
                            </div>

                            <div class="patient-block d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-person-vcard" viewBox="0 0 16 16">
                                    <path
                                        d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                                    <path
                                        d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
                                </svg>
                                <span id="userName" class="patient-name ms-1" style="overflow: auto">${this.name}</span>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent d-flex justify-content-around align-items-center">
                            <button id="buttonView" type="button" class="btn btn-outline-secondary" style="width: 125px">Переглянути
                            </button>
                            <button id="buttonEdit" type="button" class="btn btn-outline-secondary" style="width: 125px">Редагувати
                            </button>
                            <button id="buttonDelete" type="button" class="btn btn-outline-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path
                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
        `

        element.append(doctorCard)



        doctorCard.querySelector("#buttonDelete").addEventListener('click',  async () => {
            await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then(response => response.text())
                .then(data => {
                    data === "" ? doctorCard.remove() : false
                    new Visit().cardsOver ()
                })
        })

        doctorCard.querySelector("#buttonView").addEventListener('click',  async () => {
            await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then(response => response.json())
                .then(data => new Visit().createView.call(data))
        })



        doctorCard.querySelector("#buttonEdit").addEventListener('click',  async () => {
            await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then(response => response.json())
                .then(data => new Visit().createEdit.call(data))

        })



    }
    createView (obj) {
        new Modal().blurEffect()
        const element = document.createElement('div')
        const blur = document.body.querySelector('#idBlur')

        element.innerHTML = `
             <div class="visit-info-popup">
        <div class="popup-title text-center pt-4">
          <h2 class="text-uppercase text-dark">Інфорамція візита</h2>
        </div>
          <div class="visit-info-table">

            <table class="table table-hover">

              <tbody>
              <tr>
                <td class="fw-bold">Лікар</td>
                <td>${this.doctor}</td>
              </tr>
              <tr>
                <td class="fw-bold">ПІБ пацієнта</td>
                <td>${this.name}</td>
              </tr>
              <tr>
                <td class="fw-bold">Ціль візита</td>
                <td>${this.purpose}</td>
              </tr>
              <tr>
                <td class="fw-bold">Короткі замітки</td>
                <td>${this.notes}</td>
              </tr>
              <tr>
                <td class="fw-bold">Терміновість візита</td>
                <td>${this.description}</td>
              </tr>
              <tr>
                <td class="fw-bold">Вік</td>
                <td>${this.age}</td>
              </tr>
              <tr>
                <td class="fw-bold">Дата останнього відвідування</td>
                <td>${this.date}</td>
              </tr>
              <tr>
                <td class="fw-bold">Звичайний тиск</td>
                <td>${this.pressure}</td>
              </tr>
              <tr>
                <td class="fw-bold">Індекс маси тіла</td>
                <td>${this.masses}</td>
              </tr>
              <tr>
                <td class="fw-bold">Захворювання</td>
                <td>${this.diseases}</td>
              </tr>
              <tr>
                <td class="fw-bold">Статус візиту</td>
                <td>${this.status}</td>
              </tr>

              </tbody>
            </table>

            <div class="buttons-block d-flex justify-content-center align-items-center pb-4 mt-4">
              <button id="buttonClose" type="button" class="btn btn-secondary me-2" style="width: 100px">Закрити</button>
            </div>
        `

        element.querySelector("#buttonClose").addEventListener("click", () => {blur.remove()})

        element.querySelectorAll('td').forEach(el => el.textContent === "undefined" ? el.parentElement.remove() : false)

        element.style.cssText = 'max-width: 600px; margin: 0 auto; position: relative; top: 50%; transform: translateY(-50%); background-color: white; padding: 30px; border-radius: 15px;';
        blur.append(element)
    }


    async createEdit (obj) {
        new Modal().blurEffect()
        const element = document.createElement('div')
        const blur = document.body.querySelector('#idBlur')


        element.innerHTML = `
            <div class="new-visit-popup text-center">
                <label for="basic-url" class="form-label text-uppercase text-dark">
                    <h2 id="editVisit">Редагувати візит</h2>
                </label>  
                <form name="edit">

                    <div class="row mb-3">
                        <label for="inputDoctor" class="col-sm-2 col-form-label">Лікар</label>
                        <div class="col-sm-10">
                            <select class="form-select" name="inputDoctor" id="inputDoctor" aria-label="Default select example">
                                <option selected>Оберіть лікаря</option>
                                <option value="Cardiologist">Кардіолог</option>
                                <option value="Dentist">Стоматолог</option>
                                <option value="Therapist">Терапевт</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputName" class="col-sm-2 col-form-label">ПІБ</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputName" id="inputName" placeholder="Прізвище Ім'я По батькові" value="${this.name}">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputPurpose" class="col-sm-2 col-form-label">Ціль візита</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputPurpose" id="inputPurpose" placeholder="Введіть ціль свого візиту" value="${this.purpose}">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputNotes" class="col-sm-2 col-form-label">Короткі замітки</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" name="inputNotes" id="inputNotes" rows="3"">${this.notes}</textarea>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="inputStatus" class="col-sm-2 col-form-label">Статус візита</label>
                        <div class="col-sm-10">
                            <select class="form-select" name="inputStatus" id="inputStatus" aria-label="Default select example">
                                <option selected value="open">Open</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3" id="lastElem">
                        <label for="inputUrgency" class="col-sm-2 col-form-label">Терміновість візита</label>
                        <div class="col-sm-10">
                            <select class="form-select" name="inputUrgency" id="inputUrgency" aria-label="Default select example">
                                <option selected>Оберіть терміновість</option>
                                <option value="Low">Звичайна</option>
                                <option value="Normal">Пріоритетна</option>
                                <option value="High">Невідкладна</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="buttons-block d-flex justify-content-center align-items-center">
                     <button id="buttonDel" type="button" class="btn btn-secondary me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-trash3" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                        </button>
                        <button id="visitClose" type="button" class="btn btn-secondary me-2" style="width: 100px">Закрити</button>
                        <button id="visitReady" type="submit" class="btn btn-danger" style="width: 100px">Готово</button>
                    </div>
                </form>
            </div>
        `

        element.style.cssText = 'max-width: 900px; margin: 0 auto; position: relative; top: 50%; transform: translateY(-50%); background-color: white; padding: 30px; border-radius: 15px;';
        blur.append(element)


        document.querySelector("#visitClose").addEventListener("click", () => blur.remove())
        document.querySelector("#buttonDel").addEventListener('click',  async () => {
            await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then(response => response.text())
                .then(data => {
                    if (data === "") {
                        document.getElementById(`${this.id}`).remove()
                        blur.remove()
                    }
                    new Visit().cardsOver ()
                })
        })

        const userEdit = document.forms.edit



        this.doctor === "Терапевт" ? userEdit.inputDoctor.selectedIndex = 3 : false
        this.doctor === "Стоматолог" ? userEdit.inputDoctor.selectedIndex = 2 : false
        this.doctor === "Кардіолог" ? userEdit.inputDoctor.selectedIndex = 1 : false


        this.description === "Low" ? userEdit.inputUrgency.selectedIndex = 1 : false
        this.description === "Normal" ? userEdit.inputUrgency.selectedIndex = 2 : false
        this.description === "High" ? userEdit.inputUrgency.selectedIndex = 3 : false

        this.status === "open" ? userEdit.inputStatus.selectedIndex = 0 : userEdit.inputStatus.selectedIndex = 1


        const lastElem = document.body.querySelector('#lastElem')

        const dentistElement = document.createElement('div')
        dentistElement.innerHTML = `
          <div class="row mb-3">
             <label for="inputDate" class="col-sm-2 col-form-label">Дата останнього відвідування</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="inputDate" id="inputDate" placeholder="Введіть дату відвідування" value="${this.date}">
              </div>
          </div>
          `
        dentistElement.id = "dentistItem"
        this.doctor === "Стоматолог" ? lastElem.after(dentistElement) : false

        const cardiologistElement = document.createElement('div')
        cardiologistElement.innerHTML = `
           <div class="row mb-3">
                <label for="inputPressure" class="col-sm-2 col-form-label">Звичайний тиск</label>
                    <div class="col-sm-10">
                       <input type="text" class="form-control" name="inputPressure" id="inputPressure" placeholder="Введіть свій тиск" value="${this.pressure}">
                    </div>
           </div>

           <div class="row mb-3">
                <label for="inputMasses" class="col-sm-2 col-form-label">Індекс маси тіла</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputMasses" id="inputMasses" placeholder="Введіть свій ІМТ" value="${this.masses}">
                        </div>
           </div>

           <div class="row mb-3">
                <label for="inputDiseases" class="col-sm-2 col-form-label">Захворювання</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputDiseases" id="inputDiseases" placeholder="Введіть перенесені захворювання серцево-судинної системи" value="${this.diseases}">
                        </div>
           </div>
           <div class="row mb-3">
                <label for="inputAge" class="col-sm-2 col-form-label">Вік</label>
                         <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputAge" id="inputAge" placeholder="Введіть свій вік" value="${this.age}">
                         </div>
          </div>
          `
        cardiologistElement.id = "cardiologistItem"
        this.doctor === "Кардіолог" ? lastElem.after(cardiologistElement) : false

        const therapistElement = document.createElement('div')
        therapistElement.innerHTML = `
          <div class="row mb-3">
             <label for="inputAge" class="col-sm-2 col-form-label">Вік</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="inputAge" id="inputAge" placeholder="Введіть свій вік" value="${this.age}">
              </div>
          </div>
          `
        therapistElement.id = "therapistItem"
        this.doctor === "Терапевт" ? lastElem.after(therapistElement) : false

        userEdit.inputDoctor.addEventListener("change", (ev) => {
            ev.target.value === "Dentist" ? new VisitDentist().dentist() : document.querySelector('#dentistItem') ? document.querySelector('#dentistItem').remove() : false
            ev.target.value === "Cardiologist" ? new VisitCardiologist().cardiologist() : document.querySelector('#cardiologistItem') ? document.querySelector('#cardiologistItem').remove() : false
            ev.target.value === "Therapist" ? new VisitTherapist().therapist() : document.querySelector('#therapistItem') ? document.querySelector('#therapistItem').remove() : false
        })



        document.querySelector("#visitReady").addEventListener("click", (ev) => {

            ev.preventDefault();

            let userValue = {}

            if (userEdit.inputDoctor.value === "Dentist") {
                userValue = {
                    doctor: inputDoctor.options[inputDoctor.selectedIndex].text,
                    name: inputName.value,
                    purpose: inputPurpose.value,
                    notes: inputNotes.value,
                    description: inputUrgency.value,
                    date: inputDate.value,
                    status: inputStatus.value,
                }
            } else if (userEdit.inputDoctor.value === "Cardiologist") {
                userValue = {
                    doctor: inputDoctor.options[inputDoctor.selectedIndex].text,
                    name: inputName.value,
                    purpose: inputPurpose.value,
                    notes: inputNotes.value,
                    description: inputUrgency.value,
                    pressure: inputPressure.value,
                    masses: inputMasses.value,
                    diseases: inputDiseases.value,
                    age: inputAge.value,
                    status: inputStatus.value,
                }
            } else if (userEdit.inputDoctor.value === "Therapist") {
                userValue = {
                    doctor: inputDoctor.options[inputDoctor.selectedIndex].text,
                    name: inputName.value,
                    purpose: inputPurpose.value,
                    notes: inputNotes.value,
                    description: inputUrgency.value,
                    age: inputAge.value,
                    status: inputStatus.value,
                }
            }

            const warning = document.createElement('div')
            const firstItem = document.body.querySelector('#editVisit')
            warning.id = "warning"

            warning.innerHTML = `
          <div>
             <h4 style="color: red">Усі поля мають бути заповнені</h4>
          </div>
          `


            let fields
            userEdit.querySelectorAll("input").forEach(el => el.value === "" ? fields = false : fields = true)



            document.body.querySelector("#warning") ? document.body.querySelector("#warning").remove() : false

            if (inputDoctor.selectedIndex === 0 ||
                inputUrgency.selectedIndex === 0 ||
                inputNotes.value === "" || fields === false) {

                firstItem.after(warning)
            } else {

                fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(userValue)
                })
                    .then(response => response.json())
                    .then(response => {
                        if (typeof response === "object") {
                            let color = ""
                            userEdit.inputUrgency.value === "High" ? color = "danger" : userEdit.inputUrgency.value === "Low" ? color = "primary" : color = "warning"
                            document.getElementById(`${this.id}`).querySelector("div").classList = `card border-${color} mb-3 h-100`
                            document.getElementById(`${this.id}`).querySelector("div").firstElementChild.classList = `card-header bg-${color} border-${color}`
                        }
                    })
                blur.remove()
            }
        })

    }
}









////////////////////////////////////     ПОТОМ ПЕРЕНЕСУ В ОБЩИЙ    //////////////////////////////////////////////////

export class VisitDentist extends Visit {

    dentist () {
        const dentistElement = document.createElement('div')
        const element = document.body.querySelector('#lastElem')

        dentistElement.id = "dentistItem"

        dentistElement.innerHTML = `
          <div class="row mb-3">
             <label for="inputDate" class="col-sm-2 col-form-label">Дата останнього відвідування</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="inputDate" id="inputDate" placeholder="Введіть дату відвідування">
              </div>
          </div>
          `

        element.after(dentistElement)
    }
    render () {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                doctor: inputDoctor.options[inputDoctor.selectedIndex].text,
                name: inputName.value,
                purpose: inputPurpose.value,
                notes: inputNotes.value,
                description: inputUrgency.value,
                date: inputDate.value,
                status: "open"
            })
        })
            .then(response => response.json())
            .then(response => new Visit().createCard.call(response))
    }

}

export class VisitCardiologist extends Visit {

    cardiologist () {
        const cardiologistElement = document.createElement('div')
        const element = document.body.querySelector('#lastElem')

        cardiologistElement.id = "cardiologistItem"

        cardiologistElement.innerHTML = `
           <div class="row mb-3">
                <label for="inputPressure" class="col-sm-2 col-form-label">Звичайний тиск</label>
                    <div class="col-sm-10">
                       <input type="text" class="form-control" name="inputPressure" id="inputPressure" placeholder="Введіть свій тиск">
                    </div>
           </div>

           <div class="row mb-3">
                <label for="inputMasses" class="col-sm-2 col-form-label">Індекс маси тіла</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputMasses" id="inputMasses" placeholder="Введіть свій ІМТ">
                        </div>
           </div>

           <div class="row mb-3">
                <label for="inputDiseases" class="col-sm-2 col-form-label">Захворювання</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputDiseases" id="inputDiseases" placeholder="Введіть перенесені захворювання серцево-судинної системи">
                        </div>
           </div>
           <div class="row mb-3">
                <label for="inputAge" class="col-sm-2 col-form-label">Вік</label>
                         <div class="col-sm-10">
                            <input type="text" class="form-control" name="inputAge" id="inputAge" placeholder="Введіть свій вік">
                         </div>
          </div>
          `

        element.after(cardiologistElement)
    }
    render () {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                doctor: inputDoctor.options[inputDoctor.selectedIndex].text,
                name: inputName.value,
                purpose: inputPurpose.value,
                notes: inputNotes.value,
                description: inputUrgency.value,
                pressure: inputPressure.value,
                masses: inputMasses.value,
                diseases: inputDiseases.value,
                age: inputAge.value,
                status: "open"
            })
        })
            .then(response => response.json())
            .then(response => new Visit().createCard.call(response))
    }


}
export class VisitTherapist extends Visit {

    therapist () {
        const therapistElement = document.createElement('div')
        const element = document.body.querySelector('#lastElem')

        therapistElement.id = "therapistItem"

        therapistElement.innerHTML = `
          <div class="row mb-3">
             <label for="inputAge" class="col-sm-2 col-form-label">Вік</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="inputAge" id="inputAge" placeholder="Введіть свій вік">
              </div>
          </div>
          `

        element.after(therapistElement)
    }
    render () {
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                doctor: inputDoctor.options[inputDoctor.selectedIndex].text,
                name: inputName.value,
                purpose: inputPurpose.value,
                notes: inputNotes.value,
                description: inputUrgency.value,
                age: inputAge.value,
                status: "open"
            })
        })
            .then(response => response.json())
            .then(response => new Visit().createCard.call(response))
    }

}

