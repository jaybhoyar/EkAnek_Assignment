# frozen_string_literal: true

class Api::V1::RecordsController < Api::V1::BaseController
  # include ActiveStorage::Downloading
  skip_before_action :authenticate_user!, only: :show
  skip_before_action :authenticate_user_using_x_auth_token, only: :show
  before_action :find_public_record!, only: [:show]
  before_action :load_record!, only: [:destroy]

  def index
    records = current_user.records.all.map do |record|
      record.as_json.merge({ filename: record.filename})
    end
    render status: :ok, json: { records: records }
  end

  def show
    if @public_record.present?
      redirect_to Rails.application.routes.url_helpers.rails_blob_path(@record.file, disposition: "attachment", host: "http://localhost:3000")
    else
      render status: :unprocessable_entity, json: { error: @record.errors }
    end
  end

  def create
    record = current_user.records.new(record_params)
    record.slug = generate_slug
    if record.save
      render status: :ok, json: { notice: "File uploaded successfully"}
    else
      render status: :unprocessable_entity, json: { error: record.errors }
    end
  end

  def destroy
    @record.file.purge
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

    def find_public_record!
      @public_record = Record.find_by_slug(params[:slug])
    end

    def generate_slug
      loop do
        new_slug = [*("a".."z"), *("0".."9")].shuffle[0, 6].join
        break new_slug unless Record.where(slug: new_slug).exists?
      end
    end
end
