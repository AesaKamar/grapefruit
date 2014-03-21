class ProblemsController < ApplicationController

    before_filter :authenticate_user!
    before_filter :get_course
    before_filter :get_capsule
    before_filter :get_capsules
    before_filter :get_problem_set
    before_filter :get_problem, only: [:update, :destroy]

    layout "course"

    def create
        @problem = @problem_set.problems.new(problem_params)
        if @problem.save
            msg = { status: :success, msg: "Problem saved!" }
        else
            msg = { status: :error, msg: "Failed to save!" }
        end
        respond_to do |format|
            format.json { render json: msg }
        end
    end

    def update
        if @problem.update_attributes(problem_params)
            msg = { status: :success, msg: "Problem updated!" }
        else 
            msg = { status: :error, msg: "Failed to save!" }
        end
        respond_to do |format|
            format.json { render json: msg }
        end
    end

    def destroy
        @problem.destroy
        msg = { status: :success, msg: "Problem deleted!" }
        respond_to do |format|
            format.json { render json: msg }
        end
    end

private

    def problem_params
        params.require(:problem).permit(:question, :solution)
    end

    def get_problem
        @problem = @problem_set.problems.find(params[:problem_id] || params[:id])
        unless @problem.present?
          flash[:error] = "Invalid problem!"
          redirect_to root_path
        end
    end

end