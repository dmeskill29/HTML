from flask import Flask, request, redirect
import os

app = Flask(__name__, static_url_path='')

@app.route('/createPage', methods=['POST'])
def create_page():
    title = request.form.get('title')
    content = request.form.get('content')

    new_page_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <title>{title}</title>
    </head>
    <body>
      <h1>{title}</h1>
      <p>{content}</p>
    </body>
    </html>
    """

    try:
        with open(f"static/{title}.html", "w") as file:
            file.write(new_page_content)
    except Exception as e:
        return str(e)

    return redirect(f'/{title}.html')

@app.route('/')
def home():
    return app.send_static_file('Test1.html')

if __name__ == '__main__':
    app.run(port=3000)