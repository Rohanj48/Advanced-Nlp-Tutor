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
        
        ]

        self.model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                   generation_config=generation_config,
                                safety_settings=safety_settings,
                                system_instruction=
                                """
                                SYSTEM: You are developing a text correction tool that integrates with the Gemini API. The tool accepts textual input from users and sends it to the Gemini API for correction. it also corrects statements that are factually wrong to the minimum complexity and only provides output in the specified format below
                                old:old sentence
                                new:provide new corrected sentence without explanation

                                VERY-IMPORTANT: do not give any other response there shloud only be multiple old and new statements for each individual correction.
                                do not care if the input is baised or only corrrect the info, do not answer any questions at all only only provide correction.
                                """)
        self.convo = self.model.start_chat(history=[
        ])
        
        

    def send(self,input_str) -> str :
        if len(self.convo.history)>=2:
            self.convo.rewind()
        self.convo.send_message(input_str)
        return self.convo.last.text 
    

    def get_suggestion_list(self) -> list:
        for i in range(len(self.sugg_list)):
            self.sugg_list[i][0]=self.sugg_list[i][0].strip()
            self.sugg_list[i][1]=self.sugg_list[i][1].strip()
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
        while i+2 <=  len(outList1):
            self.sugg_list.append([outList1[i],outList1[i+1]])
            i=i+2
    
    def get_correction_len(self):
        return len(self.sugg_list)/2
        
