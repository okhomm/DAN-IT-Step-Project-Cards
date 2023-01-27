
import {Modal} from "./modal.js";

const buttonVisit = document.querySelector('#add-visit-btn');

buttonVisit.addEventListener('click',  () => {  new Visit().createVisit() })

class Visit {

    createVisit () {
        new Modal().blurEffect()
        const element = document.createElement('div')
        const blur = document.body.querySelector('#idBlur')
        element.id = 'idUser';

        element.innerHTML = ``

        blur.append(element)

    }


}

// class VisitDentist extends Visit {
//
// }
// class VisitCardiologist extends Visit {
//
// }
// class VisitTherapist extends Visit {
//
// }