import {Visit} from "./Visit.js";



export class Modal {
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
               <label for="basic-url" class="form-label text-uppercase text-dark"><h2 id="loginTitle">Вхід</h2>
               </label>
               <form action="" class="form" id="add-from">
               <div class="input-group mb-2">
               <span class="input-group-text"  id="basic-addon-one">@</span>
               <input name="email" data-required="true" data-max-lenght="50" data-min-lenght="2"type="text" class="form-control" id="basic-url-one" aria-describedby="basic-addon3"
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
               <input name="password" data-required="true" data-max-lenght="50" data-min-lenght="2"  class="form-control pass" id="basic-url" aria-describedby="basic-addon3"
               type="password" placeholder="enter your password">
               </div>
               <div class="buttons-block d-flex justify-content-center align-items-center">
               <button type="button" class="btn btn-secondary me-2" id="button-close" style="width: 100px">Закрити</button>
               <button type="submit" class="btn btn-danger" id="submit-btn" style="width: 100px">Увійти</button>
               </form>
               </div>
               </div>`

        element.style.cssText = 'max-width: 400px; margin: 0 auto; position: relative; top: 50%; transform: translateY(-50%); background-color: white; padding: 30px; border-radius: 15px;';
        blur.append(element)

        document.querySelector('#button-close').addEventListener('click', () => {
            blur.remove()
        })

        function validation(form) {

            function createError (input,text) {
                const parent = input.parentNode
                const errorLabel = document.createElement('label')
                errorLabel.classList.add('error-label')
                errorLabel.textContent = text;
                parent.classList.add('error')
                errorLabel.style.cssText = 'color: #800000; font-weight: bold; margin: 10px 0 5px 11px;';
                parent.append(errorLabel)
            }

            function removeError(input) {
                const parent = input.parentNode;
                if (parent.classList.contains('error')) {
                    parent.querySelector('label').remove()
                    parent.classList.remove('error')
                }
            }

            let result = true;
            const allInput = form.querySelectorAll('input')
            for (const input of allInput) {
                removeError(input)

                if(input.dataset.minLenght) {
                    if(input.value.length < input.dataset.minLenght) {
                        removeError(input)
                        createError(input,`Мінімальна кількість символів: ${input.dataset.minLenght}!`)
                        result = false;
                    }
                }

                if(input.dataset.maxLenght) {
                    if(input.value.length > input.dataset.maxLenght) {
                        removeError(input)
                        createError(input,`Максимальная кількість символів: ${input.dataset.maxLenght}!`)
                        result = false;
                    }
                }

                if(input.dataset.required == 'true') {
                    if(input.value == '') {
                        removeError(input)
                        createError(input,'Всі поля повинні бути заповненими!')
                        result = false;
                    }
                }
            }
            return result
        }


        document.querySelector('.form').addEventListener('submit', function (event) {
            event.preventDefault()
            if (localStorage.getItem('token')) {
                blur.remove()

            }
            if (validation(this) == true) {

                async function getToken() {
                    let userLogin = document.querySelector('input[name="email"]').value;
                    let userPassword = document.querySelector('input[name="password"]').value;
                    fetch("https://ajax.test-danit.com/api/v2/cards/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: userLogin, password: userPassword })
                    })
                        .then(response => response.text())
                        .then(data => {
                            if (data === "Incorrect username or password") {
                                document.body.querySelector("#warning") ? document.body.querySelector("#warning").remove() : false
                                const warning = document.createElement('div')
                                const loginTitle = document.body.querySelector('#loginTitle')
                                warning.id = "warning"

                                warning.innerHTML = `
                            <div>
                                <h5 style="color: #800000; font-weight: bold; font-size: 18px;">Помилка в логіні чи паролі</h5>
                            </div>
                             `
                                loginTitle.after(warning)
                            } else {
                                localStorage.setItem('token', data)
                                localStorage.setItem('user', userLogin)
                                new Modal().authorization ()
                                blur.remove()
                            }
                        })
                }
                new Modal(getToken())
            }

        })

    }
    authorization () {
        document.querySelector('#greetings-text').remove()
        document.querySelector('#login-btn').remove()

        const element = document.createElement('div')
        const header = document.body.querySelector('#headerButton')

        const text = document.createElement('p')
        const logo = document.querySelector('.logo')
        text.style.cssText = 'color: black; margin: 15px 0 0 0;'
        text.innerHTML = ` <p class="text">Вітаємо <strong>${localStorage.getItem('user')}</strong>!</p> `
        logo.after(text)

        element.innerHTML = `
            <button id="add-visit-btn" class="btn btn-outline-danger me-2" type="button">Новий візит</button>
            <button id="logout-btn" class="btn btn-danger" type="button">Вийти</button>
        `
        header.append(element)

        new Visit().listAllCards()

        element.querySelector('#add-visit-btn').addEventListener('click',  () => {  new Visit().createVisit() })
        element.querySelector('#logout-btn').addEventListener('click',  async () => {

            await localStorage.clear()
            element.remove()
            text.remove()

            const logoText = document.createElement('p')
            logoText.style.cssText = 'color: black; margin: 15px 0 0 0;'
            logoText.id = "greetings-text"
            logoText.innerHTML =
                ` <p class="creationText">Вітаємо, зайдіть в систему щоб побачити візити !</p>`
            logo.after(logoText)

            element.innerHTML =
                ` <button id="login-btn" class="btn btn-danger" type="button">Увійти</button> `
            header.append(element)

            new Visit().emptyVisits()

            document.body.querySelector('#login-btn').addEventListener('click',  () => {
                new Modal().user()
            })
        })
    }
}

