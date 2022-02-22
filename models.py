from app import db

class Presigned(db.Model):
    __tablename__ = 'presigned_urls'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(), nullable=False)

    def __init__(self, url):
        self.url = url

    def __repr__(self):
        return '<Presigned {}>'.format(self.url)
