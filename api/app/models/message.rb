class Message < ApplicationRecord
  belongs_to :post
  has_many :panret_id, dependent: :delete_all
end
