from flask import Flask, render_template, request
from threading import Thread

app = Flask(__name__)

@app.route("/")
def Home():

    return render_template("index.html")

def run():
    app.run(host='0.0.0.0')


def keep_alive():
    t = Thread(target=run)
    t.start()


if __name__ == "__main__":
    run()
