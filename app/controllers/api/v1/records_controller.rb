# frozen_string_literal: true

class Api::V1::RecordsController < Api::V1::BaseController
  include Rails.application.routes.url_helpers
  before_action :load_record!, only: [:destroy]

  def index
    records = []
    current_user.records.all.each do |record|
      file_details = file_path_with_name(record.file)
      records << Hash[record: record, file_details: file_details]
    end
    render status: :ok, json: { records: records }
  end

  def create
    record = current_user.records.new(record_params)
    if record.save
      render status: :ok, json: { notice: "File successfully uploaded" }
    else
      render status: :unprocessable_entity, json: { error: record.errors }
    end
  end

  def destroy
    if @record.destroy
      render status: :ok, json: { notice: "Record has been removed successfully." }
    else
      render status: :unprocessable_entity, json: { error: @record.errors }
    end
  end

  private

    def record_params
      params.require(:record).permit(:title, :description, :file)
    end

    def load_record!
      @record = current_user.records.find(params[:id])
    end

    def file_path_with_name(file)
      {
        name: file.filename,
        url: rails_blob_path(file, only_path: true),
        full_path: url_for(file),
      }
    end
end
