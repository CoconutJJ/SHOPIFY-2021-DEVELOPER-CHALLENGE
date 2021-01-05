

function uploadFile() {

    /**
     * @type {HTMLInputElement}
     */
    let images = document.getElementById('img-btn')

    let reqData = new FormData()


    for (let i = 0; i < images.files.length; i++) {
        reqData.append("file", images.files[i])
    }

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {

        if (xhttp.readyState != 4) return;

        alert(xhttp.responseText);

    }

    xhttp.open("POST","/add");
    xhttp.send(reqData);
    
}

function displayImages() {

    let display = document.getElementById('images');

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState != 4) return;
        
        imagesfiles = JSON.parse(xhttp.responseText);

        for (let f of imagesfiles) {

            let img = new Image()

            img.src = "/view/" + f
            
            display.appendChild(img);

        }

    }
    xhttp.open('GET', "/images")
    xhttp.send();

}



document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("upload").addEventListener("click", ()=> {

        uploadFile();

    })

    displayImages();

})