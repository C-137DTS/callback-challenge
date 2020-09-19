const API = 'https://rickandmortyapi.com/api/character/'
let character_id = parseInt(prompt('Que personajes deseas obtener: '))

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', url_api, true)
    xhttp.onreadystatechange = event => {
        if(xhttp.readyState === 4) {
            if(xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText))
            } else {
                const error =  new Error('Error ' + url_api)
                callback(error, null)
            }
        } 
    }
    xhttp.send()
}

fetchData(API + character_id, (error1, data1) => {
    if(error1) return console.error(error1)
    console.log(data1.name)
    
    if(data1.origin.url){
        fetchData(data1.origin.url, (error2, data2) => {
            if(error2) {
                return console.error(error2)
            }       
            console.log(data2.dimension)
        })
    } else {
        console.log('No se pudo encrontrar su dimensión')
    }
    
})
