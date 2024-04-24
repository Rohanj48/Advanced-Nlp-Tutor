import google.generativeai as genai





class Tutor:


    sugg_list = []

    def __init__(self):
        genai.configure(api_key="AIzaSyBFtiANejQr0W24ORm01d72JCzr1LFUXyA")
        # Set up the model
        generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 0,
        "max_output_tokens": 8192,
        }

        safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        ]

        self.model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                   generation_config=generation_config,
                                safety_settings=safety_settings,
                                system_instruction="""
                                System : you wiil recive an document proof read the document and check for factual errors for each correction respond as
                                old:provide old sentence
                                new:provide new sentence

                                this and nothing elese

                                """)

        self.convo = self.model.start_chat(history=[
        ])
        
        self.convo.send_message("i will give a document you have to proofread the document and give corrections in the format old:    new:")


    def send(self,input_str) -> str :
        self.convo.send_message(input_str)
        return self.convo.last.text 
    

    def get_suggestion(self) -> list:

        return self.sugg_list

    def make_correction_list(self,input_str):

        outList=[]
        str1 = "old:"
        str2 = "new:"

        outList = input_str.split(str1)
        outList1=[]
        for i in outList:
            outList1.extend(i.split(str2))
        outList1.pop(0)
        print(outList1)
        self.sugg_list = []
        i=0
        while i+2 <  len(outList1):
            self.sugg_list.append((outList1[i],outList1[i+1]))
            i=i+2
            
        
        