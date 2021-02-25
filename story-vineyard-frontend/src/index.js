window.addEventListener("load", ()=>{
  const modal = document.querySelector("#userForm");
  const userButton = document.querySelector("#userButton");
  // Get the <span> element that closes the modal
  const modalClose = document.querySelector("span");
  const logInButton = document.querySelector("#logIn")
  const storiesContainer = document.querySelector("#storiesContainer")
  const storiesMenu = document.querySelector("#storiesMenu")
  const canvas = document.querySelector("#canvas")
  const zoomIn = document.querySelector(".zoomIn")
  const zoomOut = document.querySelector(".zoomOut")
  const canvasLeft = canvas.offsetLeft + canvas.clientLeft
  const canvasTop = canvas.offsetTop + canvas.clientTop
  const ctx = canvas.getContext("2d")

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
    //get all stories associated with user
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
        option.value = story.title
        option.innerText = story.title
        storiesMenu.appendChild(option)
      })
      //get all story elements associated with selected story
      storiesMenu.addEventListener('change', (element)=>{
        console.log(storiesMenu.value)

      })
      console.log(object)
    })
  }, false)

    canvas.height = 600
    canvas.width = 600
    elements = []
    elements.push({
      width: 200,
      height: 200,
      top: 150,
      left: 150
    })
    let scaleFactor = 1
    zoomIn.addEventListener("click", ()=>{
    //ctx.restore()
    ctx.resetTransform()
    scaleFactor += 0.25
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(scaleFactor, scaleFactor)
    console.log(scaleFactor)
  //  ctx.save()
    draw()
  })
  zoomOut.addEventListener("click", ()=>{
  //  ctx.restore()
    ctx.resetTransform()
    scaleFactor -= 0.25
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(scaleFactor, scaleFactor)
    console.log(scaleFactor)
  //  ctx.save()
    draw()
  })
  function draw(){
    //ctx.beginPath()
    //ctx.moveTo(0,0)
    ctx.fillRect(150, 150, 200, 200)
  }
  canvas.addEventListener('click', ()=> {
    console.log(event)
    var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;
        elements.forEach(function(element) {
        if (y > (element.top * scaleFactor) && y < (element.top + element.height)* scaleFactor
            && x > (element.left * scaleFactor) && x < (element.left + element.width)* scaleFactor) {
                alert('clicked an element');
            }
        });
        }, false);
    ctx.save()
    draw()
})
