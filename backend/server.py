from flask import Flask, request, jsonify, render_template, redirect, url_for, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import logging
from module import db, UserDetail, Attendance, Feedback, save_feedback, NewPurchase, Event, Yajman
import base64
from datetime import datetime, date

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'mysql+mysqlconnector://root:root@localhost/new_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'pdf'}  # Define allowed file extensions
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

db.init_app(app)

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

# Create all tables if they do not exist
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({'error': 'File size exceeds the limit'}), 413


#----------------------------INFO--------------------------------------


# Route to handle form submission (POST request)
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        # Debugging: Print all form data
        print(request.form)

        # Extract form data
        name = request.form.get('name')
        batch = request.form.get('batch')
        mobile = request.form.get('mobile')
        email = request.form.get('email')
        address = request.form.get('address')
        education = request.form.get('education')
        userid = request.form.get('userid')
        password = request.form.get('password')
        role = request.form.get('role')  # Ensure this matches the frontend
        dob = request.form.get('dob')
        emergencyContactNo = request.form.get('emergencyContactNo')
        emergencyContactName = request.form.get('emergencyContactName')
        emergencyContactRelation = request.form.get('emergencyContactRelation')
        

        # Handle file uploads and store them as BLOBs in the database
        photo = request.files.get('photo')
        document = request.files.get('document')

        photo_data = None
        document_data = None

        # Check and save photo as BLOB
        if photo and allowed_file(photo.filename):
            photo_data = photo.read()  # Read the file data as binary

        # Check and save document as BLOB
        if document and allowed_file(document.filename):
            document_data = document.read()  # Read the file data as binary

        # Create a new user object with the uploaded file data
        new_user = UserDetail(
            name=name,
            batch=batch,
            mobile=mobile,
            email=email,
            address=address,
            education=education,
            userid=userid,
            password=password,
            role=role,
            emergencyContactNo=emergencyContactNo,
            emergencyContactName=emergencyContactName,
            emergencyContactRelation=emergencyContactRelation,
            dob=dob,
            photo=photo_data,  # Store the photo as binary data
            document=document_data  # Store the document as binary data
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('index'))
        except Exception as e:
            db.session.rollback()
            return f"Error: {str(e)}"

    return redirect(url_for('index'))

# Function to check if a file is of allowed type (image or document)
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to get user details (GET request)
@app.route('/users', methods=['GET'])
def get_users():
    try:
        # Fetch all user details from the database
        users = UserDetail.query.all()
        
        # Convert binary data to Base64 for photo and document
        user_list = []
        for user in users:
            user_dict = {
                'id': user.id,
                'name': user.name,
                'batch': user.batch,
                'mobile': user.mobile,
                'email': user.email,
                'address': user.address,
                'education': user.education,
                'userid': user.userid,
                'password': user.password,
                'role': user.role,
                'emergencyContactNo':user.emergencyContactNo,
                'emergencyContactName':user.emergencyContactName,
                'emergencyContactRelation':user.emergencyContactRelation,
                'dob': user.dob,
                'photo': base64.b64encode(user.photo).decode('utf-8') if user.photo else None,
                'document': base64.b64encode(user.document).decode('utf-8') if user.document else None
            }
            user_list.append(user_dict)
        
        return jsonify(user_list), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Route to delete a user (DELETE request)
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        # Find the user by id
        user = UserDetail.query.get(id)
        
        if user:
            # Delete the user from the database
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': f'User with ID {id} has been deleted successfully.'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Route to update user details (PUT request)
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        # Find the user by id
        user = UserDetail.query.get(id)
        
        if user:
            # Update user details
            user.name = request.json.get('name', user.name)
            user.batch = request.json.get('batch', user.batch)
            user.mobile = request.json.get('mobile', user.mobile)
            user.email = request.json.get('email', user.email)
            user.address = request.json.get('address', user.address)
            user.education = request.json.get('education', user.education)
            user.userid = request.json.get('userid', user.userid)
            user.password = request.json.get('password', user.password)
            user.role = request.json.get('role', user.role)
            user.dob = request.json.get('dob', user.dob)
            user.emergencyContactNo = request.json.get('emergencyContactNo', user.emergencyContactNo)
            user.emergencyContactName = request.json.get('emergencyContactName', user.emergencyContactName)
            user.emergencyContactRelation = request.json.get('emergencyContactRelation', user.emergencyContactRelation)

            # Handle file uploads (photo and document) for update
            photo = request.files.get('photo')
            document = request.files.get('document')

            if photo and allowed_file(photo.filename):
                user.photo = photo.read()  # Save the new photo as binary

            if document and allowed_file(document.filename):
                user.document = document.read()  # Save the new document as binary

            # Commit the changes to the database
            db.session.commit()
            return jsonify({'message': f'User with ID {id} has been updated successfully.'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    


#----------------------------INFO END------------------------------------- 


#----------------------------ATTENDANCE--------------------------------------   

@app.route('/mark-attendance', methods=['POST'])
def mark_attendance():
    data = request.get_json()
    logging.info(f"Incoming data: {data}")

    if not all(field in data for field in ['name', 'date', 'status', 'team']):
        logging.error("Missing required fields in request data")
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        for name in data['name']:
            new_attendance = Attendance(
                name=name,
                date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
                status=data['status'],
                team=data['team']
            )
            new_attendance.save()
        
        logging.info("Attendance marked successfully")
        return jsonify({'message': 'Attendance marked successfully!'}), 201
    except Exception as e:
        logging.error(f"Error marking attendance: {e}")
        return jsonify({'error': str(e)}), 500

# Route to get attendance for all students
@app.route('/get-attendance', methods=['GET'])
def get_attendance():
    try:
        # Fetch all attendance records
        attendance_records = Attendance.query.all()

        if not attendance_records:
            return jsonify({'message': 'No attendance records found'}), 404

        # Return attendance data in JSON format
        return jsonify([record.to_dict() for record in attendance_records]), 200
    except Exception as e:
        logging.error(f"Error fetching attendance: {e}")
        return jsonify({'error': str(e)}), 500
    

#--------------------------ATTENDANCE ENDS--------------------------------------       
    

#----------------------------FEEDBACK----------------------------------------    

# Route to submit feedback
@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()

    # Ensure name and feedback are present in the request data
    if not all(field in data for field in ['name', 'feedback']):
        return jsonify({'error': 'Both name and feedback are required!'}), 400

    # Get the feedback data
    name = data['name']
    feedback_data = data['feedback']  # Avoid overwriting the 'feedback' function

    # Save feedback using the save_feedback function
    success = save_feedback(name, feedback_data)

    if success:
        return jsonify({'message': 'Feedback submitted successfully!'}), 201
    else:
        return jsonify({'error': 'Failed to save feedback'}), 500


# Route to get feedback data (GET request)
@app.route('/get-feedback', methods=['GET'])
def get_feedback():
    try:
        # Fetch all feedback from the database
        feedback_records = Feedback.query.all()

        if not feedback_records:
            return jsonify({'message': 'No feedback records found'}), 404

        # Return feedback data in JSON format
        return jsonify([feedback.to_dict() for feedback in feedback_records]), 200

    except Exception as e:
        print(f"Error fetching feedback: {e}")
        return jsonify({'error': str(e)}), 500
    
    

@app.route('/delete-feedback/<int:feedback_id>', methods=['DELETE'])
def delete_feedback(feedback_id):
    try:
        # Find the feedback by ID
        feedback_to_delete = Feedback.query.get(feedback_id)

        if not feedback_to_delete:
            return jsonify({'error': 'Feedback not found'}), 404

        # Delete the feedback
        db.session.delete(feedback_to_delete)
        db.session.commit()

        return jsonify({'message': 'Feedback deleted successfully'}), 200

    except Exception as e:
        print(f"Error deleting feedback: {e}")
        return jsonify({'error': 'Failed to delete feedback'}), 500
    
    
#--------------------------FEEDBACK END--------------------------------------
    
    
#--------------------------EVENT--------------------------------------

# POST endpoint to add an event
@app.route('/api/events', methods=['POST'])
def add_event():
    data = request.get_json()

    # Check if the required fields exist in the payload
    if 'date' not in data or 'details' not in data:
        return jsonify({"error": "Missing date or details"}), 400

    # Create a new event and add it to the database
    new_event = Event(date=data['date'], details=data['details'])
    db.session.add(new_event)
    db.session.commit()

    return jsonify({"message": "Event added successfully"}), 201

# GET endpoint to retrieve all events
@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()  # Retrieve all events from the database
    events_list = [{"date": event.date, "details": event.details} for event in events]
    return jsonify(events_list), 200

    
#--------------------------EVENT END -------------------------------------    
    
#--------------------------PURCHASE--------------------------------------       
    
# Your new purchase route
@app.route('/api/Newpurchase', methods=['POST'])
def submit_purchase():
    if request.method == 'POST':
        try:
            # Extract form data
            name = request.form.get('Name')
            email = request.form.get('email')
            department = request.form.get('department')
            mobile_no = request.form.get('mobileNo')
            items = request.form.get('items')
            quantity = request.form.get('quantity')
            description = request.form.get('description')
            estimate_value = request.form.get('estimateValue')
            total_amount = request.form.get('totalAmount')
            currency = request.form.get('currency', 'INR')  # Default to INR if not provided
            mode_of_payment = request.form.get('modeOfPayment')
            date_of_purchase = request.form.get('date')

            # Handle file upload for payment_document
            payment_document = request.files.get('paymentDocument')
            payment_document_data = None

            if payment_document and allowed_file(payment_document.filename):
                payment_document_data = payment_document.read()  # Read the file as binary data

            # Create a new NewPurchase object
            new_purchase = NewPurchase(
                name=name,
                email=email,
                department=department,
                mobile_no=mobile_no,
                items=items,
                quantity=int(quantity),
                description=description,
                estimate_value=float(estimate_value),
                total_amount=float(total_amount),
                currency=currency,
                mode_of_payment=mode_of_payment,
                payment_document=payment_document_data,  # Store the binary data (BLOB)
                date_of_purchase=datetime.strptime(date_of_purchase, '%Y-%m-%d').date()  # Convert string to date
            )

            # Add to database
            db.session.add(new_purchase)
            db.session.commit()

            return jsonify({"message": "Purchase data saved successfully!"}), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid request method"}), 405



@app.route('/api/purchaselist', methods=['GET'])
def get_all_purchases():
    try:
        # Fetch all records from the NewPurchase table
        purchases = NewPurchase.query.all()

        # Convert the data into a list of dictionaries for easy JSON response
        purchases_data = []
        for purchase in purchases:
            payment_document_type = None
            if purchase.payment_document:
                # Determine the file type based on the file's magic numbers (first few bytes)
                if purchase.payment_document.startswith(b'\xFF\xD8\xFF'):  # JPEG
                    payment_document_type = "image/jpeg"
                elif purchase.payment_document.startswith(b'\x89PNG\r\n\x1a\n'):  # PNG
                    payment_document_type = "image/png"
                else:
                    payment_document_type = "application/octet-stream"  # Default to binary

            purchases_data.append({
                "id": purchase.id,
                "name": purchase.name,
                "email": purchase.email,
                "department": purchase.department,
                "mobile_no": purchase.mobile_no,
                "items": purchase.items,
                "quantity": purchase.quantity,
                "description": purchase.description,
                "estimate_value": purchase.estimate_value,
                "total_amount": purchase.total_amount,
                "currency": purchase.currency,
                "mode_of_payment": purchase.mode_of_payment,
                "date_of_purchase": purchase.date_of_purchase,
                "payment_document": base64.b64encode(purchase.payment_document).decode('utf-8') if purchase.payment_document else None,
                "payment_document_type": payment_document_type,  # Include the file type
            })

        return jsonify(purchases_data), 200  # Return the list of purchases as a JSON response

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
#--------------------------PURCHASE END--------------------------------------         
    
@app.route('/api/yajman', methods=['POST'])
def register_yajman():
    try:
        # Get data from the incoming request
        data = request.get_json()

        # Parse the date strings into datetime objects
        date_of_registration = datetime.strptime(data['dateOfRegistration'], '%Y-%m-%d').date()
        date_of_aarti = datetime.strptime(data['dateOfAarti'], '%Y-%m-%d').date()
        dob = datetime.strptime(data['dob'], '%Y-%m-%d').date()

        # Create a new Yajman instance
        new_yajman = Yajman(
            name=data['name'],
            phone_number=data['phoneNumber'],
            date_of_registration=date_of_registration,
            date_of_aarti=date_of_aarti,
            email=data['email'],
            num_members=data['numMembers'],
            dob=dob,
            amount=data['amount'],
            payment_method=data['paymentMethod']
        )

        # Add to the session and commit the transaction
        db.session.add(new_yajman)
        db.session.commit()

        return jsonify({"message": "Registration successful!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET endpoint to retrieve Yajman details by Date of Aarti
@app.route('/api/yajman/<date>', methods=['GET'])
def get_yajman_by_date(date):
    try:
        # Convert the date string into a datetime object
        date_obj = datetime.strptime(date, '%Y-%m-%d').date()

        # Query the database for all Yajman entries with the matching Date of Aarti
        yajmans = Yajman.query.filter(Yajman.date_of_aarti == date_obj).all()

        # Convert the results to a list of dictionaries
        yajmans_list = []
        for yajman in yajmans:
            yajmans_list.append({
                "id": yajman.id,
                "name": yajman.name,
                "phone_number": yajman.phone_number,
                "date_of_registration": yajman.date_of_registration,
                "date_of_aarti": yajman.date_of_aarti,
                "email": yajman.email,
                "num_members": yajman.num_members,
                "dob": yajman.dob,
                "amount": yajman.amount,
                "payment_method": yajman.payment_method
            })

        return jsonify(yajmans_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Fetch all Yajman data
@app.route('/api/yajmanlist', methods=['GET'])
def get_all_yajmans():
    try:
        # Query the database for all Yajman entries
        yajmans = Yajman.query.all()

        # Convert the results to a list of dictionaries
        yajmans_list = []
        for yajman in yajmans:
            yajmans_list.append({
                "id": yajman.id,
                "name": yajman.name,
                "phone_number": yajman.phone_number,
                "date_of_registration": yajman.date_of_registration,
                "date_of_aarti": yajman.date_of_aarti,
                "email": yajman.email,
                "num_members": yajman.num_members,
                "dob": yajman.dob,
                "amount": yajman.amount,
                "payment_method": yajman.payment_method
            })

        return jsonify(yajmans_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
        
#======================================================================

    
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
