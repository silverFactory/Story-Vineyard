class CreateCharactersScenesJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_join_table :characters, :scenes 
  end
end
