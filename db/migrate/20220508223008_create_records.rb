class CreateRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :records, id: :uuid do |t|
      t.string :title
      t.string :description
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.timestamps
    end
  end
end
