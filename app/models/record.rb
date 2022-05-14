# frozen_string_literal: true

class Record < ApplicationRecord
  belongs_to :user

  has_one_attached :file, dependent: :destroy
end
