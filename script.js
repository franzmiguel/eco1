document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const totalQuantityDisplay = document.getElementById('total-quantity');

    // Función para recalcular el total de todos los inputs
    const updateTotalQuantity = () => {
        let total = 0;
        // Selecciona todos los inputs de cantidad
        const quantityInputs = gridContainer.querySelectorAll('.quantity-input');
        
        quantityInputs.forEach(input => {
            // Convierte el valor a un número y suma al total
            total += parseInt(input.value) || 0; 
        });

        // Actualiza el texto en el botón sticky
        totalQuantityDisplay.textContent = total;
    };

    // Delega el evento click a todo el contenedor para manejar todos los botones
    gridContainer.addEventListener('click', (event) => {
        const target = event.target;
        
        // Comprueba si el click fue en un botón de sumar o restar
        if (target.classList.contains('btn-plus') || target.classList.contains('btn-minus')) {
            // Encuentra el input relacionado
            const controlDiv = target.closest('.quantity-control');
            const input = controlDiv.querySelector('.quantity-input');
            let currentValue = parseInt(input.value);

            if (target.classList.contains('btn-plus')) {
                // Sumar
                currentValue++;
            } else if (target.classList.contains('btn-minus')) {
                // Restar, asegurando que no baje de 0
                if (currentValue > 0) {
                    currentValue--;
                }
            }

            // Actualiza el valor del input y recalcula el total
            input.value = currentValue;
            updateTotalQuantity();
        }
    });

    // Inicializa el total al cargar la página
    updateTotalQuantity();
});