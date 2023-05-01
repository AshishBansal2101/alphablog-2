Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'localhost:5173'  # Add the origin of your React application
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
    end
  end
  

  
  
  
    