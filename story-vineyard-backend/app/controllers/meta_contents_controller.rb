class MetaContentsController < ApplicationController
  def create
    meta_content = MetaContent.new(content: params[:content], theme_or_pp: params[:theme_or_pp])
    meta_content.scenes << Scene.find(params[:sceneId])
    meta_content.save
    render json: meta_content
  end
end
