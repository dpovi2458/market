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
exports.id = "app/api/vendedor/pedidos/route";
exports.ids = ["app/api/vendedor/pedidos/route"];
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

/***/ "./action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external":
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fpedidos%2Froute&page=%2Fapi%2Fvendedor%2Fpedidos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fpedidos%2Froute.js&appDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fpedidos%2Froute&page=%2Fapi%2Fvendedor%2Fpedidos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fpedidos%2Froute.js&appDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_dpovi_Unimarket_marketplace_facultad_app_api_vendedor_pedidos_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/vendedor/pedidos/route.js */ \"(rsc)/./app/api/vendedor/pedidos/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/vendedor/pedidos/route\",\n        pathname: \"/api/vendedor/pedidos\",\n        filename: \"route\",\n        bundlePath: \"app/api/vendedor/pedidos/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\dpovi\\\\Unimarket\\\\marketplace-facultad\\\\app\\\\api\\\\vendedor\\\\pedidos\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_dpovi_Unimarket_marketplace_facultad_app_api_vendedor_pedidos_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/vendedor/pedidos/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ2ZW5kZWRvciUyRnBlZGlkb3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnZlbmRlZG9yJTJGcGVkaWRvcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnZlbmRlZG9yJTJGcGVkaWRvcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNkcG92aSU1Q1VuaW1hcmtldCU1Q21hcmtldHBsYWNlLWZhY3VsdGFkJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNkcG92aSU1Q1VuaW1hcmtldCU1Q21hcmtldHBsYWNlLWZhY3VsdGFkJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN3QztBQUNySDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL21hcmtldHBsYWNlLWZhY3VsdGFkLz85M2Y4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGRwb3ZpXFxcXFVuaW1hcmtldFxcXFxtYXJrZXRwbGFjZS1mYWN1bHRhZFxcXFxhcHBcXFxcYXBpXFxcXHZlbmRlZG9yXFxcXHBlZGlkb3NcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3ZlbmRlZG9yL3BlZGlkb3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS92ZW5kZWRvci9wZWRpZG9zXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS92ZW5kZWRvci9wZWRpZG9zL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcZHBvdmlcXFxcVW5pbWFya2V0XFxcXG1hcmtldHBsYWNlLWZhY3VsdGFkXFxcXGFwcFxcXFxhcGlcXFxcdmVuZGVkb3JcXFxccGVkaWRvc1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdmVuZGVkb3IvcGVkaWRvcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fpedidos%2Froute&page=%2Fapi%2Fvendedor%2Fpedidos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fpedidos%2Froute.js&appDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/vendedor/pedidos/route.js":
/*!*******************************************!*\
  !*** ./app/api/vendedor/pedidos/route.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_models_Order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/models/Order */ \"(rsc)/./lib/models/Order.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/auth */ \"(rsc)/./lib/auth.js\");\n\nconst runtime = \"nodejs\";\n\n\nasync function GET() {\n    const seller = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.getSellerFromCookie)();\n    if (!seller) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"No autorizado\"\n    }, {\n        status: 401\n    });\n    const Order = await (0,_lib_models_Order__WEBPACK_IMPORTED_MODULE_1__.OrderModel)();\n    const items = await Order.find({\n        vendedor_id: seller.id\n    }).sort({\n        fecha_pedido: -1\n    }).lean();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        items\n    });\n}\nasync function PATCH(req) {\n    const seller = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.getSellerFromCookie)();\n    if (!seller) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"No autorizado\"\n    }, {\n        status: 401\n    });\n    const { id, estado } = await req.json();\n    const Order = await (0,_lib_models_Order__WEBPACK_IMPORTED_MODULE_1__.OrderModel)();\n    await Order.updateOne({\n        _id: id,\n        vendedor_id: seller.id\n    }, {\n        $set: {\n            estado\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        ok: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3ZlbmRlZG9yL3BlZGlkb3Mvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTJDO0FBQ3BDLE1BQU1DLFVBQVUsU0FBUztBQUMwQjtBQUNDO0FBRXBELGVBQWVHO0lBQ3BCLE1BQU1DLFNBQVNGLDhEQUFtQkE7SUFDbEMsSUFBSSxDQUFDRSxRQUFRLE9BQU9MLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFnQixHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUNoRixNQUFNQyxRQUFRLE1BQU1QLDZEQUFVQTtJQUM5QixNQUFNUSxRQUFRLE1BQU1ELE1BQU1FLElBQUksQ0FBQztRQUFFQyxhQUFhUCxPQUFPUSxFQUFFO0lBQUMsR0FBR0MsSUFBSSxDQUFDO1FBQUVDLGNBQWMsQ0FBQztJQUFFLEdBQUdDLElBQUk7SUFDMUYsT0FBT2hCLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7UUFBRUk7SUFBTTtBQUNuQztBQUVPLGVBQWVPLE1BQU1DLEdBQUc7SUFDN0IsTUFBTWIsU0FBU0YsOERBQW1CQTtJQUNsQyxJQUFJLENBQUNFLFFBQVEsT0FBT0wscURBQVlBLENBQUNNLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQWdCLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQ2hGLE1BQU0sRUFBRUssRUFBRSxFQUFFTSxNQUFNLEVBQUUsR0FBRyxNQUFNRCxJQUFJWixJQUFJO0lBQ3JDLE1BQU1HLFFBQVEsTUFBTVAsNkRBQVVBO0lBQzlCLE1BQU1PLE1BQU1XLFNBQVMsQ0FBQztRQUFFQyxLQUFLUjtRQUFJRCxhQUFhUCxPQUFPUSxFQUFFO0lBQUMsR0FBRztRQUFFUyxNQUFNO1lBQUVIO1FBQU87SUFBRTtJQUM5RSxPQUFPbkIscURBQVlBLENBQUNNLElBQUksQ0FBQztRQUFFaUIsSUFBSTtJQUFLO0FBQ3RDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFya2V0cGxhY2UtZmFjdWx0YWQvLi9hcHAvYXBpL3ZlbmRlZG9yL3BlZGlkb3Mvcm91dGUuanM/MmY5ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmV4cG9ydCBjb25zdCBydW50aW1lID0gJ25vZGVqcyc7XHJcbmltcG9ydCB7IE9yZGVyTW9kZWwgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvbW9kZWxzL09yZGVyJztcclxuaW1wb3J0IHsgZ2V0U2VsbGVyRnJvbUNvb2tpZSB9IGZyb20gJy4uLy4uLy4uLy4uL2xpYi9hdXRoJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgY29uc3Qgc2VsbGVyID0gZ2V0U2VsbGVyRnJvbUNvb2tpZSgpO1xyXG4gIGlmICghc2VsbGVyKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ05vIGF1dG9yaXphZG8nIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgY29uc3QgT3JkZXIgPSBhd2FpdCBPcmRlck1vZGVsKCk7XHJcbiAgY29uc3QgaXRlbXMgPSBhd2FpdCBPcmRlci5maW5kKHsgdmVuZGVkb3JfaWQ6IHNlbGxlci5pZCB9KS5zb3J0KHsgZmVjaGFfcGVkaWRvOiAtMSB9KS5sZWFuKCk7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgaXRlbXMgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQQVRDSChyZXEpIHtcclxuICBjb25zdCBzZWxsZXIgPSBnZXRTZWxsZXJGcm9tQ29va2llKCk7XHJcbiAgaWYgKCFzZWxsZXIpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gYXV0b3JpemFkbycgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICBjb25zdCB7IGlkLCBlc3RhZG8gfSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgY29uc3QgT3JkZXIgPSBhd2FpdCBPcmRlck1vZGVsKCk7XHJcbiAgYXdhaXQgT3JkZXIudXBkYXRlT25lKHsgX2lkOiBpZCwgdmVuZGVkb3JfaWQ6IHNlbGxlci5pZCB9LCB7ICRzZXQ6IHsgZXN0YWRvIH0gfSk7XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IHRydWUgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInJ1bnRpbWUiLCJPcmRlck1vZGVsIiwiZ2V0U2VsbGVyRnJvbUNvb2tpZSIsIkdFVCIsInNlbGxlciIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIk9yZGVyIiwiaXRlbXMiLCJmaW5kIiwidmVuZGVkb3JfaWQiLCJpZCIsInNvcnQiLCJmZWNoYV9wZWRpZG8iLCJsZWFuIiwiUEFUQ0giLCJyZXEiLCJlc3RhZG8iLCJ1cGRhdGVPbmUiLCJfaWQiLCIkc2V0Iiwib2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/vendedor/pedidos/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearSellerCookie: () => (/* binding */ clearSellerCookie),\n/* harmony export */   getSellerFromCookie: () => (/* binding */ getSellerFromCookie),\n/* harmony export */   setSellerCookie: () => (/* binding */ setSellerCookie),\n/* harmony export */   signToken: () => (/* binding */ signToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst COOKIE_NAME = \"vendedor_token\";\nfunction signToken(payload, opts = {}) {\n    const secret = process.env.JWT_SECRET;\n    if (!secret) throw new Error(\"Falta JWT_SECRET\");\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, secret, {\n        expiresIn: \"7d\",\n        ...opts\n    });\n}\nfunction getSellerFromCookie() {\n    try {\n        const token = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().get(COOKIE_NAME)?.value;\n        if (!token) return null;\n        const secret = process.env.JWT_SECRET;\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, secret);\n    } catch  {\n        return null;\n    }\n}\nfunction setSellerCookie(token) {\n    const store = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    store.set({\n        name: COOKIE_NAME,\n        value: token,\n        httpOnly: true,\n        path: \"/\",\n        maxAge: 60 * 60 * 24 * 7,\n        sameSite: \"lax\",\n        secure: \"development\" === \"production\"\n    });\n}\nfunction clearSellerCookie() {\n    const store = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    store.delete(COOKIE_NAME);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQStCO0FBQ1E7QUFFdkMsTUFBTUUsY0FBYztBQUViLFNBQVNDLFVBQVVDLE9BQU8sRUFBRUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsTUFBTUMsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO0lBQ3JDLElBQUksQ0FBQ0gsUUFBUSxNQUFNLElBQUlJLE1BQU07SUFDN0IsT0FBT1Ysd0RBQVEsQ0FBQ0ksU0FBU0UsUUFBUTtRQUFFTSxXQUFXO1FBQU0sR0FBR1AsSUFBSTtJQUFDO0FBQzlEO0FBRU8sU0FBU1E7SUFDZCxJQUFJO1FBQ0YsTUFBTUMsUUFBUWIscURBQU9BLEdBQUdjLEdBQUcsQ0FBQ2IsY0FBY2M7UUFDMUMsSUFBSSxDQUFDRixPQUFPLE9BQU87UUFDbkIsTUFBTVIsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQ3JDLE9BQU9ULDBEQUFVLENBQUNjLE9BQU9SO0lBQzNCLEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRU8sU0FBU1ksZ0JBQWdCSixLQUFLO0lBQ25DLE1BQU1LLFFBQVFsQixxREFBT0E7SUFDckJrQixNQUFNQyxHQUFHLENBQUM7UUFDUkMsTUFBTW5CO1FBQ05jLE9BQU9GO1FBQ1BRLFVBQVU7UUFDVkMsTUFBTTtRQUNOQyxRQUFRLEtBQUssS0FBSyxLQUFLO1FBQ3ZCQyxVQUFVO1FBQ1ZDLFFBQVFuQixrQkFBeUI7SUFDbkM7QUFDRjtBQUVPLFNBQVNvQjtJQUNkLE1BQU1SLFFBQVFsQixxREFBT0E7SUFDckJrQixNQUFNUyxNQUFNLENBQUMxQjtBQUNmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFya2V0cGxhY2UtZmFjdWx0YWQvLi9saWIvYXV0aC5qcz8yODdiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XHJcblxyXG5jb25zdCBDT09LSUVfTkFNRSA9ICd2ZW5kZWRvcl90b2tlbic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2lnblRva2VuKHBheWxvYWQsIG9wdHMgPSB7fSkge1xyXG4gIGNvbnN0IHNlY3JldCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQ7XHJcbiAgaWYgKCFzZWNyZXQpIHRocm93IG5ldyBFcnJvcignRmFsdGEgSldUX1NFQ1JFVCcpO1xyXG4gIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBzZWNyZXQsIHsgZXhwaXJlc0luOiAnN2QnLCAuLi5vcHRzIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsbGVyRnJvbUNvb2tpZSgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdG9rZW4gPSBjb29raWVzKCkuZ2V0KENPT0tJRV9OQU1FKT8udmFsdWU7XHJcbiAgICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IHNlY3JldCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQ7XHJcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgc2VjcmV0KTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNlbGxlckNvb2tpZSh0b2tlbikge1xyXG4gIGNvbnN0IHN0b3JlID0gY29va2llcygpO1xyXG4gIHN0b3JlLnNldCh7XHJcbiAgICBuYW1lOiBDT09LSUVfTkFNRSxcclxuICAgIHZhbHVlOiB0b2tlbixcclxuICAgIGh0dHBPbmx5OiB0cnVlLFxyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgbWF4QWdlOiA2MCAqIDYwICogMjQgKiA3LFxyXG4gICAgc2FtZVNpdGU6ICdsYXgnLFxyXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlbGxlckNvb2tpZSgpIHtcclxuICBjb25zdCBzdG9yZSA9IGNvb2tpZXMoKTtcclxuICBzdG9yZS5kZWxldGUoQ09PS0lFX05BTUUpO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJqd3QiLCJjb29raWVzIiwiQ09PS0lFX05BTUUiLCJzaWduVG9rZW4iLCJwYXlsb2FkIiwib3B0cyIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiRXJyb3IiLCJzaWduIiwiZXhwaXJlc0luIiwiZ2V0U2VsbGVyRnJvbUNvb2tpZSIsInRva2VuIiwiZ2V0IiwidmFsdWUiLCJ2ZXJpZnkiLCJzZXRTZWxsZXJDb29raWUiLCJzdG9yZSIsInNldCIsIm5hbWUiLCJodHRwT25seSIsInBhdGgiLCJtYXhBZ2UiLCJzYW1lU2l0ZSIsInNlY3VyZSIsImNsZWFyU2VsbGVyQ29va2llIiwiZGVsZXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./lib/models/Order.js":
/*!*****************************!*\
  !*** ./lib/models/Order.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OrderModel: () => (/* binding */ OrderModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mongodb */ \"(rsc)/./lib/mongodb.js\");\n\n\nconst OrderItemSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    producto_id: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n        ref: \"Product\",\n        required: true\n    },\n    titulo: String,\n    precio: Number,\n    cantidad: Number,\n    subtotal: Number\n});\nconst OrderSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    productos: [\n        OrderItemSchema\n    ],\n    total: Number,\n    comprador: {\n        nombre: {\n            type: String,\n            required: true\n        },\n        telefono: {\n            type: String,\n            required: true\n        },\n        email: String,\n        punto_entrega: {\n            type: String,\n            required: true\n        },\n        comentarios: String\n    },\n    vendedor_id: {\n        type: String\n    },\n    estado: {\n        type: String,\n        enum: [\n            \"pendiente\",\n            \"entregado\"\n        ],\n        default: \"pendiente\"\n    }\n}, {\n    timestamps: {\n        createdAt: \"fecha_pedido\",\n        updatedAt: false\n    }\n});\nasync function OrderModel() {\n    await (0,_mongodb__WEBPACK_IMPORTED_MODULE_1__.connectDB)();\n    return (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Order || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Order\", OrderSchema, \"pedidos\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL09yZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBNEM7QUFDTDtBQUV2QyxNQUFNRyxrQkFBa0IsSUFBSUYsNENBQU1BLENBQUM7SUFDakNHLGFBQWE7UUFBRUMsTUFBTUosNENBQU1BLENBQUNLLEtBQUssQ0FBQ0MsUUFBUTtRQUFFQyxLQUFLO1FBQVdDLFVBQVU7SUFBSztJQUMzRUMsUUFBUUM7SUFDUkMsUUFBUUM7SUFDUkMsVUFBVUQ7SUFDVkUsVUFBVUY7QUFDWjtBQUVBLE1BQU1HLGNBQWMsSUFBSWYsNENBQU1BLENBQzVCO0lBQ0VnQixXQUFXO1FBQUNkO0tBQWdCO0lBQzVCZSxPQUFPTDtJQUNQTSxXQUFXO1FBQ1RDLFFBQVE7WUFBRWYsTUFBTU07WUFBUUYsVUFBVTtRQUFLO1FBQ3ZDWSxVQUFVO1lBQUVoQixNQUFNTTtZQUFRRixVQUFVO1FBQUs7UUFDekNhLE9BQU9YO1FBQ1BZLGVBQWU7WUFBRWxCLE1BQU1NO1lBQVFGLFVBQVU7UUFBSztRQUM5Q2UsYUFBYWI7SUFDZjtJQUNBYyxhQUFhO1FBQUVwQixNQUFNTTtJQUFPO0lBQzVCZSxRQUFRO1FBQUVyQixNQUFNTTtRQUFRZ0IsTUFBTTtZQUFDO1lBQWE7U0FBWTtRQUFFQyxTQUFTO0lBQVk7QUFDakYsR0FDQTtJQUFFQyxZQUFZO1FBQUVDLFdBQVc7UUFBZ0JDLFdBQVc7SUFBTTtBQUFFO0FBR3pELGVBQWVDO0lBQ3BCLE1BQU05QixtREFBU0E7SUFDZixPQUFPRix3REFBZSxDQUFDa0MsS0FBSyxJQUFJbEMscURBQWMsQ0FBQyxTQUFTZ0IsYUFBYTtBQUN2RSIsInNvdXJjZXMiOlsid2VicGFjazovL21hcmtldHBsYWNlLWZhY3VsdGFkLy4vbGliL21vZGVscy9PcmRlci5qcz85NWQxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IGNvbm5lY3REQiB9IGZyb20gJy4uL21vbmdvZGInO1xyXG5cclxuY29uc3QgT3JkZXJJdGVtU2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgcHJvZHVjdG9faWQ6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdQcm9kdWN0JywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICB0aXR1bG86IFN0cmluZyxcclxuICBwcmVjaW86IE51bWJlcixcclxuICBjYW50aWRhZDogTnVtYmVyLFxyXG4gIHN1YnRvdGFsOiBOdW1iZXJcclxufSk7XHJcblxyXG5jb25zdCBPcmRlclNjaGVtYSA9IG5ldyBTY2hlbWEoXHJcbiAge1xyXG4gICAgcHJvZHVjdG9zOiBbT3JkZXJJdGVtU2NoZW1hXSxcclxuICAgIHRvdGFsOiBOdW1iZXIsXHJcbiAgICBjb21wcmFkb3I6IHtcclxuICAgICAgbm9tYnJlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgdGVsZWZvbm86IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICBlbWFpbDogU3RyaW5nLFxyXG4gICAgICBwdW50b19lbnRyZWdhOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgY29tZW50YXJpb3M6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIHZlbmRlZG9yX2lkOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICAgZXN0YWRvOiB7IHR5cGU6IFN0cmluZywgZW51bTogWydwZW5kaWVudGUnLCAnZW50cmVnYWRvJ10sIGRlZmF1bHQ6ICdwZW5kaWVudGUnIH1cclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogeyBjcmVhdGVkQXQ6ICdmZWNoYV9wZWRpZG8nLCB1cGRhdGVkQXQ6IGZhbHNlIH0gfVxyXG4pO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIE9yZGVyTW9kZWwoKSB7XHJcbiAgYXdhaXQgY29ubmVjdERCKCk7XHJcbiAgcmV0dXJuIG1vbmdvb3NlLm1vZGVscy5PcmRlciB8fCBtb25nb29zZS5tb2RlbCgnT3JkZXInLCBPcmRlclNjaGVtYSwgJ3BlZGlkb3MnKTtcclxufVxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJTY2hlbWEiLCJjb25uZWN0REIiLCJPcmRlckl0ZW1TY2hlbWEiLCJwcm9kdWN0b19pZCIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJ0aXR1bG8iLCJTdHJpbmciLCJwcmVjaW8iLCJOdW1iZXIiLCJjYW50aWRhZCIsInN1YnRvdGFsIiwiT3JkZXJTY2hlbWEiLCJwcm9kdWN0b3MiLCJ0b3RhbCIsImNvbXByYWRvciIsIm5vbWJyZSIsInRlbGVmb25vIiwiZW1haWwiLCJwdW50b19lbnRyZWdhIiwiY29tZW50YXJpb3MiLCJ2ZW5kZWRvcl9pZCIsImVzdGFkbyIsImVudW0iLCJkZWZhdWx0IiwidGltZXN0YW1wcyIsImNyZWF0ZWRBdCIsInVwZGF0ZWRBdCIsIk9yZGVyTW9kZWwiLCJtb2RlbHMiLCJPcmRlciIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/Order.js\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fvendedor%2Fpedidos%2Froute&page=%2Fapi%2Fvendedor%2Fpedidos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvendedor%2Fpedidos%2Froute.js&appDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdpovi%5CUnimarket%5Cmarketplace-facultad&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();