"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/vendedor/productos/route";
exports.ids = ["app/api/vendedor/productos/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fproductos%2Froute&page=%2Fapi%2Fvendedor%2Fproductos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fproductos%2Froute.js&appDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fproductos%2Froute&page=%2Fapi%2Fvendedor%2Fproductos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fproductos%2Froute.js&appDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var c_Users_dpovi_Unimarket_marketplace_facultad_app_api_vendedor_productos_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/vendedor/productos/route.js */ \"(rsc)/./app/api/vendedor/productos/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/vendedor/productos/route\",\n        pathname: \"/api/vendedor/productos\",\n        filename: \"route\",\n        bundlePath: \"app/api/vendedor/productos/route\"\n    },\n    resolvedPagePath: \"c:\\\\Users\\\\dpovi\\\\Unimarket\\\\marketplace-facultad\\\\app\\\\api\\\\vendedor\\\\productos\\\\route.js\",\n    nextConfigOutput,\n    userland: c_Users_dpovi_Unimarket_marketplace_facultad_app_api_vendedor_productos_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/vendedor/productos/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ2ZW5kZWRvciUyRnByb2R1Y3RvcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdmVuZGVkb3IlMkZwcm9kdWN0b3MlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ2ZW5kZWRvciUyRnByb2R1Y3RvcyUyRnJvdXRlLmpzJmFwcERpcj1jJTNBJTVDVXNlcnMlNUNkcG92aSU1Q1VuaW1hcmtldCU1Q21hcmtldHBsYWNlLWZhY3VsdGFkJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1jJTNBJTVDVXNlcnMlNUNkcG92aSU1Q1VuaW1hcmtldCU1Q21hcmtldHBsYWNlLWZhY3VsdGFkJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMwQztBQUN2SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL21hcmtldHBsYWNlLWZhY3VsdGFkLz9iYzZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcImM6XFxcXFVzZXJzXFxcXGRwb3ZpXFxcXFVuaW1hcmtldFxcXFxtYXJrZXRwbGFjZS1mYWN1bHRhZFxcXFxhcHBcXFxcYXBpXFxcXHZlbmRlZG9yXFxcXHByb2R1Y3Rvc1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdmVuZGVkb3IvcHJvZHVjdG9zL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdmVuZGVkb3IvcHJvZHVjdG9zXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS92ZW5kZWRvci9wcm9kdWN0b3Mvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJjOlxcXFxVc2Vyc1xcXFxkcG92aVxcXFxVbmltYXJrZXRcXFxcbWFya2V0cGxhY2UtZmFjdWx0YWRcXFxcYXBwXFxcXGFwaVxcXFx2ZW5kZWRvclxcXFxwcm9kdWN0b3NcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3ZlbmRlZG9yL3Byb2R1Y3Rvcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fproductos%2Froute&page=%2Fapi%2Fvendedor%2Fproductos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fproductos%2Froute.js&appDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/vendedor/productos/route.js":
/*!*********************************************!*\
  !*** ./app/api/vendedor/productos/route.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_models_Product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/models/Product */ \"(rsc)/./lib/models/Product.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/auth */ \"(rsc)/./lib/auth.js\");\n\nconst runtime = \"nodejs\";\n\n\nasync function GET() {\n    const seller = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.getSellerFromCookie)();\n    if (!seller) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"No autorizado\"\n    }, {\n        status: 401\n    });\n    const Product = await (0,_lib_models_Product__WEBPACK_IMPORTED_MODULE_1__.ProductModel)();\n    const items = await Product.find({\n        vendedor_id: seller.id\n    }).sort({\n        fecha_creacion: -1\n    }).lean();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        items\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3ZlbmRlZG9yL3Byb2R1Y3Rvcy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEyQztBQUNwQyxNQUFNQyxVQUFVLFNBQVM7QUFDOEI7QUFDSDtBQUVwRCxlQUFlRztJQUNwQixNQUFNQyxTQUFTRiw4REFBbUJBO0lBQ2xDLElBQUksQ0FBQ0UsUUFBUSxPQUFPTCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBZ0IsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFDaEYsTUFBTUMsVUFBVSxNQUFNUCxpRUFBWUE7SUFDbEMsTUFBTVEsUUFBUSxNQUFNRCxRQUFRRSxJQUFJLENBQUM7UUFBRUMsYUFBYVAsT0FBT1EsRUFBRTtJQUFDLEdBQUdDLElBQUksQ0FBQztRQUFFQyxnQkFBZ0IsQ0FBQztJQUFFLEdBQUdDLElBQUk7SUFDOUYsT0FBT2hCLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7UUFBRUk7SUFBTTtBQUNuQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hcmtldHBsYWNlLWZhY3VsdGFkLy4vYXBwL2FwaS92ZW5kZWRvci9wcm9kdWN0b3Mvcm91dGUuanM/OWI0NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmV4cG9ydCBjb25zdCBydW50aW1lID0gJ25vZGVqcyc7XHJcbmltcG9ydCB7IFByb2R1Y3RNb2RlbCB9IGZyb20gJy4uLy4uLy4uLy4uL2xpYi9tb2RlbHMvUHJvZHVjdCc7XHJcbmltcG9ydCB7IGdldFNlbGxlckZyb21Db29raWUgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvYXV0aCc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIGNvbnN0IHNlbGxlciA9IGdldFNlbGxlckZyb21Db29raWUoKTtcclxuICBpZiAoIXNlbGxlcikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdObyBhdXRvcml6YWRvJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gIGNvbnN0IFByb2R1Y3QgPSBhd2FpdCBQcm9kdWN0TW9kZWwoKTtcclxuICBjb25zdCBpdGVtcyA9IGF3YWl0IFByb2R1Y3QuZmluZCh7IHZlbmRlZG9yX2lkOiBzZWxsZXIuaWQgfSkuc29ydCh7IGZlY2hhX2NyZWFjaW9uOiAtMSB9KS5sZWFuKCk7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgaXRlbXMgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInJ1bnRpbWUiLCJQcm9kdWN0TW9kZWwiLCJnZXRTZWxsZXJGcm9tQ29va2llIiwiR0VUIiwic2VsbGVyIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiUHJvZHVjdCIsIml0ZW1zIiwiZmluZCIsInZlbmRlZG9yX2lkIiwiaWQiLCJzb3J0IiwiZmVjaGFfY3JlYWNpb24iLCJsZWFuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/vendedor/productos/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearSellerCookie: () => (/* binding */ clearSellerCookie),\n/* harmony export */   getSellerFromCookie: () => (/* binding */ getSellerFromCookie),\n/* harmony export */   setSellerCookie: () => (/* binding */ setSellerCookie),\n/* harmony export */   signToken: () => (/* binding */ signToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst COOKIE_NAME = \"vendedor_token\";\nfunction signToken(payload, opts = {}) {\n    const secret = process.env.JWT_SECRET;\n    if (!secret) throw new Error(\"Falta JWT_SECRET\");\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, secret, {\n        expiresIn: \"7d\",\n        ...opts\n    });\n}\nfunction getSellerFromCookie() {\n    try {\n        const token = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().get(COOKIE_NAME)?.value;\n        if (!token) return null;\n        const secret = process.env.JWT_SECRET;\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, secret);\n    } catch  {\n        return null;\n    }\n}\nfunction setSellerCookie(token) {\n    const store = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    store.set({\n        name: COOKIE_NAME,\n        value: token,\n        httpOnly: true,\n        path: \"/\",\n        maxAge: 60 * 60 * 24 * 7,\n        sameSite: \"lax\",\n        secure: \"development\" === \"production\"\n    });\n}\nfunction clearSellerCookie() {\n    const store = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    store.delete(COOKIE_NAME);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQStCO0FBQ1E7QUFFdkMsTUFBTUUsY0FBYztBQUViLFNBQVNDLFVBQVVDLE9BQU8sRUFBRUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsTUFBTUMsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO0lBQ3JDLElBQUksQ0FBQ0gsUUFBUSxNQUFNLElBQUlJLE1BQU07SUFDN0IsT0FBT1Ysd0RBQVEsQ0FBQ0ksU0FBU0UsUUFBUTtRQUFFTSxXQUFXO1FBQU0sR0FBR1AsSUFBSTtJQUFDO0FBQzlEO0FBRU8sU0FBU1E7SUFDZCxJQUFJO1FBQ0YsTUFBTUMsUUFBUWIscURBQU9BLEdBQUdjLEdBQUcsQ0FBQ2IsY0FBY2M7UUFDMUMsSUFBSSxDQUFDRixPQUFPLE9BQU87UUFDbkIsTUFBTVIsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQ3JDLE9BQU9ULDBEQUFVLENBQUNjLE9BQU9SO0lBQzNCLEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRU8sU0FBU1ksZ0JBQWdCSixLQUFLO0lBQ25DLE1BQU1LLFFBQVFsQixxREFBT0E7SUFDckJrQixNQUFNQyxHQUFHLENBQUM7UUFDUkMsTUFBTW5CO1FBQ05jLE9BQU9GO1FBQ1BRLFVBQVU7UUFDVkMsTUFBTTtRQUNOQyxRQUFRLEtBQUssS0FBSyxLQUFLO1FBQ3ZCQyxVQUFVO1FBQ1ZDLFFBQVFuQixrQkFBeUI7SUFDbkM7QUFDRjtBQUVPLFNBQVNvQjtJQUNkLE1BQU1SLFFBQVFsQixxREFBT0E7SUFDckJrQixNQUFNUyxNQUFNLENBQUMxQjtBQUNmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFya2V0cGxhY2UtZmFjdWx0YWQvLi9saWIvYXV0aC5qcz8yODdiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XHJcblxyXG5jb25zdCBDT09LSUVfTkFNRSA9ICd2ZW5kZWRvcl90b2tlbic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2lnblRva2VuKHBheWxvYWQsIG9wdHMgPSB7fSkge1xyXG4gIGNvbnN0IHNlY3JldCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQ7XHJcbiAgaWYgKCFzZWNyZXQpIHRocm93IG5ldyBFcnJvcignRmFsdGEgSldUX1NFQ1JFVCcpO1xyXG4gIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBzZWNyZXQsIHsgZXhwaXJlc0luOiAnN2QnLCAuLi5vcHRzIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsbGVyRnJvbUNvb2tpZSgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdG9rZW4gPSBjb29raWVzKCkuZ2V0KENPT0tJRV9OQU1FKT8udmFsdWU7XHJcbiAgICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IHNlY3JldCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQ7XHJcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgc2VjcmV0KTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNlbGxlckNvb2tpZSh0b2tlbikge1xyXG4gIGNvbnN0IHN0b3JlID0gY29va2llcygpO1xyXG4gIHN0b3JlLnNldCh7XHJcbiAgICBuYW1lOiBDT09LSUVfTkFNRSxcclxuICAgIHZhbHVlOiB0b2tlbixcclxuICAgIGh0dHBPbmx5OiB0cnVlLFxyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgbWF4QWdlOiA2MCAqIDYwICogMjQgKiA3LFxyXG4gICAgc2FtZVNpdGU6ICdsYXgnLFxyXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlbGxlckNvb2tpZSgpIHtcclxuICBjb25zdCBzdG9yZSA9IGNvb2tpZXMoKTtcclxuICBzdG9yZS5kZWxldGUoQ09PS0lFX05BTUUpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJqd3QiLCJjb29raWVzIiwiQ09PS0lFX05BTUUiLCJzaWduVG9rZW4iLCJwYXlsb2FkIiwib3B0cyIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiRXJyb3IiLCJzaWduIiwiZXhwaXJlc0luIiwiZ2V0U2VsbGVyRnJvbUNvb2tpZSIsInRva2VuIiwiZ2V0IiwidmFsdWUiLCJ2ZXJpZnkiLCJzZXRTZWxsZXJDb29raWUiLCJzdG9yZSIsInNldCIsIm5hbWUiLCJodHRwT25seSIsInBhdGgiLCJtYXhBZ2UiLCJzYW1lU2l0ZSIsInNlY3VyZSIsImNsZWFyU2VsbGVyQ29va2llIiwiZGVsZXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./lib/models/Product.js":
/*!*******************************!*\
  !*** ./lib/models/Product.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProductModel: () => (/* binding */ ProductModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mongodb */ \"(rsc)/./lib/mongodb.js\");\n\n\nconst ProductSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    titulo: {\n        type: String,\n        required: true,\n        maxlength: 100\n    },\n    descripcion: {\n        type: String,\n        required: true,\n        maxlength: 500\n    },\n    precio: {\n        type: Number,\n        required: true,\n        min: 0\n    },\n    categoria: {\n        type: String,\n        required: true,\n        enum: [\n            \"utiles\",\n            \"comida\",\n            \"tecnologia\",\n            \"ropa\",\n            \"otros\"\n        ]\n    },\n    imagenes: {\n        type: [\n            String\n        ],\n        default: [],\n        validate: [\n            (arr)=>arr.length <= 3,\n            \"M\\xe1ximo 3 im\\xe1genes\"\n        ]\n    },\n    stock: {\n        type: Number,\n        required: true,\n        default: 0,\n        min: 0\n    },\n    disponible: {\n        type: Boolean,\n        default: true\n    },\n    vendedor_id: {\n        type: String\n    },\n    vendedor_nombre: {\n        type: String\n    }\n}, {\n    timestamps: {\n        createdAt: \"fecha_creacion\",\n        updatedAt: \"fecha_actualizacion\"\n    }\n});\nasync function ProductModel() {\n    await (0,_mongodb__WEBPACK_IMPORTED_MODULE_1__.connectDB)();\n    return (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Product || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Product\", ProductSchema, \"productos\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL1Byb2R1Y3QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE0QztBQUNMO0FBRXZDLE1BQU1HLGdCQUFnQixJQUFJRiw0Q0FBTUEsQ0FDOUI7SUFDRUcsUUFBUTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLFdBQVc7SUFBSTtJQUN2REMsYUFBYTtRQUFFSixNQUFNQztRQUFRQyxVQUFVO1FBQU1DLFdBQVc7SUFBSTtJQUM1REUsUUFBUTtRQUFFTCxNQUFNTTtRQUFRSixVQUFVO1FBQU1LLEtBQUs7SUFBRTtJQUMvQ0MsV0FBVztRQUFFUixNQUFNQztRQUFRQyxVQUFVO1FBQU1PLE1BQU07WUFBQztZQUFVO1lBQVU7WUFBYztZQUFRO1NBQVE7SUFBQztJQUNyR0MsVUFBVTtRQUFFVixNQUFNO1lBQUNDO1NBQU87UUFBRVUsU0FBUyxFQUFFO1FBQUVDLFVBQVU7WUFBQyxDQUFDQyxNQUFRQSxJQUFJQyxNQUFNLElBQUk7WUFBRztTQUFvQjtJQUFDO0lBQ25HQyxPQUFPO1FBQUVmLE1BQU1NO1FBQVFKLFVBQVU7UUFBTVMsU0FBUztRQUFHSixLQUFLO0lBQUU7SUFDMURTLFlBQVk7UUFBRWhCLE1BQU1pQjtRQUFTTixTQUFTO0lBQUs7SUFDM0NPLGFBQWE7UUFBRWxCLE1BQU1DO0lBQU87SUFDNUJrQixpQkFBaUI7UUFBRW5CLE1BQU1DO0lBQU87QUFDbEMsR0FDQTtJQUFFbUIsWUFBWTtRQUFFQyxXQUFXO1FBQWtCQyxXQUFXO0lBQXNCO0FBQUU7QUFHM0UsZUFBZUM7SUFDcEIsTUFBTTFCLG1EQUFTQTtJQUNmLE9BQU9GLHdEQUFlLENBQUM4QixPQUFPLElBQUk5QixxREFBYyxDQUFDLFdBQVdHLGVBQWU7QUFDN0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXJrZXRwbGFjZS1mYWN1bHRhZC8uL2xpYi9tb2RlbHMvUHJvZHVjdC5qcz81ZDQzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IGNvbm5lY3REQiB9IGZyb20gJy4uL21vbmdvZGInO1xyXG5cclxuY29uc3QgUHJvZHVjdFNjaGVtYSA9IG5ldyBTY2hlbWEoXHJcbiAge1xyXG4gICAgdGl0dWxvOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIG1heGxlbmd0aDogMTAwIH0sXHJcbiAgICBkZXNjcmlwY2lvbjogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCBtYXhsZW5ndGg6IDUwMCB9LFxyXG4gICAgcHJlY2lvOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMCB9LFxyXG4gICAgY2F0ZWdvcmlhOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIGVudW06IFsndXRpbGVzJywgJ2NvbWlkYScsICd0ZWNub2xvZ2lhJywgJ3JvcGEnLCAnb3Ryb3MnXSB9LFxyXG4gICAgaW1hZ2VuZXM6IHsgdHlwZTogW1N0cmluZ10sIGRlZmF1bHQ6IFtdLCB2YWxpZGF0ZTogWyhhcnIpID0+IGFyci5sZW5ndGggPD0gMywgJ03DoXhpbW8gMyBpbcOhZ2VuZXMnXSB9LFxyXG4gICAgc3RvY2s6IHsgdHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogMCwgbWluOiAwIH0sXHJcbiAgICBkaXNwb25pYmxlOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfSxcclxuICAgIHZlbmRlZG9yX2lkOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICAgdmVuZGVkb3Jfbm9tYnJlOiB7IHR5cGU6IFN0cmluZyB9XHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHsgY3JlYXRlZEF0OiAnZmVjaGFfY3JlYWNpb24nLCB1cGRhdGVkQXQ6ICdmZWNoYV9hY3R1YWxpemFjaW9uJyB9IH1cclxuKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQcm9kdWN0TW9kZWwoKSB7XHJcbiAgYXdhaXQgY29ubmVjdERCKCk7XHJcbiAgcmV0dXJuIG1vbmdvb3NlLm1vZGVscy5Qcm9kdWN0IHx8IG1vbmdvb3NlLm1vZGVsKCdQcm9kdWN0JywgUHJvZHVjdFNjaGVtYSwgJ3Byb2R1Y3RvcycpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsImNvbm5lY3REQiIsIlByb2R1Y3RTY2hlbWEiLCJ0aXR1bG8iLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJtYXhsZW5ndGgiLCJkZXNjcmlwY2lvbiIsInByZWNpbyIsIk51bWJlciIsIm1pbiIsImNhdGVnb3JpYSIsImVudW0iLCJpbWFnZW5lcyIsImRlZmF1bHQiLCJ2YWxpZGF0ZSIsImFyciIsImxlbmd0aCIsInN0b2NrIiwiZGlzcG9uaWJsZSIsIkJvb2xlYW4iLCJ2ZW5kZWRvcl9pZCIsInZlbmRlZG9yX25vbWJyZSIsInRpbWVzdGFtcHMiLCJjcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJQcm9kdWN0TW9kZWwiLCJtb2RlbHMiLCJQcm9kdWN0IiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/Product.js\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.js":
/*!************************!*\
  !*** ./lib/mongodb.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n// MongoDB native client (optional) and Mongoose connection helper\n\n\nconst uri = process.env.MONGODB_URI;\nconst options = {};\nlet client;\nlet clientPromise;\nif (!process.env.MONGODB_URI) {\n    throw new Error(\"Add Mongo URI to .env.local\");\n}\nif (true) {\n    if (!global._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n        global._mongoClientPromise = client.connect();\n    }\n    clientPromise = global._mongoClientPromise;\n} else {}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise); // Native driver promise (not used by models, but available)\n// Mongoose singleton connection\nlet mongooseConn = global._mongooseConn || null;\nasync function connectDB() {\n    if (mongooseConn && (mongoose__WEBPACK_IMPORTED_MODULE_1___default().connection).readyState === 1) return mongooseConn;\n    mongoose__WEBPACK_IMPORTED_MODULE_1___default().set(\"strictQuery\", true);\n    mongooseConn = await mongoose__WEBPACK_IMPORTED_MODULE_1___default().connect(uri, {\n        dbName: \"marketplace\"\n    });\n    global._mongooseConn = mongooseConn;\n    return mongooseConn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxrRUFBa0U7QUFDNUI7QUFDTjtBQUVoQyxNQUFNRSxNQUFNQyxRQUFRQyxHQUFHLENBQUNDLFdBQVc7QUFDbkMsTUFBTUMsVUFBVSxDQUFDO0FBRWpCLElBQUlDO0FBQ0osSUFBSUM7QUFFSixJQUFJLENBQUNMLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVyxFQUFFO0lBQzVCLE1BQU0sSUFBSUksTUFBTTtBQUNsQjtBQUVBLElBQUlOLElBQXlCLEVBQWU7SUFDMUMsSUFBSSxDQUFDTyxPQUFPQyxtQkFBbUIsRUFBRTtRQUMvQkosU0FBUyxJQUFJUCxnREFBV0EsQ0FBQ0UsS0FBS0k7UUFDOUJJLE9BQU9DLG1CQUFtQixHQUFHSixPQUFPSyxPQUFPO0lBQzdDO0lBQ0FKLGdCQUFnQkUsT0FBT0MsbUJBQW1CO0FBQzVDLE9BQU8sRUFHTjtBQUVELGlFQUFlSCxhQUFhQSxFQUFDLENBQUMsNERBQTREO0FBRTFGLGdDQUFnQztBQUNoQyxJQUFJSyxlQUFlSCxPQUFPSSxhQUFhLElBQUk7QUFFcEMsZUFBZUM7SUFDcEIsSUFBSUYsZ0JBQWdCWiw0REFBbUIsQ0FBQ2dCLFVBQVUsS0FBSyxHQUFHLE9BQU9KO0lBQ2pFWixtREFBWSxDQUFDLGVBQWU7SUFDNUJZLGVBQWUsTUFBTVosdURBQWdCLENBQUNDLEtBQUs7UUFBRWlCLFFBQVE7SUFBYztJQUNuRVQsT0FBT0ksYUFBYSxHQUFHRDtJQUN2QixPQUFPQTtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFya2V0cGxhY2UtZmFjdWx0YWQvLi9saWIvbW9uZ29kYi5qcz9kOTIwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE1vbmdvREIgbmF0aXZlIGNsaWVudCAob3B0aW9uYWwpIGFuZCBNb25nb29zZSBjb25uZWN0aW9uIGhlbHBlclxyXG5pbXBvcnQgeyBNb25nb0NsaWVudCB9IGZyb20gJ21vbmdvZGInO1xyXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XHJcbmNvbnN0IG9wdGlvbnMgPSB7fTtcclxuXHJcbmxldCBjbGllbnQ7XHJcbmxldCBjbGllbnRQcm9taXNlO1xyXG5cclxuaWYgKCFwcm9jZXNzLmVudi5NT05HT0RCX1VSSSkge1xyXG4gIHRocm93IG5ldyBFcnJvcignQWRkIE1vbmdvIFVSSSB0byAuZW52LmxvY2FsJyk7XHJcbn1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gIGlmICghZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UpIHtcclxuICAgIGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmksIG9wdGlvbnMpO1xyXG4gICAgZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UgPSBjbGllbnQuY29ubmVjdCgpO1xyXG4gIH1cclxuICBjbGllbnRQcm9taXNlID0gZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2U7XHJcbn0gZWxzZSB7XHJcbiAgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSwgb3B0aW9ucyk7XHJcbiAgY2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsaWVudFByb21pc2U7IC8vIE5hdGl2ZSBkcml2ZXIgcHJvbWlzZSAobm90IHVzZWQgYnkgbW9kZWxzLCBidXQgYXZhaWxhYmxlKVxyXG5cclxuLy8gTW9uZ29vc2Ugc2luZ2xldG9uIGNvbm5lY3Rpb25cclxubGV0IG1vbmdvb3NlQ29ubiA9IGdsb2JhbC5fbW9uZ29vc2VDb25uIHx8IG51bGw7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdERCKCkge1xyXG4gIGlmIChtb25nb29zZUNvbm4gJiYgbW9uZ29vc2UuY29ubmVjdGlvbi5yZWFkeVN0YXRlID09PSAxKSByZXR1cm4gbW9uZ29vc2VDb25uO1xyXG4gIG1vbmdvb3NlLnNldCgnc3RyaWN0UXVlcnknLCB0cnVlKTtcclxuICBtb25nb29zZUNvbm4gPSBhd2FpdCBtb25nb29zZS5jb25uZWN0KHVyaSwgeyBkYk5hbWU6ICdtYXJrZXRwbGFjZScgfSk7XHJcbiAgZ2xvYmFsLl9tb25nb29zZUNvbm4gPSBtb25nb29zZUNvbm47XHJcbiAgcmV0dXJuIG1vbmdvb3NlQ29ubjtcclxufVxyXG4iXSwibmFtZXMiOlsiTW9uZ29DbGllbnQiLCJtb25nb29zZSIsInVyaSIsInByb2Nlc3MiLCJlbnYiLCJNT05HT0RCX1VSSSIsIm9wdGlvbnMiLCJjbGllbnQiLCJjbGllbnRQcm9taXNlIiwiRXJyb3IiLCJnbG9iYWwiLCJfbW9uZ29DbGllbnRQcm9taXNlIiwiY29ubmVjdCIsIm1vbmdvb3NlQ29ubiIsIl9tb25nb29zZUNvbm4iLCJjb25uZWN0REIiLCJjb25uZWN0aW9uIiwicmVhZHlTdGF0ZSIsInNldCIsImRiTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fproductos%2Froute&page=%2Fapi%2Fvendedor%2Fproductos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fproductos%2Froute.js&appDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=c%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();