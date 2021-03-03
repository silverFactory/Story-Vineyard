class MetaContent < ApplicationRecord
  has_and_belongs_to_many :scenes

  scope :themes, -> {where(theme_or_pp: 0)}
end
