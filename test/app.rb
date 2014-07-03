require 'sinatra/base'
require 'rubygems'
require 'haml'
require "sinatra/content_for"
require "sinatra/reloader"

class SpriteApp < Sinatra::Base

	configure :development do
		register Sinatra::Reloader
	end
	
	helpers Sinatra::ContentFor
	set :public_folder, 'public'
	set :logging, :true
	# set :sessions, true

	get '/' do
		haml :index
	end

	get '/editor' do 
		haml :canvas, layout: false
	end

	# post '/editor' do
	# 	redirect '/moves'
	# end

	get '/moves' do
		haml :moves, layout: false
	end

    run! if app_file == $0
end