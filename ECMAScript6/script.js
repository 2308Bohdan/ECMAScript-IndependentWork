"use strict";
class House {
	constructor(name) {
		if (House.validSting(name)) {
			this._name = name;
		} else {
			throw new Error("Name incorrect!");
		}
		this._devices = [];
	}
	get name() {
		return this._name;
	}
	addDevice(obj) {
		if (typeof obj === "object") {
			this._devices.push(obj);
		}
	}
	get devices() {
		return this._devices;
	}
	getDeviceByName(str) {
		if (House.validSting(str)) {
			for (let i = 0; i < this._devices.length; i++) {
				if (this._devices[i].name === str) {
					return this._devices[i];
				}
			}
		}
	}
	deleteDeviceByName(str) {
		if (House.validSting(str)) {
			for (let i = 0; i < this._devices.length; i++) {
				if (this._devices[i].name === str) {
					this._devices.splice(i, 1);
				}
			}
		}
	}
	offAllDevice() {
		this._devices.forEach(function(value) {
			value.off();
		});
	}
	delayedOff1(name, delay, callback) {
		let par;
		let error;
		if (House.validSting(name) && typeof delay === "number") {
			par = this.getDeviceByName(name);
		} else {
			error = new Error("Invalid parameters");
		}
		setTimeout(function() { callback(error, par)}, delay);
	}
	static validSting(value) {
		if (typeof value === "string") {
			return true;
		}
		return false;
	}
}
//															Device
class Device {
	constructor(name) {
		if (House.validSting(name)) {
			this._name = name;
		} else {
			throw new Error("Name incorrect!");
		}
		this._state = false;
	}
	get name() {
		return this._name;
	}
	get state() {
		return this._state;
	}
	on() {
		this._state = true;
	}
	off() {
		this._state = false;
	}
}
//																TV
class Tv extends Device {
	constructor(name) {
		super(name);
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
	}
		
	getChannelInfo() {
		if (this._state) {
			return this._channelList[this._actualNumberChannel - 1];
		}
	}
	getChannelList() {
		if (this._state) {
			const arr = [];
			for (let i = 0; i < this._channelList.length; i++) {
				arr[i] = `№ ${this._channelList[i]["numberTvChannel"]} - ${this._channelList[i]["nameChannel"]}`;
			}
			return arr;
		}
	}
	setNewChannel(string) {
		if (House.validSting(string) && this._state) {
			this._channelList[this._channelList.length] = {
				numberTvChannel: this._channelList.length + 1,
				nameChannel: string
			};
		}
	}
	increseChannel() {
		if (this._actualNumberChannel < this._channelList.length) {
			this._actualNumberChannel++;
		};
	}
	decreaseChannel() {
		if (this._actualNumberChannel > 1) {
			this._actualNumberChannel--;
		};
	}
	turnDesireChannel(num) {
		if (typeof num === "number" && !isNaN(num) && num > 0 && num <= this._channelList.length) {
			this._actualNumberChannel = num;
		};
	}
	findDesireChannel(string) {
		if (House.validSting(string)) {
			for (let i = 0; i < this._channelList.length; i++) {
				if (this._channelList[i]["nameChannel"] === string) {
					this._actualNumberChannel = this._channelList[i]["numberTvChannel"];
				}
			}
		}
	}
	get volume() {
		if (this._state) {
			return this._volume;
		}
	}
	increseVolume() {
		if (this._volume < 100 && this._state) {
			this._volume++;
		}
	}
	decreaseVolume() {
		if (this._volume > 0 && this._state) {
			this._volume--;
		}
	}
	get brightness() {
		if (this._state) {
			return this._brightness;
		}
	}
	increseBrightness() {
		if (this._brightness < 20 && this._state) {
			this._brightness++;
		}
	}
	decreaseBrightness() {
		if (this._brightness > 0 && this._state) {
			this._brightness--;
		}
	}
}
//													AirCondition

class AirCondition extends Device {
	constructor(name) {
		super(name);
		this._temperature = 20;
		this._coolMode = false;
		this._heatMode = false;
		this._fanMode = false;
	}
	on() {
		super.on();
		this._fanMode = true;
	}
	off() {
		super.off();
		this._coolMode = false;
		this._heatMode = false;
		this._fanMode = false;
	}
	get temperature() {
		return this._temperature;
	}
	set temperature(num) {
		if (typeof num === "number" && num !== undefined && num > 14 && num < 28) {
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
	}
	increseTemperature() {
		if (this._temperature < 28) {
			this._temperature++;
		}
	}
	decreaseTemperature() {
		if (this._temperature > 14) {
			this._temperature--;
		}
	}
	get mode() {
		if (this._coolMode) {
			return "Cool Mode";
		} else if (this._heatMode) {
			return "Heat Mode";
		} else {
			return "Fan";
		}
	}
	set mode(string) {
		if (House.validSting(string)) {
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
	}
	activeCoolMode() {
		this._coolMode = true;
		this._heatMode = false;
		this._fanMode = false;
	}
	activeHeatMode = function() {
		this._coolMode = false;
		this._heatMode = true;
		this._fanMode = false;

	}
	activeFanMode = function() {
		this._coolMode = false;
		this._heatMode = false;
		this._fanMode = true;
	}	
}