<?php
// Mail Transport
$transport = Swift_SmtpTransport::newInstance('ssl://smtp.gmail.com', 465)
    ->setUsername('cs220s2017.hlz@gmail.com') // Your Gmail Username
    ->setPassword('teamwork69'); // Your Gmail Password

// Mailer
$mailer = Swift_Mailer::newInstance($transport);

// Create a message
$message = Swift_Message::newInstance('An email from our site!')
    ->setFrom(array($_POST["email"] => $_POST["name"])) // can be $_POST['email'] etc...
    ->setTo(array('cs220s2017.hlz@gmail.com' => 'HLZ Studios')) // your email / multiple supported.
    ->setBody($_POST["comment"], 'text/html');

// Send the message
if ($mailer->send($message)) {
    echo 'Mail sent successfully.';
} else {
    echo 'I am sure, your configuration are not correct. :(';
}
?>
