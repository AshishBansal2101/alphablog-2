class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    helper_method :current_user, :logged_in?, :followed
    # include ActionController::Cookies
    def current_user 
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

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
