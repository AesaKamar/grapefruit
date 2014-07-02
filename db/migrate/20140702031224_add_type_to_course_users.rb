class AddTypeToCourseUsers < ActiveRecord::Migration
  def change
    add_column :course_users, :type, :integer, default: 0
  end
end
