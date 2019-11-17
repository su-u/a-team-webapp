module Api
  module V1
    class MessagesController < ApplicationController
        before_action :set_param, only: [:update, :destroy]

      def index
        messages = Message.order(created_at: :desc)
        render json: { status: 'SUCCESS', message: 'Loaded posts', data: messages }
      end


        def create
            message = Message.new(message_params)
            if message.save
            render json: { status: 'SUCCESS', data: message }
            else
            render json: { status: 'ERROR', data: message.errors }
            end
        end

      def destroy
        Message.where(parent_id: params[:id]).delete_all
        @message.destroy
        render json: { status: 'SUCCESS', message: 'Deleted the post', data: @message }
      end


        def update
        if @message.update(message_params)
          render json: { status: 'SUCCESS', message: 'Updated the post', data: @message }
        else
          render json: { status: 'SUCCESS', message: 'Not updated', data: @message.errors }
        end
      end
      
      private
     def set_param
        @message = Message.find(params[:id])
      end
      def message_params
        params.require(:message).permit(:post_id, :body, :parent_id)
      end

    end
    end
end