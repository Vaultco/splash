<?php
require "PHPMailer/PHPMailerAutoload.php";

function smtpmailer($to, $from, $from_name, $subject,$container,$condition )
    {
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPAuth = true; 
 
        $mail->SMTPSecure = 'ssl'; 
        $mail->Host = 'mail.web-themes.xyz';
        $mail->Port = 465;  
        $mail->Username = 'test@web-themes.xyz';
        $mail->Password = 'j=*B3=lTgQA{';   
   
   //   $path = 'reseller.pdf';
   //   $mail->AddAttachment($path);
   
        $mail->IsHTML(true);
        $mail->From=$from;
        $mail->FromName=$from_name;
        $mail->Sender=$from;
        $mail->AddReplyTo($from, $from_name);
        $mail->Subject = $subject;
        $mail->Body = "
            <html>
                <head>
                    <title></title>
                </head>
                <body>
                    <h3>Customer Name : " .$from_name."</h3>
                    <h3>Customer Email : " .$from."</h3>
                    <h3>Container Size : " .$container."</h3>
                    <h3>Container Condition : " .$condition."</h3>
                </body>
            </html>";
        $mail->AddAddress($to);
        if(!$mail->Send())
        {
            $error ="Please try Later, Error Occured while Processing...";
            // return $error; 
            return $status_code = 500;
            
        }
        else 
        {
            $error = "Thanks You !! Your email is sent.";  
            // return $error;
            return $status_code = 200;
        }
    }
    
    if(isset($_POST['email'])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $container = $_POST['container'];
        $condition = $_POST['condition'];
        
        $to   = 'stcoderbd@gmail.com';
        $from = $email;
        $subj = "Container Mail";
        
        $error = smtpmailer($to,$from, $name,$subj,$container,$condition);
        echo $error;
        
    }
    
    
    
?>

