//document.addEventListener('DOMContentLoaded', () => {

    const gridContainer = document.querySelector('.grid-container');
    const totalQuantityDisplay = document.getElementById('total-quantity');
    const totalAmountDisplay = document.getElementById('total-amount');
    const templateProd = document.getElementById('productCard').content;
    const fragment = document.createDocumentFragment();
    const items = document.querySelector('.grid-container');

const paContinuar = data => {
        const allInputs = document.querySelectorAll('input');
        const inputsGreaterThanZero = [];
        let total = 0;
        for (let i = 0; i < allInputs.length; i++) {
            const input = allInputs[i];
            // Verifica que el input tenga un valor numérico y sea mayor a 0
            if (input.type === 'text' && parseFloat(input.value) > 0) {
                amount = Number(input.value)* parseFloat(input.getAttribute('data-price'));
                inputsGreaterThanZero.push(amount);
                console.log(input.value, input.getAttribute('data-price'));
                total += amount;
            }
        }

        // Ahora 'inputsGreaterThanZero' contiene solo los inputs que cumplen la condición
        console.log(inputsGreaterThanZero, total);
        totalAmountDisplay.textContent = total;
    };


    const rendProd=data=>{  items.innerHTML='';
        data.forEach(producto=>{
            //templateDetail.querySelector('.stk').textContent = producto.prid;//
            //templateProd.querySelector('.img-box').style.backgroundImage = `url(${producto.img})`;
            templateProd.querySelector('.description').textContent = producto.name;        
            templateProd.querySelector('.price').textContent = producto.price;
            templateProd.querySelector('.quantity-input').setAttribute('data-price', producto.price);
            const clone = templateProd.cloneNode(true);
            //clone.querySelector('.det-row').setAttribute('prid',producto.prid);
            fragment.appendChild(clone);
        });    items.appendChild(fragment);
    }
    const fetchData = async()=>{
        try{
            const res=await fetch('products.js');
            const data=await res.json(); 
            rendProd(data);
        }
        catch (error){console.log(error);  } 
    }

    fetchData();


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
//});
