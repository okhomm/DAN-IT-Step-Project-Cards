
import {Visit} from "./visit.js";

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

}