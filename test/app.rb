require 'sinatra'

set :public_folder, 'public'


get '/' do 
	erb :index
end

get '/editor' do 
	erb :canvas
end