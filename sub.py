import paho.mqtt.client as mqtt

def on_msg(client, userdata, message):
  print("start")
  print(message.payload)
  print("stop")


client=Client("paraita-sub")
client.connect("127.0.0.1")
client.subscribe("my_topic")

client.on_message=on_msg
client.loop_start()

#client.loop_stop()

