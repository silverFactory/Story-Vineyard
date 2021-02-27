class Story < ApplicationRecord
  belongs_to :user
  has_many :scenes
end
