class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    helper_method :current_user, :logged_in?, :followed
    # include ActionController::Cookies




    def jwt_key
        Rails.application.credentials.jwt_key
    end

    def issue_token(user)
        JWT.encode({user_id: user.id}, jwt_key, "HS256")
    end

    def decoded_token
        begin
            JWT.decode(token, jwt_key, true, { :algorithm => 'HS256' })
        rescue => exception
            [{error: "Invalid Token"}]
        end    
    end
    
    def token
        request.headers["Authorization"]
    end

    def user_id
        decoded_token.first["user_id"]
    end

    def current_user
        user ||= User.find_by(id: user_id)
    end

    








    # def current_user 
    #     @current_user ||= User.find(session[:user_id]) if session[:user_id]
    # end

    def logged_in?
        !!current_user
    end

    def require_user 
        if !logged_in?
            flash[:alert]= "You Must Be Logged In To Perform That Action"
            redirect_to login_path
        end 
    end

    def followed(user)
        return Follow.where(follower_id: @current_user.id ,followed_user_id: user.id).exists?
    end

end
