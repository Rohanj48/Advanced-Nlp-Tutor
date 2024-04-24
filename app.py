from flask import Flask,render_template,redirect
from flask import request
import json

import correction_api
app= Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

tutor = correction_api.Tutor(); 

quilq=""
@app.route("/")
@app.route("/home")

def index():

    print(tutor.get_suggestion())  
    return render_template("index.html",sugg=tutor.get_suggestion(),qq = quilq)


@app.route('/sendto', methods=['POST'])
def sendto():
    global quilq
    output = request.get_json()
    res_str=""
    #print(type(output["ops"]))
    output_file = open("output.txt", "w")
    for i in output["ops"]:
        res_str+=i["insert"]
        quilq+=i["insert"]
        output_file.write(i["insert"])

    output_file.close()
    
    outtt = tutor.send(res_str)
    print(outtt)
    tutor.make_correction_list(outtt)
    
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
