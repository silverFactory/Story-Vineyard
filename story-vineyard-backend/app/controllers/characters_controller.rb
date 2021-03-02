class CharactersController < ApplicationController
  def create
    # byebug
    character = Character.new(name: params[:name])
    character.scenes << Scene.find(params[:sceneId])
    character.save
    render json: character
  end
end
