//Declaraciones
const apiUrl = "http://localhost:3000/"
const jsonPath = "assets/js/products.json"
const pageEndPoints = ['products', 'categories', 'brands']

//Declaraciones de elementos del html
const container = document.querySelector('#container')
const row = document.querySelector('#cards-row')

//Marco principal
// fetch(jsonPath)
fetch(`${apiUrl}${pageEndPoints[0]}`)
.then( (response) =>{
    if (!response.ok) {
        throw new Error('Hubo un error')
    }
    return response.json()
})
.then((products)=>{
    products.sort((a, b) => a.id - b.id) //Sortear por ID

    products.forEach((product) => {
        formatterDater(product);
    })
            
})
.catch(error => {
    console.error('HUBO UN ERROR. El error:', error);
});


//Logica de funciones

function formatterDater(data){
        const { name, description, picture, price, stock, category, brand } = data
        const cardHtml = document.createElement('div')
        cardHtml.className = "card col-3 mx-4 mb-5 eith"
        cardHtml.innerHTML = `
            <img src=${picture} class="card-img-top" alt=${name}>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
            <hr class="py-0 my-0">
            <div class="text-end precios mt-3 d-flex justify-content-between align-items-center">
                <p class="fw-bold">$${price}</p>
                <p>Stock: ${stock}</p>
            </div>
            <hr class="py-0 my-0">
            <p class="mt-3"><span class="fw-bold">Marca:</span> <a href="#">${brand}</a></p>
            <p><span class="fw-bold">Categoría:</span> <a href="#">${category}</a></p>

        `
        row.appendChild(cardHtml)
}
