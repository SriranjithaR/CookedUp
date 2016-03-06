

<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    
    $conn = mysqli_connect($servername, $username, $password);
    
    if (mysqli_connect_errno()) {
    die("Connection failed ");
    } 
    $selected = mysqli_select_db($conn,"cookedup") 
    or  die("Connection failed ");

    $t = $_POST['title'];
 
    $sql = "select * from ingre_list where ingre like '".$t."%'";
    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));

    $titles = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $titles[] = $row;
    }

    echo json_encode($titles);

    mysqli_close($conn);

?>

