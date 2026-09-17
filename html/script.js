function crearFormulario() {

    let c = Number(document.getElementById("centros").value);
    let m = Number(document.getElementById("medicamentos").value);

    let html = "<h2>Medicamentos y disponibilidad</h2>";

    for (let j = 0; j < m; j++) {
        html += `
        <input id="med${j}" placeholder="Medicamento ${j + 1}">
        <input type="number" id="disp${j}" placeholder="Disponible">
        <br>`;
    }

    html += "<h2>Demanda de los centros</h2>";
    html += "<table>";

    for (let i = 0; i < c; i++) {

        html += "<tr>";
        html += `
        <th>
            <input id="centro${i}" placeholder="Centro ${i + 1}">
        </th>`;

        for (let j = 0; j < m; j++) {
            html += `
            <td>
                <input type="number" id="d${i}_${j}" placeholder="Demanda">
            </td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    html += `<button onclick="calcular()">Distribuir medicamentos</button>`;

    document.getElementById("formulario").innerHTML = html;
}


function calcular() {

    let c = Number(document.getElementById("centros").value);
    let m = Number(document.getElementById("medicamentos").value);

    let demanda = [];
    let disponible = [];

    for (let j = 0; j < m; j++) {
        disponible[j] =
            Number(document.getElementById("disp" + j).value);
    }

    for (let i = 0; i < c; i++) {

        demanda[i] = [];

        for (let j = 0; j < m; j++) {
            demanda[i][j] =
                Number(document.getElementById(`d${i}_${j}`).value);
        }
    }

    let distribucion = [];

    for (let i = 0; i < c; i++)
        distribucion[i] = Array(m).fill(0);

    // Distribución proporcional a la demanda
    for (let j = 0; j < m; j++) {

        let totalDemanda = 0;

        for (let i = 0; i < c; i++)
            totalDemanda += demanda[i][j];

        for (let i = 0; i < c; i++) {

            if (totalDemanda <= disponible[j]) {
                distribucion[i][j] = demanda[i][j];
            } else {
                distribucion[i][j] =
                    demanda[i][j] * disponible[j] / totalDemanda;
            }
        }
    }

    mostrar(distribucion);
}


function mostrar(matriz) {

    let html = "<h2>Matriz de Distribución</h2>";
    html += "<table>";
    matriz.forEach(fila => {
        html += "<tr>";

        fila.forEach(valor => {
            html += `<td>${valor.toFixed(2)}</td>`;
        });

        html += "</tr>";
    });

    html += "</table>";

    document.getElementById("resultado").innerHTML = html;
}