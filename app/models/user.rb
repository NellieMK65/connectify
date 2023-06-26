# frozen_string_literal: true
class User < ApplicationRecord
  validates :first_name, :last_name, :username, :email, presence: true
  validates :username, :phone, :email, uniqueness: true

  # only available when using bcrypt
  has_secure_password
end
