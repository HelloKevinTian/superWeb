/**
 * 玩家数据管理
 */
var listWidget = null; // 表格控件
var filterWidget = null; // 查找玩家控件
var extraWidget = null; // 表格控件

var formWidget = null; //修改form
var formWidget1 = null; //添加form
var formWidget2 = null; //跟进form
var btnWidget = null;
var btn1Widget = null;
var btn2Widget = null;
var btn3Widget = null;
var btn4Widget = null;
var btn5Widget = null;

var popDialog = null;
var popDialog1 = null;
var popDialog2 = null;

var gridData = null;

$(function() {

	// 左边框
	$("#layout").ligerLayout({
		rightWidth: 1400
	});

	listWidget = $("#detail").ligerGrid({
		height: '97%',
		pageSize: 20,
		columns: [{
			display: '客户编号',
			name: '_id',
			width: 100
		}, {
			display: '姓名',
			name: 'name',
			width: 100
		}, {
			display: '年龄',
			name: 'age',
			width: 100
		}, {
			display: '地址',
			name: 'address',
			width: 200
		}, {
			display: '电话',
			name: 'phone',
			width: 100
		}, {
			display: '预算',
			name: 'price',
			width: 100
		}, {
			display: '来源',
			name: 'source',
			width: 100
		}, {
			display: '录入时间',
			name: 'time',
			width: 200
		}, {
			display: '备注信息',
			name: 'comment',
			width: 200
		}],
		usePager: false,
		rownumbers: true,
		onDblClickRow: function(rowdata, rowid, rowobj) {
			setExtraPreview(rowdata);
			getExtraInfo(rowdata);
		},
		toolbar: {
			items: [{
				text: '录入',
				click: addClick,
				icon: 'add'
			}, {
				line: true
			}, {
				text: '更新',
				click: updateClick,
				icon: 'modify'
			}, {
				line: true
			}, {
				text: '删除',
				click: delClick,
				icon: 'delete'
			}, {
				line: true
			}, {
				text: '刷新',
				click: refreshClick,
				icon: 'refresh'
			}, {
				line: true
			}, {
				text: '导表',
				click: downClick,
				icon: 'down'
			}]
		}
	});

	extraWidget = $("#extra").ligerGrid({
		height: '80%',
		width: '99%',
		columns: [{
			display: '时间',
			name: 'time',
			width: 200
		}, {
			display: '跟进信息',
			name: 'content',
			width: 200
		}],
		usePager: false,
		rownumbers: true
	});

	// 筛选表单
	filterWidget = $("#maingrid").ligerForm({
		inputWidth: 100,
		labelWidth: 70,
		fields: [{
			display: "姓名",
			name: "name",
			newline: true,
			type: "text",
			width: 150,
		}, {
			display: "地址",
			name: "address",
			newline: true,
			type: "text",
			width: 150
		}, {
			display: "来源",
			name: "source",
			newline: true,
			type: "text",
			width: 150
		}, {
			display: "备注",
			name: "comment",
			newline: true,
			type: "text",
			width: 150
		}, {
			display: "价格区间",
			name: "start_price",
			newline: true,
			type: "text",
			width: 150
		}, {
			display: "价格区间",
			name: "end_price",
			newline: true,
			type: "text",
			width: 150
		}, {
			display: "开始时间",
			name: "start_time",
			newline: true,
			type: "date",
			format: "yyyy/MM/dd",
			width: 150,
			options: {
				showTime: false
			}
		}, {
			display: "结束时间",
			name: "end_time",
			newline: true,
			type: "date",
			format: "yyyy/MM/dd",
			width: 150,
			options: {
				showTime: false
			}
		}]
	});

	// 提交按钮
	$("#filter_btn").ligerButton({
		width: 80,
		text: '查询',
		click: function() {
			var data = checkFilterForm();
			if (data) {
				getServerData(data);
			}
		}
	});


	// 内容表单
	formWidget = $("#modify_form").ligerForm({
		inputWidth: 240,
		labelWidth: 80,
		space: 40,
		fields: [{
			display: "编号",
			name: "_id",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300,
			options: {
				readonly: true
			}
		}, {
			display: "姓名",
			name: "name",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "年龄",
			name: "age",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "地址",
			name: "address",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "电话",
			name: "phone",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "预算",
			name: "price",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "来源",
			name: "source",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "备注信息",
			name: "comment",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}]
	});

	//添加表单
	formWidget1 = $("#add_form").ligerForm({
		inputWidth: 240,
		labelWidth: 80,
		space: 40,
		fields: [{
			display: "姓名",
			name: "name",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "年龄",
			name: "age",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "地址",
			name: "address",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "电话",
			name: "phone",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "预算",
			name: "price",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "来源",
			name: "source",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}, {
			display: "备注信息",
			name: "comment",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}]
	});

	//添加表单
	formWidget2 = $("#extra_form").ligerForm({
		inputWidth: 240,
		labelWidth: 80,
		space: 40,
		fields: [{
			display: "编号",
			name: "_id",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300,
			options: {
				readonly: true
			}
		}, {
			display: "姓名",
			name: "name",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300,
			options: {
				readonly: true
			}
		}, {
			display: "跟进内容",
			name: "content",
			newline: true,
			type: "text",
			validate: {
				required: true
			},
			width: 300
		}]
	});

	formWidget.setVisible(["submit"], false);
	formWidget1.setVisible(["submit"], false);
	formWidget2.setVisible(["submit"], false);

	// 修改按钮
	btnWidget = $("#modify_btn").ligerButton({
		width: 80,
		text: '修改',
		click: function() {
			var config = getPreview();
			if (config) {
				modifyConfig(config);
			};
		}
	});

	// 取消按钮
	btn1Widget = $("#modify_btn1").ligerButton({
		width: 80,
		text: '取消',
		click: function() {
			popDialog.hide();
		}
	});

	// 添加按钮
	btn2Widget = $("#add_btn").ligerButton({
		width: 80,
		text: '添加',
		click: function() {
			var config = getAddPreview();
			if (config) {
				addConfig(config);
			};
		}
	});

	// 取消按钮
	btn3Widget = $("#add_btn1").ligerButton({
		width: 80,
		text: '取消',
		click: function() {
			popDialog1.hide();
		}
	});

	// 添加按钮
	btn4Widget = $("#extra_add_btn").ligerButton({
		width: 80,
		text: '添加',
		click: function() {
			var config = getExtraAddPreview();
			if (config) {
				addExtraConfig(config);
			};
		}
	});

	// 取消按钮
	btn5Widget = $("#extra_add_btn1").ligerButton({
		width: 80,
		text: '取消',
		click: function() {
			popDialog2.hide();
		}
	});

	getServerData();
});

function getAddPreview() {
	var data = formWidget1.getData();

	if (data.age && isNaN(Number(data.age))) {
		$.ligerDialog.warn("年龄请填写数字~");
		return;
	}

	if (data.price && isNaN(Number(data.price))) {
		$.ligerDialog.warn("价格请填写数字~");
		return;
	}

	return data;
}

function getExtraAddPreview() {
	var data = formWidget2.getData();

	if (!data.content) {
		$.ligerDialog.warn("内容不能为空~");
		return;
	}

	return data;
}

function getPreview() {
	var data = formWidget.getData();

	if (data.age && isNaN(Number(data.age))) {
		$.ligerDialog.warn("年龄请填写数字~");
		return;
	}

	if (data.price && isNaN(Number(data.price))) {
		$.ligerDialog.warn("价格请填写数字~");
		return;
	}

	return data;
}

// 设置预览信息
function setPreview(data) {
	formWidget.setData(data);
};

// 设置预览信息
function setExtraPreview(data) {
	formWidget2.setData(data);
};

function checkFilterForm() {
	var data = filterWidget.getData();

	if (data.start_time && data.end_time && data.start_time > data.end_time) {
		$.ligerDialog.warn("开始时间不能大于结束时间!");
		return;
	}

	if (data.start_price && isNaN(Number(data.start_price))) {
		$.ligerDialog.warn("价格格式错误!");
		return;
	}

	if (data.end_price && isNaN(Number(data.end_price))) {
		$.ligerDialog.warn("价格格式错误!");
		return;
	}

	if (data.start_time) {
		data.start_time = FormatDate('yyyy/MM/dd', data.start_time);
	}

	if (data.end_time) {
		data.end_time = FormatDate('yyyy/MM/dd', data.end_time);
	}

	return data;
}

function addClick() {
	popDialog1 = $.ligerDialog.open({
		height: 400,
		width: 500,
		title: '录入客户信息',
		target: $("#add_content"),
		showMax: false,
		showToggle: false,
		showMin: false,
		isResize: false,
		slide: false
	});
};

function updateClick() {
	var row = listWidget.getSelected();
	if (!row) {
		$.ligerDialog.warn("请选择行!");
		return;
	}
	setPreview(row);
	popDialog = $.ligerDialog.open({
		height: 400,
		width: 500,
		title: '修改客户信息',
		target: $("#modify_content"),
		showMax: false,
		showToggle: false,
		showMin: false,
		isResize: false,
		slide: false
	});
}

// 刷新按钮事件响应
function refreshClick() {
	getServerData();
};

function delClick() {
	var row = listWidget.getSelected();
	if (!row) {
		$.ligerDialog.warn("请选择行!");
		return;
	}
	$.ligerDialog.confirm("确定删除？", "确定", function(r) {
		if (r) {
			deleteConfig(row);
		}
	});
}

// 设置界面显示
function loadListData(list) {
	var list = list || [];
	var rows = _.sortBy(list, "_id");

	var listData = {
		Rows: rows
	};

	gridData = rows;

	listWidget.loadData(listData);
}

// 设置界面显示
function loadExtraData(list) {
	var list = list || [];
	var rows = _.sortBy(list, "time");

	var listData = {
		Rows: rows
	};

	gridData = rows;

	extraWidget.loadData(listData);
}

// 向服务器请求列表
function getServerData(data) {
	$.ajax({
		url: "/tool/user_get",
		dataType: 'json',
		cache: false,
		type: "post",
		data: data,
		success: function(json) {
			if (json.querySuccess) {
				showTip(json.message);
				loadListData(json.ret);
			} else {
				$.ligerDialog.error(json.message);
			}
		}
	});
};

function addConfig(data) {
	$.ajax({
		url: "/tool/user_add",
		dataType: 'json',
		cache: false,
		type: "post",
		data: data,
		success: function(json) {
			if (json.querySuccess) {
				loadListData(json.ret);
				showTip(json.message);
				popDialog1.hide();
			} else {
				$.ligerDialog.error(json.message);
			}
		}
	});
}

function modifyConfig(data) {
	$.ajax({
		url: "/tool/user_update",
		dataType: 'json',
		cache: false,
		type: "post",
		data: data,
		success: function(json) {
			if (json.querySuccess) {
				loadListData(json.ret);
				showTip(json.message);
				popDialog.hide();
			} else {
				$.ligerDialog.error(json.message);
			}
		}
	});
}

function deleteConfig(rowData) {
	$.ajax({
		url: "/tool/user_delete",
		dataType: 'json',
		cache: false,
		type: "post",
		data: rowData,
		success: function(json) {
			if (json.querySuccess) {
				loadListData(json.ret);
				showTip(json.message);
			} else {
				$.ligerDialog.error(json.message);
			}
		}
	});
}

function addExtraConfig(data) {
	$.ajax({
		url: "/tool/extra_add",
		dataType: 'json',
		cache: false,
		type: "post",
		data: data,
		success: function(json) {
			if (json.querySuccess) {
				loadExtraData(json.ret);
				showTip(json.message);
			} else {
				$.ligerDialog.error(json.message);
			}
		}
	});
}

function getExtraInfo(data) {
	$.ajax({
		url: "/tool/extra_get",
		dataType: 'json',
		cache: false,
		type: "post",
		data: data,
		success: function(json) {
			if (json.querySuccess) {
				showExtraPanel();
				loadExtraData(json.ret);
				showTip(json.message);
			} else {
				$.ligerDialog.error(json.message);
			}
		}
	});
}

function showExtraPanel() {
	popDialog2 = $.ligerDialog.open({
		height: 600,
		width: 600,
		title: '跟进客户信息',
		target: $("#extra_content"),
		showMax: false,
		showToggle: false,
		showMin: false,
		isResize: false,
		slide: false
	});
}

function showTip(text) {
	var text = text || '操作成功'
	var tip = $.ligerDialog.tip({
		title: '温馨提示',
		content: text,
		height: 150
	});
	setTimeout(function() {
		tip.hide();
	}, 2000);
}

function downClick() {
	exportExcel('detail');
}

//------------------export excel ---------------
var idTmr;

function getExplorer() {
	var explorer = window.navigator.userAgent;
	//ie 
	if (explorer.indexOf("MSIE") >= 0) {
		return 'ie';
	}
	//firefox 
	else if (explorer.indexOf("Firefox") >= 0) {
		return 'Firefox';
	}
	//Chrome
	else if (explorer.indexOf("Chrome") >= 0) {
		return 'Chrome';
	}
	//Opera
	else if (explorer.indexOf("Opera") >= 0) {
		return 'Opera';
	}
	//Safari
	else if (explorer.indexOf("Safari") >= 0) {
		return 'Safari';
	}
}

function exportExcel(tableid) { //整个表格拷贝到EXCEL中
	if (getExplorer() == 'ie') {
		var curTbl = document.getElementById(tableid);
		var oXL = new ActiveXObject("Excel.Application");

		//创建AX对象excel 
		var oWB = oXL.Workbooks.Add();
		//获取workbook对象 
		var xlsheet = oWB.Worksheets(1);
		//激活当前sheet 
		var sel = document.body.createTextRange();
		sel.moveToElementText(curTbl);
		//把表格中的内容移到TextRange中 
		sel.select();
		//全选TextRange中内容 
		sel.execCommand("Copy");
		//复制TextRange中内容  
		xlsheet.Paste();
		//粘贴到活动的EXCEL中       
		oXL.Visible = true;
		//设置excel可见属性

		try {
			var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
		} catch (e) {
			print("Nested catch caught " + e);
		} finally {
			oWB.SaveAs(fname);

			oWB.Close(savechanges = false);
			//xls.visible = false;
			oXL.Quit();
			oXL = null;
			//结束excel进程，退出完成
			//window.setInterval("Cleanup();",1);
			idTmr = window.setInterval("Cleanup();", 1);
		}

	} else {
		tableToExcel(tableid);
	}
}

function Cleanup() {
	window.clearInterval(idTmr);
	CollectGarbage();
}

var tableToExcel = (function() {
	var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64 = function(s) {
			return window.btoa(unescape(encodeURIComponent(s)))
		},
		format = function(s, c) {
			return s.replace(/{(\w+)}/g,
				function(m, p) {
					return c[p];
				})
		}
	return function(table, name) {
		var htmlText = bornHtml();
		// if (!table.nodeType) {
		// 	table = document.getElementById(table);
		// }
		var ctx = {
			worksheet: name || 'Worksheet',
			table: htmlText
		};

		window.location.href = uri + base64(format(template, ctx))
	}
})()

function writeHtml() {
	document.write("<table id=\"excel\">");

	for (var i = 0; i < gridData.length; i++) {
		var obj = gridData[i];
		if (i === 0) {
			document.write("<tr align=\"center\">");
			for (var k in obj) {
				document.write("<th>" + k + "</th>");
			}
			document.write("</tr>");

			document.write("<tr align=\"center\">");
			for (var k in obj) {
				document.write("<th>" + obj[k] + "</th>");
			}
			document.write("</tr>");
		} else {
			document.write("<tr align=\"center\">");
			for (var k in obj) {
				document.write("<th>" + obj[k] + "</th>");
			}
			document.write("</tr>");
		}
	};

	document.write("</table>");
}

function bornHtml() {
	var str = '';
	str += "<table>";

	for (var i = 0; i < gridData.length; i++) {
		var obj = gridData[i];
		if (i === 0) {
			str += "<tr align=\"center\">";
			str += "<th>客户编号</th>";
			str += "<th>姓名</th>";
			str += "<th>年龄</th>";
			str += "<th>地址</th>";
			str += "<th>电话</th>";
			str += "<th>预算</th>";
			str += "<th>来源</th>";
			str += "<th>录入时间</th>";
			str += "<th>备注信息</th>";
			str += "</tr>";
		}
		str += "<tr align=\"center\">";
		str += "<th>" + obj['_id'] + "</th>";
		str += "<th>" + obj['name'] + "</th>";
		str += "<th>" + obj['age'] + "</th>";
		str += "<th>" + obj['address'] + "</th>";
		str += "<th>" + obj['phone'] + "</th>";
		str += "<th>" + obj['price'] + "</th>";
		str += "<th>" + obj['source'] + "</th>";
		str += "<th>" + obj['time'] + "</th>";
		str += "<th>" + obj['comment'] + "</th>";
		str += "</tr>";
	};

	str += "</table>";
	return str;
}