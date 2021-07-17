First off, I've never used django before so this was a really great learning opportunity, 
and I'm thankful for that! It was a really interesting project to work on.

Running the application:
If you're reading this you've already cloned or downloaded the library from github, 
and are in the django-wall-react directory. If you aren't in that directory navigate there now.

If you don't have it install pipenv using "pip install pipenv" to set up virtual env

Next start the virtual env using "pipenv shell"

Go to the backend folder and use command "python manage.py makemigrations" 
then run "python manage.py migrate"

This should get the database and models ready.

You the backend should be setup now and you can use command "python manage.py runserver" to start the server.

To get the frontend working, you should will need to have npm installed open a second terminal.

Navigate to the django-wall-react folder again and activate the virtual environment with "pipenv shell"

Then navigate to the frontend folder and use npm start.

This should open the application in a browser window.
Frontend will be hosted at localhost:3000 and backend at localhost: 8000

