 class Story {
   constructor(id, title){
     this.id = id
     this.title = title
   }
 }
class Scene {
  constructor(id, name, location, x_pos, y_pos, characters, meta_contents){
    this.id = id
    this.name = name
    this.location = location
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.characters = characters
    this.meta_contents = meta_contents
  }
}
class Character{
  constructor(id, name){
    this.id = id
    this.name = name
  }
}
class MetaContent{
  constructor(id, content, theme_or_pp){
    this.id = id
    this.content = content
    this.theme_or_pp = theme_or_pp
  }
}
