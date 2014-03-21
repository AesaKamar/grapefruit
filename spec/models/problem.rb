require 'spec_helper'

describe Problem do

    valid_solutions = [
        ['PI', 'PI'],
        ['PI', '(PI)'],
        ['PI', '[PI]'],
        ['PI', '([PI])'],
        ['(PI)', '([PI])'],
        ['[(PI)]', '([PI])'],
        ['-PI', '-PI'],
        ['-PI', '-[(PI)]'],
        ['-PI', '-(PI)'],
        ['-PI', '-[PI]'],
        ['-PI', '-[([PI])]'],
        ['x^2y^3', 'y^3x^2'],
        ['x^2y^3', 'y^(3)x^(2)'],
        ['x^2y^3', '(y^(3))(x^(2))'],
        ['x^(2)y^(3)', '(y^(3))(x^(2))'],
        ['(x^(2))*(y^(3))', 'y^3x^2'],
    ]

    invalid_solutions = [
        ['PI', 'Not PI'],
        ['PI', 'PI)'],
        ['PI', 'PI]'],
        ['PI', '[PI'],
        ['PI', '(PI]'],
        ['-PI', 'PI'],
        ['-PI', '[(PI)]'],
        ['-PI', '(PI)'],
        ['-PI', '[PI]'],
        ['-PI', '[([PI])]'],
        ['x^2y^3', 'y^3x^3/x']
        ['x^2y^3', 'y^3x^3/x^1']
        ['x^2y^3', '(y^3x^3)/(x^1)']
    ]

    describe "valid solutions" do
        valid_solutions.each do |expected, given|
            problem = Problem.new(question: "question", solution: expected)
            it "should accept #{given} for #{expected}" do
                problem.valid_answer?(given).should be_true
            end
        end
    end

    describe "invalid solutions" do
        invalid_solutions.each do |expected, given|
            problem = Problem.new(question: "question", solution: expected)
            it "should not accept #{given} for #{expected}" do
                problem.valid_answer?(given).should be_false
            end
        end
    end

end