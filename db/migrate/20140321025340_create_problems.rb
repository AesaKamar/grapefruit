class CreateProblems < ActiveRecord::Migration
  def change
    create_table :problems do |t|
      t.integer :problem_set_id
      t.text :body
      t.text :solution
      t.integer :worth, default: 1

      t.timestamps
    end
  end
end
