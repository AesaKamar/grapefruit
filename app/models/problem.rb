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
		first = Problem.elements_from_math(self.solution)
		second = Problem.elements_from_math(soln)
		return first != false && second != false && first.to_s == second.to_s 
	end

	def self.elements_from_math(math)
		reversible_parens = {
			'(' => ')',
			'[' => ']',
			'{' => '}'
		}
		unary_operations = ['+', '-']
		binary_operations = ['+', '-', '*', '/', '^']
		result = []

		parens = []
		last_binary_operation = last_unary_operation = last_element = this_element = nil
		math.split("").each do |i|
			puts "i: #{i}, last_bin: #{last_binary_operation}, last_una: #{last_unary_operation}, last_el: #{last_element}"
			if reversible_parens.has_key?(i)
				parens.push(i)
				if last_element.present? && last_binary_operation.nil?
					# Implicit multiplication: (x)(y) = (x)*(y)
					puts "FOUND IMPLICIT"
					puts last_element.to_s
					last_binary_operation = "*"
				end
			elsif reversible_parens.has_value?(i)
				paren = parens.pop
				if reversible_parens[paren] != i
					# Error: unmatched parens
					return false
				end
			elsif unary_operations.include?(i) && last_element.nil?
				last_unary_operation = i
			elsif binary_operations.include?(i)
				if last_element.nil?
					# Error: operation without element, for example *2
					return false
				else
					last_binary_operation = i
				end
			else
				this_element = Element.new(i)
				if last_unary_operation.present?
					last_element = UnaryOperation.new(this_element, last_unary_operation)
					last_unary_operation = nil
				elsif last_binary_operation.present?
					last_element = BinaryOperation.new(last_element, last_binary_operation, this_element)
					last_binary_operation = nil
				else
					last_element = this_element
				end
			end
		end
		return false unless parens.empty?
		last_element
	end

	class Element
		attr_accessor :name
		def initialize(name)
			@name = name
		end
		def to_s
			@name.to_s
		end
	end

	class Operation
		attr_accessor :element, :operation
		def initialize(elements, operation)
			@elements = elements
			@operation = operation
		end
		def allows_multiple?
			['*', '+'].include?(@operation)
		end
		def push(el)
			if allows_multiple?
				@elements.push(el)
			end
		end
		def to_s
			"#{@operation}(#{@element.to_s})"
		end
	end

	class BinaryOperation
		attr_accessor :left_element, :operation, :right_element
		def initialize(left_element, operation, right_element)
			@left_element = left_element
			@operation = operation
			@right_element = right_element
		end
		def reversible?
			return !["-", "/", "^"].include?(operation)
		end
		def in_order?
			return true unless reversible?
			# if @left_element.is_a? Element and @right_element.is_a? Element
				return @left_element.to_s < @right_element.to_s
			# else
				# return true
			# end
		end
		def reverse!
			return unless reversible?
			tmp = self.left_element
			self.left_element = self.right_element
			self.right_element = tmp
		end
		def to_s
			if @operation == "-"
				@right_element = UnaryOperation.new(@right_element, "-")
				@operation = "+"
			end
			if reversible? && !in_order?
				reverse!
			end
			"(#{@left_element.to_s})#{@operation}(#{@right_element.to_s})"
		end
	end

end
