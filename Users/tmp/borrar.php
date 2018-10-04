<?php
if (!unlink($_GET['fichero'])){
	
echo 'no se pudo borrar el archivo :'.$_GET['archivo'];
}
header("Location: ../tables.php");
?>