class ScenesController < ApplicationController
  def create
    story = Story.find_by(title: params[:storyTitle])
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
end
