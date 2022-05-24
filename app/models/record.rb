# frozen_string_literal: true

class Record < ApplicationRecord
  belongs_to :user

  has_one_attached :file, dependent: :destroy

  validates :title, :description, presence: true
  validates_uniqueness_of :slug

  def filename
    self.file.blob.filename
  end
end
