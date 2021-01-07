<?php


use PHPMailer\PHPMailer\PHPMailer;

if($_POST)
{
    require_once "PHPMailer/Exception.php";
    require_once "PHPMailer/PHPMailer.php";
    require_once "PHPMailer/SMTP.php";

    $mail = new PHPMailer(true);

    $your_email = "feliperamigon1704@gmail.com";


    //check if its an ajax request, exit if not
    /* if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

        //exit script outputting json data
        $output = json_encode(
            array(
                'type'=>'error',
                'text' => 'Request must come from Ajax'
            ));

        die($output);
    } */

    //check $_POST vars are set, exit if any missing
    //Sanitize input data using PHP filter_var().

    $first_Name = $_POST["firstName"];
    $user_Email = $_POST["userEmail"];
    
    if(isset($_POST["userEmail"])) {
        if (!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) //email validation
        {
            $output = json_encode(array('type' => 'error', 'text' => 'Please enter a valid email!'));
            die($output);
        }
    }
    if(isset($_POST["userMessage"])) {
        if (strlen($user_Message) <= 0) //check emtpy message
        {
            $output = json_encode(array('type' => 'error', 'text' => 'Too short message! Please enter something.'));
            die($output);
        }
    }



    //Server settings
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'feliperamigon1704@gmail.com';                     // SMTP username
    $mail->Password   = '0123321a';                         // SMTP password
    $mail->SMTPSecure = 'SSL';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($user_Email, $first_Name);
    $mail->addAddress($your_email, 'Theme Industry');     // Add a recipient
    $mail->addReplyTo($your_email, 'Information');


    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'New Contact Inquiry from your Website';
    $mail->Body  = "<h4 style='text-align: center;padding: 25px 15px;background-color: #0c6c9e;color: #FFFFFF;font-size:16px;width:90%;border-radius: 10px;'>Hi There! You have a new inquiry from your website.</h4><br><br>";

    if(isset($_POST["userEmail"])) {
        $mail->Body .= "<strong>Email: </strong>" . $user_Email . "<br>";
    }
    
    $mail->Body .= '<br>';

    if(isset($_POST["userMessage"])) {
        $mail->Body .= "<strong>Message: </strong><br><br><div style='background-color: #EDEFF2;padding:30px 15px;border-radius:10px;min-height:50px;width:90%;'>" . $user_Message . "</div><br>";
    }
    $mail->Body .= '<strong>Best Regards,</strong><br>';

    if(isset($user_Name)) {
        $mail->Body .= $user_Name . "<br>";
    }
    
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';


    if(!$mail->send())
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_Name .' Thank you for contacting us.'));
        echo $output;
    }
}
else {
    die("Me la pelan todos hps .l.");
}
?>