from flask import Flask,render_template,redirect
#from flask_ckeditor import CKEditor
import json

from flask import request
app= Flask(__name__)
#app.config['CKEDITOR_PKG_TYPE'] = 'standard'
#ckeditor = CKEditor(app)



@app.route("/")


def index():
    suggestion_list=[""]
    list_count = len(suggestion_list)    
    return render_template("index.html",suggestion_list=suggestion_list,list_count=list_count)


@app.route('/test', methods=['POST'])
def test():
    output = request.get_json()
    #print(type(output["ops"]))
    
    

    output_file = open("output.txt", "w")
    for i in output["ops"]:

        output_file.write(i["insert"])

    output_file.close()
    print("hiii")
    return redirect("/helloworld")


if __name__ == "__main__":
    app.run(debug=True)
