class StoriesController < ApplicationController
  def show
    story = Story.find(params[:id])
    full_story = {
      title: story.title,
      scenes: [],
      all_characters: story.characters.uniq,
      all_themes: story.meta_contents.themes.uniq
    }
    #return JSON with all of a Story's Scenes, all of a Scene's Characters, all of a Scene's MetaContent
    story.scenes.each do |scene|
      full_scene = {
        id: scene.id,
        name: scene.name,
        location: scene.location,
        x_pos: scene.x_pos,
        y_pos: scene.y_pos,
        characters: scene.characters,
        meta_contents: scene.meta_contents
      }
      full_story[:scenes] << full_scene
    end
    render json: full_story
  end
  def create
    user = User.find_by(username: params[:username])
    story = user.stories.build(title: params[:title])
    story.save
    render json: story
  end
end
