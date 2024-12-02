<?php

// example on using PHPMailer with GMAIL

include("PHPMailer/class.phpmailer.php");
include("PHPMailer/class.smtp.php"); // note, this is optional - gets called from main class if not already loaded

error_reporting(E_ALL ^ E_DEPRECATED);

if(isset($_POST['send_mail_submit'])){

/*start send mail*/
	$emailAdmin 	  = 'info@world-one.co.id';
	$nameAdmin		  = '【メールグループ】';

	$mail             = new PHPMailer();
	$mail->IsSMTP();
	$mail->CharSet    = 'UTF-8';
	$mail->SMTPAuth   = true;                  // enable SMTP authentication
	$mail->SMTPSecure = "tls";                 // sets the prefix to the servier
	$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
	$mail->Port       = 587;                   // set the SMTP port

	$mail->Username   = "info@world-one.co.id";  // GMAIL username
	$mail->Password   = "pkspkspks";            // GMAIL password
	//$mail->Host       = "pop.gmail.com";

	// $mail->Username   = "asean-all@asean-onoff.com";  // GMAIL username
	// $mail->Password   = "86V7h15k";            // GMAIL password
	// $mail->Host       = "mail.asean-onoff.com";
	
	$mail->From       = "info@world-one.co.id";
	$mail->WordWrap   = 50; // set word wrap
	$mail->Subject    = "【World One Indenesia : Request】へのお問い合わせ";
	$mail->FromName   = "【World One Indenesia : Request】へのお問い合わせ";
	$mail->IsHTML(true); // send as HTML
	
/*get info from front*/
	$mail_name 					= isset($_POST['mail_name'])?$_POST['mail_name']:'';
	$mail_email 				= isset($_POST['mail_email'])?$_POST['mail_email']:'';
	$email_address 			= isset($_POST['email_address'])?$_POST['email_address']:'';
	$mail_message 			= isset($_POST['mail_message'])?$_POST['mail_message']:'';
/*end get info*/

/*--------------send mail to Admin----------------*/
	$body             		= file_get_contents('PHPMailer/contents.html');
	$body             		= eregi_replace("[\]",'',$body);

	/*replace with content*/
	$body = str_replace('{mail_name}', $mail_name, $body);
	$body = str_replace('{mail_email}', $mail_email, $body);
	$body = str_replace('{email_address}', $email_address, $body);
	$body = str_replace('{mail_message}', $mail_message, $body);
	$mail->MsgHTML($body);

	$mail->AddReplyTo($mail_email, $mail_name);

	$mail->AddAddress($emailAdmin, $nameAdmin);

	$result_send_Admin = $mail->Send();
/*end send mail to Admin*/

/*--------------send mail to User----------------*/
	$body_auto_rep			= file_get_contents('PHPMailer/autorep.html');
	$body_auto_rep 			= eregi_replace("[\]",'',$body_auto_rep);
	$mail->ClearAddresses();
	$mail->ClearReplyTos();
	$mail->MsgHTML($body_auto_rep);
	$mail->AddAddress($mail_email, $mail_name);

	$result_send_User 		= $mail->Send();
/*end mail to User*/

	if(!$result_send_Admin && !$result_send_User) {
	  echo "Mailer Error: " . $mail->ErrorInfo;
	  $data['status'] 	= FALSE;
	  echo json_encode($data);
	} else {
	  //echo "Message has beetruen sent";
	  $data['status'] 	= 'TRUE';
	  echo json_encode($data);
	}
/*end send mail*/
}

?>