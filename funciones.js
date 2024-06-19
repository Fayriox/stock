import { eliminar, getData, obtener, save, update } from "./fuagobase.js";
let id = 0;


document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);      
    });
    if (document.querySelectorAll('.is-invalid').length === 0) {
        const persona = {
            code: document.getElementById('Codigo').value,
            cat: document.getElementById('Categoria').value,
            fecha: document.getElementById('Fechaingreso').value,
            stock: document.getElementById('Cantidaddestock').value,
            precio: document.getElementById('Precio').value,
            nom: document.getElementById('Nombrededespachador').value,
            run: document.getElementById('run').value
        };

        if (document.getElementById('btnGuardar').value === 'Guardar') {
            save(persona);
            limpiar();
        } else {
            update(id, persona);
            limpiar();
            id = 0;
        }
    }
});


window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = '';
        collection.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.code}</td>
                <td>${item.cat}</td>
                <td>${item.fecha}</td>
                <td>${item.stock}</td>
                <td>${item.precio}</td>
                <td>${item.nom}</td>
                <td>${item.run}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="edit-${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="delete-${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id.split('-')[1]);
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                try {
                    const doc = await obtener(btn.id.split('-')[1]);
                    const d = doc.data();
                    document.getElementById('Codigo').value = d.code;
                    document.getElementById('Categoria').value = d.cat;
                    document.getElementById('Fechaingreso').value = d.fecha;
                    document.getElementById('Cantidaddestock').value = d.stock;
                    document.getElementById('Precio').value = d.precio;
                    document.getElementById('Nombrededespachador').value = d.nom;
                    document.getElementById('run').value = d.run;

                    document.getElementById('btnGuardar').value = 'Modificar';
                    id = btn.id.split('-')[1];
                } catch (error) {
                    console.error('Error obteniendo el documento:', error);
                }
            });
        });
    });
});
