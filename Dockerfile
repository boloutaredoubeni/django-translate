FROM python:3.5
ENV PYTHONBUFFERED 1
RUN mkdir /app
WORKDIR /app
ADD requirements.txt /app/
RUN pip3 install -r requirements.txt
RUN wget -qO- https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs
ADD . /app/
RUN npm install --save
