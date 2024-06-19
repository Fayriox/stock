 const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    if (input.value.trim() == '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        if (id == 'Precio') {
            if (input.value < 10000) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El precio debe ser mayor o igual a 10000</span>';
            }
        }
        if (id == 'Cantidaddestock') {
            if (input.value < 1) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La cantidad de stock debe ser mayor o igual a 1</span>';
            }
        }
        if (id == 'Fechaingreso') {
            const dias = validarFecha(input.value);
            if (dias < 0) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La fecha de ingreso debe ser hoy o en el futuro</span>';
            } else {
                input.classList.remove('is-invalid');
                div.innerHTML = '';
            }
        }
        
        function validarFecha(fecha) {
            const hoy = new Date();
            const fechaIngresada = new Date(fecha);
        
            hoy.setHours(0, 0, 0, 0);
            fechaIngresada.setHours(0, 0, 0, 0);

            const diferencia = (fechaIngresada - hoy) / (1000 * 60 * 60 * 24);
        
            return diferencia;
        }
        
        if (id == 'run') {
            if (!validarRun(input.value.trim())) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El run ingresado no es válido</span>';
            }
        }
    }
};


 const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById(`e-${item.id}`).innerHTML = '';
    });
    document.getElementById('run').readOnly = false;
    document.getElementById('btnGuardar').value = 'Guardar';
};

const validarRun = (run) => {
    const Fn = {
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-");
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            const tmp = rutCompleto.split('-');
            const digv = tmp[1].toLowerCase();
            const rut = tmp[0];
            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            let M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    };
    return Fn.validaRut(run);
};

