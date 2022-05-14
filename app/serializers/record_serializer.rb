class RecordSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :description, :file
  has_one :user

  def file
    rails_blob_path(object.file, only_path: true) if object.file.attached?
  end
end
