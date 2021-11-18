import paho.mqtt.client as mqtt

client=Client("paraita-pub")
client.connect("127.0.0.1")
client.publish("my_topic", "This is my message")
client.disconnect()
