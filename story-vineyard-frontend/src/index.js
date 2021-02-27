window.addEventListener("load", ()=>{
  const modal = document.querySelector("#userForm");
  const userButton = document.querySelector("#userButton");
  // Get the <span> element that closes the modal
  const modalClose = document.querySelector("span");
  const logInButton = document.querySelector("#logIn")
  const storiesContainer = document.querySelector("#storiesContainer")
  const storiesMenu = document.querySelector("#storiesMenu")
  const zoomIn = document.querySelector(".zoomIn")
  const zoomOut = document.querySelector(".zoomOut")
  const canvas = document.querySelector("#canvas")
  const canvasLeft = canvas.offsetLeft + canvas.clientLeft
  const canvasTop = canvas.offsetTop + canvas.clientTop
  const ctx = canvas.getContext("2d")
  const vine = document.getElementById("vine")
  const vinePNGHeight = 80
  const vinePNGWidth = 200
  const grapes = document.getElementById("grapes")
  const scenesArray = []

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
    .then(resp => resp.json())
    .then(function(object) {
      let welcome = document.querySelector("div#welcome  h1")
      welcome.innerText = `${object["username"]}'s Story Vineyard`
      userButton.style.display = "none"
      storiesContainer.style.display = "inline"
      //console.log(objext.stories)
      object.stories.forEach(function(story){
        let option = document.createElement("option")
        option.value = story.id + " " + story.title
        option.innerText = story.title
        storiesMenu.appendChild(option)
      })
      //get all story elements associated with selected story
      storiesMenu.addEventListener('change', (element)=>{
        //console.log(storiesMenu.value)
        let storyId = parseInt(storiesMenu.value.split(" ")[0], 10)
        fetch(`http://localhost:3000/stories/${storyId}`)
          .then(resp => resp.json())
          .then(function(json) {
            //make a scene object for each scene and add to scenesArray
            json.scenes.forEach(function(scene){
              let characters = []
              scene.characters.forEach(function(char){
                //make a new character object
                let newChar = new Character(
                  char.id,
                  char.name
                  )
                  characters.push(newChar)
              })
              let meta_contents =[]
              scene.meta_contents.forEach(function(meta){
                //make a new meta object
                let newMeta = new MetaContent(
                  meta.id,
                  meta.content,
                  meta.theme_or_pp
                )
                meta_contents.push(newMeta)
              })
              let newScene = new Scene(
                scene.id,
                scene.name,
                scene.location,
                scene.x_pos,
                scene.y_pos,
                characters,
                meta_contents
              )

              scenesArray.push(newScene)
            })
            draw()
            console.log(scenesArray)
          })
      })
      console.log(object)
    })
  }, false)

    canvas.height = 1000
    canvas.width = 1000
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
    //ctx.fillRect(150, 150, 200, 200)
    //ctx.drawImage(vine, 100, 100)
    //draw each element in scenesArray
    scenesArray.forEach(function(scene){
      ctx.drawImage(vine, scene.x_pos, scene.y_pos)
    })
  }
  // elements = []
  // elements.push({
  //   width: 200,
  //   height: 80,
  //   top: 100,
  //   left: 100
  // })
  canvas.addEventListener('click', ()=> {
    console.log(event)
    let x = event.pageX - canvasLeft
    let y = event.pageY - canvasTop
        scenesArray.forEach(function(scene) {
        if (y > (scene.y_pos * scaleFactor) && y < (scene.y_pos + vinePNGHeight)* scaleFactor
            && x > (scene.x_pos * scaleFactor) && x < (scene.x_pos + vinePNGWidth)* scaleFactor) {
                alert(`clicked on ${scene.name}`);
            }
        });
        }, false);
  //  ctx.save()
    //draw()
})
