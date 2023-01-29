
import {Modal} from "./modal.js";

const buttonVisit = document.querySelector('#add-visit-btn');

buttonVisit.addEventListener('click',  () => {  new Visit().createVisit() })

class Visit {

    createVisit () {
        new Modal().blurEffect()
        const element = document.createElement('div')
        const blur = document.body.querySelector('#idBlur')
        element.id = 'idUser';

        element.innerHTML = `
            <div class="new-visit-popup text-center">
                <label for="basic-url" class="form-label text-uppercase text-dark">
                    <h2>Новий візит</h2>
                </label>
                <form name="visit">

                    <div class="row mb-3">
                        <label for="inputDoctor" class="col-sm-2 col-form-label">Лікар</label>
                        <div class="col-sm-10">
                            <select class="form-select" id="inputDoctor" aria-label="Default select example">
                                <option selected>Оберіть лікаря</option>
                                <option value="1">Кардіолог</option>
                                <option value="2">Стоматолог</option>
                                <option value="3">Терапевт</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputName" class="col-sm-2 col-form-label">ПІБ</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputName"
                                   placeholder="Прізвище Ім'я По батькові">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputPurpose" class="col-sm-2 col-form-label">Ціль візита</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPurpose"
                                   placeholder="Введіть ціль свого візиту">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputNotes" class="col-sm-2 col-form-label">Короткі замітки</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" name="inputNotes" id="inputNotes" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputUrgency" class="col-sm-2 col-form-label">Терміновість візита</label>
                        <div class="col-sm-10">
                            <select class="form-select" id="inputUrgency" aria-label="Default select example">
                                <option selected>Оберіть терміновість</option>
                                <option value="1">Low</option>
                                <option value="2">Normal</option>
                                <option value="3">High</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputAge" class="col-sm-2 col-form-label">Вік</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputAge"
                                   placeholder="Введіть свій вік">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputPressure" class="col-sm-2 col-form-label">Звичайний тиск</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPressure"
                                   placeholder="Введіть свій тиск">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputMasses" class="col-sm-2 col-form-label">Індекс маси тіла</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputMasses"
                                   placeholder="Введіть свій ІМТ">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputDiseases" class="col-sm-2 col-form-label">Змінні захворювання серцево-судинної
                            системи</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputDiseases"
                                   placeholder="Введіть змінні захворювання серцево-судинної системи">
                        </div>
                    </div>


                    <div class="buttons-block d-flex justify-content-center align-items-center">
                        <button id="visitClose" type="button" class="btn btn-secondary me-2" style="width: 100px">Закрити</button>
                        <button type="submit" class="btn btn-danger" style="width: 100px">Готово</button>
                    </div>
                </form>
            </div>
        `

        element.style.cssText = 'max-width: 1300px; margin: 0 auto; position: relative; top: 50%; transform: translateY(-50%); background-color: white; padding: 30px; border-radius: 15px;';
        blur.append(element)

        document.querySelector("#visitClose").addEventListener("click", () => blur.remove())


        // console.log(document.forms.visit)
        const userVisit = document.forms.visit

        userVisit.addEventListener('submit', function (ev) {
            ev.preventDefault();

            console.log(userVisit.inputNotes.value)


        })

    }
}

// const userVisit = document.forms.visit

// console.log(createVisit)

// createVisit.addEventListener('submit', function (ev) {
//
//     console.log(ev)
//
//     ev.preventDefault();
// })



// class VisitDentist extends Visit {
//
// }
// class VisitCardiologist extends Visit {
//
// }
// class VisitTherapist extends Visit {
//
// }