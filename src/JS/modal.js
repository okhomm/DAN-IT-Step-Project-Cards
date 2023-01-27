const buttonIp = document.querySelector('#login-btn');

buttonIp.addEventListener('click',  () => { new Modal().user() })

class Modal {
    blurEffect () {
        const elementBlur = document.createElement('div')
        elementBlur.id = 'idBlur';
        elementBlur.style.cssText = 'background-color: rgba(0, 0, 0, .3); position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999; backdrop-filter: blur(1px);'
        document.body.append(elementBlur)

        elementBlur.addEventListener('click', function (event) {
            event.target.id == 'idBlur' ? elementBlur.remove() : false
        })

        document.addEventListener('keydown', function (event) {
            event.code == 'Escape' ? elementBlur.remove() : false
        })
    }


    user() {
        this.blurEffect()
        const element = document.createElement('div')
        const blur = document.body.querySelector('#idBlur')
        element.id = 'idUser';
        element.innerHTML = `
                <div class="login-popup text-center container-md">
                    <label for="basic-url" class="form-label text-uppercase text-dark"><h2>Вхід</h2></label>
                    <div class="input-group mb-2">
                    <span class="input-group-text" id="basic-addon-one">@</span>
                    <input type="text" class="form-control" id="basic-url-one" aria-describedby="basic-addon3"
                    placeholder="example@mail.com">
                    </div>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon-two">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-key" viewBox="0 0 16 16">
                    <path
                    d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    </span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"
                     placeholder="enter your password">
                    </div>
                    <div class="buttons-block d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-secondary me-2" id="button-close" style="width: 100px">Закрити</button>
                    <button type="button" class="btn btn-danger" style="width: 100px">Увійти</button>
                    </div>
                </div>
                  `
        element.style.cssText = 'max-width: 400px; margin: 0 auto; position: relative; top: 50%; transform: translateY(-50%); background-color: white; padding: 30px; border-radius: 15px;';
        blur.append(element)
        document.querySelector('#button-close').addEventListener('click', () => {
            element.remove()
            blur.remove()
        })
    }

}