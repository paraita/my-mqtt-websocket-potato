Install the mqtt dependency !
Mosquitto is served via the docker-compose file
You'll need to serve the index file:

```sh
python3 -m http.server 8000
```

Also, copy the mosquitto config file into the volume.
