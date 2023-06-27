class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorized

  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    !!current_user
  end

  def authorized
    render json: { message: 'Unauthorized request', status: 'error' }, status: :unauthorized unless logged_in?
  end

end
