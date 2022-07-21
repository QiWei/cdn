var currentUser = {
	token: '',
	username: '',
	account: '',
	userId: '',
	errorMsg: '',
};

var taskList = {};
var rules = [
	{title: 'ARP报文速率超过门限值', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'BGP邻居状态机从高状态切换到低状态Trap通告', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'Cpcar基于端口自动防攻击告警', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'IPv6接口状态发生改变', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'IS-IS邻居状态发生变化恢复', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'MAC漂移告警', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'OSPF报文在非虚连接接口上重传', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'SNMP代理收到一条鉴权失败的消息', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'X86服务器产生告警', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '[云窍]CPU利用率告警', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '[云窍]ping探测丢包率100%', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '[云窍]接口接收包错包增长数', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '[云窍]虚拟机在迁移周期内达到了允许的最大迁移次数', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '[云窍]错误率上升', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'linkDown', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'ping探测丢包率60%', level: 1, analysis: '已记录', solution: '已记录'},
	{title: 'vsl口一直协商不上', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '从其他设备上接收到与本地MAC地址一致的MAC通告', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '光模块整体功能失效', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '当某个Peer的状态从高状态进入低状态时产生该Trap', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '接口IP地址改变', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '接口出口带宽利用率超阈值告警', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '接口接收包错包增长数', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '接口收到的错误包连续三次采样时间都增加', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '接口状态down', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '激光器电压越下限', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '端口down告警', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '端口振荡告警', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '虚拟机在迁移周期内达到了允许的最大迁移次数', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '表示接口处于down状态', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '设备光模块告警打开', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '这条消息表示端口退出AP，', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '链路DOWN', level: 1, analysis: '已记录', solution: '已记录'},
	{title: '错误率上升', level: 1, analysis: '已记录', solution: '已记录'}
];
var timeout = {
	receive: [5, 15, 120, 480],
	reply: [180, 360, 720, 1440]
};

function wait(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(ms)
		}, ms)
	})
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
		rules.forEach(rule => {
			if (~task.subject.indexOf(rule.title)) {
				taskList.taskId.skip = false;
				taskList.taskId.level = rule.level || 1;
				taskList.taskId.analysis = rule.analysis || '已记录';
				taskList.taskId.solution = rule.solution || '已记录';
				return;
			}
		});
	}

	var taskElapsed = Date.now() - Date.parse(task.createTime);

	if (task.name === '接告警') {
		if (taskElapsed > Math.random() * 2 * 60 * 1000) {
			console.log('接告警: ' + task.taskId);
			return await takeTask(task.taskId);
		} else {
			console.log(`距离告警时间：${taskElapsed/1000} 秒，本次不接告警：${task.taskId}`);
		}
	}
	if (task.name === '告警处理中') {
		if (taskList.taskId.skip) {
			console.log('不在要处理的名单中：' + task.taskId);
		} else if (taskElapsed > Math.random() * 2 * 3600 * 1000) {
			console.log('处理告警: ' + task.taskId);
			return await completeTask(task.taskId);
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
