var dollar = new Image();
dollar.src = 'dollar.png';
let particleArray = [];


const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mqtt;
var reconnectTimeout = 2000;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.weight = 0.5;
        this.directionX = 0;
        this.isDead = false;
    }

    update() {
        if (this.y > canvas.height) {
            //this.y = 0;
            //this.weight = 0.5;
            //this.x = Math.random() * canvas.width;
            this.isDead = true;
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.directionX = (Math.random() - 0.5) * 2;
        this.x += this.directionX;
    }

    draw() {
        ctx.drawImage(dollar, this.x, this.y, 50, 50);
    }
}

for (let i = 0; i < 0; i++) {
    particleArray.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height))
}

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach(e => {
        if (e.isDead) {
            const index = particleArray.indexOf(e);
            if (index > -1) {
                particleArray.splice(index, 1);
            }
        }
        e.update();
        e.draw();
    })
    requestAnimationFrame(animate);
}


function MQTTconnect() {
    if (typeof path == "undefined") {
        path = '/';
    }
    mqtt = new Paho.MQTT.Client(
        host,
        port,
        path,
        "web_" + parseInt(Math.random() * 100, 10)
    );
    const options = {
        timeout: 3,
        useSSL: useTLS,
        cleanSession: cleansession,
        onSuccess: onConnect,
        onFailure: function (message) {
            console.log('Connection failed: ' + message.errorMessage + ', retrying..');
            setTimeout(MQTTconnect, reconnectTimeout);
        }
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;

    if (username != null) {
        options.userName = username;
        options.password = password;
    }
    console.log("Host=" + host + ", port=" + port + ", path=" + path + " TLS = " + useTLS + " username=" + username + " password=" + password);
    mqtt.connect(options);
}

function onConnect() {
    mqtt.subscribe(topic, {qos: 0});
    console.log('Connected to ' + host + ':' + port + path + ', topic->' + topic)
}

function onConnectionLost(response) {
    setTimeout(MQTTconnect, reconnectTimeout);
    console.log('Connection lost: ' + response.errorMessage + ', retrying..')
};

function onMessageArrived(message) {
    const topic = message.destinationName;
    const payload = message.payloadString;
    $('#ws').html('<h1>' + payload + '</h1>');
    particleArray.push(new Particle(Math.random() * canvas.width, 0));
};

$(document).ready(function () {
    animate();
    MQTTconnect();
});








