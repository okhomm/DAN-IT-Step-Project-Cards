
import {Modal} from "./modal.js";


const buttonVisit = document.querySelector('#add-visit-btn');

buttonVisit.addEventListener('click',  () => {  new Visit().createVisit() })

export class Visit {

    createVisit () {
        new Modal().blurEffect()
        const element = document.createElement('div')
        const blur = document.body.querySelector('#idBlur')
        element.id = 'userVisit';

        element.innerHTML = `
            <div class="new-visit-popup text-center">
                <label for="basic-url" class="form-label text-uppercase text-dark">
                    <h2>Новий візит</h2>
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
                        <button type="submit" class="btn btn-danger" style="width: 100px">Готово</button>
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

            console.log(userValue());

            // console.log(userVisit.inputDiseases.value)

            // blur.remove()
        })

         function userValue () {
            return {
                doctor: inputDoctor.value,
                pib: inputName.value,
               purpose: inputPurpose.value,
                notes: inputNotes.value,
                description: inputUrgency.value,
            }
        }
    }
}











////////////////////////////////////     ПОТОМ ПЕРЕНЕСУ В ОБЩИЙ    //////////////////////////////////////////////////

class VisitDentist extends Visit {

    dentist () {
        const dentistElement = document.createElement('div')
        const element = document.body.querySelector('#lastElem')

        dentistElement.id = "dentistItem"

        dentistElement.innerHTML = `
          <div class="row mb-3">
             <label for="inputMasses" class="col-sm-2 col-form-label">Дата останнього відвідування</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="inputMasses" id="inputMasses" placeholder="Введіть дату відвідування">
              </div>
          </div>
          `

        element.after(dentistElement)
    }

}
class VisitCardiologist extends Visit {

    cardiologist () {
        const cardiologistElement = document.createElement('div')
        const element = document.body.querySelector('#lastElem')

        cardiologistElement.id = "cardiologistItem"

        cardiologistElement.innerHTML = `
           <div class="row mb-3">
                <label for="inputPressure" class="col-sm-2 col-form-label">Звичайний тиск</label>
                    <div class="col-sm-10">
                       <input type="password" class="form-control" name="inputPressure" id="inputPressure" placeholder="Введіть свій тиск">
                    </div>
           </div>

           <div class="row mb-3">
                <label for="inputMasses" class="col-sm-2 col-form-label">Індекс маси тіла</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" name="inputMasses" id="inputMasses" placeholder="Введіть свій ІМТ">
                        </div>
           </div>

           <div class="row mb-3">
                <label for="inputDiseases" class="col-sm-2 col-form-label">Захворювання</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" name="inputDiseases" id="inputDiseases" placeholder="Введіть перенесені захворювання серцево-судинної системи">
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

}
class VisitTherapist extends Visit {

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

}