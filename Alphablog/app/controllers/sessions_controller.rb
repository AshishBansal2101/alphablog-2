class SessionsController < ApplicationController
    include CurrentUserConcern
    def new
    end

    def create
        user=User.find_by(email:params[:session][:email].downcase)
        if user && user.authenticate(params[:session][:password])
            token= issue_token(user)
            session[:user_id]=user.id
            # flash[:notice]="Logged In Successfully"
            # redirect_to user
            p user;
            render json:{
                status: :created,
                logged_in: true,
                user: user,
                jwt: token
            }
        else
            # flash.now[:alert]=" There was something wrong with your Details"
            # render 'new'
            render json: { status: 401}
        end
    end 

    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    def destroy
        # session[:user_id]=nil
        # flash[:notice]="Logged Out"
        # redirect_to root_path
        reset_session
        render json: { status: 200, logged_out: true}
    end
    
end