"use strict";
// 1. Первое устройство - Телевизор
// 2. Чертеж первого устройства
	Класс - tv;
		состояние
			_name: String,
			_state: Boolean,
			_actuaNumberChannel: Number,
			_channelList: [ 
				{
					numberTvChannel: Number, (0-..) // не больше длинны массива
					nameChannel: String,
				}
				....
			],
			_volume: Number, (0-100) 
			_brightness: Number, (0-20)
			
		поведение:
			getName() : String,
			getState() : Boolean,
			on() : void,
			off() : void,
			
			getChannelInfo(): obj,
			getChannelList(): [....],
			setNewChannel(String): void,
			increseChannel(): void,
			decreaseChannel(): void,
			turnDesireChannel(Number): void,
			findDesireChannel(String): void,
			
			getVolume() : Number,
			increseVolume(): void, 
			decreaseVolume(): void, 
			
			getBrightness() : Number,
			increseBrightness() : void,
			decreaseBrightness() : void,
			
			_valid(String): Boolean
