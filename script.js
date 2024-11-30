document.addEventListener('DOMContentLoaded', function() {
    const comentariosList = document.getElementById('comentarios-lista');
    const comentariosForm = document.getElementById('comentarios-form');
    const comentarioInput = document.getElementById('comentario');
    let comentarioIndexToEdit = null;  // Variable para almacenar el índice del comentario a editar

    // Función para mostrar los comentarios almacenados
    function cargarComentarios() {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        if (comentarios.length === 0) {
            comentariosList.innerHTML = '<p>No hay comentarios aún.</p>';
        } else {
            comentariosList.innerHTML = comentarios.map((c, index) => `
                <div class="comentario">
                    <p>${c}</p>
                    <button onclick="eliminarComentario(${index})">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                    <button onclick="editarComentario(${index})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </div>
            `).join('');
        }
    }

    // Función para eliminar un comentario
    window.eliminarComentario = function(index) {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.splice(index, 1); // Eliminar el comentario
        localStorage.setItem('comentarios', JSON.stringify(comentarios)); // Guardar los comentarios
        cargarComentarios(); // Recargar los comentarios en la página
    }

    // Función para editar un comentario
    window.editarComentario = function(index) {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarioInput.value = comentarios[index];  // Cargar el comentario en el textarea
        comentarioIndexToEdit = index;  // Establecer el índice para edición
    }

    // Cargar los comentarios cuando la página se cargue
    cargarComentarios();

    // Manejar el envío de comentarios
    comentariosForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nuevoComentario = comentarioInput.value.trim();
        if (nuevoComentario) {
            const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
            if (comentarioIndexToEdit !== null) {
                // Si hay un comentario para editar
                comentarios[comentarioIndexToEdit] = nuevoComentario;
                comentarioIndexToEdit = null; // Limpiar el índice de edición
            } else {
                // Si no estamos editando, agregar un nuevo comentario
                comentarios.push(nuevoComentario);
            }

            localStorage.setItem('comentarios', JSON.stringify(comentarios)); // Guardar los comentarios
            comentarioInput.value = ''; // Limpiar el campo de entrada
            cargarComentarios(); // Recargar los comentarios
        }
    });
});
