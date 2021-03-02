window.addEventListener("load", ()=>{
  const modalLogIn = document.querySelector("#userForm");
  const userButton = document.querySelector("#userButton");
  // Get the <span> element that closes the modal
  const modalLogInClose = document.querySelector("#closeLogIn");
  const logInButton = document.querySelector("#logIn")

  const storiesContainer = document.querySelector("#storiesContainer")
  const storiesMenu = document.querySelector("#storiesMenu")

  const editToolsContainer = document.querySelector("#editToolsContainer")

  const currentSceneId = document.querySelector("#scene-id")

  const addThemesButton = document.querySelector(".add-theme")
  const addThemesModal = document.querySelector("#add-themes-modal")
  const addThemesModalClose = document.querySelector("#close-add-themes")
  const submitNewThemeButton = document.querySelector("#submit-new-theme")

  const editThemesButton = document.querySelector(".edit-themes")
  const editThemesModal = document.querySelector("#edit-themes-modal")
  const editThemesModalClose = document.querySelector("#close-edit-themes")
  const editThemesForm = document.querySelector("#edit-themes-form")

  const zoomIn = document.querySelector(".zoomIn")
  const zoomOut = document.querySelector(".zoomOut")
  const canvas = document.querySelector("#canvas")
  const canvasLeft = canvas.offsetLeft + canvas.clientLeft
  const canvasTop = canvas.offsetTop + canvas.clientTop
  const ctx = canvas.getContext("2d")
  const vine = document.getElementById("vine")
  const grapes = document.getElementById("grapes")
  const scenesArray = []
  //dimensions of entire vine png
  const vinePNGHeight = 80
  const vinePNGWidth = 200
  //location of grapes relative to origin of vine png
  const grapesLeft = 79
  const grapesRight = 105
  const grapesTop = 24
  const grapesBottom = 65
  //location of left red leaf relative to origin of vine png
  //left red leaf represents themes
  const themeLeft = 48
  const themeRight = 68
  const themeTop = 15
  const themeBottom = 38
  //location of right red leaf relative to origin of vine png
  //right red leaf represents plot points
  const ppLeft = 162
  const ppRight = 182
  const ppTop = 1
  const ppBottom = 19


  // When the user clicks on the button, open the modal
  userButton.onclick = function() {
    modalLogIn.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  modalLogInClose.onclick = function() {
    modalLogIn.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modalLogIn) {
      modalLogIn.style.display = "none";
    }
    else if (event.target == editThemesModal){
      editThemesModal.style.display = "none"
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
      modalLogIn.style.display = "none";
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
            //make variables to click and unclick info bubbles
            // scenesArray.forEach(function(scene){
            //
            // })
          })
      })
      console.log(object)
    })
  }, false)
  submitNewThemeButton.addEventListener('click', (event)=>{
    event.preventDefault()
    let newThemeInfo = {
      content: document.querySelector("#new-theme").value,
      theme_or_pp: 0,
      sceneId: currentSceneId.value
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newThemeInfo)
    }
    fetch("http://localhost:3000/meta-contents", configObj)
    .then(resp => resp.json())
    .then(function(object){
      //make a new js object for the theme and add it to correct scene in scenesArray
      let newTheme = new MetaContent(
        object.id,
        object.content,
        object.theme_or_pp
      )
      console.log(newTheme)
      scenesArray[currentSceneId.value-1].meta_contents.push(newTheme)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      draw()
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
      //console.log(`${scene.x_pos} ${scene.y_pos}`)
      ctx.drawImage(vine, scene.x_pos, scene.y_pos)
      ctx.fillRect(scene.x_pos-5, scene.y_pos+60, 80, 40)
      ctx.clearRect(scene.x_pos, scene.y_pos+65, 70, 30)
      ctx.strokeRect(scene.x_pos+2, scene.y_pos+67, 66, 26)
      ctx.fillText(`${scene.name}:`, scene.x_pos+5, scene.y_pos+77)
      ctx.fillText(scene.location, scene.x_pos+5, scene.y_pos+90)
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
          //registers a click on the grapes
          if (x > ((scene.x_pos+grapesLeft)*scaleFactor) && x < ((scene.x_pos+grapesRight)*scaleFactor)
              && y > ((scene.y_pos+grapesTop)*scaleFactor) && y < ((scene.y_pos+grapesBottom)*scaleFactor)) {
                //alert(`clicked on the grapes for ${scene.name}`)
                // let bubbleX = 150
                // let bubbleY = 265
                //draw info bubble
                let bubbleX = (scene.x_pos+grapesLeft) + 30
                let bubbleY = (scene.y_pos+grapesTop) + 141
                //ctx.fillRect(bubbleX, bubbleY, 10, 10)
                // ctx.fillRect(bubbleX, bubbleY, 10, 10)
               ctx.beginPath();
               ctx.moveTo(bubbleX, bubbleY);
               ctx.quadraticCurveTo(bubbleX+50, bubbleY, bubbleX+50, bubbleY-37.5);
               ctx.quadraticCurveTo(bubbleX+50, bubbleY-75, bubbleX+25, bubbleY-75);
               //ctx.quadraticCurveTo(bubbleX+25, bubbleY-95, bubbleX+45, bubbleY-100);
               ctx.lineTo(bubbleX-10, bubbleY-100);
               //ctx.quadraticCurveTo(bubbleX+15, bubbleY-95, bubbleX+10, bubbleY-75);
               ctx.lineTo(bubbleX+10, bubbleY-75);
               ctx.quadraticCurveTo(bubbleX-50, bubbleY-75, bubbleX-50, bubbleY-37.5);
               ctx.quadraticCurveTo(bubbleX-50, bubbleY, bubbleX, bubbleY);
               ctx.stroke();
               //fill in bubble with character names
               ctx.font = "8px sans-serif"
               let xTextPos = bubbleX - 40
               let yTextPos = bubbleY - 50
               scene.characters.forEach(function(char){
                 ctx.fillText(char.name, xTextPos, yTextPos)
                 //create a new line as a factor of text size
                 yTextPos += parseInt(ctx.font.split("px")[0], 10) + 2
               })
          }
          //registers a click on left red leaf
          else if (x > ((scene.x_pos+themeLeft)*scaleFactor) && x < ((scene.x_pos+themeRight)*scaleFactor)
                  && y > ((scene.y_pos+themeTop)*scaleFactor) && y < ((scene.y_pos+themeBottom)*scaleFactor)) {
            //alert(`clicked on the left red leaf of ${scene.name}`)
            // let bubbleX = 210
            // let bubbleY = 20
            //draw info bubble
            let bubbleX = (scene.x_pos+themeLeft) + 62
            let bubbleY = (scene.y_pos+themeTop) - 95
             ctx.beginPath();
             ctx.moveTo(bubbleX, bubbleY);
             ctx.quadraticCurveTo(bubbleX-50, bubbleY, bubbleX-50, bubbleY+37.5);
             ctx.quadraticCurveTo(bubbleX-50, bubbleY+75, bubbleX-25, bubbleY+75);
             ctx.quadraticCurveTo(bubbleX-25, bubbleY+95, bubbleX-45, bubbleY+100);
             ctx.quadraticCurveTo(bubbleX-15, bubbleY+95, bubbleX-10, bubbleY+75);
             ctx.quadraticCurveTo(bubbleX+50, bubbleY+75, bubbleX+50, bubbleY+37.5);
             ctx.quadraticCurveTo(bubbleX+50, bubbleY, bubbleX, bubbleY);
             ctx.stroke();
             //fill in info bubble with MetaContent(theme) data
             ctx.font = "8px sans-serif"
             let sceneThemes = scene.meta_contents.filter(meta => meta.theme_or_pp === 0)
             let xTextPos = bubbleX - 45
             let yTextPos = bubbleY + 30
             sceneThemes.forEach(function(theme){
               ctx.fillText(theme.content, xTextPos, yTextPos)
               //create a new line as a factor of text size
               yTextPos += parseInt(ctx.font.split("px")[0], 10) + 2
             })
             //display add/edit buttons
             editToolsContainer.style.display = "inline"
             addThemesButton.addEventListener('click',() => {
               addThemesModal.style.display = "block"
             })
             addThemesModalClose.addEventListener('click', ()=>{
               addThemesModal.style.display = "none"
             })
             editThemesButton.addEventListener('click',() => {
               editThemesModal.style.display = "block"
               // clear form of all previous theme inputs/elements
               removeAllChildNodes(editThemesForm)
               //modal is populated with input elements that contain the current values for the relevant meta_contents
               let themesArray = scenesArray[currentSceneId.value-1].meta_contents.filter(meta => meta.theme_or_pp === 0)
               themesArray.forEach(function(theme){
                 let themeElement = document.createElement("input")
                 let lineBreak = document.createElement("br")
                 themeElement.type = "text"
                 themeElement.name = theme.content
                 themeElement.value = theme.content
                 themeElement.id = theme.id
                 editThemesForm.appendChild(themeElement)
                 editThemesForm.appendChild(lineBreak)
               })
               //create submit button
               let submitThemes = document.createElement("input")
               submitThemes.type = "submit"
               submitThemes.name = "edit-themes"
               submitThemes.id = "edit-themes"
               submitThemes.value = "Confirm Edits"
               editThemesForm.appendChild(submitThemes)
               submitThemes.addEventListener('click', (event)=>{
                 //close modal
                 editThemesModal.style.display = "none"
                 event.preventDefault()
                 // go through theme inputs and update if they have been changed
                 while (editThemesForm.firstChild != submitThemes){

                   // if first theme has been changed
                   if (editThemesForm.firstChild.value !== themesArray.find(theme => theme.id === parseInt(editThemesForm.firstChild.id, 10)).content){
                     //fetch request to post new info
                     let updatedThemeInfo = {
                       id: editThemesForm.firstChild.id,
                       content: editThemesForm.firstChild.value,
                       theme_or_pp: 0,
                       sceneId: currentSceneId.value
                     }
                     let configObj = {
                       method: "POST",
                       headers: {
                         "Content-Type": "application/json",
                         "Accept": "application/json"
                       },
                       body: JSON.stringify(updatedThemeInfo)
                     }
                     fetch(`http://localhost:3000/meta-contents/${updatedThemeInfo.id}/update`, configObj)
                     .then(resp => resp.json())
                     .then(function(object){
                       console.log(object)
                        //when response happens, update the old js object to reflect changes
                        let themeToBeUpdated = themesArray.find(theme => theme.id === object.id)
                        themeToBeUpdated.content = object.content
                     }, false)
                     //remove child node
                     editThemesForm.removeChild(editThemesForm.firstChild)
                     //remove <br>
                     editThemesForm.removeChild(editThemesForm.firstChild)
                   } else {
                     //just remove node without interacting with db
                     editThemesForm.removeChild(editThemesForm.firstChild)
                     //remove <br>
                     editThemesForm.removeChild(editThemesForm.firstChild)
                   }
                 }
                 //when all is said and done, clear and redraw
                 ctx.clearRect(0, 0, canvas.width, canvas.height)
                 draw()
               })

             })
             editThemesModalClose.addEventListener('click', ()=>{
               editThemesModal.style.display = "none"
             })
             currentSceneId.value = scene.id
             console.log(currentSceneId.value)
          }
          //registers a click on right red leaf
          else if (x > ((scene.x_pos+ppLeft)*scaleFactor) && x < ((scene.x_pos+ppRight)*scaleFactor)
                  && y > ((scene.y_pos+ppTop)*scaleFactor) && y < ((scene.y_pos+ppBottom)*scaleFactor)){
            //alert(`clicked on the right red leaf of ${scene.name}`)
            // let bubbleX = 330
            // let bubbleY = 10
            // console.log(scene.x_pos+ppLeft)
            // console.log(scene.y_pos+ppTop)
            //draw info bubble
            let bubbleX = (scene.x_pos+ppLeft) + 58
            let bubbleY = (scene.y_pos+ppTop) - 101
           ctx.beginPath();
           ctx.moveTo(bubbleX, bubbleY);
           ctx.quadraticCurveTo(bubbleX-50, bubbleY, bubbleX-50, bubbleY+37.5);
           ctx.quadraticCurveTo(bubbleX-50, bubbleY+75, bubbleX-25, bubbleY+75);
           ctx.quadraticCurveTo(bubbleX-25, bubbleY+95, bubbleX-45, bubbleY+100);
           ctx.quadraticCurveTo(bubbleX-15, bubbleY+95, bubbleX-10, bubbleY+75);
           ctx.quadraticCurveTo(bubbleX+50, bubbleY+75, bubbleX+50, bubbleY+37.5);
           ctx.quadraticCurveTo(bubbleX+50, bubbleY, bubbleX, bubbleY);
           ctx.stroke();
           //fill in info bubble with MetaContent(plot point) data
           ctx.font = "8px sans-serif"
           let scenePlotPoints = scene.meta_contents.filter(meta => meta.theme_or_pp === 1)
           let xTextPos = bubbleX - 45
           let yTextPos = bubbleY + 30
           scenePlotPoints.forEach(function(pp){
             ctx.fillText(pp.content, xTextPos, yTextPos)
             //create a new line as a factor of text size
             yTextPos += parseInt(ctx.font.split("px")[0], 10) + 2
           })
          }
          //registers a click anywhere on vine image (to be used for selecting a scene to move it around canvas)
          else if (x > (scene.x_pos * scaleFactor) && x < (scene.x_pos + vinePNGWidth)* scaleFactor
                  && y > (scene.y_pos * scaleFactor) && y < (scene.y_pos + vinePNGHeight)* scaleFactor) {
                //alert(`clicked on ${scene.name}`)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                draw()
            }
        })
        }, false)
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
  //  ctx.save()
    //draw()
    // let sceneBoxX =
    // let sceneBoxY =
    // let sceneBoxWidth =
    // let sceneBoxHeight =
    // ctx.fillRect(100, 160, 80, 35)
    // ctx.clearRect(105, 165, 70, 25)
    // ctx.strokeRect(107, 167, 66, 21)
})
