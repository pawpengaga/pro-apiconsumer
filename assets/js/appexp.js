const apiUrl = "http://localhost:3000/"
const processedData = []

fetch(`${apiUrl}products`)
.then( (response) =>{
    if (!response.ok) {
        throw new Error('Ocurrió un error al obtener los datos.')
    }
    return response.json()
})
.then((data)=>{
    data.forEach(item => {
        processedData.push(item)
    });
})
.catch(error => {
    console.error('Error en la solicitud Fetch:', error);
});

console.log(processedData)