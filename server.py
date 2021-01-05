from flask import Flask, json, request
from flask.helpers import send_from_directory
import os
import uuid
app = Flask(__name__)

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/js/<path:path>", methods=["GET"])
def js(path):
    return send_from_directory("js", path);

@app.route('/images', methods=['GET'], defaults={"name": None})
@app.route("/images/<name>", methods=['DELETE'])
def images(name):

    if request.method == 'DELETE':
        images = os.listdir("images")

        if name in images:
            os.remove(os.path.join("images/", name))

            return json.dumps({
                "state": True,
                "msg": "Image deleted"
            })
        return json.dumps({
            "state": False,
            "msg": "Image does not exist"
        })

    else:
        
        image_files = os.listdir("./images")
        return json.dumps(image_files)

@app.route("/view/<path:path>", methods=['GET'])
def view(path):
    return send_from_directory("./images", path)
    
@app.route("/add", methods=['POST'])
def addImage():
    
    if 'file' not in request.files:

        return json.dumps({
            "state": False,
            "msg": "No image"
        })
    
    file = request.files['file']

    if len(file.filename) == 0:
        return json.dumps({
            "state": False,
            "msg": "No image"
        })

    fname, ext = file.filename.split(".")

    file.save(os.path.join("images", fname + uuid.uuid4().hex + "." + ext))

    return json.dumps({
        "state": True,
        "msg": "Uploaded"
    })

app.run()