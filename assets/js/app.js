//Declaraciones
const apiUrl = "http://localhost:3000/"
const pageEndPoints = ['products', 'categories', 'brands']

let dataItem = {
    id: 0,
    name: "",
    description: "",
    picture: "",
    price: 0,
    stock: 0,
    category: "",
    brand: ""
}
const dataFrame = []

//Declaraciones de elementos del html
const container = document.querySelector('#container')
const row = document.querySelector('#cards-row')

//Marco principal
fetch(`${apiUrl}${pageEndPoints[0]}`)
.then( (response) =>{
    if (!response.ok) {
        throw new Error('Hubo un error')
    }
    return response.json()
})
.then((products)=>{
    //products.sort((a, b) => a.id - b.id) //Sortear por ID

    products.forEach((product,idObj) => {
        const { id, name, description, picture, price, stock, category_id, brand_id } = product
        fetch(`${apiUrl}${pageEndPoints[1]}/${category_id}`)
            .then(response => response.json())
            .then(category =>{
                fetch(`${apiUrl}${pageEndPoints[2]}/${brand_id}`)
                    .then(response => response.json())
                    .then(brand =>{
                        dataItem ={
                            id: idObj,
                            name: name,
                            description: description,
                            picture: picture,
                            price: price,
                            stock: stock,
                            category: category.name,
                            brand: brand.name
                        }
                        //dataFrame.push(dataItem)
                        formatterDater(dataItem);
                    })
                    .catch(error=>{
                        console.error('Ocurrio un error aaaaaa:', error)
                    })
                })
                .catch(error=>{
                    console.error('Ahhhhh no puede seer:', error)
                })
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
