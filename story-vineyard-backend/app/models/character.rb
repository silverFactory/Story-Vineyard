class Character < ApplicationRecord
  # has_many :character_scenes
  # has_many :scenes, :through => :character_scenes
  has_and_belongs_to_many :scenes
end
