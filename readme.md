## Its Gonna Rain

![Family Guy Gif](http://68.media.tumblr.com/tumblr_mcmqq7pg0f1qino4lo1_500.gif)

Yet another final year assignment at Humber College. The goal of this one was to take knowledge we learned about the Arduino and IoT devices, and make an IoT device ourselves. We chose to make a weather device that tells you the weather based on your exact location rather than some airport 30 minutes from your house.

## Arduino Setup

It's quite simple. Using an Arduino Uno, a breadboard, a BME280 sensor, and some wires, you hook it all up in the IC2 configuration. Alternatively you can just solder wires right to the sensor.

![fritzing diagram for bme280 wiring](http://johnny-five.io/img/breadboard/multi-BME280-arduino.png)

## The Code

Using Node.js, Serial Port, Mongodb, and Chart.js we created exactly what we wanted. A loaded the Arduino with code that printed the data out as JSON file, which is then printed to the node file thanks for SocketPort. The newest data get sent right to the client side as well as being saved in MongoDB for a more detailed view of the past several reading. We also had it planned that using those previous reading we would be able to inform a user if it will rain or not. Unfortunately we are not meteorologists and the calculations involved in that were a little to difficult given the allotted time frame for the assignment.

## Other Ideas

We presented this as a device that you could install in several locations. Say, one at home and one at your cottage. That way you could get detailed information on how to dress for a vacation. On top of that we pitched the idea of having a sensor close to the door a user would use to leave their home. That way a push notification would get sent to their device notifying them if they should bring and umbrella, hat, sunglasses, etc.
