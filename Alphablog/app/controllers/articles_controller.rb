class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]
  # before_action :require_user, except: [:show, :index]
  before_action :require_same_user, only: [:edit, :update, :destroy]

  def show
    article = Article.find(params[:id])
    
    article= article.attributes.merge({
        user:article.user,
        categories:article.categories
      })
    render :json => article
  end

  def index
    # if current_user
    # @articles = Article.where(user_id: current_user.followings<<current_user).paginate(page: params[:page], per_page: 6)
    # else
    # redirect_to login_path
    # end
    @articles=Article.all.map do |item|
      item.attributes.merge({
        user:item.user,
        categories:item.categories
      })
      end 
    render :json => @articles
  end

  def new
    @article = Article.new
  end

  def edit
  end

  def profile
    @articles=current_user.articles
    render :json => @articles
end

def follow
  # puts "ashish",params
  @user=User.find(params['c_user']['id'])
  # puts "hello" ,@cuser
  # puts
  @follow_user=User.find(params['follow']['id'])
  @follow_user.followers<<@user
  render json: {status: "successfull"}
end

def unfollow
  @user=User.find(params['unfollow']['id'])
  @current_user=User.find(params['c_user']['id'])
  @unfollow=Follow.where(follower_id: @current_user.id ,followed_user_id: @user.id).first
  @unfollow.destroy
  render json: {status: "successfull"}
end

  def create
    # byebug
    @article = Article.new(article_params)
    @article.user = User.find(current_user.id);
    # byebug
    @article.categories= Category.find(params[:category_ids])

    if @article.save
      print "we here"
      print @article
      # flash[:notice] = "Article was created successfully."
      # redirect_to @article

      render json: {
        status: :created,
        article: @article,
    }
    else
      render json: {
        status: 409
    }
    end
  end

  def update
    if @article.update(article_params)
      flash[:notice] = "Article was updated successfully."
      redirect_to @article
    else
      render 'edit'
    end
  end

  def destroy
    @article.destroy
    redirect_to articles_path
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :description, category_ids: [])
  end

  def require_same_user
    if current_user != @article.user && !current_user.admin?
      flash[:alert] = "You can only edit or delete your own article"
      redirect_to @article
    end
  end

end