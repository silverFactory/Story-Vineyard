class CreateScenes < ActiveRecord::Migration[6.1]
  def change
    create_table :scenes do |t|
      t.integer :story_id
      t.string :name
      t.string :location
      t.integer :x_pos
      t.integer :y_pos

      t.timestamps
    end
  end
end
