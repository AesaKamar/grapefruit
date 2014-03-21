# == Schema Information
#
# Table name: problems
#
#  id             :integer          not null, primary key
#  problem_set_id :integer
#  question       :text
#  solution       :text
#  worth          :integer          default(1)
#  created_at     :datetime
#  updated_at     :datetime
#

class Problem < ActiveRecord::Base

    # Relationships
    belongs_to :problem_set

    def valid_answer?(soln)
        return solution == soln
    end

end
