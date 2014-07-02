require 'sinatra/base'
require 'rubygems'
require 'haml'
require "sinatra/content_for"


class SpriteApp < Sinatra::Base
	helpers Sinatra::ContentFor
	set :public_folder, 'public'
	set :logging, :true
	# set :sessions, true

	get '/' do
		# erb :index
		haml :index
	end

	get '/editor' do 
		erb :canvas
	end

	# post '/editor', :provides => :json do
	post '/editor' do
		puts params.inspect
		# @sprite = params['dataURL']
		# erb :moves
		redirect '/moves'
	end

	get '/moves' do
		puts params.inspect
		# puts @sprite
		erb :moves
	end

    run! if app_file == $0
end