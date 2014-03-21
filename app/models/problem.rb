# == Schema Information
#
# Table name: problems
#
#  id             :integer          not null, primary key
#  problem_set_id :integer
#  body           :text
#  solution       :text
#  worth          :integer          default(1)
#  created_at     :datetime
#  updated_at     :datetime
#

class Problem < ActiveRecord::Base
end
