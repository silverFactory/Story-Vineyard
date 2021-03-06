Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login' => 'sessions#create'
  get '/stories/:id' => 'stories#show'
  post '/stories' => 'stories#create'
  post '/meta-contents' => 'meta_contents#create'
  post '/meta-contents/:id/update' => 'meta_contents#update'
  get 'meta-contents/:id' => 'meta_contents#show'
  get 'meta-contents/:id/destroy' => 'meta_contents#destroy'
  #post 'meta-contents/:id/add-scene' => 'meta_contents#add-scene'
  post '/characters' => 'characters#create'
  post '/characters/:id/update' => 'characters#update'
  get 'characters/:id' => 'characters#show'
  get 'characters/:id/destroy' => 'characters#destroy'
  #post 'characters/:id/add-scene' => 'characters#add_scene'
  post '/scenes' => 'scenes#create'
  post '/scenes/:id' => 'scenes#update'
  post '/scenes/:id/add-element' => 'scenes#add_element'

end
