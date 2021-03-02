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
end
