window.addEventListener("load", ()=>{
  const modal = document.querySelector("#userForm");
  const userButton = document.querySelector("#userButton");
  // Get the <span> element that closes the modal
  const modalClose = document.querySelector("span");
  const logInButton = document.querySelector("#logIn")

  // When the user clicks on the button, open the modal
  userButton.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  modalClose.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }
  logInButton.addEventListener("click", (event)=>{
    event.preventDefault()
    let logInInfo = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(logInInfo)
    }

    fetch("http://localhost:3000/login", configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      console.log(object)
    })

  }, false)

})
