var minToSeconds = 90;

var minutesToMiliseconds = 60000;
var secondsToMiliseconds = 1000;

var incrementTime = 500;
var currentTime = 0;

var restartClockTime = false;

var Timer;

var delayTimer = false;

var timeSelect = document.querySelector('#timeSelect');
var secondsSelect = document.querySelector('#secSelect');
var howSelect = document.querySelector('#howSelect');
var startButton = document.querySelector('#startDropdownButton');

var typeTimeSelect = document.querySelector('#typeTimeSelect');
var typeSecondsSelect = document.querySelector('#typeSecSelect');
var typeHowSelect = document.querySelector('#typeHowSelect');
var typeStartButton = document.querySelector('#startTypeTimer');

var pauseButton = document.querySelector('#pause');
var resumeButton = document.querySelector('#resume');
var restartButton = document.querySelector('#restart');
var helpBtn = document.querySelector('#help');
var startTimerButton = document.querySelector('#startPlay');

var helpButton = document.querySelector('.help-btn');

var counterContainer = document.querySelector('#counter-container');

var timer = document.querySelector('#timer');

var overtimeDisplay = document.querySelector('#overtime');

var warning = document.querySelector('#warning');

var landingContainer = document.querySelector('#getStarted');

var containerTimer = document.querySelector('.container-timer');

var startPauseButton = document.querySelector('#startPauseModal');

var delayModal = document.querySelector('#delayModal');

var delayModalCancel = document.querySelector('#delayModalCancel');

var delayCounterDisplay = document.querySelector('#delayCounter');

var body = document.querySelector('#body');

var pauseModal = document.querySelector('#pauseModal');

var counterUtilityRow = document.querySelector('#counter-bottom-row');

var helpModal = document.querySelector('#helpModal');

var addTimeSelect = document.querySelector('#addTimeSelect');

var addSecSelect = document.querySelector('#addSecSelect');

var addTimeButton = document.querySelector('#addTimeButton');

var helpCancel = document.querySelector('#helpCancel');

const initialize = () => {
	startButton.addEventListener('click', function () {
		switch (howSelect.value) {
			case 'on-stage':
				startPausedCounter(true);
				break;
			case 'now':
				startCounter(false, true);
				break;
			case 'ten-seconds':
				delayCounter(true);
				break;
		}
	});
	typeStartButton.addEventListener('click', function () {
		if (typeTimeSelect.value == '') {
			return;
		}
		switch (typeHowSelect.value) {
			case 'on-stage':
				startPausedCounter(false);
				break;
			case 'now':
				startCounter(false, false);
				break;
			case 'ten-seconds':
				delayCounter(false);
				break;
		}
	});

	pauseButton.addEventListener('click', pause);

	// TODO: check this event listener
	resumeButton.addEventListener('click', pause);

	restartButton.addEventListener('click', restart);

	startTimerButton.addEventListener('click', startPausedCounter);

	helpButton.addEventListener('click', help);

	delayModalCancel.addEventListener('click', function () {
		location.reload();
	});

	addTimeButton.addEventListener('click', addExtraTime);

	helpCancel.addEventListener('click', function () {
		helpModal.classList.add('remove');
	});

	helpBtn.addEventListener('click', help);
};

const addExtraTime = () => {
	if (addTimeSelect.value == '') {
		return;
	}

	var halfTime;
	currentTime = currentTime + addTimeSelect.value * minutesToMiliseconds;

	if (typeof typeSecondsSelect.value == 'string') {
		halfTime = typeSecondsSelect.value * secondsToMiliseconds ?? 0;
	} else {
		halfTime = 0;
	}

	currentTime = parseInt(currentTime) + parseInt(halfTime);
};

const startPausedCounter = (isSelect) => {
	startCounter(true, isSelect);
};

const startCounter = (startPaused, isSelect) => {
	var halfTime;
	if (isSelect) {
		currentTime = timeSelect.value;

		halfTime = secondsSelect.value;

		currentTime = parseInt(currentTime) + parseInt(halfTime);
	} else {
		currentTime = typeTimeSelect.value * minutesToMiliseconds;

		if (typeof typeSecondsSelect.value == 'string') {
			halfTime = typeSecondsSelect.value * secondsToMiliseconds ?? 0;
		} else {
			halfTime = 0;
		}

		currentTime = parseInt(currentTime) + parseInt(halfTime);
	}

	counterContainer.innerHTML = formatTime(currentTime);

	landingContainer.classList.add('remove');

	containerTimer.classList.remove('remove');

	// delayModal.classList.add('remove')

	if (!restartClockTime) {
		restartClockTime = currentTime;
	}

	if (startPaused) {
		startPauseButton.classList.remove('remove');
	} else {
		startPauseButton.classList.add('remove');
		counterUtilityRow.classList.remove('remove');
	}

	countdown.set(updateTimer, incrementTime, true);

	if (startPaused) {
		startPause();
	}
};

const delayCounter = (isSelect) => {
	delayModal.classList.remove('remove');
	landingContainer.classList.add('remove');
	delayCounterTimer(10, isSelect);
};

const delayCounterTimer = (seconds, isSelect) => {
	var displayTime = seconds;
	if (seconds < 10) {
		displayTime += '&nbsp;';
	}

	delayCounterDisplay.innerHTML = displayTime;

	if (seconds > 0) {
		setTimeout(function () {
			delayCounterTimer(--seconds, isSelect);
		}, 1000);
	} else {
		delayModal.classList.add('remove');
		startCounter(false, isSelect);
	}
};

const pause = () => {
	if (isPaused()) {
		pauseModal.classList.add('remove');
		countdown.play();
		// TODO: Timer.play
	} else {
		pauseModal.classList.remove('remove');
		countdown.pause();
	}
};

const startPause = () => {
	if (isPaused()) {
		counterUtilityRow.classList.remove('remove');
		startPauseButton.classList.add('remove');
		countdown.play();
	} else {
		counterUtilityRow.classList.remove('remove');
		startPauseButton.classList.add('remove');
		countdown.pause();
	}
};

const restart = () => {
	location.reload();
	currentTime = restartClockTime;
	countdown = false;

	if (!restartClockTime) {
		currentTime = restartClockTime;
	}

	counterContainer.classList.add('remove');
	overtimeDisplay.classList.add('remove');
	overtimeDisplay.classList.remove('overtime');
	pauseModal.classList.add('remove');
	landingContainer.classList.remove('remove');
	counterContainer.classList.remove('countdown');
	timer.classList.replace('timer-overtime', 'timer-undertime');
};

const help = () => {
	helpModal.classList.remove('remove');
};

const formatTime = (ms) => {
	var seconds = Math.floor(ms / 1000);
	var minutes = Math.floor(seconds / 60);
	var display = 00;

	if (seconds >= minToSeconds) {
		display = minutes;
	} else {
		display = seconds;
		if (seconds >= 0) {
		}
	}

	var time = Math.abs(display);

	return time;
};

const overtime = () => {
	body.classList.add('overtime-body');
	timer.classList.replace('timer-overtime', 'timer-undertime');
	warning.classList.replace('warning', 'remove');
	counterContainer.classList.remove('countdown');
};

const overtimeBlink = () => {
	counterContainer.classList.remove('countdown');
	overtimeDisplay.classList.replace('remove', 'overtime');
	overtimeDisplay.innerHTML = "<strong>TIME'S&nbsp;UP</strong>";
	timer.classList.replace('timer-undertime', 'timer-overtime');
};

const beforeOvertime = () => {
	warning.classList.replace('remove', 'warning');
	timer.classList.replace('timer-undertime', 'timer-overtime');
	counterContainer.classList.add('countdown');
	body.classList.remove('overtime-body');
	overtimeDisplay.classList.add('remove');
};

const removeOvertimeClasses = () => {
	warning.classList.add('remove');
	body.classList.remove('overtime-body');
	counterContainer.classList.remove('countdown');
	timer.classList.replace('timer-overtime', 'timer-undertime');
	overtimeDisplay.classList.add('remove');
};

const updateTimer = () => {
	counterContainer.innerHTML = formatTime(currentTime);

	if (currentTime > 0) {
		removeOvertimeClasses();
		// TODO: Add some groundbreaking logic when i think about it
	}

	if (currentTime <= 420000) {
		beforeOvertime();
	}

	if (currentTime < 0) {
		overtime();
	}

	if (currentTime <= -9500) {
		overtimeBlink();
	}

	currentTime -= incrementTime;
};

const isPaused = () => {
	// TODO: Implement

	if (countdown.isActive) {
		return false;
	}
	return true;
};

var countdown = {
	init: undefined,
	action: undefined,
	intervalTime: undefined,
	isActive: false,
	remaining: undefined,
	last: undefined,
	timeoutObject: undefined,
	func: undefined,
	time: undefined,
	autostart: undefined,
	set: function (func, time, autostart) {
		countdown.func = func;
		(countdown.time = time), (countdown.autostart = autostart);
		countdown.init = true;
		if (typeof func == 'object') {
			var paramList = ['autostart', 'time'];
			for (var arg in paramList) {
				if (func[paramList[arg]] != undefined) {
					eval(paramList[arg] + ' = func[paramList[arg]]');
				}
			}
			func = func.action;
		}
		if (typeof func == 'function') {
			countdown.action = func;
		}
		if (!isNaN(time)) {
			countdown.intervalTime = time;
		}
		if (autostart && !countdown.isActive) {
			countdown.isActive = true;
			countdown.setTimer();
		}
		return this;
	},
	once: function (time) {
		var timer = this;
		if (isNaN(time)) {
			time = 0;
		}
		window.setTimeout(function () {
			timer.action();
		}, time);
		return this;
	},
	play: function (reset) {
		if (!countdown.isActive) {
			if (reset) {
				countdown.setTimer();
			} else {
				countdown.setTimer(countdown.remaining);
			}
			countdown.isActive = true;
		}
		return this;
	},
	pause: function () {
		if (countdown.isActive) {
			countdown.isActive = false;
			countdown.remaining -= new Date() - countdown.last;
			countdown.clearTimer();
		}
		return this;
	},
	stop: function () {
		countdown.isActive = false;
		countdown.remaining = countdown.intervalTime;
		countdown.clearTimer();
		return this;
	},
	toggle: function (reset) {
		if (countdown.isActive) {
			countdown.pause();
		} else if (reset) {
			countdown.play(true);
		} else {
			countdown.play();
		}
		return this;
	},
	reset: function () {
		countdown.isActive = false;
		countdown.play(true);
		return this;
	},
	clearTimer: function () {
		window.clearTimeout(countdown.timeoutObject);
	},
	setTimer: function (time) {
		var timer = this;
		if (typeof countdown.action != 'function') {
			return;
		}
		if (isNaN(time)) {
			time = countdown.intervalTime;
		}
		countdown.remaining = time;
		countdown.last = new Date();
		countdown.clearTimer();
		countdown.timeoutObject = window.setTimeout(function () {
			timer.go();
		}, time);
	},
	go: function () {
		if (countdown.isActive) {
			countdown.action();
			countdown.setTimer();
		}

		if (countdown.init) {
			return new countdown.set(
				countdown.func,
				countdown.time,
				countdown.autostart
			);
		} else {
			countdown.set(countdown.func, countdown.time, countdown.autostart);
			return this;
		}
	},
};
