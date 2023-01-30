
import {Visit} from "./visit.js";

export class VisitCardiologist extends Visit {

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