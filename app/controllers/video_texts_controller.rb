class VideoTextsController < ApplicationController

  before_filter :authenticate_user!
  before_filter :get_course
  before_filter :get_capsule
  before_filter :get_all_course_capsules
  before_filter :get_lecture
  before_filter :get_video
  before_filter :get_video_text, only: [:show, :edit, :update, :destroy]

  layout "course"

  def new
    @video_text = @video.video_texts.new
  end

  def create
    @video_text = @video.video_texts.new(video_text_params)

    if @video_text.save
      flash[:success] = "Video text added!"
      redirect_to [@course, @capsule, @lecture]
    else
      redirect_to(request.fullpath)
    end
  end

  def show
  end

  def edit
  end

  def update
    if @video_text.update_attributes(video_text_params)
      flash[:success] = "Video annotation updated!"
      redirect_to [@course, @capsule, @lecture]
    else
      render :edit
    end
  end

  def destroy
    @video_text.destroy
    redirect_to :back
  end

private

  def video_text_params
    params.require(:video_text).permit(:content, :time)
  end

  def get_video_text
    @video_text = @video.video_texts.find(params[:video_text_id] || params[:id])
    unless @video_text.present?
      flash[:error] = "Invalid video annotation!"
      redirect_to [@course, @capsule, @lecture]
    end
  end

end
