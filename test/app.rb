require 'rubygems'
require 'sinatra/base'
require 'sinatra/content_for'
require 'sinatra/reloader'
require 'haml'
require 'json'
require 'firebase'
require 'pry'

class SpriteApp < Sinatra::Base

	@@base_uri = 'https://flickering-fire-2267.firebaseio.com/'
	@@firebase = Firebase::Client.new(@@base_uri)

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

	get '/moves' do
		haml :moves, layout: false
	end

	post '/sprites/new' do
		response = @@firebase.push("sprites", { dataURL: params['imgData'] })

		content_type :json
		response.body.merge({imgData: params['imgData']}).to_json
		# :imgData => response.response.request.options[:body]
	end

	get '/dance' do
		haml :dance
	end

    run! if app_file == $0
end