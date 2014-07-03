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
		haml :index
	end

	get '/editor' do 
		haml :canvas
	end

	post '/editor' do
		puts params.inspect
		redirect '/moves'
	end

	get '/moves' do
		haml :moves
	end

    run! if app_file == $0
end