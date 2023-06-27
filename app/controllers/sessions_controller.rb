# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authorized, only: [:create]
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

  def destroy
    session.delete(:user_id)

    render json: { message: 'Logout successfull' }, status: :ok
  end

  private

  def login_params
    params.require(:user).permit(:username, :password)
  end
end
