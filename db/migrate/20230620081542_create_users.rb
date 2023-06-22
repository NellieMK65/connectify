class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.text :first_name, null: false
      t.text :last_name, null: false
      t.string :phone, index: { unique: true }
      t.string :email, null: false, index: { unique: true }
      t.string :username, null: false, index: { unique: true }
      t.string :bio
      t.string :avatar

      t.timestamps
    end
  end
end
