// ################################## AJAX ########################################
  function crearAJAX()
  {
   try 
   {
    var AJAX = new ActiveXObject("Microsoft.XMLHTTP"); 
   }
   catch (e)
   {
    try
    {
     var AJAX = new XMLHttpRequest();
    }
    catch (e)
    {
     alert("El navegador que estas usando no soporta AJAX.\nPor favor, descarga uno mas moderno");
     return false;
    }
   }
   return AJAX;
  }    
  // ########################## Tiempo Real (magia) ##################################
  var ajax;
  var actualizaciones = 0;
  function mantener_actualizado()
  {
   // Crear una conexion nueva
   ajax = crearAJAX();
   // Procesar los cambios de estado
   ajax.onreadystatechange = function()
   {
    if (ajax.readyState == 4)
    {
     // Aca esta la magia de nuevo
     if (ajax.status == 200)
     {
      // Si el archivo existe procesamos los cambios
      hay_cambios(ajax.responseText);
     }
     else
     {
      // Sino esperamos 300 milisegundos y actualizamos nuevamente
      setTimeout("mantener_actualizado()", 300);
     }
    }
   }
   ajax.open('GET','ajax/sin_cambios.txt', true);
   ajax.send(null);
  }
  window.onload = function()
  {
   // Crear al AJAX
   ajax = crearAJAX();
   // Procesar los cambios en la conexion
   ajax.onreadystatechange = function()
   {
    if (ajax.readyState == 4)
    {
     // Aca esta la magia
     if (ajax.status == 200)
     {
      // Si el archivo existe significa que hay cambios
      // Obtenemos los cambios con responseText
      hay_cambios(ajax.responseText);
     }
     else
     {
      // Si todavia no hay cambios esperamos un momento y actualizamos
      // Si o si hay que esperar al menos 300 milisegundos, no se por que
      setTimeout("mantener_actualizado()", 300);
     }
    }
   }
   // Abrimos el archivo que nos dira si hay cambios o no
   ajax.open('GET','ajax/sin_cambios.txt', true);
   ajax.send(null);
   // y... volvemos
   return;
  } 
  function hay_cambios(texto)
  {
   // Creamos una conexion nueva
   ajax = crearAJAX();
   // Hay que cambiar la direccion que se carga
   // para avisar que ya sabemos que hubo cambios
   ajax.onreadystatechange = function()
   {
    if (ajax.readyState == 4 && ajax.status == 200)
    {
     // Cuando ya se borro el archivo ajax/sin_cambios.txt volvemos a actualizar
     setTimeout("mantener_actualizado()", 300);
    }
   }
   // Aca abrimos una URL diferente
   // Este archivo que abrimos borra el ajax/sin_cambios.txt para "avisar" que ya mostramos los cambios
   ajax.open('GET','actualizado.php', true);
   ajax.send(null); 
   // No pasa nada despues se va a ejecutar mantener_actualizado() 
   // y volvera a verificar cambios ;)
   // Modificamos el titulo y el contenido de la pagina
   document.title = 'Tiempo real AJAX (1)';
   document.body.innerHTML += texto + '<br>' + '<embed type="audio/x-wav" src="sonido/mensaje.mp3" autoplay="true" height="0" width="0" autostart="false">';
   // Despues de 3 segundos vuelve a cambiar el titulo por el inicial
   setTimeout(function(){
    document.title = 'Tiempo real AJAX';
   }, 1000);
   // ...y eso es todo
   return;
  }