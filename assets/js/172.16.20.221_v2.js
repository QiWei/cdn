var currentUser = {
	token: '',
	username: '',
	account: '',
	userId: '',
	errorMsg: '',
};

var taskList = {};
var rules = ['丢包率', '三次采样时间', '链路DOWN', 'vsl口一直协商不上'];

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
	if (task.name === '接告警') {
		console.log('接告警: ' + task.taskId);
		return await takeTask(task.taskId);
	}
	if (task.name === '告警处理中') {
		if (!taskList.taskId.hasOwnProperty('skip')) {
			taskList.taskId.skip = !rules.some(rule => ~task.subject.indexOf(rule));
		}
		if (taskList.taskId.skip) {
			console.log('不在要处理的名单中：' + task.taskId);
		} else if (Date.now() - Date.parse(task.createTime) > Math.floor(Math.random() + 3) * 3600 * 1000) {
			console.log('处理告警: ' + task.taskId);
			return await completeTask(task.taskId);
		} else {
			console.log(`距离告警时间：${(Date.now() - Date.parse(task.createTime))}，暂不处理告警：${task.taskId}`);
		}
	}
	return {id: task.taskId, name: task.subject, msg: '未处理'};
}

const reduceTask = async (acc, curr) => {
	const prev = await acc;
	console.log('previous call:', prev);

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
