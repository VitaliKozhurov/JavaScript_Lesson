// Находим контейнеры для часов
const divDomFirst = document.getElementById('first_container_dom');
const divDomSecond = document.getElementById('second_container_dom');
const divSvgFirst = document.getElementById('first_container_svg');
const divSvgSecond = document.getElementById('second_container_svg');
const divCanvasFirst = document.getElementById('first_container_canvas');
const divCanvasSecond = document.getElementById('second_container_canvas');
// Определяем параметры часового пояса
const timeNY = -28800000;
const timeZoneNY = 'Нью-Йорк (GMT-5)';
const timeMnsk = 0;
const timeZoneMnsk = 'Минск (GMT+3)';
const timeLdn = -10800000;
const timeZoneLdn = 'Лондон (GMT)';
const timeTok = 21600000;
const timeZoneTok = 'Токио (GMT+9)';
const timeBrln = -7200000;
const timeZoneBrln = 'Берлин (GMT+1)';
const timeVlv = 25200000;
const timeZoneVlv = 'Владивосток (GMT+10)';

/*=====DOM=====*/
// Часы Нью-Йорк
const modelNY = new Clock(timeNY, timeZoneNY);
const viewNY = new ViewDOM();
const controllerNY = new ClockControllerButtons();
modelNY.initView(viewNY);
viewNY.initModel(modelNY, divDomFirst);
controllerNY.initModel(modelNY, divDomFirst);
viewNY.createClock();
modelNY.updateTime();
// Часы Минск
const modelMnsk = new Clock(timeMnsk, timeZoneMnsk);
const viewMnsk = new ViewDOM();
const controllerMnsk = new ClockControllerButtons();
modelMnsk.initView(viewMnsk);
viewMnsk.initModel(modelMnsk, divDomSecond);
controllerMnsk.initModel(modelMnsk, divDomSecond);
viewMnsk.createClock();
modelMnsk.updateTime()

/*=====SVG=====*/
// Часы Лондон
const modelLdn = new Clock(timeLdn, timeZoneLdn);
const viewLdn = new ViewSvg();
const controllerLdn = new ClockControllerButtons();
modelLdn.initView(viewLdn);
viewLdn.initModel(modelLdn, divSvgFirst);
controllerLdn.initModel(modelLdn, divSvgFirst);
viewLdn.createClock();
modelLdn.updateTime();
// Часы Токио
const modelTok = new Clock(timeTok, timeZoneTok);
const viewTok = new ViewSvg();
const controllerTok = new ClockControllerButtons();
modelTok.initView(viewTok);
viewTok.initModel(modelTok, divSvgSecond);
controllerTok.initModel(modelTok, divSvgSecond);
viewTok.createClock();
modelTok.updateTime();

/*=====CANVAS=====*/
// Часы Берлин
const modelBrln = new Clock(timeBrln, timeZoneBrln);
const viewBrln = new ViewCanvas();
const controllerBrln = new ClockControllerButtons();
modelBrln.initView(viewBrln);
viewBrln.initModel(modelBrln, divCanvasFirst);
controllerBrln.initModel(modelBrln, divCanvasFirst);
viewBrln.createClock();
modelBrln.updateTime();
// Часы Владивосток
const modelVlv = new Clock(timeVlv, timeZoneVlv);
const viewVlv = new ViewCanvas();
const controllerVlv = new ClockControllerButtons();
modelVlv.initView(viewVlv);
viewVlv.initModel(modelVlv, divCanvasSecond);
controllerVlv.initModel(modelVlv, divCanvasSecond);
viewVlv.createClock();
modelVlv.updateTime();