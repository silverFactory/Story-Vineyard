class CreateMetaContents < ActiveRecord::Migration[6.1]
  def change
    create_table :meta_contents do |t|
      t.string :content
      t.integer :theme_or_pp

      t.timestamps
    end
  end
end
