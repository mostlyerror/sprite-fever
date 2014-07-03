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
	enable :sessions

	get '/' do
		haml :index
	end

	get '/editor' do 
		haml :canvas, layout: false
	end

	get '/moves' do
		response = @@firebase.get('sprites', { id: session[:spriteId] })
		@img_data = JSON.parse(response.response.body)[session[:spriteId]]['dataURL']
		haml :moves, layout: false
	end

	post '/sprites' do
		response = @@firebase.push("sprites", { dataURL: params['imgData'] })
		session[:spriteId] = JSON.parse(response.response.body)['name']
	end

	get '/dance' do
		haml :dance
	end

    run! if app_file == $0
end