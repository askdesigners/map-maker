/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/electron-app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/electron-app/main.js":
/*!**********************************!*\
  !*** ./src/electron-app/main.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mapActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapActions */ \"./src/electron-app/mapActions.js\");\nlet mainWindow;const mapActionsInstance=new _mapActions__WEBPACK_IMPORTED_MODULE_3__[\"default\"](electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"],\"../../mapData/mapStore.json\");function createWindow(){mainWindow=new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({width:1200,height:800,icon:Object(path__WEBPACK_IMPORTED_MODULE_1__[\"resolve\"])(__dirname,\"icon.png\"),webPreferences:{nodeIntegration:true}});mainWindow.setMenu(null);mainWindow.loadURL( true?Object(url__WEBPACK_IMPORTED_MODULE_2__[\"format\"])({hostname:\"localhost\",pathname:\"index.html\",protocol:\"http\",slashes:true,port:8080}):undefined);if(true){mainWindow.webContents.openDevTools();__webpack_require__(/*! devtron */ \"devtron\").install();__webpack_require__(/*! vue-devtools */ \"vue-devtools\").install()}mainWindow.on(\"closed\",()=>{mainWindow=null})}electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on(\"ready\",()=>{createWindow()});electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on(\"window-all-closed\",()=>{mapActionsInstance.kill();if(process.platform!==\"darwin\"){electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit()}});electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on(\"activate\",()=>{if(mainWindow===null){createWindow()}});\n\n//# sourceURL=webpack:///./src/electron-app/main.js?");

/***/ }),

/***/ "./src/electron-app/mapActions.js":
/*!****************************************!*\
  !*** ./src/electron-app/mapActions.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MapManager; });\n/* harmony import */ var jsonfile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonfile */ \"jsonfile\");\n/* harmony import */ var jsonfile__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonfile__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\nclass MapManager{constructor(ipcMain,jsonMapPath){console.log(\"inti1!!\",this,ipcMain);this.ipcBus=ipcMain;this.mapFilePath=jsonMapPath;ipcMain.on(\"getmap\",this.getMap.bind(this));ipcMain.on(\"updatemap\",this.updateMap.bind(this))}getMap(event,dimensions){console.log(\"getting map\",this);let emptyMap=this.buildEmptyMap(dimensions);event.sender.send(\"getmap-reply\",this.formatForApp(emptyMap,jsonfile__WEBPACK_IMPORTED_MODULE_0___default.a.readFileSync(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname,this.mapFilePath)).map))}updateMap(event,newMapData){let err=jsonfile__WEBPACK_IMPORTED_MODULE_0___default.a.writeFileSync(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname,this.mapFile),this.formatForSave(newMapData));console.error(\"Saved file\",err)}buildEmptyMap(dimensions){console.log(\"build empty map\");let rows=Array.apply(null,{length:dimensions[1]}).map(()=>[]);let cols=Array.apply(null,{length:dimensions[0]}).map(()=>[]);let newMap={};rows.map((rElem,ri)=>{return cols.map((cElem,ci)=>{let key=`${ci+1}-${ri+1}`;newMap[key]={key,level:\"\",name:\"\",descriptiveName:\"\",description:\"\",w:false,e:false,n:false,s:false}})});return newMap}formatForApp(emptyMap,data){console.log(\"formatting map data\",Object.keys(emptyMap).length,data.length);return data.reduce((m,place)=>{let key=place.x+\"-\"+place.y;m[key]={key:key,level:place.level,name:place.name,descriptiveName:place.descriptiveName,description:place.description,w:place.blockedTo.indexOf(\"w\")>-1,e:place.blockedTo.indexOf(\"e\")>-1,n:place.blockedTo.indexOf(\"n\")>-1,s:place.blockedTo.indexOf(\"s\")>-1};console.log(\"returning\",key,m[key].name,place.name);return m},emptyMap)}formatForSave(newMapData){let keys=Object.keys(newMapData);return{map:keys.reduce((acc,k)=>{let xy=k.split(\"-\");let blocks=[newMapData[k].w?\"w\":null,newMapData[k].e?\"e\":null,newMapData[k].n?\"n\":null,newMapData[k].s?\"s\":null].filter(e=>e);let tPlace={x:xy[0],y:xy[1],level:0,name:newMapData[k].name,descriptiveName:newMapData[k].descriptiveName,description:newMapData[k].description,blockedTo:blocks};return acc.concat(tPlace)},[])}}kill(){console.log(\"It's dead now...\")}}\n\n//# sourceURL=webpack:///./src/electron-app/mapActions.js?");

/***/ }),

/***/ "devtron":
/*!***************************************!*\
  !*** external "require(\"devtron\")" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"devtron\");\n\n//# sourceURL=webpack:///external_%22require(\\%22devtron\\%22)%22?");

/***/ }),

/***/ "electron":
/*!****************************************!*\
  !*** external "require(\"electron\")" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22require(\\%22electron\\%22)%22?");

/***/ }),

/***/ "jsonfile":
/*!****************************************!*\
  !*** external "require(\"jsonfile\")" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonfile\");\n\n//# sourceURL=webpack:///external_%22require(\\%22jsonfile\\%22)%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "url":
/*!***********************************!*\
  !*** external "require(\"url\")" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22require(\\%22url\\%22)%22?");

/***/ }),

/***/ "vue-devtools":
/*!********************************************!*\
  !*** external "require(\"vue-devtools\")" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vue-devtools\");\n\n//# sourceURL=webpack:///external_%22require(\\%22vue-devtools\\%22)%22?");

/***/ })

/******/ });