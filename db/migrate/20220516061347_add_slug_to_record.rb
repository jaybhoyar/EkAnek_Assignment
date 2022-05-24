class AddSlugToRecord < ActiveRecord::Migration[6.1]
  def change
    add_column :records, :slug, :string, null: false
  end
end
