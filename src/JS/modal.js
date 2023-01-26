

const buttonIp = document.querySelector("#login-btn")

buttonIp.addEventListener("click",  () => {new Modal().user()})

class Modal {

    user(){
        const element = document.createElement('div')
        element.classList = "user"
        element.innerHTML = `
                <p>Login</p>
                <p id = "gogi">Password</p>
                `
        element.style.cssText = `background-color: #f2f2f2; border: 1px solid black; padding: 40px; text-align: center; margin: 10px 300px;`
        document.body.append(element)
    }

}