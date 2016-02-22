<html>
    <head>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/stylesheet.css"/>
        <meta name="viewport" content="width=device-width, initial scale=1">
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js"></script>
        <title>Cooked Up!</title>
    </head> 
  
     
<?php
    echo "<body class='container' style='background-color:#FA8258;'";
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cookedup";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) 
        die("Connection failed: " . $conn->connect_error);
    
    

    $wl = array("maida","egg");
    $bl = array("hazel nut");
    //$stmt2 = "select rec_name from recipes where ingre = '".$wl."'";
    $str = "";
    $stmt2 = $conn->prepare("select rec_name from recipes where ingre = '".$wl[0]."'");
    $stmt2->execute();
    $res = $stmt2->get_result(); 
    foreach ($res as $key => $value)
        $str=$str.$value['rec_name'].",";

    for ($x = 1; $x < count($wl); $x++)  {
        $str1="";
        $stmt2 = $conn->prepare("select rec_name from recipes where ingre = '".$wl[$x]."'");
        $stmt2->execute();
        $res = $stmt2->get_result(); 
        foreach ($res as $key => $value) {
            if(strpos($str,$value['rec_name'])!== false) {
                $str1 = $str1.$value['rec_name'].",";
            }
        }
        $str = $str1;
    }
    //echo "<br>".$str;
        $str1=$str;
        foreach ($bl as $ingre) {
        $stmt2 = $conn->prepare("select rec_name from recipes where ingre ='".$ingre."'");
        $stmt2->execute();
        $res = $stmt2->get_result(); 
         foreach ($res as $key => $value) {
            echo "<br>";
           if(strpos($str1,$value['rec_name'])!== false) {
                $str1 = str_replace($value['rec_name'],'*',$str1); 
           }  
        }
    }
   // echo "<br>".$str1;

       $rec_array = explode(",",$str1);
       //   print_r($rec_array);         

       for($x = 0; $x < count($rec_array); ++$x) {
            if(($rec_array[$x]!='*')&& ($rec_array[$x]!='')) {
                $stmt2 = $conn->prepare("select * from recipes where rec_name ='".$rec_array[$x]."'");
                $stmt2->execute();
                $res = $stmt2->get_result(); 
                    $flag = 0;
                  foreach ($res as $value) {
                    if($flag == 0){
                        $flag = 1;
                ?>
                <br>
                <br>
                <br>
                <table class='table table-hover table-bordered' style="background-image:url('img/food9.jpeg')">
                <b>
                <?php
                    echo "<table class='table table-hover'>
                    <tr><td>RECIPE NAME </td><td>".$value['rec_name']."</td></tr>
                    <tr><td>CUISINE </td><td>".$value['cui_name']."</td></tr>
                    <tr><td>PROCEDURE </td><td><a href='".$value['instURL']."'>".$value['instURL']."</td></tr>
                    <tr><td>DURATION </td><td>".$value['duration']." min </td></tr>
                    <tr><td>VEG / NON-VEG </td><td>".$value['type']."</td></tr>";
                }
                }
                foreach ($res as $value) {
                ?>
                <form>
                <?php
                   echo "<tr><td>".$value['ingre']."</td><td><button class='btn btn-warning' formaction='".$value['ingre'].".php'>WHERE TO GET?</button></td></tr>";

                }
            }
       }
                ?>
                </b>
                </table>
                
                </form>
                          
        
        
        
        <form>
        <center>
         <div class="row">
            <button class="btn  btn-lg" type="submit" formaction="getIng.php" style="background-color:#592d0d;">BACK</button>
        </div>
            <br>
             <div class="row">
            <a href="https://www.zomato.com/" target="_blank" class="btn btn-lg" style="background-color:#592d0d"  role="button">FEELING LAZY</a>
            </div>
        </center>
        </form>
        <br>
    <style>
        body{
            font-weight:900  !important;
            background-image:url("img/bg.jpg");
        }
        .table,
        .table th,
        .table tr,
        .table td {
            background-color: rgba(89,45,13,0.2) !important;
            color:white;
        }
        
        form,a{
            color:white;
        }
         .btn:hover{
            color:grey;
        }
    </style>
    </body>
</html>