<?php
    $to = $_POST["email"];
    $subject = "User Submitted Comment";
    $message = $_POST["comment"];
    $from = "address@someisp.com";
    $headers = "From:" . $_POST["name"];
    mail($to,$subject,$message,$headers);
?>
