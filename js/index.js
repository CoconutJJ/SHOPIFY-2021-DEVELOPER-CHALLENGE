

function uploadFile() {

    /**
     * @type {HTMLInputElement}
     */
    let images = document.getElementById('img-btn')

    let reqData = new FormData()

    let allowedExtensions = ["PNG", "JPG", "GIF", "JPEG"]

    if (images.files.length == 0) {
        alert('No Image')
        return;
    }

    for (let i = 0; i < images.files.length; i++) {

        let filename = images.files[i].name

        let ext = filename.split(".").pop()

        if (allowedExtensions.indexOf(ext.toUpperCase()) == -1) {
            alert("You must upload a PNG, JPG or GIF image!")
            return
        }

        reqData.append("file", images.files[i])
    }

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {

        if (xhttp.readyState != 4) return;
        
        response = JSON.parse(xhttp.responseText)
        
        if (!response['state']) {
            alert(response['msg']);
        } else {
            displayImages();
        }
    }

    xhttp.open("POST", "/add");
    xhttp.send(reqData);

}

/**
 * 
 * @param {string} imageName 
 * @param {HTMLImageElement} imgElement 
 * @param {HTMLInputElement} delBtn
 */
function deleteImage(imageName, imgElement) {

    let xhttp = new XMLHttpRequest()


    xhttp.onreadystatechange = () => {

        if (xhttp.readyState != 4) return;

        response = JSON.parse(xhttp.responseText)

        if (response['state']) {
            imgElement.parentElement.removeChild(imgElement);
        } else {
            alert(response['msg']);
        }
    
    }

    xhttp.open("DELETE", "/images/" + imageName)
    xhttp.send();

}

function displayImages() {

    let display = document.getElementById('images');
    display.innerHTML = ""
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState != 4) return;

        imagesfiles = JSON.parse(xhttp.responseText);

        for (let f of imagesfiles) {

            let img = new Image()

            img.src = "/view/" + f

            img.addEventListener("click", () => {
                if (confirm("Delete this image?")) {
                    deleteImage(f, img);
                }
                
            })

            display.appendChild(img);
        }

    }
    xhttp.open('GET', "/images")
    xhttp.send();
}



document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("upload").addEventListener("click", () => {

        uploadFile();

    })

    displayImages();

})