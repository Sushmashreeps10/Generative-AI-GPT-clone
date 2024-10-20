import openai
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import dotenv_values

app = Flask(__name__)
CORS(app)

temp = dotenv_values(".env")
OPENAI_API_KEY = temp["OPENAI_API_KEY"] 
openai.api_key = OPENAI_API_KEY  

@app.route('/chatBot', methods=['POST', 'GET'])
def postData():
    if request.method == 'GET':
        return jsonify({"message": "ChatBot endpoint is working"})
    
    text = request.json.get('text')
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": text
                }
            ]
        )
        # Return the content of the response
        return jsonify({"response": response.choices[0].message['content']})
    except openai.error.OpenAIError as e:
        # Return an error message with a 400 status code
        return jsonify({"error": str(e)}), 400


@app.route("/summary",methods = ['POST','GET'])
def summary():
    if request.method == 'GET':
        return jsonify({"message": "Summary endpoint is working"})
    
    text = request.json.get('text')
    try:
        instruction = """ Summarise the below paragraph""" + text
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": instruction
                    }
                ]
                },
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        
        return jsonify({"response": response.choices[0].message['content']})
        # print(response.choices[0].message.content)

    except openai.error.OpenAIError as e:
        # Return an error message with a 400 status code
        return jsonify({"error": str(e)}), 400
    
# js-converter
@app.route("/code-explain",methods = ['POST','GET'])
def js_converter():
    if request.method == 'GET':
        return jsonify({"message": "js-converter endpoint is working"})

    text = request.json.get('text')
    try:
        instruction = """Explain the code in step by step""" + text
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": instruction
                    }
                ]
                },
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        return jsonify({"response": response.choices[0].message['content']})
    # print(response.choices[0].message.content)
    except openai.error.OpenAIError as e:
        # Return an error message with a 400 status code
        return jsonify({"error": str(e)}), 400
    
# scifi image
@app.route("/scifi-image",methods = ['POST','GET'])
def scifi_image():
    if request.method == 'GET':
        return jsonify({"message": "scifi-image endpoint is working"})
    text = request.json.get('text')
    try:
        response = openai.Image.create(
        prompt=text,
        n=1,
        size="1024x1024"
        )
        return jsonify({"response": response['data'][0]['url']})
    except openai.error.OpenAIError as e:
        # Return an error message with a 400 status code
        return jsonify({"error": str(e)}), 400
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)