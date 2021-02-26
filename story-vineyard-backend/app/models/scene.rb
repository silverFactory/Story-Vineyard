class Scene < ApplicationRecord
  belongs_to :story
  has_many :character_scenes
  has_many :characters, through: :character_scenes
  has_many :meta_scenes
  has_many :metas, through: :meta_scenes
end
