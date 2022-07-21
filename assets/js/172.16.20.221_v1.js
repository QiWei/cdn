var currentUser = {
	token: '',
	username: '',
	account: '',
	userId: '',
	errorMsg: '',
};

async function postData(url = '', data = {}) {
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

async function takeTask(taskId, taskDetailBo) {
	return await postData('/runtime/runtime/task/v1/complete', {
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

async function completeTask(taskId, taskDetailBo) {
	let gjyw = taskDetailBo.data.gjyw;
	Object.assign(gjyw, {gjyyfx: '已记录', jjjyfcs: '已记录'});
	return await postData('/runtime/runtime/task/v1/complete', {
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
	fetch('/runtime/runtime/task/v1/addReadRecord?taskId=' + taskId, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + currentUser.token
		}
	});

	return await fetch('/runtime/runtime/task/v1/taskDetailBo?taskId=' + taskId + '&reqParams=', {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + currentUser.token
		}
	}).then(response => response.json());
}

async function processTask(todoList) {
	for (let task of todoList.rows) {
		if (task.name === '接告警') {
			console.log('接告警: ' + task.taskId);
			let taskDetailBo = await getTaskDetailBo(task.taskId);
			if (taskDetailBo) {
				takeTask(task.taskId, taskDetailBo)
					.then(data => {
						console.log(data);
					});
			}
		}
		/*
		if (task.name === '告警处理中') {
			console.log('处理告警: ' + task.taskId);
			let taskDetailBo = await getTaskDetailBo(task.taskId);
			if (taskDetailBo) {
				completeTask(task.taskId, taskDetailBo)
					.then(data => {
						console.log(data);
					});
			}
		}
		*/
	}
}

if (~document.URL.indexOf('/front/')) {
	if (sessionStorage.getItem('currentUser')) {
		currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	}
	var count = 0;
	setTimeout(function retry(){
		count++;
		console.log('运行次数：' + count);
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
		postData('/runtime/runtime/task/v1/getTodoList', {})
			.then(todoList => {
				processTask(todoList);
			});
		setTimeout(retry, 60000);
	}, 10000);

	(this.webpackJsonp = this.webpackJsonp || []).push([[0], {
		BKWD: function(e, t, s) {
			"use strict";
		}
	}]);
}
