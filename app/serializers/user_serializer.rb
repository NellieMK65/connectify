class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone, :email, :username, :bio, :avatar, :created_at, :updated_at
end
