var currentUser = {
	token: '',
	username: '',
	account: '',
	userId: '',
	errorMsg: '',
};

var settingData = {
	testUsers: ['周爽'],
	rules: [
		{title: 'CRC错误在设定时间内高于设定告警个数时产生告警', level: 0, analysis: '已记录', solution: '已记录'},
		{title: 'cmu电压异常', level: 0, analysis: '已记录', solution: '已记录'},
		{title: '光模块整体功能失效', level: 0, analysis: '已记录', solution: '已记录'},
		{title: '内存利用率告警', level: 0, analysis: '已记录', solution: '已记录'},
		{title: '接口接收包错包增长数', level: 0, analysis: '已记录', solution: '已记录'},
		{title: '接口物理状态为Down', level: 0, analysis: '已记录', solution: '已记录'},
		{title: 'ARP报文速率超过门限值', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'BGP邻居DOWN告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'BGP邻居状态机从高状态切换到低状态Trap通告', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'CPU利用率告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'Cpcar基于端口自动防攻击告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'IPv6接口状态发生改变', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'IPv6接口状态改变恢复', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'IS-IS邻居状态发生变化恢复', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'LLDP每秒最多能打印5条LOG，如果每秒要打印的LOG个数超过了阀值，则提示管理员被抑制的LOG个数', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'MAC漂移告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'OSPF报文在非虚连接接口上重传', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'SNMP代理收到一条鉴权失败的消息', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'SNMP协议认证失败。', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'TTL超时环路产生告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'X86服务器产生告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '[云窍]CPU利用率告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '[云窍]ping探测丢包率100%', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '[云窍]接口接收包错包增长数', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '[云窍]虚拟机在迁移周期内达到了允许的最大迁移次数', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '[云窍]错误率上升', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'error-down产生', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'iowait状态占比告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'linkDown', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'ping探测丢包率100%', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'ping探测丢包率60%', level: 1, analysis: '已记录', solution: '已记录'},
		{title: 'vsl口一直协商不上', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '一个VTEP被删除', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '三层环路告警产生', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '交换机内存利用率超阈值告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '交换机无法连接到认证服务器', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '从其他设备上接收到与本地MAC地址一致的MAC通告', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '会话新建速率发生突变', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '光模块整体功能失效', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '冗余组倒换', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '双机热备配置一致性自动检查结果不一致', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '可用的VTY通道数目小于等于阈值时，上报告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '实体光模块故障告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '当前有端口从learning状态变成forwarding状态或者从forwarding状态变成discarding状态。', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '当某个Peer的状态从高状态进入低状态时产生该Trap', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '接口IP地址改变', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '接口出口带宽利用率超阈值告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '接口接收包错包增长数', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '接口收到的错误包连续三次采样时间都增加', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '接口状态down', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '激光器电压越下限', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '用户由于认证失败次数超过预设而被锁定', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '私网中的接口状态DOWN', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '端口down告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '端口振荡告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '绑定VPN实例的接口中，最后一个状态为Up的接口变为Down', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '虚拟机在迁移周期内达到了允许的最大迁移次数', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '表示接口处于down状态', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '认证服务器状态Up', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '设备光模块告警打开', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '该信息表示BGP邻居状态变化。仅配置了 bgp log-neighbor-changes 命令才打印该信息。', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '转发资源达到上限值', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '输入速率告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '这条消息表示端口在90秒(LACP默认超时设置) 内没有收到LACP报文，', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '这条消息表示端口退出AP', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '这条消息表示端口邻居的LACP信息发生变化', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '邻居之间交互出错，BGP发出Notification报文。仅配置了 bgp log-neighbor-changes 命令才打印该信息', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '邻居关系改变告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '邻居关系无法建立告警', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '链路DOWN', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '链路层接口down', level: 1, analysis: '已记录', solution: '已记录'},
		{title: '错误率上升', level: 1, analysis: '已记录', solution: '已记录'}
	],
	timeout:  {
		receive: [5, 15, 120, 480],
		reply: [180, 360, 720, 1440]
	}
}
var taskList = {};

function delay(duration) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), duration);
	});
}

function wait(delay){
	return new Promise((resolve) => setTimeout(resolve, delay));
}

// https://ourcodeworld.com/articles/read/1627/how-to-easily-generate-a-beep-notification-sound-with-javascript

// The browser will limit the number of concurrent audio contexts
// So be sure to re-use them whenever you can
const audioCtx = new AudioContext();

/**
 * Helper function to emit a beep sound in the browser using the Web Audio API.
 * 
 * @param {number} duration - The duration of the beep sound in milliseconds.
 * @param {number} frequency - The frequency of the beep sound.
 * @param {number} volume - The volume of the beep sound.
 * 
 * @returns {Promise} - A promise that resolves when the beep sound is finished.
 */
function beep(duration, frequency, volume){
	return new Promise((resolve, reject) => {
		// Set default duration if not provided
		duration = duration || 200;
		frequency = frequency || 440;
		volume = volume || 100;

		try{
			let oscillatorNode = audioCtx.createOscillator();
			let gainNode = audioCtx.createGain();
			oscillatorNode.connect(gainNode);

			// Set the oscillator frequency in hertz
			oscillatorNode.frequency.value = frequency;

			// Set the type of oscillator
			oscillatorNode.type= "square";
			gainNode.connect(audioCtx.destination);

			// Set the gain to the volume
			gainNode.gain.value = volume * 0.01;

			// Start audio with the desired duration
			oscillatorNode.start(audioCtx.currentTime);
			oscillatorNode.stop(audioCtx.currentTime + duration * 0.001);

			// Resolve the promise when the sound is finished
			oscillatorNode.onended = () => {
				resolve();
			};
		}catch(error){
			reject(error);
		}
	});
}

/**
 * Helper function to emit a alarm sound in the browser using an Audio File.
 *
 * @param {number} volume - The volume of the beep sound.
 *
 * @returns {Promise} - A promise that resolves when the beep sound is finished.
 */
function alarm(volume){
	return new Promise((resolve, reject) => {
		volume = volume || 100;

		try{
			// You're in charge of providing a valid AudioFile that can be reached by your web app
			// let soundSource = 'https://www.w3schools.com/html/horse.mp3';
			// let soundSource = 'http://218.202.142.149:46162/js/alarm.mp3';
			// https://code-boxx.com/simple-javascript-alarm-clock/
			let soundSource = 'https://code-boxx.com/wp-content/uploads/2018/12/wake-up-sound.mp3';
			let sound = new Audio(soundSource);

			// Set volume
			sound.volume = volume / 100;

			sound.onended = () => {
				resolve();
			};

			sound.play();
		}catch(error){
			reject(error);
		}
	});
}

function beeps() {
	// Emit a set of beeps
	// to simulate a Ready, Set, Go! 
	// It goes like: 
	// (low pitch) Beep 
	// (1 second silence) 
	// (low pitch) Beep
	// (1 second silence)
	// (low pitch) Beep
	// (1 second silence)
	// (higher pitch) Beep!!!

	Promise.resolve()
		.then(() => beep())
		.then(() => delay(1000))
		.then(() => beep())
		.then(() => delay(1000))
		.then(() => beep())
		.then(() => delay(1000))
		.then(() => beep(200, 870));
}

function fetchRetry(url, delay, tries, fetchOptions = {}) {
	function onError(err){
		triesLeft = tries - 1;
		if(!triesLeft){
			throw err;
		}
		return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
	}
	return fetch(url, fetchOptions).catch(onError);
}

function hint(msg, theme = 'default', time = '8s') {
	let icon = {
		default: 'bulb',
		info: 'info',
		success: 'info',
		warning: 'alarm',
		danger: 'danger'
	}
	var content = `
		<div class="icon-container" style="display: flex">
			<div style="display: flex;justify-content: center;align-items: center;padding: 10px;margin: 5px;">
				<div>
					<i class="gg-${icon[theme] || 'info'}"></i>
				</div>
			</div>
			<div class="hint-content" style="flex-grow: 1;padding: 10px 10px 10px 0;margin: 5px 5px 5px 0;">
				<p style="margin: 0;font-size: 12px">${msg}...</p>
			</div>
		</div>
	`;
	let config = {
		position:    'right-bottom -5 -15 up',
		contentSize: '330 auto',
		border:      'thin',
		// borderRadius: '.33rem',
		header:      false,
		// animateIn:   'animate__animated animate__bounceInUp',
		// animateOut:  'animate__animated animate__bounceOutUp'
	};
	jsPanel.hint.create({
		config: config,
		content: content,
		theme: theme + ' filledlight',
		headerTitle: '<i></i>Info',
		autoclose: {
			time: time,
			background: theme
		}
	});
}

function setTaskList() {
	taskList = JSON.parse(localStorage.getItem('taskList'));
}

function populateStorage() {
	localStorage.setItem('taskList', JSON.stringify(taskList));
}

async function postJSON(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		// mode: 'cors',
		// cache: 'no-cache',
		// credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Bearer ' + currentUser.token
		},
		redirect: 'follow',
		// referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
	return response.json();
}

async function getJSON(url = '') {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + currentUser.token
		}
	});
	return response.json();
}

async function takeTask(taskId) {
	let taskDetailBo = await getTaskDetailBo(taskId);
	if (!taskDetailBo) {
		console.log(`Failed to request data of task ${taskId} and stopped receiving this task.`)
		taskList.taskId.addReadRecord = false;
		return {};
	}

	return postJSON('/runtime/runtime/task/v1/complete', {
		taskId: taskId,
		actionName: 'agree',
		destination: '',
		files: '',
		opinion: '同意',
		jumpType: '',
		nodeUsers: '[]',
		data: btoa(unescape(encodeURIComponent(JSON.stringify(taskDetailBo.data)))),
		formType: 'inner'
	});
}

async function completeTask(taskId) {
	let taskDetailBo = await getTaskDetailBo(taskId);
	if (!taskDetailBo) {
		console.log(`Failed to request data of task ${taskId} and could not complete this task.`)
		taskList.taskId.addReadRecord = false;
		return {};
	}
	let gjyw = taskDetailBo.data.gjyw;
	Object.assign(gjyw, {gjyyfx: '已记录', jjjyfcs: '已记录'});

	return postJSON('/runtime/runtime/task/v1/complete', {
		taskId: taskId,
		actionName: 'agree',
		destination: '',
		files: '',
		opinion: '同意',
		jumpType: '',
		nodeUsers: '[]',
		data: btoa(unescape(encodeURIComponent(JSON.stringify({gjyw: gjyw})))),
		formType: 'inner'
	});
}

async function getTaskDetailBo(taskId) {
	if (!(taskList.taskId.hasOwnProperty('addReadRecord') && taskList.taskId.addReadRecord)) {
		await getJSON('/runtime/runtime/task/v1/addReadRecord?taskId=' + taskId);
		taskList.taskId.addReadRecord = true;
	}

	return getJSON('/runtime/runtime/task/v1/taskDetailBo?taskId=' + taskId + '&reqParams=');
}

const handleTask = async (task) => {
	if (!taskList.hasOwnProperty(task.taskId)) {
		taskList.taskId = {};
	}
	if (!taskList.taskId.hasOwnProperty('skip')) {
		// taskList.taskId.skip = !rules.some(rule => ~task.subject.indexOf(rule.title));
		taskList.taskId.skip = true;
		settingData.rules.forEach(rule => {
			if (~task.subject.indexOf(rule.title)) {
				// 需求变更为都不做回复
				// taskList.taskId.skip = false;
				taskList.taskId.level = rule.level || 1;
				taskList.taskId.analysis = rule.analysis || '已记录';
				taskList.taskId.solution = rule.solution || '已记录';
				return;
			}
		});
	}

	var taskElapsed = Date.now() - Date.parse(task.createTime);

	if (/重大|只读|pod-?9/i.test(task.subject)) {
		beeps();
	}

	if (task.name === '接告警') {
		if (taskElapsed > Math.random() * 2 * 60 * 1000) {
			console.log('接告警: ' + task.taskId);
			hint(`接告警: ${task.taskId}，告警时长: ${taskElapsed/1000} 秒`, 'info');
			if (!settingData.testUsers.includes(currentUser.username) || !taskList.taskId.skip) {
				return await takeTask(task.taskId);
			}
		} else {
			console.log(`距离告警时间：${taskElapsed/1000} 秒，本次不接告警：${task.taskId}`);
		}
	}
	if (task.name === '告警处理中') {
		if (taskList.taskId.skip) {
			console.log('不在要处理的名单中：' + task.taskId);
			hint(`告警: ${task.taskId} 需要手动处理`, 'warning');
			if (taskElapsed > 3 * 3600 * 1000) {
				Promise.resolve().then(() => alarm()).then(() => delay(10000)).then(() => alarm());
				hint(`告警: ${task.taskId} 即将超时，将强制处理`, 'danger', '60s');
			}
		} else if (taskElapsed > Math.random() * 2 * 3600 * 1000) {
			console.log('处理告警: ' + task.taskId);
			hint(`处理告警: ${task.taskId}，告警时长: ${taskElapsed/1000} 秒`, 'success');
			// return await completeTask(task.taskId);
		} else {
			console.log(`距离告警时间：${taskElapsed/1000} 秒，本次不处理告警：${task.taskId}`);
		}
	}
	return {id: task.taskId, name: task.subject, msg: '未处理'};
}

const reduceTask = async (acc, curr) => {
	const prev = await acc;
	console.log('previous call:', prev);
	await wait(Math.floor(Math.random() + 5) * 1000);

	return handleTask(curr);
}

async function processTask() {
}

async function getTaskList() {
	const tasks = await postJSON('/runtime/runtime/task/v1/getTodoList', {})
		.then(todoList => todoList.rows).catch(err => {
			console.error('Failed to fetch getTodoList:');
			console.log(err);
			retryCount++;
			console.log(`Retry after ${retryCount} minutes`);
		});
	return tasks;
}

const pipeTask = async tasks => tasks.reduce(reduceTask, Promise.resolve(''));

if (~document.URL.indexOf('/front/')) {
	if (sessionStorage.getItem('currentUser')) {
		currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	}
	if(!localStorage.getItem('taskList')) {
		localStorage.setItem('taskList', JSON.stringify(taskList));
	} else {
		taskList = JSON.parse(localStorage.getItem('taskList'));
	}
	var count = 0;
	var retryCount = 1;
	var timer = null;
	setTimeout(function retry(){
		count++;
		console.log('运行次数：' + count);
		if (count % 10 == 0) {
			localStorage.setItem('taskList', JSON.stringify(taskList));
		}
		/*
		$.ajax({
			type: 'post',
			url: 'runtime/runtime/task/v1/getTodoList',
			data: '',
			datatype: 'text',
			success: function (data) {
				console.log(data);
				setTimeout(retry, 1000 * count);
			},
			error: function () {
				// window.location.href = document.url;
				console.log('ajax error');
			},
		});
		*/
		getTaskList().then(urls => {
			retryCount = 1;
			return pipeTask(urls);
		}).then(console.log);
		timer = setTimeout(retry, 60000 * retryCount);
	}, 10000);

	(this.webpackJsonp = this.webpackJsonp || []).push([[0], {
		BKWD: function(e, t, s) {
			"use strict";
		}
	}]);
}
