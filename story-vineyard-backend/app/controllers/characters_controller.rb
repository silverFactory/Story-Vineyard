class CharactersController < ApplicationController
  def create
    character = Character.new(name: params[:name])
    character.scenes << Scene.find(params[:sceneId])
    character.save
    render json: character
  end
  def update
    character = Character.find(params[:id])
    character.update(name: params[:name])
    render json: character
  end
  def show
    character = Character.find(params[:id])
    scenes = character.scenes
    render json: scenes
  end
  def destroy
    sucess = {
      message: "character destroyed",
      id: params[:id]
    }
    character = Character.find(params[:id])
    character.destroy
    render json: sucess
  end
end
