/**
 * 玩家数据管理
 */
var listWidget = null; // 表格控件
var filterWidget = null; // 查找玩家控件

var gridData = null;

$(function() {

	// 左边框
	$("#layout").ligerLayout({
		rightWidth: 1500
	});

	listWidget = $("#detail").ligerGrid({
		height: '97%',
		pageSize: 20,
		columns: [{
			display: 'uid',
			name: '_id',
			width: 100
		}, {
			display: '昵称',
			name: 'name',
			width: 100
		}, {
			display: '性别',
			name: 'sex',
			width: 100
		}, {
			display: 'vip',
			name: 'vip',
			width: 100
		}, {
			display: '等级',
			name: 'level',
			width: 100
		}, {
			display: '渠道',
			name: 'channel',
			width: 100
		}, {
			display: '头像',
			name: 'icon',
			width: 100
		}, {
			display: '金币',
			name: 'coin',
			width: 100
		}, {
			display: '钻石',
			name: 'gem',
			width: 100
		}, {
			display: '体力',
			name: 'stamina',
			width: 100
		}, {
			display: '当前车',
			name: 'cur_car_id',
			width: 100
		}, {
			display: '背包大小',
			name: 'bag_size',
			width: 100
		}, {
			display: '账号创建时间',
			name: 'create_time',
			width: 200
		}],
		rownumbers: true,
		toolbar: {
			items: [{
				text: '更新',
				click: updateClick,
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

	// 筛选表单
	filterWidget = $("#maingrid").ligerForm({
		inputWidth: 100,
		labelWidth: 70,
		fields: [{
			display: "渠道",
			name: "channel",
			newline: true,
			type: "text",
			width: 100,
		}, {
			display: "昵称",
			name: "name",
			newline: true,
			type: "text",
			width: 100,
		}, {
			display: "uid",
			name: "uid",
			newline: true,
			type: "text",
			width: 100,
		}, {
			display: "vip",
			name: "vip",
			newline: true,
			type: "text",
			width: 100
		}, {
			display: "开始等级",
			name: "start_level",
			newline: true,
			type: "text",
			width: 100
		}, {
			display: "结束等级",
			name: "end_level",
			newline: true,
			type: "text",
			width: 100
		}, {
			display: "开始时间",
			name: "start_time",
			newline: true,
			type: "date",
			format: "yyyy/MM/dd",
			width: 100,
			options: {
				showTime: false
			}
		}, {
			display: "结束时间",
			name: "end_time",
			newline: true,
			type: "date",
			format: "yyyy/MM/dd",
			width: 100,
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
			getServerData(data);
		}
	});

	getServerData();
});

function checkFilterForm() {
	var data = filterWidget.getData();

	if (data.start_time && data.end_time && data.start_time > data.end_time) {
		$.ligerDialog.warn("开始时间不能大于结束时间!");
		return;
	}

	if (data.vip && isNaN(parseInt(data.vip))) {
		$.ligerDialog.warn("vip格式错误!");
		return;
	}

	if (data.start_level && isNaN(parseInt(data.start_level))) {
		$.ligerDialog.warn("等级格式错误!");
		return;
	}

	if (data.end_level && isNaN(parseInt(data.end_level))) {
		$.ligerDialog.warn("等级格式错误!");
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

// 刷新按钮事件响应
function updateClick() {
	getServerData();
};

// 设置界面显示
function loadListData(list) {
	var list = list || [];
	var rows = _.sortBy(list, "index");

	var listData = {
		Rows: rows
	};

	gridData = rows;

	listWidget.loadData(listData);
}

// 向服务器请求列表
function getServerData(data) {
	$.ajax({
		url: "/test/test",
		dataType: 'json',
		cache: false,
		type: "post",
		data: data,
		success: function(json) {
			if (json.querySuccess) {
				showTip(json.message);
				loadListData(json.ret);
			} else {
				// $.ligerDialog.error(json.message);
			}
		}
	});
};

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
			str += "<th>uid</th>";
			str += "<th>昵称</th>";
			str += "<th>性别</th>";
			str += "<th>vip</th>";
			str += "<th>等级</th>";
			str += "<th>渠道</th>";
			str += "<th>经验值</th>";
			str += "<th>头像</th>";
			str += "<th>金币</th>";
			str += "<th>钻石</th>";
			str += "<th>体力</th>";
			str += "<th>当前车</th>";
			str += "<th>背包大小</th>";
			str += "<th>创建时间</th>";
			str += "</tr>";
		}
		str += "<tr align=\"center\">";
		str += "<th>" + obj['_id'] + "</th>";
		str += "<th>" + obj['name'] + "</th>";
		str += "<th>" + obj['sex'] + "</th>";
		str += "<th>" + obj['vip'] + "</th>";
		str += "<th>" + obj['level'] + "</th>";
		str += "<th>" + obj['channel'] + "</th>";
		str += "<th>" + obj['exp'] + "</th>";
		str += "<th>" + obj['icon'] + "</th>";
		str += "<th>" + obj['coin'] + "</th>";
		str += "<th>" + obj['gem'] + "</th>";
		str += "<th>" + obj['stamina'] + "</th>";
		str += "<th>" + obj['cur_car_id'] + "</th>";
		str += "<th>" + obj['bag_size'] + "</th>";
		str += "<th>" + obj['create_time'] + "</th>";
		str += "</tr>";
	};

	str += "</table>";
	return str;
}