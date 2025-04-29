from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import datetime

db = SQLAlchemy()


# Define UserDetail model for form submissions
class UserDetail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    batch = db.Column(db.String(50), nullable=False)
    mobile = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    education = db.Column(db.String(50), nullable=True)
    userid = db.Column(db.String(50), nullable=True)
    password = db.Column(db.String(50), nullable=True)
    role = db.Column(db.String(50), nullable=True)
    dob = db.Column(db.String(50), nullable=True)
    photo = db.Column(db.LargeBinary(length=(2**32)-1))
    document = db.Column(db.LargeBinary(length=(2**32)-1))
    emergencyContactNo = db.Column(db.String(15), nullable=False)
    emergencyContactName = db.Column(db.String(50), nullable=False)
    emergencyContactRelation = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<UserDetail {self.name}>'
    
# Define Attendance model
class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    team = db.Column(db.String(50), nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date.isoformat(),
            'status': self.status,
            'team': self.team
        }

    

# Define Feedback model without the 'id' field
class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    feedback = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Feedback {self.name}>'

    # Adding a method to convert the model to a dictionary for easy JSON response
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'feedback': self.feedback
        }

# Save feedback function
def save_feedback(name, feedback):
    try:
        # Create a new feedback entry
        new_feedback = Feedback(name=name, feedback=feedback)

        # Add and commit to the database
        db.session.add(new_feedback)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Error saving feedback: {e}")
        return False
    
    
    
class NewPurchase(db.Model):
    __tablename__ = 'new_purchase'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(255), nullable=False)
    mobile_no = db.Column(db.String(255), nullable=False)
    items = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    estimate_value = db.Column(db.String(255), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(255), default='INR', nullable=False)
    mode_of_payment = db.Column(db.String(255), nullable=False)
    payment_document = db.Column(db.LargeBinary(length=(2**32)-1))
    date_of_purchase = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<NewPurchase {self.id}, {self.employee_name}, {self.items}>"
    
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(100), nullable=False)  # Store the date as a string
    details = db.Column(db.String(255), nullable=False)  # Store event details

    def __repr__(self):
        return f"<Event {self.date} - {self.details}>"    
    
class Yajman(db.Model):
    __tablename__ = 'yajman'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    date_of_registration = db.Column(db.Date, nullable=False)
    date_of_aarti = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    num_members = db.Column(db.Integer, nullable=False)
    dob = db.Column(db.Date, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)

    def __init__(self, name, phone_number, date_of_registration, date_of_aarti, email, num_members, dob, amount, payment_method):
        self.name = name
        self.phone_number = phone_number
        self.date_of_registration = date_of_registration
        self.date_of_aarti = date_of_aarti
        self.email = email
        self.num_members = num_members
        self.dob = dob
        self.amount = amount
        self.payment_method = payment_method