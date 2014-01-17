class VideosController < ApplicationController
  require 'youtube_it'
  require 'yaml'

  before_filter :authenticate_user!
  before_filter :get_course
  before_filter :get_capsule
  before_filter :get_lecture

  layout "home"

  def show
    @video = @lecture.videos.find(params[:id])
  end

  def new
    @video = @lecture.videos.new
  end

  def create
    @video = @lecture.videos.new(video_params)
    @video[:file] = video_params[:file].tempfile.path
    if @video.save
      client = getYoutubeClient()
      client.video_upload(File.open(@video[:file]), :title => @video[:title], :description => @video[:description], :category => 'People',:keywords => %w[grapefruit lecture video])
      flash[:success] = "Video created!"
      redirect_to [@course, @capsule, @lecture]
    else
      redirect_to root_path
    end
  end

  def destroy
    @video = @lecture.videos.find(params[:id])
    @video.destroy
    redirect_to :back
  end

private
  def video_params
    params.require(:video).permit(:title, :description, :file)
  end

  def getYoutubeClient
    config = YAML.load("/config/config.yml")[RAILS_ENV]
    username = config['youtube']['username']
    password = config['youtube']['password']
    dev_key = config['youtube']['dev_key']
    client = YouTubeIt::Client.new(:username => username, :password => password, :dev_key => dev_key)
  end
end
