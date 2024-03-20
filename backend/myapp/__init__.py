import os

from flask import Flask 

from .extensions import db
from .routes import main
from .config import Config


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = Config.DATABASE_URL
# postgres://prettyprinted_render_example_user:11vq6k72GmFJazhVpz3pFUko50djVZT1@dpg-ceukdhmn6mpglqdb4avg-a.oregon-postgres.render.com/prettyprinted_render_example

db.init_app(app)

app.register_blueprint(main)