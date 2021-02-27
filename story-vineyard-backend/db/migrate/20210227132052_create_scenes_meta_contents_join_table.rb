class CreateScenesMetaContentsJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_join_table :meta_contents, :scenes
  end
end
