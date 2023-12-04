
FROM python:3.8.3-alpine

WORKDIR /app
ADD ./backend/req.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/req.txt

ADD ./docker /app/docker
ADD ./backend /app/backend