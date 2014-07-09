'use strict';

app.factory('messageService', function(){
	
	var messageService = {};
	
	messageService.SendMessage = function(data){
		
		var message_object = {
			
			thread_id: data.thread_id,
			time: messageService.getTime(),
			text: data.message,
			own: true
			
		}
		
		return message_object;
		
	}
	
	messageService.ReceiveMessage = function(data){
		
		var message_object = messageService.SendMessage(data);
		message_object.own = false;

		return message_object;
		
	}
	
	messageService.getTime = function(){
		
		var date = new Date();
		
		return date.toLocaleString();
		
	}
	
	return messageService;
	
})