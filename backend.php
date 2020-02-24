<?php
/*require 'phpmailer/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;*/
//header("Access-Control-Allow-Origin: http://avgmltd.com");

function getRealIPAddr()
{
   //check ip from share internet
   if (!empty($_SERVER['HTTP_CLIENT_IP'])) 
       $ip=$_SERVER['HTTP_CLIENT_IP'];
   //to check ip is pass from proxy
   elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
       $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
   else
       $ip=$_SERVER['REMOTE_ADDR'];
   return $ip;
}

if (!empty($_POST))
{
    // Array of post values for each different form on your page.
    $postNameArr = array('email','token');       

    // Find all of the post identifiers within $_POST
    $postIdentifierArr = array();
       
    foreach ($postNameArr as $postName)
    {
        if (array_key_exists($postName, $_POST))
        {
             $postIdentifierArr[] = $postName;
        }
    }

    // Only one form should be submitted at a time so we should have one
    // post identifier.  The die statements here are pretty harsh you may consider
    // a warning rather than this.
    if (count($postIdentifierArr) != 2){
        count($postIdentifierArr) < 2 or
            die("\$_POST contained more than one post identifier: " .
               implode(" ", $postIdentifierArr));

        // We have not died yet so we must have less than one.
        die("\$_POST did not contain a known post identifier.");
    }
        
    switch ($postIdentifierArr[0])
    {
    case 'email':
        $secret = '6LfSR9oUAAAAAHiMbdksegHDMCCdams9S6gCrqJj';
        $content = $_POST['email'];
        $token = $_POST['token'];
        $remoteIp = getRealIPAddr();
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 
            http_build_query(array(
                'secret' => $secret,
                'response' => $token,
                'remoteip' => $remoteIp
            )));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close ($ch);
        $so = json_decode($server_output);
        if($so && $so->success==true){
            date_default_timezone_set('Asia/Almaty');
            file_put_contents('requests'.DIRECTORY_SEPARATOR.'cleaning_'.date("Y-m-d H:i:s").'.txt', $content , FILE_APPEND | LOCK_EX);
            echo 'success';
        }else{
            echo 'retry';
        }
       /*$mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.mail.ru';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'manager@avgmltd.com';                     // SMTP username
            $mail->Password   = '9Q=1YzKvBlcm';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
            $mail->Port       = 465;                                    // TCP port to connect to

            //Recipients
            $mail->setFrom('noreply@avgmltd.com', 'Заявка Клининг');
            $mail->addAddress('manager@avgmltd.com', 'Manager Avgm');     // Add a recipient
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Заявка на клининг '.date("Y.m.d H:i:s");
            $mail->Body    = $content;
            if($mail->send())
                echo 'success';
            else
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }*/
       break;
    default:
        echo 'post parameters are invalid';
        break;
    }
}
else // $_POST is empty.
{
    echo "no post data was inserted";
}