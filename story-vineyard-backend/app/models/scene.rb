class Scene < ApplicationRecord
  belongs_to :story
  # has_many :character_scenes
  # has_many :characters, :through => :character_scenes
  has_and_belongs_to_many :characters
  has_and_belongs_to_many :meta_contents
end
