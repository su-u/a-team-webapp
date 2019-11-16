module Api
  module V1
    class MessagesController < ApplicationController
        before_action :set_param, only: [:update, :destroy]
        def create
            message = Message.new(params.require(:message).permit(:post_id, :body))
            if message.save
            render json: { status: 'SUCCESS', data: message }
            else
            render json: { status: 'ERROR', data: message.errors }
            end
        end

      def destroy
        
        @message.destroy
        render json: { status: 'SUCCESS', message: 'Deleted the post', data: @message }
      end


        def update
        if @message.update(params.require(:message).permit(:body))
          render json: { status: 'SUCCESS', message: 'Updated the post', data: @message }
        else
          render json: { status: 'SUCCESS', message: 'Not updated', data: @message.errors }
        end
      end
      
      private
     def set_param
        @message = Message.find(params[:id])
      end

    end
    end
end