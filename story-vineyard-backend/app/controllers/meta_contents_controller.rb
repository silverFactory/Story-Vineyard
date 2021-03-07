class MetaContentsController < ApplicationController
  def create
    meta_content = MetaContent.new(content: params[:content], theme_or_pp: params[:theme_or_pp])
    meta_content.scenes << Scene.find(params[:sceneId])
    meta_content.save
    render json: meta_content
  end
  def update
    meta_content = MetaContent.find(params[:id])
    meta_content.update(content: params[:content])
    render json: meta_content
  end
  def show
    theme = MetaContent.find(params[:id])
    scenes = theme.scenes
    render json: scenes
  end
  def destroy
    success = {
      message: "meta_content destroyed",
      id: params[:id]
    }
    meta_content = MetaContent.find(params[:id])
    meta_content.destroy
    render json: success
  end
end
