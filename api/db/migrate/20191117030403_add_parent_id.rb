class AddParentId < ActiveRecord::Migration[6.0]
  def change
        add_reference :messages, :parent, null: true, foreign_key: { to_table: :messages }
  end
end
