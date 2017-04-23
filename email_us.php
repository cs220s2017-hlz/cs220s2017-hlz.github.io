/*
We found this code by looking for information on Stack Overflow at:
http://stackoverflow.com/questions/712392/send-email-using-the-gmail-smtp-server-from-a-php-page
*/

<?php
require_once 'swiftmailer/lib/swift_required.php';

$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
  ->setUsername('cs220s2017.hlz')
  ->setPassword('teamwork69');

$mailer = Swift_Mailer::newInstance($transport);

$message = Swift_Message::newInstance($_GET["email"])
  ->setFrom(array('cs220s2017.hlz@gmail.com' => $_GET["name"]))
  ->setTo(array('cs220s2017.hlz@gmail.com'))
  ->setBody($_POST["comment"]);

$result = $mailer->send($message);
?>
