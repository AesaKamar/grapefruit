class ProblemSetsController < ApplicationController

  before_filter :get_course
  before_filter :get_capsule
  before_filter :get_capsules, only: [:new, :show, :edit]
  before_filter :get_problem_set, only: [:show, :edit, :update, :destroy, :iframe]
  before_filter :authenticate_user!

  layout :get_layout

  def new
    @problem_set = @capsule.problem_sets.new
  end

  def create
    @problem_set = @capsule.problem_sets.new(problem_set_params)
    if @problem_set.save
      flash[:success] = "Problem set created!"
      redirect_to [@course, @capsule, @problem_set]
    else
      render 'new'
    end
  end

  def show
  end

  def edit
    authorize! :update, @problem_set
    @problem_set.problems.new
  end

  def update
    authorize! :update, @problem_set
    if @problem_set.update_attributes(problem_set_params)
      flash[:success] = "Problem set updated!"
      redirect_to [@course, @capsule, @problem_set]
    else
      render "edit"
    end
  end

  def destroy
    @problem_set.destroy
    redirect_to :back
  end

  def iframe
    @url = @problem_set.webwork_url
  end

private

  def get_layout
    if ["new", "show", "edit"].include? action_name
      "course"
    elsif action_name == "iframe"
      "lofi"
    else
      "home"
    end
  end

  def get_problem_set
    @problem_set = ProblemSet.find(params[:problem_set_id] || params[:id])
    unless @problem_set.present?
      flash[:error] = "Invalid problem set!"
      redirect_to root_path
    end
  end

  def problem_set_params
    params.require(:problem_set).permit(:name, :webwork_url)
  end

end
