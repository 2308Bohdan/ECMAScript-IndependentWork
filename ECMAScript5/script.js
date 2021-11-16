"use strict";

function House(name) {
	if (this._validString(name)) {
		this._name = name;
	} else {
		throw new Error("Name incorrect!");
	}
    this._devices = [];
};

House.prototype.getName = function() {
	return this._name;
};
House.prototype.addDevice = function(obj) {
	if (typeof obj === "object") {
		this._devices.push(obj);
	}
};
House.prototype.getDevices = function() {
	return this._devices;
};

House.prototype.getDeviceByName = function(name) {
	if (this._validString(name)) {
		for (var i = 0; i < this._devices.length; i++) {
			if (this._devices[i].getName() === name) {
				return this._devices[i];
			}
		}
	}
};
House.prototype.deleteDeviceByName = function(name) {
	if (this._validString(name)) {
		for (let i = 0; i < this._devices.length; i++) {
			if (this._devices[i].getName() === name) {
				this._devices.splice(i, 1);
			}
		}
	}
};
House.prototype.offAllDevice = function() {
	this._devices.forEach(function(value) {
		value.off();
	});
};
House.prototype.delayedOff1 = function(name, delay, callback) {
	var par;
	var error;
	
	if (this._validString(name) && typeof delay === "number") {
		par = this.getDeviceByName(name);
	} else {
		error = new Error("Invalid parameters");
	}
	
	setTimeout(function() { callback(error, par)}, delay);
};
House.prototype._validString = function(string) {
	if (typeof string === "string") {
		return true;
	}
	return false;
};

function Device(name) {
	if (this._validString(name)) {
		this._name = name;
	} else {
		throw new Error("Name incorrect!");
	}
	this._state = false;
};

//															Device
Device.prototype.getName = function() {
	return this._name;
};
Device.prototype.getState = function() {
	return this._state;
};
Device.prototype.on = function() {
	this._state = true;
};
Device.prototype.off = function() {
	this._state = false;
};
Device.prototype._validString = function(string) {
	if (typeof string === "string") {
		return true;
	}
	return false;
};

//																TV
function Tv(name) {
	Device.call(this, name);
	this._actualNumberChannel = 1;
	this._channelList = [
		{
			numberTvChannel: 1,
			nameChannel: "Setanta Sports"
		}, 
		{
			numberTvChannel: 2,
			nameChannel: "Canal+"
		},
		{
			numberTvChannel: 3,
			nameChannel: "Megogo"
		},
		{
			numberTvChannel: 4,
			nameChannel: "TV1000"
		}
	];
	this._volume = 25;
	this._brightness = 10;
};

Tv.prototype = Object.create(Device.prototype);
Tv.prototype.constructor = Tv;

Tv.prototype.getChannelInfo = function() {
	if (this._state) {
		return this._channelList[this._actualNumberChannel - 1];
	}
};
Tv.prototype.getChannelList = function() {
	if (this._state) {
		var arr = [];
		for (var i = 0; i < this._channelList.length; i++) {
			arr[i] = "№" + this._channelList[i]["numberTvChannel"] + " - " + this._channelList[i]["nameChannel"];
		}
		return arr;
	}
};
Tv.prototype.setNewChannel = function(string) {
	if (this._validString(string) && this._state) {
		this._channelList[this._channelList.length] = {
			numberTvChannel: this._channelList.length + 1,
			nameChannel: string
		};
	}
};
Tv.prototype.increseChannel = function() {
	if (this._actualNumberChannel < this._channelList.length) {
		this._actualNumberChannel++;
	};
};
Tv.prototype.decreaseChannel = function() {
	if (this._actualNumberChannel > 1) {
		this._actualNumberChannel--;
	};
};
Tv.prototype.turnDesireChannel = function(num) {
	if (typeof num === "number" && !isNaN(num) && num > 0 && num <= this._channelList.length) {
		this._actualNumberChannel = num;
	};
};
Tv.prototype.findDesireChannel = function(string) {
	for (var i = 0; i < this._channelList.length; i++) {
		if (this._channelList[i]["nameChannel"] === string) {
			this._actualNumberChannel = this._channelList[i]["numberTvChannel"];
		}
	}
};

Tv.prototype.getVolume = function() {
	if (this._state) {
		return this._volume;
	}
};
Tv.prototype.increseVolume = function() {
	if (this._volume < 100 && this._state) {
		this._volume++;
	}
};
Tv.prototype.decreaseVolume = function() {
	if (this._volume > 0 && this._state) {
		this._volume--;
	}
};

Tv.prototype.getBrightness = function() {
	if (this._state) {
		return this._brightness;
	}
};
Tv.prototype.increseBrightness = function() {
	if (this._brightness < 20 && this._state) {
		this._brightness++;
	}
};
Tv.prototype.decreaseBrightness = function() {
	if (this._brightness > 0 && this._state) {
		this._brightness--;
	}
};

//													AirCondition
function AirCondition(name) {
	Device.call(this, name);
	this._temperature = 20;
	this._coolMode = false;
	this._heatMode = false;
	this._fanMode = false;
};

AirCondition.prototype = Object.create(Device.prototype);
AirCondition.prototype.constructor = AirCondition;

AirCondition.prototype.on = function() {
	Device.prototype.on.call(this);
	this._fanMode = true;
};
AirCondition.prototype.off = function() {
	Device.prototype.off.call(this);
	this._coolMode = false;
	this._heatMode = false;
	this._fanMode = false;
};
AirCondition.prototype.getTemperature = function() {
	return this._temperature;
};
AirCondition.prototype.setTemperation = function(num) {
	if (typeof number === "number" && number !== undefined && num > 14 && num < 28) {
		if (num > this._temperature) {
			this._coolMode = false;
			this._heatMode = true;
		} else if (num < this._temperature) {
			this._coolMode = true;
			this._heatMode = false;
		}
		this._temperature = num;
		this._fanMode = false;
	}
};
AirCondition.prototype.increseTemperature = function() {
	if (this._temperature < 28) {
		this._temperature++;
	}
};
AirCondition.prototype.decreaseTemperature = function() {
	if (this._temperature > 14) {
		this._temperature--;
	}
};

AirCondition.prototype.getMode = function() {
	if (this._coolMode) {
		return "Cool Mode";
	} else if (this._heatMode) {
		return "Heat Mode";
	} else {
		return "Fan";
	}
};
AirCondition.prototype.setMode = function(string) {
	if (this._validString(string)) {
		if (string === "Cool") {
			this._coolMode = true;
			this._heatMode = false;
			this._fanMode = false;
		} else if (string === "Heat") {
			this._coolMode = false;
			this._heatMode = true;
			this._fanMode = false;
		} else if (string === "Fan") {
			this._coolMode = false;
			this._heatMode = false;
			this._fanMode = true;
		} else {
			throw new Error("Name incorrect!");
		}
	}
};
AirCondition.prototype.activeCoolMode = function() {
		this._coolMode = true;
		this._heatMode = false;
		this._fanMode = false;
};
AirCondition.prototype.activeHeatMode = function() {
		this._coolMode = false;
		this._heatMode = true;
		this._fanMode = false;

};
AirCondition.prototype.activeFanMode = function() {
	this._coolMode = false;
	this._heatMode = false;
	this._fanMode = true;
};