Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login' => 'sessions#create'
  get '/stories/:id' => 'stories#show'
  post '/meta-contents' => 'meta_contents#create'
  post '/meta-contents/:id/update' => 'meta_contents#update'
  post '/characters' => 'characters#create'
  post '/characters/:id/update' => 'characters#update'
  post '/scenes' => 'scenes#create'
end
