
import {Visit} from "./visit.js";

export class VisitDentist extends Visit {

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