# frozen_string_literal: true

class SessionsController < ApplicationController
  wrap_parameters :user, include: %i[username password]

  def create
    @user = User.find_by(username: login_params[:username])

    if @user&.authenticate(login_params[:password])
      session[:user_id] = @user.id

      render json: { user: UserSerializer.new(@user), status: 'ok' }, status: :accepted
    else
      render json: { message: 'Invalid username or password', status: 'error' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.require(:user).permit(:username, :password)
  end
end
