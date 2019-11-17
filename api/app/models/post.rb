class Post < ApplicationRecord
    has_many :message, dependent: :destroy
end
