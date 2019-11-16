Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :posts, :messages
    end
  end
end