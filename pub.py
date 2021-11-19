import paho.mqtt.client as mqtt
from sys import argv

if len(argv) > 1:
  msg = ' '.join(argv[1:])
  client=mqtt.Client("paraita-pub")
  client.connect("127.0.0.1")
  client.publish("my_topic", msg)
  client.disconnect()
