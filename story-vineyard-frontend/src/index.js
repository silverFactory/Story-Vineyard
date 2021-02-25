window.addEventListener("load", ()=>{
  const modal = document.querySelector("#userForm");
  const userButton = document.querySelector("#userButton");
  // Get the <span> element that closes the modal
  const modalClose = document.querySelector("span");
  const logInButton = document.querySelector("#logIn")
  const storiesContainer = document.querySelector("#storiesContainer")
  const storiesMenu = document.querySelector("#storiesMenu")

  // When the user clicks on the button, open the modal
  userButton.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  modalClose.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  //logIn form default-submit prevented and fetch data from API
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
      let welcome = document.querySelector("div#welcome  h1")
      welcome.innerText = `${object["username"]}'s Story Vineyard`
      userButton.style.display = "none"
      storiesContainer.style.display = "inline"
      object.stories.forEach(function(story){
        let option = document.createElement("option")
        option.value = story
        option.innerText = story
        storiesMenu.appendChild(option)
      })
      console.log(object)
    })
  }, false)

})
