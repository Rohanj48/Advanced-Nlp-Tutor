from flask import Flask,render_template
#from flask_ckeditor import CKEditor
import json

from flask import request
app= Flask(__name__)
#app.config['CKEDITOR_PKG_TYPE'] = 'standard'
#ckeditor = CKEditor(app)

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/test', methods=['POST'])
def test():
    output = request.get_json()
    print(output)
    return output


if __name__ == "__main__":
    app.run(debug=True)
