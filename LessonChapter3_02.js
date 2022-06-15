(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"LessonChapter3_02_atlas_1", frames: [[1884,104,132,102],[1884,0,133,102],[0,1672,175,145],[354,1672,175,144],[177,1672,175,145],[531,1778,175,144],[1244,1130,626,106],[1244,1238,626,106],[0,1240,626,106],[628,1346,626,106],[1256,1346,626,106],[0,1348,626,106],[628,1454,626,106],[708,1778,626,40],[628,1240,528,40],[0,1819,431,40],[1141,1820,333,40],[0,1861,236,40],[0,1130,620,108],[622,1130,620,108],[0,0,626,301],[628,0,626,236],[1256,0,626,236],[628,238,626,236],[1256,238,626,236],[0,303,626,236],[628,476,626,236],[1256,476,626,236],[0,541,626,171],[0,784,626,171],[628,784,626,171],[1256,784,626,171],[0,957,626,171],[628,957,626,171],[1256,957,626,171],[1256,1454,626,106],[0,1456,626,106],[628,1562,626,106],[1256,1562,626,106],[0,1564,626,106],[628,1670,626,106],[1256,1670,626,106],[1336,1778,626,40],[628,1282,528,40],[708,1820,431,40],[1476,1820,333,40],[238,1861,236,40],[0,714,1829,68],[1884,298,91,87],[1884,208,91,88]]},
		{name:"LessonChapter3_02_atlas_2", frames: [[0,0,626,431],[628,0,626,431],[1256,0,626,431],[0,433,626,366],[628,433,626,366],[1256,433,626,366],[0,801,626,366],[0,1169,626,366],[0,1537,626,366],[628,801,626,366],[1256,801,626,301],[1256,1104,626,301],[628,1169,626,301],[1256,1407,626,301],[628,1472,626,301],[1256,1710,626,301]]},
		{name:"LessonChapter3_02_atlas_3", frames: [[0,0,626,561],[628,0,626,496],[1256,0,626,496],[628,498,626,496],[0,563,626,496],[1256,498,626,496],[0,1061,626,496],[628,996,626,496],[0,1559,626,431],[628,1494,626,431],[1256,996,626,431],[1256,1429,626,431]]},
		{name:"LessonChapter3_02_atlas_4", frames: [[0,0,626,626],[0,628,626,626],[0,1256,626,626],[628,0,626,561],[1256,0,626,561],[628,563,626,561],[1256,563,626,561],[628,1126,626,561],[1256,1126,626,561]]},
		{name:"LessonChapter3_02_atlas_5", frames: [[1282,0,626,626],[0,990,626,626],[628,990,626,626],[1256,990,626,626],[0,722,1914,266],[0,0,1280,720]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_1397 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1396 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1395 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1394 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1393 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1392 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1477 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1476 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1475 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1474 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1473 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1472 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1471 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1470 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1469 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1468 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1467 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1466 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1379 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1378 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1465 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1464 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1463 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1462 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1461 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1460 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1459 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1458 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1457 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1456 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1455 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1454 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1453 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1452 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1451 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1450 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1449 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1448 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1447 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1446 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1445 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1444 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1443 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1442 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1441 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1440 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1439 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1438 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1437 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1436 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1435 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1434 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1433 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1432 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1431 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1430 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1429 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1428 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1427 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1426 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1425 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1424 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1423 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1422 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1421 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1420 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1419 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1418 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1417 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1416 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1415 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1414 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1413 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1412 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1411 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1410 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1409 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1408 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1407 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1406 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1405 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1404 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1403 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1402 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1401 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1400 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1399 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1398 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1309 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1308 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CompoundPath = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.initialize(ss["LessonChapter3_02_atlas_1"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.Chap3GeneralScene = function() {
	this.initialize(ss["LessonChapter3_02_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.home_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0.ai
	this.instance = new lib.CachedBmp_1396();
	this.instance.setTransform(-33.05,-28.05,0.4875,0.4875);

	this.instance_1 = new lib.CachedBmp_1397();
	this.instance_1.setTransform(-33.05,-28.15,0.4875,0.4875);

	this.instance_2 = new lib.CompoundPath();
	this.instance_2.setTransform(-159.75,-154.3,3.5005,3.5005);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159.7,-154.3,318.5,304.6);


(lib.btn_prev = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.CachedBmp_1394();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1395();
	this.instance_1.setTransform(-43.45,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(-214.75,-207.05,4.7386,4.7386);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


(lib.btn_next = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.CachedBmp_1392();
	this.instance.setTransform(-43.65,-36,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1393();
	this.instance_1.setTransform(-42.15,-36.05,0.5,0.5);

	this.instance_2 = new lib.Group_1();
	this.instance_2.setTransform(216.45,-207.05,4.7385,4.7385,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.7,-207,431.2,417);


// stage content:
(lib.LessonChapter3_02 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,135];
	this.streamSoundSymbolsList[0] = [{id:"AfterWar202wav",startFrame:0,endFrame:136,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("AfterWar202wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,136,1);
	}
	this.frame_135 = function() {
		this.stop();
		
		this.homeBtn.addEventListener("click", fl_ClickToGoToHomePage);
		
		function fl_ClickToGoToHomePage() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("http://127.0.0.1:8090/Home.html");
			}, 500);
		}
		
		this.nextBtn.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("http://127.0.0.1:8090/LessonChapter3_03.html");
			}, 500);
			
		}
		
		this.prevBtn.addEventListener("click", fl_ClickToGoToWebPage_2);
		
		function fl_ClickToGoToWebPage_2() {
			createjs.Sound.play("popsound");
			
			setTimeout(function(){
			document.location.replace("http://127.0.0.1:8090/LessonChapter3_01.html");
			}, 500);
			
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(135).call(this.frame_135).wait(1));

	// Subtitle
	this.instance = new lib.CachedBmp_1309();
	this.instance.setTransform(182.8,614.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1308();
	this.instance_1.setTransform(165.6,564.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(136));

	// Buttons
	this.nextBtn = new lib.btn_next();
	this.nextBtn.name = "nextBtn";
	this.nextBtn.setTransform(1190,630);
	new cjs.ButtonHelper(this.nextBtn, 0, 1, 1);

	this.prevBtn = new lib.btn_prev();
	this.prevBtn.name = "prevBtn";
	this.prevBtn.setTransform(90,630);
	new cjs.ButtonHelper(this.prevBtn, 0, 1, 1);

	this.homeBtn = new lib.home_btn();
	this.homeBtn.name = "homeBtn";
	this.homeBtn.setTransform(74.95,66,1.0256,1.0256);
	new cjs.ButtonHelper(this.homeBtn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.homeBtn},{t:this.prevBtn},{t:this.nextBtn}]}).wait(136));

	// Quraisy
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D0C01").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape.setTransform(688.7532,213.1146,0.4192,0.4192);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00563E").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape_1.setTransform(737.5433,213.1146,0.4192,0.4192);

	this.instance_2 = new lib.CachedBmp_1398();
	this.instance_2.setTransform(678.65,203,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_1399();
	this.instance_3.setTransform(678.65,203,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_1400();
	this.instance_4.setTransform(678.65,203,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_1401();
	this.instance_5.setTransform(678.65,203,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_1402();
	this.instance_6.setTransform(678.65,203,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_1403();
	this.instance_7.setTransform(678.65,203,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_1404();
	this.instance_8.setTransform(678.65,203,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_1405();
	this.instance_9.setTransform(678.65,203,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_1406();
	this.instance_10.setTransform(678.65,203,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_1407();
	this.instance_11.setTransform(678.65,203,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_1408();
	this.instance_12.setTransform(678.65,203,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_1409();
	this.instance_13.setTransform(678.65,203,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_1410();
	this.instance_14.setTransform(678.65,203,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_1411();
	this.instance_15.setTransform(678.65,203,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_1412();
	this.instance_16.setTransform(678.65,203,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_1413();
	this.instance_17.setTransform(678.65,203,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_1414();
	this.instance_18.setTransform(678.65,203,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_1415();
	this.instance_19.setTransform(678.65,203,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_1416();
	this.instance_20.setTransform(678.65,203,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_1417();
	this.instance_21.setTransform(678.65,203,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_1418();
	this.instance_22.setTransform(678.65,203,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_1419();
	this.instance_23.setTransform(678.65,203,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_1420();
	this.instance_24.setTransform(678.65,203,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_1421();
	this.instance_25.setTransform(678.65,203,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_1422();
	this.instance_26.setTransform(678.65,203,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_1423();
	this.instance_27.setTransform(678.65,203,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_1424();
	this.instance_28.setTransform(678.65,203,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_1425();
	this.instance_29.setTransform(678.65,203,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_1426();
	this.instance_30.setTransform(678.65,203,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_1427();
	this.instance_31.setTransform(678.65,203,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_1428();
	this.instance_32.setTransform(678.65,203,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_1429();
	this.instance_33.setTransform(678.65,203,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_1430();
	this.instance_34.setTransform(678.65,203,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_1431();
	this.instance_35.setTransform(678.65,203,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_1432();
	this.instance_36.setTransform(678.65,203,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_1433();
	this.instance_37.setTransform(678.65,203,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_1434();
	this.instance_38.setTransform(678.65,203,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_1435();
	this.instance_39.setTransform(678.65,203,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_1436();
	this.instance_40.setTransform(678.65,203,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_1437();
	this.instance_41.setTransform(678.65,203,0.5,0.5);

	this.instance_42 = new lib.CachedBmp_1438();
	this.instance_42.setTransform(678.65,203,0.5,0.5);

	this.instance_43 = new lib.CachedBmp_1439();
	this.instance_43.setTransform(678.65,203,0.5,0.5);

	this.instance_44 = new lib.CachedBmp_1440();
	this.instance_44.setTransform(678.65,203,0.5,0.5);

	this.instance_45 = new lib.CachedBmp_1441();
	this.instance_45.setTransform(678.65,203,0.5,0.5);

	this.instance_46 = new lib.CachedBmp_1442();
	this.instance_46.setTransform(678.65,203,0.5,0.5);

	this.instance_47 = new lib.CachedBmp_1443();
	this.instance_47.setTransform(678.65,203,0.5,0.5);

	this.instance_48 = new lib.CachedBmp_1444();
	this.instance_48.setTransform(678.65,203,0.5,0.5);

	this.instance_49 = new lib.CachedBmp_1445();
	this.instance_49.setTransform(678.65,203,0.5,0.5);

	this.instance_50 = new lib.CachedBmp_1446();
	this.instance_50.setTransform(678.65,203,0.5,0.5);

	this.instance_51 = new lib.CachedBmp_1447();
	this.instance_51.setTransform(678.65,203,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_1448();
	this.instance_52.setTransform(678.65,203,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_1449();
	this.instance_53.setTransform(678.65,203,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_1450();
	this.instance_54.setTransform(678.65,203,0.5,0.5);

	this.instance_55 = new lib.CachedBmp_1451();
	this.instance_55.setTransform(678.65,203,0.5,0.5);

	this.instance_56 = new lib.CachedBmp_1452();
	this.instance_56.setTransform(678.65,203,0.5,0.5);

	this.instance_57 = new lib.CachedBmp_1453();
	this.instance_57.setTransform(678.65,203,0.5,0.5);

	this.instance_58 = new lib.CachedBmp_1454();
	this.instance_58.setTransform(678.65,203,0.5,0.5);

	this.instance_59 = new lib.CachedBmp_1455();
	this.instance_59.setTransform(678.65,203,0.5,0.5);

	this.instance_60 = new lib.CachedBmp_1456();
	this.instance_60.setTransform(678.65,203,0.5,0.5);

	this.instance_61 = new lib.CachedBmp_1457();
	this.instance_61.setTransform(678.65,203,0.5,0.5);

	this.instance_62 = new lib.CachedBmp_1458();
	this.instance_62.setTransform(678.65,203,0.5,0.5);

	this.instance_63 = new lib.CachedBmp_1459();
	this.instance_63.setTransform(678.65,203,0.5,0.5);

	this.instance_64 = new lib.CachedBmp_1460();
	this.instance_64.setTransform(678.65,203,0.5,0.5);

	this.instance_65 = new lib.CachedBmp_1461();
	this.instance_65.setTransform(678.65,203,0.5,0.5);

	this.instance_66 = new lib.CachedBmp_1462();
	this.instance_66.setTransform(678.65,203,0.5,0.5);

	this.instance_67 = new lib.CachedBmp_1463();
	this.instance_67.setTransform(678.65,203,0.5,0.5);

	this.instance_68 = new lib.CachedBmp_1464();
	this.instance_68.setTransform(678.65,203,0.5,0.5);

	this.instance_69 = new lib.CachedBmp_1465();
	this.instance_69.setTransform(678.65,203,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},40).to({state:[{t:this.shape},{t:this.shape_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_59}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_62}]},1).to({state:[{t:this.instance_63}]},1).to({state:[{t:this.instance_64}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_69}]},1).wait(27));

	// Layer_4
	this.instance_70 = new lib.CachedBmp_1378();
	this.instance_70.setTransform(678.65,129,0.5,0.5);
	this.instance_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(29).to({_off:false},0).wait(107));

	// Layer_3
	this.instance_71 = new lib.CachedBmp_1379();
	this.instance_71.setTransform(291.55,259.1,0.5,0.5);
	this.instance_71._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(15).to({_off:false},0).wait(121));

	// Muslims
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FBF6E0").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape_2.setTransform(298.6037,343.233,0.4191,0.4191);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EBC49D").s().p("AiqCrQhGhHAAhkQAAhjBGhHQBHhGBjAAQBkAABHBGQBGBHAABjQAABkhGBHQhHBGhkAAQhjAAhHhGg");
	this.shape_3.setTransform(347.3711,343.233,0.4191,0.4191);

	this.instance_72 = new lib.CachedBmp_1466();
	this.instance_72.setTransform(288.6,333,0.5,0.5);

	this.instance_73 = new lib.CachedBmp_1467();
	this.instance_73.setTransform(288.6,333,0.5,0.5);

	this.instance_74 = new lib.CachedBmp_1468();
	this.instance_74.setTransform(288.6,333,0.5,0.5);

	this.instance_75 = new lib.CachedBmp_1469();
	this.instance_75.setTransform(288.6,333,0.5,0.5);

	this.instance_76 = new lib.CachedBmp_1470();
	this.instance_76.setTransform(288.6,333,0.5,0.5);

	this.instance_77 = new lib.CachedBmp_1471();
	this.instance_77.setTransform(288.6,333,0.5,0.5);

	this.instance_78 = new lib.CachedBmp_1472();
	this.instance_78.setTransform(288.6,333,0.5,0.5);

	this.instance_79 = new lib.CachedBmp_1473();
	this.instance_79.setTransform(288.6,333,0.5,0.5);

	this.instance_80 = new lib.CachedBmp_1474();
	this.instance_80.setTransform(288.6,333,0.5,0.5);

	this.instance_81 = new lib.CachedBmp_1475();
	this.instance_81.setTransform(288.6,333,0.5,0.5);

	this.instance_82 = new lib.CachedBmp_1476();
	this.instance_82.setTransform(288.6,333,0.5,0.5);

	this.instance_83 = new lib.CachedBmp_1477();
	this.instance_83.setTransform(288.6,333,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2}]},26).to({state:[{t:this.shape_2},{t:this.shape_3}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_73}]},1).to({state:[{t:this.instance_74}]},1).to({state:[{t:this.instance_75}]},1).to({state:[{t:this.instance_76}]},1).to({state:[{t:this.instance_77}]},1).to({state:[{t:this.instance_78}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_80}]},1).to({state:[{t:this.instance_81}]},1).to({state:[{t:this.instance_82}]},1).to({state:[{t:this.instance_83}]},1).wait(97));

	// Background
	this.instance_84 = new lib.Chap3GeneralScene();

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(136));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(515.3,267.8,891.2,572.2);
// library properties:
lib.properties = {
	id: 'A6F1A483617F544186FFC32FE4892FD2',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/LessonChapter3_02_atlas_1.png?1655327432129", id:"LessonChapter3_02_atlas_1"},
		{src:"images/LessonChapter3_02_atlas_2.png?1655327432130", id:"LessonChapter3_02_atlas_2"},
		{src:"images/LessonChapter3_02_atlas_3.png?1655327432131", id:"LessonChapter3_02_atlas_3"},
		{src:"images/LessonChapter3_02_atlas_4.png?1655327432132", id:"LessonChapter3_02_atlas_4"},
		{src:"images/LessonChapter3_02_atlas_5.png?1655327432133", id:"LessonChapter3_02_atlas_5"},
		{src:"sounds/AfterWar202wav.mp3?1655327432235", id:"AfterWar202wav"},
		{src:"sounds/popsound.mp3?1655327432235", id:"popsound"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['A6F1A483617F544186FFC32FE4892FD2'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;