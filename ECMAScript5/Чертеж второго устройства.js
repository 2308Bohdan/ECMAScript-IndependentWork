"use strict";
// 4. Второе устройство - Кондиционер
// 5. Чертеж второго устройства
	Класс - airCondition;
		состояние
			_name: String,
			_state: Boolean,
			_temperature: Number,
 // COOL(охлажд.), HEAT(обогрев), DRY(осушение), FAN(вентиляция), Sleep (таймер сна)			
			_coolMode: Boolean,
			_heatMode: Boolean,
			_fanMode: Boolean,
			
		поведение:
			getName() : String,
			getState() : Boolean,
			on() : void,
			off() : void,
			
			getTemperature(): Number,
			setTemperation(Number): void,
			increseTemperature(): void,
			decreaseTemperature(): void,
			
			getMode: String;			
			setMode(String): void,
			activeCoolMode(): void,
			activeHeatMode(): void,
			activeFanMode(): void,

			_valid(String): Boolean