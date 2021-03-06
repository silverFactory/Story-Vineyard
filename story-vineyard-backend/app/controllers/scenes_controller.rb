class ScenesController < ApplicationController
  def create
    story = Story.find(params[:storyId])
    scene = story.scenes.build(name: params[:name], location: params[:location], x_pos: params[:x_pos], y_pos: params[:y_pos])
    scene.save
    render json: scene
  end
  def update
    scene = Scene.find(params[:id])
    scene.update(x_pos: params[:x_pos], y_pos: params[:y_pos])
    scene.save
    render json: scene
  end
  def add_element
    scene = Scene.find(params[:id])
    if params[:elementType] == "character"
      character = Character.find(params[:elementId])
      scene.characters << character
    else
      meta = MetaContent.find(params[:elementId])
      scene.meta_contents << meta
    end
    scene.save
    render json: scene
  end
  def destroy
     success = {
      message: "scene with id #{params[:id]} was destroyed"
    }
    scene = Scene.find(params[:id])
    scene.destroy
    render json: success
  end
end
