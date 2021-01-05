from flask import Flask, json, request
from flask.helpers import send_from_directory
import os
app = Flask(__name__)

@app.route("/")
def index():

    return send_from_directory(".", "index.html")
@app.route("/js/<path:path>", methods=["GET"])
def js(path):
    return send_from_directory("js", path);

@app.route("/images", methods=['GET'])
def images():
    image_files = os.listdir("./images")


    return json.dumps(image_files)
@app.route("/view/<path:path>", methods=['GET'])
def view(path):

    return send_from_directory("./images", path)
    



@app.route("/add", methods=['POST'])
def addImage():

    print(request.stream, request.form)

    print(dict(request.files))

    if 'file' not in request.files:

        return json.dumps({
            "msg": "No image"
        })
    
    file = request.files['file']

    if len(file.filename) == 0:
        return json.dumps({
            "msg": "No image"
        })

    file.save(os.path.join("images", file.filename))

    return json.dumps({
        "msg": "Uploaded"
    })

app.run()