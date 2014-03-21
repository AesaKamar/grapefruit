class RenameBodyToQuestionInProblems < ActiveRecord::Migration
  def change
    rename_column :problems, :body, :question
  end
end
