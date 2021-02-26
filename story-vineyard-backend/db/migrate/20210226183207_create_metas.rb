class CreateMetas < ActiveRecord::Migration[6.1]
  def change
    create_table :metas do |t|
      t.string :content
      t.integer :theme_or_pp

      t.timestamps
    end
  end
end
