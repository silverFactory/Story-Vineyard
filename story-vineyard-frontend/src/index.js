window.addEventListener("load", ()=>{
  const modalLogIn = document.querySelector("#user-form")
  const userButton = document.querySelector("#user-button")
  const tutorialButton = document.querySelector("#tutorial-button")
  let tutorialStep = 0
  const welcome = document.querySelector("div#welcome  h1")
  // Get the <span> element that closes the modal
  const modalLogInClose = document.querySelector("#close-login");
  const logInButton = document.querySelector("#log-in")
  const signUpButton = document.querySelector("#sign-up")

  const newStoryModal = document.querySelector("#new-story-modal")
  const submitNewStoryButton = document.querySelector("#submit-new-story")
  const newStoryTitle = document.querySelector("#new-story-title")
  const newStoryModalClose = document.querySelector("#close-new-story")

  const sceneContainer = document.querySelector("#scene-container")
  const highlightsContainer = document.querySelector("#highlights-container")
  const moveSceneButton = document.querySelector("#move-scene")
  const deleteSceneButton = document.querySelector("#delete-scene")

  const newSceneButton = document.querySelector("#new-scene")
  const newSceneModal = document.querySelector("#new-scene-modal")
  const submitNewSceneButton = document.querySelector("#submit-new-scene")
  const newSceneName = document.querySelector("#new-scene-name")
  const newSceneModalClose = document.querySelector("#close-new-scene")
  const newSceneLocation = document.querySelector("#new-scene-location")
  const newSceneX = document.querySelector("#scene-x-pos")
  const newSceneY = document.querySelector("#scene-y-pos")

  const toolsContainer = document.querySelector(".tools-container")
  const storiesContainer = document.querySelector("#stories-container")
  const storiesMenu = document.querySelector("#storiesMenu")

  const editMetaContentsContainer = document.querySelector("#edit-meta-contents-container")

  const currentSceneId = document.querySelector("#scene-id")

  const addMetaButton = document.querySelector("#add-meta-content")
  const addMetaModal = document.querySelector("#add-meta-modal")
  const addMetaLabel = document.querySelector("#add-meta-form label")
  const addMetaModalClose = document.querySelector("#close-add-meta")
  const newMetaInputField = document.querySelector("#new-meta")
  const chooseExisting = document.querySelector("#choose-existing")
  const submitNewMetaButton = document.querySelector("#submit-new-meta")

  const editMetaButton = document.querySelector("#edit-meta-content")
  const editMetaModal = document.querySelector("#edit-meta-modal")
  const editMetaModalClose = document.querySelector("#close-edit-meta")
  const editMetaForm = document.querySelector("#edit-meta-form")

  // const addPPsButton = document.querySelector(".add-plot-point")
  // const addPPsModal = document.querySelector("#add-pps-modal")
  // const addPPsModalClose = document.querySelector("#close-add-pps")
  // const submitNewPPButton = document.querySelector("#submit-new-pp")
  const zoomContainer = document.querySelector("#zoom-container")
  const zoomIn = document.querySelector("#zoom-in")
  const zoomOut = document.querySelector("#zoom-out")
  const canvas = document.querySelector("#canvas")
  const canvasLeft = canvas.offsetLeft + canvas.clientLeft
  // const canvasTop = canvas.offsetTop + canvas.clientTop
  const canvasTop = 220
  const ctx = canvas.getContext("2d")
  const vine = document.getElementById("vine")

  //const grapes = document.getElementById("grapes")

  const scenesArray = []
  const allCharacters = []
  const charactersMenu = document.querySelector("#all-characters")
  const allThemes = []
  const themesMenu = document.querySelector("#all-themes")
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
    else if (event.target == editMetaModal){
      editMetaModal.style.display = "none"
    }
  }
  tutorialButton.addEventListener('click', ()=>{
    switch(tutorialStep){
      case 0:
        tutorialButton.innerText = "Continue Tutorial"
        ctx.font = '24px vollkorn'
        ctx.fillText('Story Vineyard is a graphical outlining tool,', 100, 100)
        ctx.fillText('designed to give writers an easily digestible birds eye view of their project.', 100, 150)
        tutorialStep ++
        break
      case 1:
        ctx.clearRect(0, 0, canvas.width, 170)
        ctx.fillText('In the vineyard, a story is broken up into discrete chunks called scenes,', 100, 100)
        ctx.fillText('which are represented graphically by the image of a vine.', 100, 150)
        tutorialStep ++
        break
      case 2:
        ctx.drawImage(vine, 400, 240)
        tutorialStep ++
        break
      case 3:
        ctx.clearRect(0, 0, canvas.width, 170)
        ctx.fillText('Each scene has three special clickable areas:', 100, 100)
        tutorialStep ++
        break
      case 4:
        ctx.fillText('the grapes', 460, 355)
        tutorialStep ++
        break
      case 5:
        ctx.fillText('left red leaf', 340, 240)
        tutorialStep ++
        break
      case 6:
        ctx.fillText('right red leaf', 530, 230)
        tutorialStep ++
        break
      case 7:
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillText('The grapes represent characters', 100, 100)
        ctx.drawImage(vine, 400, 240)
        let charBubbleX = 509
        let charBubbleY = 405
         ctx.beginPath();
         ctx.moveTo(charBubbleX, charBubbleY);
         ctx.quadraticCurveTo(charBubbleX+50, charBubbleY, charBubbleX+50, charBubbleY-37.5);
         ctx.quadraticCurveTo(charBubbleX+50, charBubbleY-75, charBubbleX+25, charBubbleY-75);
         ctx.lineTo(charBubbleX-10, charBubbleY-100);
         ctx.lineTo(charBubbleX+10, charBubbleY-75);
         ctx.quadraticCurveTo(charBubbleX-50, charBubbleY-75, charBubbleX-50, charBubbleY-37.5);
         ctx.quadraticCurveTo(charBubbleX-50, charBubbleY, charBubbleX, charBubbleY);
         ctx.stroke();
         //fill in bubble with character names
         ctx.font = "8px sans-serif"
         let charXTextPos = charBubbleX - 40
         let charYTextPos = charBubbleY - 50
         let characters = ["Hero", "Best Friend", "Villain"]
         characters.forEach(function(char){
           ctx.fillText(char, charXTextPos, charYTextPos)
           //create a new line as a factor of text size
           charYTextPos += parseInt(ctx.font.split("px")[0], 10) + 2
         })
         tutorialStep ++
         break
      case 8:
        ctx.clearRect(0, 0, canvas.width, 170)
        ctx.font = '24px vollkorn'
        ctx.fillText('The left red leaf represents themes', 100, 100)
        let themeBubbleX = 510
        let themeBubbleY = 160
         ctx.beginPath();
         ctx.moveTo(themeBubbleX, themeBubbleY);
         ctx.quadraticCurveTo(themeBubbleX-50, themeBubbleY, themeBubbleX-50, themeBubbleY+37.5);
         ctx.quadraticCurveTo(themeBubbleX-50, themeBubbleY+75, themeBubbleX-25, themeBubbleY+75);
         ctx.quadraticCurveTo(themeBubbleX-25, themeBubbleY+95, themeBubbleX-45, themeBubbleY+100);
         ctx.quadraticCurveTo(themeBubbleX-15, themeBubbleY+95, themeBubbleX-10, themeBubbleY+75);
         ctx.quadraticCurveTo(themeBubbleX+50, themeBubbleY+75, themeBubbleX+50, themeBubbleY+37.5);
         ctx.quadraticCurveTo(themeBubbleX+50, themeBubbleY, themeBubbleX, themeBubbleY);
         ctx.stroke();
         //fill in info bubble with MetaContent(theme) data
         ctx.font = "8px sans-serif"
         let themeXTextPos = themeBubbleX - 45
         let themeYTextPos = themeBubbleY + 30
         let themes = ["Good vs Evil", "Green symbolizes Greed"]
         themes.forEach(function(theme){
           ctx.fillText(theme, themeXTextPos, themeYTextPos)
           //create a new line as a factor of text size
           themeYTextPos += parseInt(ctx.font.split("px")[0], 10) + 2
         })
         tutorialStep ++
         break
      case 9:
        ctx.clearRect(0, 0, canvas.width, 160)
        ctx.font = '24px vollkorn'
        ctx.fillText('The right red leaf represents plot points', 100, 100)
        let plotBubbleX = 620
        let plotBubbleY = 140
         ctx.beginPath();
         ctx.moveTo(plotBubbleX, plotBubbleY);
         ctx.quadraticCurveTo(plotBubbleX-50, plotBubbleY, plotBubbleX-50, plotBubbleY+37.5);
         ctx.quadraticCurveTo(plotBubbleX-50, plotBubbleY+75, plotBubbleX-25, plotBubbleY+75);
         ctx.quadraticCurveTo(plotBubbleX-25, plotBubbleY+95, plotBubbleX-45, plotBubbleY+100);
         ctx.quadraticCurveTo(plotBubbleX-15, plotBubbleY+95, plotBubbleX-10, plotBubbleY+75);
         ctx.quadraticCurveTo(plotBubbleX+50, plotBubbleY+75, plotBubbleX+50, plotBubbleY+37.5);
         ctx.quadraticCurveTo(plotBubbleX+50, plotBubbleY, plotBubbleX, plotBubbleY);
         ctx.stroke();
         //fill in info bubble with MetaContent(plot point) data
         ctx.font = "8px sans-serif"
         let plotXTextPos = plotBubbleX - 45
         let plotYTextPos = plotBubbleY + 30
         plotPoints = ["Hero gets a quest", "Villain hatches a scheme"]
         plotPoints.forEach(function(pp){
           ctx.fillText(pp, plotXTextPos, plotYTextPos)
           //create a new line as a factor of text size
           plotYTextPos += parseInt(ctx.font.split("px")[0], 10) + 2
         })
         tutorialStep ++
         break
      case 10:
        ctx.font = '24px vollkorn'
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(vine, 400, 240)
        ctx.fillText("To clear the bubbles, simply click a portion of the vine", 100, 100)
        ctx.fillText(' that is not one of these elements.', 100, 150)
        tutorialStep ++
        break
      case 11:
        ctx.clearRect(0, 0, canvas.width, 160)
        ctx.fillText("Above the vineyard are all the tools you'll need", 100, 100)
        ctx.fillText('to map your story.', 100, 150)
        // toolsContainer.style.display = "flex"
        storiesContainer.style.display = "inline"
        displayTools()
        tutorialButton.innerText = "Finish Tutorial"
        tutorialStep ++
        break
      case 12:
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillText("Sign Up to continue exploring!", 100, 100)
        toolsContainer.style.display = "none"
        tutorialButton.innerText = "View Tutorial"
        tutorialStep = 0
        break
      default:
    }
  })
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
      welcome.innerText = `${object["username"]}'s Story Vineyard`
      userButton.style.display = "none"
      tutorialButton.style.display = "none"
      toolsContainer.style.display = "flex"
      storiesContainer.style.display = "inline"
      modalLogIn.style.display = "none";
      object.stories.forEach(function(story){
        let option = document.createElement("option")
        option.value = story.id + " " + story.title
        option.innerText = story.title
        storiesMenu.appendChild(option)
      })
      //get all story elements associated with selected story

      storiesMenu.addEventListener('change', (element)=>{
        //adjust menu styling
        storiesContainer.style.marginLeft= "100px"
        //erase all previous story elements
        clearAllElements()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw()
        //console.log(scenesArray.length)
        //start new story
        if (storiesMenu.value === "create-new-story"){
          console.log("change")
          newStoryModal.style.display = "inline"
        } else {
        //retrieve saved story elements
        let storyId = parseInt(storiesMenu.value.split(" ")[0], 10)
        fetch(`http://localhost:3000/stories/${storyId}`)
          .then(resp => resp.json())
          .then(function(json) {
            json.all_characters.forEach(function(char){
              let newChar = new Character(
                char.id,
                char.name
                )
                allCharacters.push(newChar)
                let charOption = document.createElement("option")
                charOption.value = char.id + " " + char.name
                charOption.innerText = char.name
                charactersMenu.appendChild(charOption)
            })
            console.log(allCharacters)
            json.all_themes.forEach(function(theme){
              let newTheme = new MetaContent(
                theme.id,
                theme.content,
                theme.theme_or_pp
              )
              allThemes.push(newTheme)
              let themeOption = document.createElement("option")
              themeOption.value = theme.id + " " + theme.content
              themeOption.innerText = theme.content
              themesMenu.appendChild(themeOption)
            })
            console.log(allThemes)
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
            displayTools()
            // toolsContainer.style.display = "flex"
            // zoomContainer.style.display = "inline"
            // sceneContainer.style.display = "inline"
            // highlightsContainer.style.display = "inline"
            console.log(scenesArray)
          })
        }
      })
    })
  }, false)

  signUpButton.addEventListener('click', (event)=>{
    event.preventDefault()
    //add something to check that password and password confirmation match
    if (document.querySelector("#new-password").value === document.querySelector("#confirm-password").value){
      let newUserInfo = {
        username: document.querySelector("#new-username").value,
        password: document.querySelector("#new-password").value
      }
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newUserInfo)
      }
      fetch("http://localhost:3000/users", configObj)
      .then(resp=>resp.json())
      .then(function(object){
        welcome.innerText = `${object["username"]}'s Story Vineyard`
        userButton.style.display = "none"
        tutorialButton.style.display = "none"
        toolsContainer.style.display = "flex"
        storiesContainer.style.display = "inline"
        modalLogIn.style.display = "none";
      })
    } else {
      alert("passwords don't match")
    }
  })
  //submits new story to db
  submitNewStoryButton.addEventListener('click', (event)=>{
    event.preventDefault()
    let newStoryInfo = {
      username: currentUser(),
      title: newStoryTitle.value,
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newStoryInfo)
    }
    fetch("http://localhost:3000/stories", configObj)
    .then(resp=>resp.json())
    .then(function(object){
      console.log(object)
      let newStory = document.createElement("option")
      newStory.value = object.id + " " + object.title
      newStory.innerText = object.title
      storiesMenu.appendChild(newStory)
      newStory.selected = true
      newStoryModal.style.display = "none"
      displayTools()
    })
  }, false)
  //submits new MetaContent or Character to DB
  submitNewMetaButton.addEventListener('click', (event)=>{
    event.preventDefault()
    if (chooseExisting.value === "Choose Existing"){
      submitNewMeta()
    } else {
      addExisting()
    }
    addMetaModal.style.display = "none"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()
  }, false)

  addMetaButton.addEventListener('click',() => {
    //set the text for the new form
    addMetaLabel.innerText = addMetaButton.innerText
    addMetaModal.style.display = "block"
    // clear all previous options
    removeAllChildNodes(chooseExisting)
    let option = document.createElement("option")
    option.innerText = "Choose Existing"
    chooseExisting.appendChild(option)
    //give menu for adding existing character or theme, hide if plot point
    if (elementType() === "character"){
      //change so that only characters that aren't in this scene are gien as options
      allCharacters.forEach(function(char){
        if (currentScene().characters.find(ch => ch.id === char.id) === undefined){
          let charOption = document.createElement("option")
          charOption.value = char.id + " " + char.name
          charOption.innerText = char.name
          chooseExisting.appendChild(charOption)
        }
      })
    } else if (elementType() === 0){
      console.log(allThemes)
      allThemes.forEach(function(theme){
        if (currentScene().meta_contents.find(meta => meta.id === theme.id) === undefined){
          let themeOption = document.createElement("option")
          themeOption.value = theme.id + " " + theme.content
          themeOption.innerText = theme.content
          chooseExisting.appendChild(themeOption)
        }
      })
    } else {
      chooseExisting.style.display = "none"
    }
  })
  addMetaModalClose.addEventListener('click', ()=>{
    addMetaModal.style.display = "none"
    newMetaInputField.value = ""
  })
  newSceneModalClose.addEventListener('click', ()=>{
    newSceneModal.style.display = "none"
  })
  newStoryModalClose.addEventListener('click', ()=>{
    newStoryModal.style.display = "none"
  })
  editMetaModalClose.addEventListener('click', ()=>{
    editMetaModal.style.display = "none"
    newMetaInputField.value = ""
  })
  editMetaButton.addEventListener('click',() => {
    editMetaModal.style.display = "block"
    // clear form of all previous theme inputs/elements
    removeAllChildNodes(editMetaForm)
    //fill form with current elements
    populateEditForm(elementType())
    //create submit button
    let submitMeta = document.createElement("input")
    submitMeta.type = "submit"
    submitMeta.name = "edit-themes"
    submitMeta.id = "edit-themes"
    submitMeta.value = "Confirm Edits"
    editMetaForm.appendChild(submitMeta)
    //event listener nested b/c button will get cleared and recreated
    submitMeta.addEventListener('click', (event)=>{
      //close modal
      editMetaModal.style.display = "none"
      event.preventDefault()
      evaluateForm()
      //when all inputs have been dealt with, clear and redraw
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      draw()
    })

  })

  themesMenu.addEventListener('change', ()=>{
    let themeId = parseInt(themesMenu.value.split(" ")[0], 10)
    fetch(`http://localhost:3000/meta-contents/${themeId}`)
    .then(resp => resp.json())
    .then(function(object){
      let scenesWithTheme = []
      object.forEach(function(scene){
        let sc = scenesArray.find(sceneObj => sceneObj.id === scene.id)
        if (sc){
          scenesWithTheme.push(sc)
        }
      })
      scenesWithTheme.forEach(function(scene){
        drawThemesBubble(scene)
      })
    })
  })
  charactersMenu.addEventListener('change', ()=>{
    let charId = parseInt(charactersMenu.value.split(" ")[0], 10)
    fetch(`http://localhost:3000/characters/${charId}`)
    .then(resp => resp.json())
    .then(function(object){
      let scenesWithCharacter = []
      object.forEach(function(scene){
        let sc = scenesArray.find(sceneObj => sceneObj.id === scene.id)
        if (sc){
          scenesWithCharacter.push(sc)
        }
      })
      console.log(scenesWithCharacter)
      scenesWithCharacter.forEach(function(scene){
        drawCharactersBubble(scene)
      })
    })
  })

    canvas.height = 800
    canvas.width = 1000
    let scaleFactor = 1
    zoomIn.addEventListener("click", ()=>{
    ctx.resetTransform()
    scaleFactor += 0.25
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(scaleFactor, scaleFactor)
    console.log(scaleFactor)
    draw()
  })
  zoomOut.addEventListener("click", ()=>{
    ctx.resetTransform()
    scaleFactor -= 0.25
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(scaleFactor, scaleFactor)
    console.log(scaleFactor)
    draw()
  })
  function draw(){
    //draw each element in scenesArray
    scenesArray.forEach(function(scene){
      ctx.drawImage(vine, scene.x_pos, scene.y_pos)
      ctx.fillRect(scene.x_pos-5, scene.y_pos+60, 80, 40)
      ctx.clearRect(scene.x_pos, scene.y_pos+65, 70, 30)
      ctx.strokeRect(scene.x_pos+2, scene.y_pos+67, 66, 26)
      ctx.fillText(`${scene.name}:`, scene.x_pos+5, scene.y_pos+77)
      ctx.fillText(scene.location, scene.x_pos+5, scene.y_pos+90)
    })
  }

  canvas.addEventListener('click', ()=> {
    console.log(event)
    let x = event.pageX - canvasLeft
    let y = event.pageY - canvasTop

        scenesArray.forEach(function(scene) {
          //registers a click on the grapes
          if (x > ((scene.x_pos+grapesLeft)*scaleFactor) && x < ((scene.x_pos+grapesRight)*scaleFactor)
              && y > ((scene.y_pos+grapesTop)*scaleFactor) && y < ((scene.y_pos+grapesBottom)*scaleFactor)) {
                drawCharactersBubble(scene)
          }
          //registers a click on left red leaf
          else if (x > ((scene.x_pos+themeLeft)*scaleFactor) && x < ((scene.x_pos+themeRight)*scaleFactor)
                  && y > ((scene.y_pos+themeTop)*scaleFactor) && y < ((scene.y_pos+themeBottom)*scaleFactor)) {
            drawThemesBubble(scene)
          }
          //registers a click on right red leaf
          else if (x > ((scene.x_pos+ppLeft)*scaleFactor) && x < ((scene.x_pos+ppRight)*scaleFactor)
                  && y > ((scene.y_pos+ppTop)*scaleFactor) && y < ((scene.y_pos+ppBottom)*scaleFactor)){
            drawPlotPointsBubble(scene)
          }
          //registers a click anywhere on vine image (to be used for selecting a scene to move it around canvas)
          else if (x > (scene.x_pos * scaleFactor) && x < (scene.x_pos + vinePNGWidth)* scaleFactor
                  && y > (scene.y_pos * scaleFactor) && y < (scene.y_pos + vinePNGHeight)* scaleFactor) {
                editMetaContentsContainer.style.display = "none"
                currentSceneId.value = scene.id
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                draw()
            }
        })
        }, false)

moveSceneButton.addEventListener('click', ()=>{
  canvas.addEventListener('pointermove', handleMoveScene)
})
deleteSceneButton.addEventListener('click', ()=>{
  fetch(`http://localhost:3000/scenes/${currentSceneId.value}/destroy`)
    .then(resp => resp.json())
    .then(function(object){
      console.log(object)
      deleteScene(currentScene())
      draw()
    })
})
//vine png follows pointer around screen, locks in place on click
  newSceneButton.onclick = function(){
    canvas.addEventListener('pointermove', handlePointerMove)
  }
  submitNewSceneButton.addEventListener('click', (event)=>{
    event.preventDefault()
    let newSceneInfo = {
      storyId: storiesMenu.value.split(" ")[0],
      name: newSceneName.value,
      location: newSceneLocation.value,
      x_pos: newSceneX.value,
      y_pos: newSceneY.value
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newSceneInfo)
    }
    //fetch post to add to db
    fetch("http://localhost:3000/scenes", configObj)
    .then(resp => resp.json())
    .then(function(object){
      newSceneModal.style.display = "none"
      newSceneName.value = ""
      newSceneLocation.value = ""
      console.log(object)
      //make a new scene obj and add to scenesArray
      let scene = new Scene(
        object.id,
        object.name,
        object.location,
        object.x_pos,
        object.y_pos,
        [],
        []
      )
      scenesArray.push(scene)
      draw()
    })
  })

  //HELPER FUNCTIONS
    function handlePointerMove (event){
      canvas.addEventListener('click', handleNewSceneClick)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw()
        ctx.drawImage(vine, Math.floor(event.clientX)-25, Math.floor(event.clientY)-240)
      }
      function handleNewSceneClick(){
        canvas.removeEventListener('pointermove', handlePointerMove)
        canvas.removeEventListener('click', handleNewSceneClick)
        //modal pops up to make a new scene with name and location fields (xpos and ypos hidden)
        newSceneModal.style.display = "inline"
        //set x & y pos inputs on form
        newSceneX.value = Math.floor(event.clientX)-25
        newSceneY.value = Math.floor(event.clientY)-240
      }
      function handleMoveScene(event){
        canvas.addEventListener('click', setNewLocation)

        currentScene().x_pos = Math.floor(event.clientX)-25
        currentScene().y_pos = Math.floor(event.clientY)-240
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw()
      }
      function setNewLocation(){
        canvas.removeEventListener('pointermove', handleMoveScene)
        canvas.removeEventListener('click', setNewLocation)
        let updatedLocation = {
          x_pos: currentScene().x_pos,
          y_pos: currentScene().y_pos
        }
        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(updatedLocation)
        }
        fetch(`http://localhost:3000/scenes/${currentSceneId.value}`, configObj)
        .then(resp=>resp.json())
        .then(function(object){
          console.log(object)
        })
      }
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        function elementType(){
          //determine if currently editing themes, plot points, or characters
          let elementType
          if (addMetaButton.innerText === "Add Theme"){
            elementType = 0
          } else if (addMetaButton.innerText === "Add Plot Point"){
            elementType = 1
          } else {
            elementType = "character"
          }
          return elementType
        }
        function setButtons(element){
          //display add/edit buttons
          addMetaButton.innerText = `Add ${element}`
          editMetaButton.innerText = `Edit ${element}s`
          editMetaContentsContainer.style.display = "inline"
        }
        function currentUser(){
          return welcome.innerText.split(`'`)[0]
        }
        function currentStoryId(){
          return storiesMenu.value.split(" ")[0]
        }
        function currentScene(){
          return scenesArray.find(scene => scene.id === parseInt(currentSceneId.value, 10))
        }
        function drawCharactersBubble(scene){
          //draw info bubble
          let bubbleX = (scene.x_pos+grapesLeft) + 30
          let bubbleY = (scene.y_pos+grapesTop) + 141
         ctx.beginPath();
         ctx.moveTo(bubbleX, bubbleY);
         ctx.quadraticCurveTo(bubbleX+50, bubbleY, bubbleX+50, bubbleY-37.5);
         ctx.quadraticCurveTo(bubbleX+50, bubbleY-75, bubbleX+25, bubbleY-75);
         ctx.lineTo(bubbleX-10, bubbleY-100);
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
         setButtons("Character")
         currentSceneId.value = scene.id
        }
        function drawThemesBubble(scene){
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
           setButtons("Theme")
           //set scene id to one connected to leaf
           currentSceneId.value = scene.id
        }
        function drawPlotPointsBubble(scene){
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
         setButtons("Plot Point")
         //set scene id to one connected to leaf
         currentSceneId.value = scene.id
        }

        function removeChildAndBr(){
          //remove child node
          editMetaForm.removeChild(editMetaForm.firstChild)
          //remove deleteButton
          editMetaForm.removeChild(editMetaForm.firstChild)
          //remove <br>
          editMetaForm.removeChild(editMetaForm.firstChild)
        }
        function fetchUpdate(metaOrCharacter){
          if (metaOrCharacter === 0 || metaOrCharacter === 1) {
            let updatedMetaInfo = {
              id: editMetaForm.firstChild.id,
              content: editMetaForm.firstChild.value,
              theme_or_pp: 0,
              sceneId: currentSceneId.value
            }
            let configObj = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(updatedMetaInfo)
            }
            fetch(`http://localhost:3000/meta-contents/${editMetaForm.firstChild.id}/update`, configObj)
            .then(resp => resp.json())
            .then(function(object){
              console.log(object)
               //when response happens, update the old js object to reflect changes
               let metaToBeUpdated = currentScene().meta_contents.find(theme => theme.id === object.id)
               metaToBeUpdated.content = object.content
            }, false)
          } else if (metaOrCharacter === "character") {
            let updatedCharacterInfo = {
              id: editMetaForm.firstChild.id,
              name: editMetaForm.firstChild.value,
              sceneId: currentSceneId.value
            }
            let configObj = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify(updatedCharacterInfo)
            }
            fetch(`http://localhost:3000/characters/${editMetaForm.firstChild.id}/update`, configObj)
            .then(resp => resp.json())
            .then(function(object){
              console.log(object)
               //when response happens, update the old js object to reflect changes
               let characterToBeUpdated = currentScene().characters.find(char => char.id === object.id)
               characterToBeUpdated.name = object.name
            }, false)
          }
        }

        function populateEditForm(metaOrCharacter){
            let elementsArray
            if (metaOrCharacter === 0 || metaOrCharacter === 1){
              elementsArray = currentScene().meta_contents.filter(meta => meta.theme_or_pp === elementType())
            } else {
              elementsArray = currentScene().characters
            }
            elementsArray.forEach(function(element){
              let elementInput = document.createElement("input")
              let deleteButton = document.createElement("button")
              let lineBreak = document.createElement("br")

              elementInput.type = "text"

              if (metaOrCharacter === 0 || metaOrCharacter === 1){
                elementInput.name = element.content
                elementInput.value = element.content
              } else {
                elementInput.name = element.name
                elementInput.value = element.name
              }

              elementInput.id = element.id
              deleteButton.innerText = "Delete"

              deleteButton.addEventListener('click', (event)=>{
                event.preventDefault()
                elementInput.value = ""
              })
              editMetaForm.appendChild(elementInput)
              editMetaForm.appendChild(deleteButton)
              editMetaForm.appendChild(lineBreak)
            })
        }

        function fetchDelete(){
          if (elementType() === "character"){
            fetch(`http://localhost:3000/characters/${editMetaForm.firstChild.id}/destroy`)
            .then(resp=>resp.json())
            .then(function(object){
              console.log(object)
              //remove from scenesArray
              currentScene().characters = currentScene().characters.filter(char => char.id != object.id)
            })

          } else {
            fetch(`http://localhost:3000/meta-contents/${editMetaForm.firstChild.id}/destroy`)
              .then(resp=>resp.json())
              .then(function(object){
                console.log(object)
                //remove from scenesArray
                currentScene().meta_contents = currentScene().meta_contents.filter(meta => meta.id != object.id)
              })
          }
        }

        function evaluateForm(){
          if (editMetaForm.firstChild != document.getElementById("edit-themes")){
            if (editMetaForm.firstChild.value === ""){
                fetchDelete()
                removeChildAndBr()
              } else {
                fetchUpdate(elementType())
                removeChildAndBr()
              }
              evaluateForm()
          }
        }

        function submitNewMeta(){
          let url
          let elementInfo
              if (elementType() === "character"){
                url = "http://localhost:3000/characters"
                elementInfo = {
                  name: newMetaInputField.value,
                  sceneId: currentSceneId.value
                }
              }
              else {
                url = "http://localhost:3000/meta-contents"
                elementInfo = {
                  content: newMetaInputField.value,
                  theme_or_pp: elementType(),
                  sceneId: currentSceneId.value
              }}
          let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(elementInfo)
          }
          fetch(url, configObj)
          .then(resp => resp.json())
          .then(function(object){
            if (Object.keys(object).includes("content")){
              //make a new js object for the meta_content and add it to correct scene in scenesArray
              let newMeta = new MetaContent(
                object.id,
                object.content,
                object.theme_or_pp
              )
              console.log(newMeta)
              currentScene().meta_contents.push(newMeta)
              if (newMeta.theme_or_pp === 0){
                allThemes.push(newMeta)
                let themeOption = document.createElement("option")
                themeOption.value = newMeta.id + " " + newMeta.content
                themeOption.innerText = newMeta.content
                themesMenu.appendChild(themeOption)
              }
            } else{
              //make a new js object for the character and add it to correct scene in scenesArray
              let newCharacter = new Character(object.id, object.name)
              console.log(newCharacter)
              currentScene().characters.push(newCharacter)
              allCharacters.push(newCharacter)
              let charOption = document.createElement("option")
              charOption.value = newCharacter.id + " " + newCharacter.name
              charOption.innerText = newCharacter.name
              charactersMenu.appendChild(charOption)
            }
            addMetaModal.style.display = "none"
            newMetaInputField.value = ""
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            draw()
          })
        }

        function addExisting(){
          let elementInfo = {
            elementType: elementType(),
            elementId: parseInt(chooseExisting.value.split(" ")[0], 10)
          }
          let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(elementInfo)
          }
          fetch(`http://localhost:3000/scenes/${currentSceneId.value}/add-element`, configObj)
            .then(resp => resp.json())
            .then(function(object){
              console.log(object)
              //update scenesArray
              if (elementType() === "character"){
                currentScene().characters.push(allCharacters.find(char => char.id === elementInfo.elementId))
              } else {
                currentScene().meta_contents.push(allThemes.find(theme => theme.id === elementInfo.elementId))
              }
            })
        }

        function deleteScene(scene){
          //if the first element is scenesArray === scene then unshift
          if (scenesArray[0] === currentScene()){
            scenesArray.shift()
          } else {
            //else shift and push that element to end of array and call delete scene again
            scenesArray.push(scenesArray.shift())
            deleteScene(scene)
          }
        }

        function clearAllElements(){
          clearArray(scenesArray)
          clearArray(allCharacters)
          clearArray(allThemes)
        }
        function clearArray(array){
          if (array.length > 0){
            array.pop()
            clearArray(array)
          }
        }
        function displayTools(){
          toolsContainer.style.display = "flex"
          zoomContainer.style.display = "inline"
          sceneContainer.style.display = "inline"
          highlightsContainer.style.display = "inline"
        }
})
