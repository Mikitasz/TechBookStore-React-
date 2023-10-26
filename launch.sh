#!/bin/bash


source env/Scripts/activate
cd backend
vagrant up
python manage.py runserver
cd ..
cd frontend
npm start