# Flask server for Mandelbrot extra credit
# Luke Song

from flask import *
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/new', methods=['PUT'])
def load_image():
    payload = json.loads(request.data)
    data = {'result'  : 'success'}
    try:
        x = payload['x']
        y = payload['y']
        max = payload['max']
        s = payload['s']
    except:
        data['result'] = 'failure'

    p = subprocess.run(['./mandel_multi', "-n", "20", "-o", "static/images/mandel.bmp", "-x", x, "-y", y, "-m", max, "-s", s])

    return json.dumps(data)

if __name__ == '__main__':
    app.run()
