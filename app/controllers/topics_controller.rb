class TopicsController < ApplicationController

  before_filter :authenticate_user!
  before_filter :get_topic, only: [:show]
  before_filter :get_course, only: [:show, :index, :create, :new]

  layout "home"

  def new
    @topic = @course.topics.new
  end

  def index
    @topics = @course.topics.paginate(page: params[:page])
  end

  def show
    @replies = @topic.replies.paginate(page: params[:page], per_page: 10)
    @reply = Reply.new
  end

  def create
    @topic = current_user.topics.new(params.require(:topic).permit(:name, :body))
    @topic.course = @course
    @topic.last_poster = current_user
    if @topic.valid?
      @topic.save
      flash[:success] = "Topic created!"
      redirect_to [@course, @topic]
    else
      render "new"
    end
  end
end
