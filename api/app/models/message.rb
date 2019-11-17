class Message < ApplicationRecord
  belongs_to :post
  # belongs_to :message
  # has_many :message, dependent: :delete_all
end
