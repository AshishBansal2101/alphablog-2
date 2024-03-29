class UsersController < ApplicationController

    # before_action :set_user,only: [:show, :edit, :update ,:destroy]
    # before_action :require_user,only: [:edit, :update, :destroy]
    # before_action :require_same_user,only: [:edit, :update, :destroy]

    def new
        @user=User.new
    end

    def show
        # @articles=@user.articles.paginate(page: params[:page], per_page: 4)
        @user=User.find(params[:id])
        # puts "ashish" ,@user.articles
        @user=@user.attributes.merge({
            articles:
                @user.articles,
            followers:@user.followers,
            followings:@user.followings
          })
        render :json => @user
    end

    def index
        @user=User.all.map do |item|
            item.attributes.merge({
                articles:
                item.articles,
            followers:item.followers,
            followings:item.followings
            })
            end 
        render :json => @user

    end




        
    def edit
    end

    def update
        if @user.update(user_params)
            flash[:notice]="User Details updated successfully"
            redirect_to @user
        else
            render 'edit'
        end
    end

    def create
        # @user=User.new(user_params)
        @user=User.create!(
            username: params['user']['username'],
            email: params['user']['email'],
            password: params['user']['password']
        )
        if @user
            token=issue_token(@user);
            # flash[:notice]="welcome to alpha blog #{@user.username} , Your account Was Created Successfully"
            session[:user_id]=@user.id
            render json: {
                status: :created,
                user: @user,
                jwt: token
            }
            # redirect_to articles_path 
        else
            # render 'new'
            render json: {status: 500}
        end
    end

    

    

    def destroy
        @user.destroy
        session[:user_id]=nil if @user == current_user
        flash[:notice]="Account and Associated Articles Has Been Deleted"
        redirect_to articles_path
    end

    private

    def user_params
        params.require(:user).permit(:username,:email,:password)
    end

    def set_user
        @user=User.find(params[:id])
    end

    def require_same_user 
        if current_user!=@user && !current_user.admin?
            flash[:alert]="You Can Only Update And Delete Your Own Profile"
            redirect_to @user
        end 
    end

end
