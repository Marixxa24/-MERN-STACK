        // Validación del formulario
        document.getElementById('registroForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío del formulario para mostrar la validación
            
            const contrasena = document.getElementById('contrasena').value;
            const confirmarContrasena = document.getElementById('confirmar-contrasena').value;
            let esValido = true;
            
            // Ocultar mensajes previos
            document.getElementById('mensaje-exito').style.display = 'none';
            document.getElementById('mensaje-error').style.display = 'none';
            
            // Validar contraseña
            if (contrasena.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                esValido = false;
            }
            
            // Validar que las contraseñas coincidan
            if (contrasena !== confirmarContrasena) {
                alert('Las contraseñas no coinciden');
                esValido = false;
            }
            
            // Validar nombre de usuario (solo letras y números)
            const usuario = document.getElementById('usuario').value;
            if (!/^[a-zA-Z0-9]+$/.test(usuario)) {
                alert('El nombre de usuario solo puede contener letras y números');
                esValido = false;
            }
            
            // Validar email
            const email = document.getElementById('email').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido');
                esValido = false;
            }
            
            // Si todo es válido, mostrar mensaje de éxito
            if (esValido) {
                document.getElementById('mensaje-exito').style.display = 'block';
                
                // En un caso real, aquí enviarías los datos al servidor
                console.log('Formulario enviado con éxito');
                
                // Opcional: Restablecer el formulario después de un tiempo
                setTimeout(function() {
                    document.getElementById('registroForm').reset();
                    document.getElementById('mensaje-exito').style.display = 'none';
                }, 5000);
            } else {
                document.getElementById('mensaje-error').style.display = 'block';
            }
        });
    