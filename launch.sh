#!/bin/bash

cd frontend
npm start
cd ..


source env/Scripts/activate
cd backend
vagrant up
python manage.py runserver
