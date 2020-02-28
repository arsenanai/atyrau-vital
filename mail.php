<?php
require 'phpmailer/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
$testing = true;
$httpdocs = ($testing==false)?'httpdocs':'';

function getBody($obj,$date){
    $result = "
    <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
    <!DOCTYPE html>
    <html>
    <head>
        <title></title>
    </head>
    <body>
    <style>
        .text-right{
            float: right;
        }
    </style>
    <div><h1>Заявка на клининг({$date}): \"{$obj->typeNameInRU}\"</h1><br>";
    $result .= 'Основное<br>';
    if(in_array($obj->typeName,array('apartment','house')))
        if($obj->typeCode==0){
            $result .='<span>Тип:</span><span class="text-right">Стандартная</span><br>';
            $result .='комнат:'.$obj->roomsNumber.'<br>';
        }else{
            $result .='<span>Тип:</span><span class="text-right">Генеральная</span><br>';
            $result .='общая площадь:'.$obj->area.'<br>';
        }
    else
        $result .='общая площадь:'.$obj->area.'<br>';
    if(in_array($obj->typeName,array('apartment','house')))
        $result .='<span>санузлов:'.$obj->bathroomsNumber.'</span>';
    $result .='<span class="text-right">'.$obj->baseTotal.' тг</span><br><hr>';
    if($obj->anyBonusSelected){
        $result .='Дополнительно<br>';
        foreach($obj->bonuses as $bonus){
          $result .= '<span>'.$bonus->name;
          if($bonus->type=='number'&&$bonus->value>1)
            $result .='(x'.$bonus->value.')';
          $result.='</span><span class="text-right">'.$bonus->value*$bonus->price.' тг</span><br>';
        }
    }
    $result .='<hr>';
    $result .='<span>К Оплате</span><span class="text-right"><b>'.$obj->total.' тг</b></span><br>';
    $result .='<span>Имя:</span><span class="text-right">'.$obj->name.'</span><br>';
    $result .='<span>Телефон:</span><span class="text-right">'.$obj->phone.'</span><br>';
    $cc = 'картой';
    if($obj->cash)
        $cc = 'наличными';
    $result .='<span>Тип оплаты:</span><span class="text-right">'.$cc.'</span><br></div>';
    $result .='</body></html>';
    return $result;
}
function operate(){
    $directory = getcwd().DIRECTORY_SEPARATOR.$GLOBALS['httpdocs'].DIRECTORY_SEPARATOR."requests".DIRECTORY_SEPARATOR;
    $files = scandir ($directory);
    if(array_key_exists(2,$files)){
        $firstFile = $directory . $files[2];
        $f = fopen($firstFile, 'r');
        $email = fgets($f);
        fclose($f);
        $date = explode('_',$firstFile)[1];
        $date = preg_replace('/\\.[^.\\s]{3,4}$/', '', $date);
        $mail = new PHPMailer(true);

        $cleaning = json_decode($email);
        if($cleaning){
            try {
                //Server settings
                //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
                $mail->isSMTP();                                            // Send using SMTP
                $mail->Host = 'ssl://smtp.mail.ru';                   // Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                $mail->Username   = 'manager@avgmltd.com';                     // SMTP username
                $mail->Password   = '9Q=1YzKvBlcm';                               // SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
                $mail->Port       = 465;                                    // TCP port to connect to

                //Recipients
                $mail->setFrom('manager@avgmltd.com', 'Заявка Клининг');
                $mail->addAddress('avgmclean@mail.ru', 'Cleaning Manager');     // Add a recipient
                $mail->CharSet = 'UTF-8';
                // Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Заявка на клининг: '.$date;
                //$mail->Encoding = 'base64';
                //$mail->addCustomHeader('Content-Transfer-Encoding', 'base64');
                $mail->Body = getBody($cleaning,$date);
                $mail->send();
                unlink($firstFile);
                //echo 'done '.$firstFile.PHP_EOL;
                return 1;
            } catch (Exception $e) {
                return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        }
    }else{
        return -1;
    }
}

$now = time();
$after = strtotime("+59 minutes");
$c = 0;
while($now<$after){
    $result = operate();
    if($result==-1){
        //no files
        $c++;
        if($c>120)
            break;
        if($testing)
            echo 'waiting for 30 seconds'.PHP_EOL;
        sleep(30);
    }else if($result==1){
        //success
    }else{
        //exception
        file_put_contents(getcwd().DIRECTORY_SEPARATOR.$httpdocs.DIRECTORY_SEPARATOR.'errors.log',$result);
    }
    $now = time();
}