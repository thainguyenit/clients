function sendMail(){
	$(".waiting").show();
	var mail_name 				= $('#mail_name').val();
	var mail_email 				= $('#mail_email').val();
	var mail_address			= $('#email_address').val();
	var mail_message			= $('#mail_message').val();

	var send_mail_submit	= $('#send_mail_submit').val();

	var jsonData = {
					mail_name					: mail_name, 
					mail_email				: mail_email,
					mail_address			: mail_address,
					mail_message 			: mail_message,
					send_mail_submit	: send_mail_submit
					};

	$('#sendingMail').show();
			//$('#send_mail_submit').hide();
			var url = 'sendmail/sendMail.php';
			var request = $.ajax({
								url: url,
								type: "POST",
								data: jsonData
							});
		
			request.done(function(msg) {
				$(".waiting").hide();
				//alert(msg);
				if(msg != ''){
				var result = jQuery.parseJSON(msg);
					if(result['status'] == 'TRUE'){
						alert( "Send Mail Successful!");
					}else{
						alert( "Send Mail FALSE" + result['msg']);
					}	
				}else{
					alert("Send Mail Successful!");	
				}
				
				window.location = location.href;
			});
		
			request.fail(function(jqXHR, textStatus) {
				$(".waiting").hide();
				alert( "Send Mail failed: ");
			});
}