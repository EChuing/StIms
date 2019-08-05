$(function(){
	var app = new Vue({
	    el: '#app',
	    data: {
	    	menu: {
	    		yewuguanli:{
	    			title:'业务管理',
	    			describe:'房源资料、未租管理、已租管理、退房管理',
	    			isActive:true,
	    			video:[{
		    			title:'未租板块日常使用',
		    			video:'http://pic-static.fangzhizun.com/video/未租板块日常使用.mp4',
		    			poster:'img/poster.jpg',
		    		},{
		    			title:'合租房设置',
		    			video:'http://pic-static.fangzhizun.com/video/合租房设置.mp4',
		    			poster:'img/poster.jpg',
		    		},]
	    		},
	    		caiwuguanli:{
	    			title:'财务管理',
	    			describe:'收支录入、业主账单、租客账单',
	    			isActive:false,
	    			video:[{
		    			title:'日常公司费用记',
		    			video:'http://pic-static.fangzhizun.com/video/日常公司费用记.mp4',
		    			poster:'img/poster.jpg',
		    		},{
		    			title:'租金催收（转账）',
		    			video:'http://pic-static.fangzhizun.com/video/租金催收（转账）.mp4',
		    			poster:'img/poster.jpg',
		    		},]
	    		},
	    		xingzhengguanli:{
	    			title:'行政管理',
	    			describe:'资产、维保、任务、审批',
		    		isActive:false,
		    		video:[{
		    			title:'水电表抄表',
		    			video:'http://pic-static.fangzhizun.com/video/水电表抄表.mp4',
		    			poster:'img/poster.jpg',
		    		}]
	    		},
	    		xitongshezhi:{
	    			title:'系统设置',
	    			describe:'变量设置',
		    		isActive:false,
		    		video:[{
		    			title:'初始化设置介绍',
		    			video:'http://pic-static.fangzhizun.com/video/初始化设置介绍.mp4',
		    			poster:'img/poster.jpg',
		    		}]
	    		}
	    	},
	    	source:'',
	    	modalTitle:'',
	    },
	    methods: {
	        showVideo: function (video, title) {
	        	this.source = video;
	        	this.modalTitle = title;
	    	},
	    	checkMenu: function (key) {
	    		for(var i in this.menu){
	    			if(i == key){
	    				this.menu[i].isActive = true;
	    			}else{
	    				this.menu[i].isActive = false;
	    			}
	    		}
	    		for(var i in this.videos){
	    			if(i == key){
	    				this.videos[i].isActive = true;
	    			}else{
	    				this.videos[i].isActive = false;
	    			}
	    		}
	    	}
	    },
	    mounted:function(){
	    	$('#video').on('hide.bs.modal', function () {
    			var player = document.getElementById("player"); 
    			player.pause();
			})
	    }
	});
})