class Story < ApplicationRecord
  belongs_to :user
  has_many :scenes
  # has_many :characters, through: :scenes
  # has_many :meta_contents, through: :scenes
end
