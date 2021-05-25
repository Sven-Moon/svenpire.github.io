(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+YOH":
/*!********************************************************************!*\
  !*** ./src/app/modules/order/state/item-edit/item-edit.reducer.ts ***!
  \********************************************************************/
/*! exports provided: itemEditFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "itemEditFeatureKey", function() { return itemEditFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _item_edit_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item-edit.actions */ "d5cx");


const itemEditFeatureKey = 'itemEdit';
const initialState = {
    selectedIngredientsOfType: [],
    ingredientType: '',
    selectorFlag: false,
};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_item_edit_actions__WEBPACK_IMPORTED_MODULE_1__["updateTempIngredientsOfType"], (state, action) => (Object.assign(Object.assign({}, state), { selectedIngredientsOfType: action.selectedIngredientsOfType }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_item_edit_actions__WEBPACK_IMPORTED_MODULE_1__["updateEditIngredientType"], (state, action) => (Object.assign(Object.assign({}, state), { ingredientType: action.ingredientType }))), 
// open/close selector popup
Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_item_edit_actions__WEBPACK_IMPORTED_MODULE_1__["openIngredientSelectorPopup"], (state) => (Object.assign(Object.assign({}, state), { selectorFlag: true }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_item_edit_actions__WEBPACK_IMPORTED_MODULE_1__["closeIngredientSelectorPopup"], (state) => (Object.assign(Object.assign({}, state), { selectorFlag: false }))), 
// ingredient selector (de)select ingredients
Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_item_edit_actions__WEBPACK_IMPORTED_MODULE_1__["clearSelectedIngredients"], (state) => (Object.assign(Object.assign({}, state), { selectedIngredientsOfType: [] }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_item_edit_actions__WEBPACK_IMPORTED_MODULE_1__["addSelectedIngredient"], (state, action) => (Object.assign(Object.assign({}, state), { selectedIngredientsOfType: action.ingredients }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_item_edit_actions__WEBPACK_IMPORTED_MODULE_1__["removeSelectedIngredient"], (state, action) => (Object.assign(Object.assign({}, state), { selectedIngredientsOfType: action.ingredients }))));


/***/ }),

/***/ "+xTS":
/*!************************************************************!*\
  !*** ./src/app/modules/order/state/cart/cart.selectors.ts ***!
  \************************************************************/
/*! exports provided: selectCartState, selectCartIds, selectCartItemArray, selectCartItemsWithIngredientInfo, selectCartTotal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCartState", function() { return selectCartState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCartIds", function() { return selectCartIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCartItemArray", function() { return selectCartItemArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCartItemsWithIngredientInfo", function() { return selectCartItemsWithIngredientInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCartTotal", function() { return selectCartTotal; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/stores/selectors/order-static-data.selectors */ "bDRp");
/* harmony import */ var _order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../order-items/order-items.selectors */ "Ixgz");
/* harmony import */ var _cart_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart.reducer */ "8Nv7");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "LvDl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





const selectCartState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_cart_reducer__WEBPACK_IMPORTED_MODULE_3__["cartFeatureKey"]);
const selectCartIds = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCartState, (state) => state.orderItemIds);
const selectCartItemArray = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_2__["selectOrderItemEntities"], selectCartIds, (orderEntities, ids) => {
    let orderItems = [];
    for (let id of ids) {
        orderItems.push(orderEntities[id]);
    }
    return orderItems;
});
const selectCartItemsWithIngredientInfo = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(
// creates an array of orderItems containing the full ingredient properties to the items
selectCartItemArray, src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllIngredients"], (orderItems, allIngredients) => {
    let orderItemDetailed;
    let orderItemDetailList = [];
    orderItems.forEach(orderItem => {
        if (!orderItem) {
            orderItemDetailList = [];
        }
        else {
            let ingredientList = [];
            orderItem.ingredients.forEach(ingredientId => ingredientList.push(allIngredients.find(ingredient => ingredient.id === ingredientId)));
            let newItem = {
                id: '',
                name: '',
                itemGroup: null,
                quantity: 1,
                price: 0,
                subtotal: 0,
                selectedSpecialtyId: null,
                ingredients: [],
                viewDetail: false,
                ingredientDetails: ingredientList
            };
            orderItemDetailed = Object.assign({}, newItem, orderItem);
            orderItemDetailList.push(orderItemDetailed);
        }
    });
    return orderItemDetailList;
});
const selectCartTotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_2__["selectOrderItemEntities"], selectCartIds, (orderItems, cartIds) => {
    let total = 0;
    if (cartIds.length == 0 || lodash__WEBPACK_IMPORTED_MODULE_4__["size"](orderItems) == 0) {
        total = 0;
    }
    else {
        cartIds.forEach(cartId => total += orderItems[cartId].subtotal);
    }
    return total;
});


/***/ }),

/***/ "/HDY":
/*!***********************************************!*\
  !*** ./src/app/modules/pages/pages.module.ts ***!
  \***********************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PagesModule {
}
PagesModule.ɵfac = function PagesModule_Factory(t) { return new (t || PagesModule)(); };
PagesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PagesModule });
PagesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PagesModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]] }); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\svenp\Coding Projects\My Projects\publish\salad-plus\src\main.ts */"zUnb");


/***/ }),

/***/ "0G+c":
/*!****************************************************************************!*\
  !*** ./src/app/modules/order/state/current-item/current-item.selectors.ts ***!
  \****************************************************************************/
/*! exports provided: selectCurrentItemState, selectCurrentItemGroup, selectSpecialtiesOfGroup, selectCurrentItemIngredients, selectCurrentItemIngredientIds, selectSelectedIngredientSelectType, selectCurrentItemPrice, selectCurrentItemQuantity, selectCurrentItemSubtotal, selectSelectedSpecialtyId, selectSelectedSpecialty, selectSpecialtyIngredientIds, selectSpecialtyIngredients, selectSpecialtyModified, selectCurrentItemId, selectCurrentItemName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemState", function() { return selectCurrentItemState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemGroup", function() { return selectCurrentItemGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSpecialtiesOfGroup", function() { return selectSpecialtiesOfGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemIngredients", function() { return selectCurrentItemIngredients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemIngredientIds", function() { return selectCurrentItemIngredientIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSelectedIngredientSelectType", function() { return selectSelectedIngredientSelectType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemPrice", function() { return selectCurrentItemPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemQuantity", function() { return selectCurrentItemQuantity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemSubtotal", function() { return selectCurrentItemSubtotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSelectedSpecialtyId", function() { return selectSelectedSpecialtyId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSelectedSpecialty", function() { return selectSelectedSpecialty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSpecialtyIngredientIds", function() { return selectSpecialtyIngredientIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSpecialtyIngredients", function() { return selectSpecialtyIngredients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSpecialtyModified", function() { return selectSpecialtyModified; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemId", function() { return selectCurrentItemId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentItemName", function() { return selectCurrentItemName; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _current_item_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./current-item.reducer */ "LScw");
/* harmony import */ var _stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../stores/selectors/order-static-data.selectors */ "bDRp");
/* harmony import */ var _item_edit_item_edit_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../item-edit/item-edit.selectors */ "icYP");
/* harmony import */ var _order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../order-items/order-items.selectors */ "Ixgz");





const selectCurrentItemState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_current_item_reducer__WEBPACK_IMPORTED_MODULE_1__["currentItemFeatureKey"]);
// ------- ITEM PROPERTIES -------
const selectCurrentItemGroup = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrentItemState, (state) => state.itemGroup);
// returns a list of specialties with the matching group
// ex: return all sandwiches
const selectSpecialtiesOfGroup = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectSpecialties"], selectCurrentItemGroup, (specialties, selectedGroup) => specialties.filter(specialty => specialty.itemGroup === selectedGroup));
const selectCurrentItemIngredients = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectAllIngredients"], selectCurrentItemState, (allIngredients, state) => {
    let ingredientList = [];
    if (state.ingredients) {
        for (let ingredientId of state.ingredients) {
            ingredientList.push(allIngredients.find(ingredient => ingredient.id === ingredientId));
        }
    }
    return ingredientList;
});
// ------- INGREDIENTS -------
const selectCurrentItemIngredientIds = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrentItemIngredients, (state) => state.map(ingredient => ingredient.id));
const selectSelectedIngredientSelectType = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectIngredientTypes"], _item_edit_item_edit_selectors__WEBPACK_IMPORTED_MODULE_3__["selectIngredientType"], (types, type) => types[type].selectType);
const selectCurrentItemPrice = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectIngredientTypes"], selectCurrentItemIngredients, (types, currentIngredients) => {
    let totalPrice = 0;
    currentIngredients.forEach(itemIngredient => {
        totalPrice += +types[itemIngredient.type].price;
    });
    return totalPrice;
});
const selectCurrentItemQuantity = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrentItemState, (state) => state.quantity);
const selectCurrentItemSubtotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrentItemPrice, selectCurrentItemQuantity, (price, quantity) => price * quantity);
// ------- ORIGIN INFO: SPECIALTY -------
const selectSelectedSpecialtyId = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrentItemState, (state) => {
    return !state.selectedSpecialtyId
        ? undefined
        : state.selectedSpecialtyId;
});
const selectSelectedSpecialty = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectSelectedSpecialtyId, _stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectSpecialties"], (id, specialties) => {
    return !specialties
        ? undefined
        : specialties.find(specialty => specialty.id === id);
});
const selectSpecialtyIngredientIds = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectSelectedSpecialty, (specialty) => {
    return !specialty
        ? undefined
        : specialty.ingredients;
});
const selectSpecialtyIngredients = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectSpecialtyIngredientIds, _stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectAllIngredients"], (specialtyIds, allIngredients) => allIngredients.filter(ingredient => specialtyIds.includes(ingredient.id)));
const selectSpecialtyModified = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrentItemIngredientIds, selectSpecialtyIngredientIds, (current, specialty) => {
    // check for specialty should never run (see dependency selectCurrentItemName), but just in case...
    if (specialty === undefined) {
        return true;
    }
    // check: same # of ingredients
    if (current.length != specialty.length) {
        return true; // yes, modified
    }
    else {
        // check: all item ingredients included in specialty list
        current.forEach(ingredientId => !specialty.includes(ingredientId) ? true : false);
    }
    return false; // no, not modified
});
const selectCurrentItemId = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_4__["selectOrderItemArray"], selectCurrentItemGroup, selectCurrentItemState, (orderItems, group, currentItem) => {
    // if there's already an id, just return that
    if (currentItem.id) {
        return currentItem.id;
    }
    else {
        let unique;
        let i = 1;
        let id;
        do {
            unique = true;
            id = group + "-" + i;
            orderItems.find(existingItem => existingItem.id === id ? unique = false : null);
            i++;
        } while (!unique);
        return id;
    }
});
const selectCurrentItemName = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectSpecialtyModified, selectSelectedSpecialty, selectCurrentItemGroup, selectCurrentItemState, (modified, specialty, group, currentItem) => {
    // if there's already a name, just return that
    if (currentItem.name) {
        return currentItem.name;
    }
    else {
        // TODO: check to ensure specialties are properly cleared
        let name = specialty
            ? modified
                ? 'Custom ' + specialty.name
                : specialty.name
            : 'Custom ' + group;
        return name;
    }
});


/***/ }),

/***/ "2jiJ":
/*!********************************************************!*\
  !*** ./src/app/modules/shared/state/shared.actions.ts ***!
  \********************************************************/
/*! exports provided: updateHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHeader", function() { return updateHeader; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

const updateHeader = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Component] Update Header', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());


/***/ }),

/***/ "570T":
/*!**********************************************!*\
  !*** ./src/app/mocks/payment.interceptor.ts ***!
  \**********************************************/
/*! exports provided: MockPaymentInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockPaymentInterceptor", function() { return MockPaymentInterceptor; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _modules_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/order/state/cart/cart.selectors */ "+xTS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "l7P3");





class MockPaymentInterceptor {
    constructor(store) {
        this.store = store;
    }
    intercept(req, next) {
        if (req.method === 'GET' && req.url == 'http://localhost:3000/api/pay') {
            const result = this.getPayResultsMockData();
            const response = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]({
                body: result
            });
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(response);
        }
        return next.handle(req);
    }
    getPayResultsMockData() {
        let randResult = Math.round(Math.random()) == 0 ? true : false;
        let date = new Date(Date.now()).toString();
        let rand = Math.round(Math.random() * 10000).toFixed(0);
        let transactionId = 'abc' + rand;
        let amount;
        this.store.select(_modules_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_2__["selectCartTotal"]).subscribe(total => amount = total);
        return randResult
            ? {
                transactionId: transactionId,
                status: 'approved',
                dateTime: date,
                amount: amount
            }
            : {
                transactionId: transactionId,
                status: 'declined',
                dateTime: date,
                amount: amount
            };
    }
}
MockPaymentInterceptor.ɵfac = function MockPaymentInterceptor_Factory(t) { return new (t || MockPaymentInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__["Store"])); };
MockPaymentInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: MockPaymentInterceptor, factory: MockPaymentInterceptor.ɵfac });


/***/ }),

/***/ "59xy":
/*!******************************************************!*\
  !*** ./src/app/modules/order/state/order.effects.ts ***!
  \******************************************************/
/*! exports provided: OrderEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderEffects", function() { return OrderEffects; });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ "9jGm");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _order_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order.actions */ "gP9/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






class OrderEffects {
    constructor(actions$) {
        this.actions$ = actions$;
        this.loadOrders$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["createEffect"])(() => {
            return this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["ofType"])(_order_actions__WEBPACK_IMPORTED_MODULE_3__["loadOrders"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["concatMap"])(() => 
            /** An EMPTY observable only emits completion. Replace with your own observable API request */
            rxjs__WEBPACK_IMPORTED_MODULE_2__["EMPTY"].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => _order_actions__WEBPACK_IMPORTED_MODULE_3__["loadOrdersSuccess"]({ data })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(error => Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(_order_actions__WEBPACK_IMPORTED_MODULE_3__["loadOrdersFailure"]({ error }))))));
        });
    }
}
OrderEffects.ɵfac = function OrderEffects_Factory(t) { return new (t || OrderEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["Actions"])); };
OrderEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: OrderEffects, factory: OrderEffects.ɵfac });


/***/ }),

/***/ "6w4R":
/*!***********************************************************!*\
  !*** ./src/app/modules/payment/payment-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: PaymentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentRoutingModule", function() { return PaymentRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_payment_payment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/payment/payment.component */ "87iz");
/* harmony import */ var _components_pay_pay_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pay/pay.component */ "u8Zo");
/* harmony import */ var _components_pay_tx_result_pay_tx_result_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/pay-tx-result/pay-tx-result.component */ "LOrT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






const routes = [
    {
        path: 'pay', component: _components_pay_pay_component__WEBPACK_IMPORTED_MODULE_2__["PayComponent"],
        children: [
            { path: 'payment', component: _components_payment_payment_component__WEBPACK_IMPORTED_MODULE_1__["PaymentComponent"] },
            { path: 'post-pay', component: _components_pay_tx_result_pay_tx_result_component__WEBPACK_IMPORTED_MODULE_3__["PayTxResultComponent"] },
            { path: '', redirectTo: 'payment', pathMatch: 'full' },
        ]
    }
];
class PaymentRoutingModule {
}
PaymentRoutingModule.ɵfac = function PaymentRoutingModule_Factory(t) { return new (t || PaymentRoutingModule)(); };
PaymentRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: PaymentRoutingModule });
PaymentRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](PaymentRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "87iz":
/*!*************************************************************************!*\
  !*** ./src/app/modules/payment/components/payment/payment.component.ts ***!
  \*************************************************************************/
/*! exports provided: PaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentComponent", function() { return PaymentComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../order/state/cart/cart.selectors */ "+xTS");
/* harmony import */ var _shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/state/shared.actions */ "2jiJ");
/* harmony import */ var _state_payment_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/payment.actions */ "Zclr");
/* harmony import */ var _state_payment_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../state/payment.selectors */ "l3ve");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");










function PaymentComponent_div_22_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Do you ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "really");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, " want to cancel this transaction?");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PaymentComponent_div_22_ng_container_2_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r2.confirmCancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, " Cancel Payment ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} }
function PaymentComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, PaymentComponent_div_22_ng_container_2_Template, 10, 0, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PaymentComponent_div_22_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r4.closePopup(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " Close ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.confirmFlag);
} }
class PaymentComponent {
    constructor(store, fb) {
        this.store = store;
        this.fb = fb;
        this.confirmFlag = false;
        this.popupFlag = false;
        this.paymentForm = this.fb.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required],
            number: ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].pattern("[0-9]{10}")
                ]],
            cvv: ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].pattern("[0-9]{3}")
                ]],
            exp: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]]
        });
    }
    ngOnInit() {
        setTimeout(() => {
            this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_2__["updateHeader"])({ header: 'Payment' }));
        });
        this.total$ = this.store.select(_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCartTotal"]);
        this.store.select(_state_payment_selectors__WEBPACK_IMPORTED_MODULE_4__["selectPaymentState"]).subscribe(state => {
            if (state.name) {
                this.paymentForm.controls['name'].setValue(state.name);
            }
            if (state.number) {
                this.paymentForm.controls['number'].setValue(state.number);
            }
            if (state.cvv) {
                this.paymentForm.controls['cvv'].setValue(state.cvv);
            }
            if (state.exp) {
                this.paymentForm.controls['exp'].setValue(state.exp);
            }
        });
    }
    openCancelConfirm() {
        this.popupFlag = true;
        this.confirmFlag = true;
    }
    confirmCancel() {
        this.store.dispatch(Object(_state_payment_actions__WEBPACK_IMPORTED_MODULE_3__["clearPaymentInfo"])());
    }
    closePopup() {
        this.popupFlag = false;
        this.confirmFlag = false;
    }
    submit() {
        // this.store.dispatch(updatePaymentForm({ paymentForm: this.paymentForm }))
        let amount;
        this.store.select(_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCartTotal"]).subscribe(total => amount = total);
        let ccInfo = {
            name: this.paymentForm.controls['name'].value,
            number: this.paymentForm.controls['number'].value,
            cvv: this.paymentForm.controls['cvv'].value,
            exp: this.paymentForm.controls['exp'].value,
            amount: amount
        };
        this.store.dispatch(Object(_state_payment_actions__WEBPACK_IMPORTED_MODULE_3__["updateCCInfo"])({ data: ccInfo }));
        this.store.dispatch(Object(_state_payment_actions__WEBPACK_IMPORTED_MODULE_3__["postPayment"])({ data: ccInfo }));
    }
}
PaymentComponent.ɵfac = function PaymentComponent_Factory(t) { return new (t || PaymentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_6__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
PaymentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PaymentComponent, selectors: [["app-payment"]], decls: 23, vars: 15, consts: [[1, "paywrap", 3, "formGroup"], ["type", "button", "routerLink", "/order/order-list", 1, "edit", "btn-primary"], [1, "total", "form-control"], [1, "form", "container"], [1, "row"], [1, "col-md-6"], ["formControlName", "name", "type", "text", "placeholder", "Name", 1, "form-control", "col"], ["formControlName", "number", "type", "text", "placeholder", "Credit Card #", 1, "form-control", "col"], ["formControlName", "cvv", "type", "text", "placeholder", "3-Digit Security Code", 1, "form-control", "col"], ["formControlName", "exp", "type", "date", "placeholder", "Exp Date", 1, "form-control", "col"], ["type", "submit", "routerLink", "../post-pay", 1, "submit", "btn-success", 3, "disabled", "click"], ["type", "button", 1, "cancel-btn", "btn-danger", 3, "click"], ["class", "popup-screen-cover", 4, "ngIf"], [1, "popup-screen-cover"], [1, "popup-window"], [4, "ngIf"], [1, "btn-primary", "close-btn", 3, "click"], [1, "popup-contents"], [1, "msg"], [1, "cancel"], ["type", "button", "routerLink", "/order/order-list", 1, "cancel-btn-pop", "btn-danger", 3, "click"]], template: function PaymentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Edit/View Order");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "number");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PaymentComponent_Template_button_click_15_listener() { return ctx.submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](17, "number");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](18, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PaymentComponent_Template_button_click_20_listener() { return ctx.openCancelConfirm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, " Cancel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](22, PaymentComponent_div_22_Template, 5, 1, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.paymentForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("$", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](5, 5, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 8, ctx.total$), "1.2"), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.paymentForm.valid);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Pay $", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](17, 10, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](18, 13, ctx.total$), "1.2"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.popupFlag);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLink"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["DecimalPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["AsyncPipe"]], styles: [".paywrap[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [r0-s] \". . .\" 10vh [r0-e] [r1-s] \"edit . total\" 6vh [r1-e] [r-s] \". . .\" 3vh [r-e] [r2-s] \" form form form\" 36vh [r2-s] [r3-s] \". . .\" 6vh [r3-e] [r4-s] \"submit submit submit\" 6vh [r4-e] [r5-s] \"hr hr hr\" 6vh [r5-e] [r6-s] \"cancel cancel cancel\" 6vh [r6-e]/40fr 15fr 30fr;\n  width: 96vw;\n  max-width: 768px;\n  margin: auto;\n}\n\n.edit[_ngcontent-%COMP%] {\n  grid-area: edit;\n}\n\n.total[_ngcontent-%COMP%] {\n  grid-area: total;\n  display: flex;\n  margin-bottom: 0;\n  height: 6vmin;\n  font-size: 4vmin;\n  font-weight: bold;\n  line-height: 4vmin;\n  justify-content: center;\n  align-items: center;\n  vertical-align: middle;\n  padding: 0;\n}\n\n.form[_ngcontent-%COMP%] {\n  grid-area: form;\n}\n\n.submit[_ngcontent-%COMP%] {\n  grid-area: submit;\n}\n\nhr[_ngcontent-%COMP%] {\n  grid-area: hr;\n  margin: auto 5vw;\n  width: 85vw;\n}\n\ninput[_ngcontent-%COMP%] {\n  margin: 0;\n  margin-bottom: 1vmin;\n}\n\n.cancel-btn[_ngcontent-%COMP%] {\n  grid-area: cancel;\n}\n\nform[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\n  margin-top: 3vh;\n  height: 6vh;\n  font-size: 3vmin;\n}\n\n.popup-screen-cover[_ngcontent-%COMP%] {\n  grid-area: 1/1/6/4;\n  display: flex;\n  position: relative;\n  width: 100vw;\n  height: 90vh;\n  border: 2px solid #272727;\n  background-color: rgba(248, 248, 248, 0.919);\n  padding: 3vh 3vw;\n  margin: 0 -2vw;\n}\n\n.popup-window[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [s-s] \". . .\" 2fr [s-e] [msg-s] \". contents .\" 60fr [msg-e] [spc1-s] \". . .\" 2fr [spc1-e] [yes-s] \". btn1 .\" 6fr [yes-e] [spc2-s] \". . .\" 6fr [spc2-e] [close-s] \". btn2 .\" 6fr [close-e] [e-s] \". . .\" 6fr [e-e]/2fr 96fr 2fr;\n  place-self: center stretch;\n  width: 96vw;\n  height: 90vh;\n}\n\n.popup-contents[_ngcontent-%COMP%] {\n  grid-area: contents;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 3vh 3vw;\n  background-color: #f8f8f8;\n  overflow: scroll;\n  flex-direction: column;\n}\n\n.msg[_ngcontent-%COMP%] {\n  grid-area: msg;\n  display: flex;\n  flex-flow: column;\n  justify-items: center;\n  align-items: center;\n  background-color: whitesmoke;\n  padding: 0.5rem;\n  border-radius: 1rem;\n}\n\n.cancel[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2rem;\n}\n\n.cancel-btn-pop[_ngcontent-%COMP%] {\n  grid-area: btn1;\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  grid-area: btn2;\n}\n\n@media screen and (min-width: 768px) {\n  .paywrap[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template: [r0-s] \". . .\" 10vh [r0-e] [r1-s] \"edit . total\" 6vh [r1-e] [r-s] \". . .\" 3vh [r-e] [r2-s] \" form form form\" 36vh [r2-s] [hr-s] \"hr hr hr\" 3vh [hr-e] [r3-s] \". . .\" 6vh [r3-e] [r4-s] \"submit . cancel\" 6vh [r4-e]/30fr 15fr 30fr;\n    margin: 0 2vw;\n    width: 96vw;\n    max-width: 768px;\n    margin: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHBheW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsK1JBQ0U7RUFTRixXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBUkY7O0FBV0E7RUFDRSxlQUFBO0FBUkY7O0FBV0E7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0FBUkY7O0FBV0E7RUFDRSxlQUFBO0FBUkY7O0FBV0E7RUFDRSxpQkFBQTtBQVJGOztBQVdBO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQVJGOztBQVdBO0VBQ0UsU0FBQTtFQUNBLG9CQUFBO0FBUkY7O0FBV0E7RUFDRSxpQkFBQTtBQVJGOztBQVdBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQVJGOztBQWNBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsNENBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFYRjs7QUFjQTtFQUNFLGFBQUE7RUFDQSw2T0FDRTtFQVFGLDBCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFuQkY7O0FBdUJBO0VBQ0UsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0FBcEJGOztBQXVCQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFFQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFyQkY7O0FBd0JBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBckJGOztBQXdCQTtFQUNFLGVBQUE7QUFyQkY7O0FBd0JBO0VBQ0UsZUFBQTtBQXJCRjs7QUF5QkE7RUFDRTtJQUNFLGFBQUE7SUFDQSxpUEFDRTtJQVFGLGFBQUE7SUFDQSxXQUFBO0lBQ0EsZ0JBQUE7SUFDQSxZQUFBO0VBOUJGO0FBQ0YiLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYXl3cmFwIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6XHJcbiAgICBbcjAtc10gXCIuIC4gLlwiIDEwdmggW3IwLWVdXHJcbiAgICBbcjEtc10gXCJlZGl0IC4gdG90YWxcIiA2dmggW3IxLWVdXHJcbiAgICBbci1zXSBcIi4gLiAuXCIgM3ZoIFtyLWVdXHJcbiAgICBbcjItc10gXCIgZm9ybSBmb3JtIGZvcm1cIiAzNnZoIFtyMi1zXVxyXG4gICAgW3IzLXNdIFwiLiAuIC5cIiA2dmggW3IzLWVdXHJcbiAgICBbcjQtc10gXCJzdWJtaXQgc3VibWl0IHN1Ym1pdFwiIDZ2aCBbcjQtZV1cclxuICAgIFtyNS1zXSBcImhyIGhyIGhyXCIgNnZoIFtyNS1lXVxyXG4gICAgW3I2LXNdIFwiY2FuY2VsIGNhbmNlbCBjYW5jZWxcIiA2dmggW3I2LWVdXHJcbiAgICAvIDQwZnIgMTVmciAzMGZyO1xyXG4gIHdpZHRoOiA5NnZ3O1xyXG4gIG1heC13aWR0aDogNzY4cHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG4uZWRpdCB7XHJcbiAgZ3JpZC1hcmVhOiBlZGl0OyAvLyBwYXl3cmFwXHJcbn1cclxuXHJcbi50b3RhbCB7XHJcbiAgZ3JpZC1hcmVhOiB0b3RhbDsgLy8gcGF5d3JhcFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxuICBoZWlnaHQ6IDZ2bWluO1xyXG4gIGZvbnQtc2l6ZTogNHZtaW47XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbGluZS1oZWlnaHQ6IDR2bWluO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4uZm9ybSB7XHJcbiAgZ3JpZC1hcmVhOiBmb3JtOyAvLyBwYXl3cmFwXHJcbn1cclxuXHJcbi5zdWJtaXQge1xyXG4gIGdyaWQtYXJlYTogc3VibWl0OyAvLyBwYXl3cmFwXHJcbn1cclxuXHJcbmhyIHtcclxuICBncmlkLWFyZWE6IGhyO1xyXG4gIG1hcmdpbjogYXV0byA1dnc7XHJcbiAgd2lkdGg6IDg1dnc7XHJcbn1cclxuXHJcbmlucHV0IHtcclxuICBtYXJnaW46IDA7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXZtaW47XHJcbn1cclxuXHJcbi5jYW5jZWwtYnRuIHtcclxuICBncmlkLWFyZWE6IGNhbmNlbDsgLy8gcGF5d3JhcFxyXG59XHJcblxyXG5mb3JtID4gaW5wdXQge1xyXG4gIG1hcmdpbi10b3A6IDN2aDtcclxuICBoZWlnaHQ6IDZ2aDtcclxuICBmb250LXNpemU6IDN2bWluO1xyXG59XHJcblxyXG4vLyBQT1BVUFNcclxuXHJcbi8vIFNDUkVFTiBDT1ZFUiAocHJldmVudHMgdW53YW50ZWQgYnV0dG9uIHByZXNzZXMpXHJcbi5wb3B1cC1zY3JlZW4tY292ZXIge1xyXG4gIGdyaWQtYXJlYTogMSAvIDEgLyA2IC8gNDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMTAwdnc7XHJcbiAgaGVpZ2h0OiA5MHZoO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYigzOSwgMzksIDM5KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0OCwgMjQ4LCAyNDgsIDAuOTE5KTtcclxuICBwYWRkaW5nOiAzdmggM3Z3O1xyXG4gIG1hcmdpbjogMCAtMnZ3O1xyXG59XHJcblxyXG4ucG9wdXAtd2luZG93IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6XHJcbiAgICBbcy1zXSBcIi4gLiAuXCIgMmZyIFtzLWVdXHJcbiAgICBbbXNnLXNdIFwiLiBjb250ZW50cyAuXCIgNjBmciBbbXNnLWVdXHJcbiAgICBbc3BjMS1zXSBcIi4gLiAuXCIgMmZyIFtzcGMxLWVdXHJcbiAgICBbeWVzLXNdIFwiLiBidG4xIC5cIiA2ZnIgW3llcy1lXVxyXG4gICAgW3NwYzItc10gXCIuIC4gLlwiIDZmciBbc3BjMi1lXVxyXG4gICAgW2Nsb3NlLXNdIFwiLiBidG4yIC5cIiA2ZnIgW2Nsb3NlLWVdXHJcbiAgICBbZS1zXSBcIi4gLiAuXCIgNmZyIFtlLWVdXHJcbiAgICAvIDJmciA5NmZyIDJmcjtcclxuICBwbGFjZS1zZWxmOiBjZW50ZXIgc3RyZXRjaDtcclxuICB3aWR0aDogOTZ2dztcclxuICBoZWlnaHQ6IDkwdmg7XHJcbn1cclxuXHJcbi8vIENPTkZJUk0gQ0FOQ0VMXHJcbi5wb3B1cC1jb250ZW50cyB7XHJcbiAgZ3JpZC1hcmVhOiBjb250ZW50cztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogM3ZoIDN2dztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAyNDgsIDI0OCk7XHJcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ubXNnIHtcclxuICBncmlkLWFyZWE6IG1zZztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogY29sdW1uO1xyXG4gIC8vIHBsYWNlLXNlbGY6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gIHBhZGRpbmc6IDAuNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xyXG59XHJcblxyXG4uY2FuY2VsIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAycmVtO1xyXG59XHJcblxyXG4uY2FuY2VsLWJ0bi1wb3Age1xyXG4gIGdyaWQtYXJlYTogYnRuMTsgLy8gcG9wdXAtd2luZG93XHJcbn1cclxuXHJcbi5jbG9zZS1idG4ge1xyXG4gIGdyaWQtYXJlYTogYnRuMjsgLy8gcG9wdXAtd2luZG93XHJcbiAgLy8gbWFyZ2luOiAxdmggYXV0bztcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAucGF5d3JhcCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZTpcclxuICAgICAgW3IwLXNdIFwiLiAuIC5cIiAxMHZoIFtyMC1lXVxyXG4gICAgICBbcjEtc10gXCJlZGl0IC4gdG90YWxcIiA2dmggW3IxLWVdXHJcbiAgICAgIFtyLXNdIFwiLiAuIC5cIiAzdmggW3ItZV1cclxuICAgICAgW3IyLXNdIFwiIGZvcm0gZm9ybSBmb3JtXCIgMzZ2aCBbcjItc11cclxuICAgICAgW2hyLXNdIFwiaHIgaHIgaHJcIiAzdmggW2hyLWVdXHJcbiAgICAgIFtyMy1zXSBcIi4gLiAuXCIgNnZoIFtyMy1lXVxyXG4gICAgICBbcjQtc10gXCJzdWJtaXQgLiBjYW5jZWxcIiA2dmggW3I0LWVdXHJcbiAgICAgIC8gMzBmciAxNWZyIDMwZnI7XHJcbiAgICBtYXJnaW46IDAgMnZ3O1xyXG4gICAgd2lkdGg6IDk2dnc7XHJcbiAgICBtYXgtd2lkdGg6IDc2OHB4O1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "8A5i":
/*!****************************************!*\
  !*** ./src/app/barrels/app-modules.ts ***!
  \****************************************/
/*! exports provided: AppModules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModules", function() { return AppModules; });
/* harmony import */ var _modules_order_order_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/order/order.module */ "yzJG");
/* harmony import */ var _modules_pages_pages_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/pages/pages.module */ "/HDY");
/* harmony import */ var _modules_payment_payment_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/payment/payment.module */ "oVPa");
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/shared/shared.module */ "FpXt");




const AppModules = [
    _modules_order_order_module__WEBPACK_IMPORTED_MODULE_0__["OrderModule"],
    _modules_payment_payment_module__WEBPACK_IMPORTED_MODULE_2__["PaymentModule"],
    _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
    _modules_pages_pages_module__WEBPACK_IMPORTED_MODULE_1__["PagesModule"]
];


/***/ }),

/***/ "8Nv7":
/*!**********************************************************!*\
  !*** ./src/app/modules/order/state/cart/cart.reducer.ts ***!
  \**********************************************************/
/*! exports provided: cartFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartFeatureKey", function() { return cartFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _cart_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart.actions */ "Cfa1");


const cartFeatureKey = 'cart';
const initialState = {
    orderItemIds: [],
    total: 0,
};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_cart_actions__WEBPACK_IMPORTED_MODULE_1__["addCartItem"], (state, action) => {
    let ids = state.orderItemIds.slice(0);
    ids.push(action.id);
    return Object.assign(Object.assign({}, state), { orderItemIds: ids });
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_cart_actions__WEBPACK_IMPORTED_MODULE_1__["removeCartItem"], (state, action) => (Object.assign(Object.assign({}, state), { orderItemIds: action.orderItemIds }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_cart_actions__WEBPACK_IMPORTED_MODULE_1__["updateTotal"], (state, action) => (Object.assign(Object.assign({}, state), { total: action.total }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_cart_actions__WEBPACK_IMPORTED_MODULE_1__["clearCart"], () => (initialState)));


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    useMocking: true
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Bszr":
/*!**************************************************************************!*\
  !*** ./src/app/modules/order/state/current-item/current-item.actions.ts ***!
  \**************************************************************************/
/*! exports provided: setItemGroup, updateSpecialtyId, loadItemToBuilder, clearCurrentItem, updateIngredients, updateCurrentItemId, updateCurrentItemName, updateCurrentItemPriceAndSubtotal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setItemGroup", function() { return setItemGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSpecialtyId", function() { return updateSpecialtyId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadItemToBuilder", function() { return loadItemToBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCurrentItem", function() { return clearCurrentItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateIngredients", function() { return updateIngredients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCurrentItemId", function() { return updateCurrentItemId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCurrentItemName", function() { return updateCurrentItemName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCurrentItemPriceAndSubtotal", function() { return updateCurrentItemPriceAndSubtotal; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

const setItemGroup = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Specialty] Set Item Group', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateSpecialtyId = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Specialty] Update Selected Specialty ID', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const loadItemToBuilder = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[OrderForm] Load Cart Item to Current Item', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const clearCurrentItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Confirm Popup] Clear Current Item');
const updateIngredients = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Form] Update ingredients on the current item', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateCurrentItemId = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder onInit] Update Current Item ID', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateCurrentItemName = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder onInit] Update Current Item Name', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateCurrentItemPriceAndSubtotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder onInit] Update Current Item Price', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());


/***/ }),

/***/ "CJEk":
/*!*********************************!*\
  !*** ./src/app/stores/index.ts ***!
  \*********************************/
/*! exports provided: orderFeatureKey, reducers, metaReducers, debug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderFeatureKey", function() { return orderFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metaReducers", function() { return metaReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony import */ var src_app_modules_order_state_cart_cart_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/order/state/cart/cart.reducer */ "8Nv7");
/* harmony import */ var _modules_order_state_order_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/order/state/order.reducer */ "mPhv");
/* harmony import */ var _reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers/order-static-data.reducer */ "sMsK");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _modules_order_state_order_items_order_items_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/order/state/order-items/order-items.reducer */ "JdOj");
/* harmony import */ var _modules_payment_state_payment_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/payment/state/payment.reducer */ "j7ow");






const orderFeatureKey = 'order';
const reducers = {
    [src_app_modules_order_state_cart_cart_reducer__WEBPACK_IMPORTED_MODULE_0__["cartFeatureKey"]]: src_app_modules_order_state_cart_cart_reducer__WEBPACK_IMPORTED_MODULE_0__["reducer"],
    [_modules_order_state_order_items_order_items_reducer__WEBPACK_IMPORTED_MODULE_4__["orderItemsFeatureKey"]]: _modules_order_state_order_items_order_items_reducer__WEBPACK_IMPORTED_MODULE_4__["reducer"],
    [_modules_order_state_order_reducer__WEBPACK_IMPORTED_MODULE_1__["orderFeatureKey"]]: _modules_order_state_order_reducer__WEBPACK_IMPORTED_MODULE_1__["reducer"],
    [_reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_2__["orderStaticDataFeatureKey"]]: _reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_2__["reducer"],
    [_modules_payment_state_payment_reducer__WEBPACK_IMPORTED_MODULE_5__["paymentFeatureKey"]]: _modules_payment_state_payment_reducer__WEBPACK_IMPORTED_MODULE_5__["reducer"]
};
const metaReducers = !src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production
    ? [debug]
    : [];
function debug(reducer) {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}


/***/ }),

/***/ "Cfa1":
/*!**********************************************************!*\
  !*** ./src/app/modules/order/state/cart/cart.actions.ts ***!
  \**********************************************************/
/*! exports provided: addCartItem, removeCartItem, updateTotal, loadCartsSuccess, loadCartsFailure, clearCart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCartItem", function() { return addCartItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCartItem", function() { return removeCartItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTotal", function() { return updateTotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCartsSuccess", function() { return loadCartsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCartsFailure", function() { return loadCartsFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCart", function() { return clearCart; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

const addCartItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder] Add Cart Item', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const removeCartItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder] Remove Cart Item', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateTotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Order List] Update Total', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const loadCartsSuccess = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cart] Load Carts Success', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const loadCartsFailure = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cart] Load Carts Failure', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const clearCart = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cart] Clear Cart');


/***/ }),

/***/ "DWvF":
/*!***************************************************************************!*\
  !*** ./src/app/modules/order/components/ssselctor/ssselctor.component.ts ***!
  \***************************************************************************/
/*! exports provided: SsselctorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SsselctorComponent", function() { return SsselctorComponent; });
/* harmony import */ var src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/order/state/current-item/current-item.actions */ "Bszr");
/* harmony import */ var _shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/state/shared.actions */ "2jiJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "l7P3");





class SsselctorComponent {
    constructor(router, store) {
        this.router = router;
        this.store = store;
    }
    ngOnInit() {
        this.clearCurrentSpecialty();
        setTimeout(() => {
            this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_1__["updateHeader"])({ header: 'Specialty or BYO?' }));
        });
    }
    //#region Methods
    setItemGroup(currentItemGroup) {
        this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_0__["setItemGroup"])({ currentItemGroup }));
    }
    clearCurrentSpecialty() {
        this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_0__["clearCurrentItem"])());
    }
}
SsselctorComponent.ɵfac = function SsselctorComponent_Factory(t) { return new (t || SsselctorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__["Store"])); };
SsselctorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SsselctorComponent, selectors: [["app-ssselctor"]], decls: 24, vars: 0, consts: [[1, "ssselector-wrap"], [1, "salad"], [1, "fill"], ["src", "./assets/images/specialty_salad.png"], ["routerLink", "/order/specialty", 1, "salad-specialty", "btn-primary", 3, "click"], ["routerLink", "../builder", 1, "salad-byo", "btn-primary", 3, "click"], [1, "sandwich"], ["src", "./assets/images/specialty_sandwich.png"], ["routerLink", "/order/specialty", 1, "sandwich-specialty", "btn-primary", 3, "click"], ["routerLink", "../builder", 1, "sandwich-byo", "btn-primary", 3, "click"], [1, "other"], [1, "fill-other"], ["src", "./assets/images/specialty_other.png"], ["routerLink", "/order/other", 1, "sides", "btn-primary", 3, "click"], ["routerLink", "/order/other", 1, "desserts", "btn-primary", 3, "click"], ["routerLink", "/order/other", 1, "drinks", "btn-primary", 3, "click"]], template: function SsselctorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SsselctorComponent_Template_button_click_4_listener() { return ctx.setItemGroup("salad"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Specialty Salad! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SsselctorComponent_Template_button_click_6_listener() { return ctx.setItemGroup("salad"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " BMO Salad! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SsselctorComponent_Template_button_click_11_listener() { return ctx.setItemGroup("sandwich"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, " Specialty Sandwich! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SsselctorComponent_Template_button_click_13_listener() { return ctx.setItemGroup("sandwich"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, " BMO Sandwich! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SsselctorComponent_Template_button_click_18_listener() { return ctx.setItemGroup("side"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, " Sides! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SsselctorComponent_Template_button_click_20_listener() { return ctx.setItemGroup("dessert"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, " Desserts! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SsselctorComponent_Template_button_click_22_listener() { return ctx.setItemGroup("drink"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, " Drinks! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"]], styles: ["@charset \"UTF-8\";\n@import\u00A0 \"~bootstrap/scss/bootstrap.scss\";\n.btn-success[_ngcontent-%COMP%] {\n  border-color: #647609;\n  color: #101302;\n  background-color: #f3fac6;\n}\n.btn-success[_ngcontent-%COMP%]:disabled {\n  border-color: #101302;\n  color: #647609;\n  background-color: #dcf17e;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #fbcfc5;\n  color: #130501;\n  border-color: #6f1a07;\n}\n.btn-warning[_ngcontent-%COMP%] {\n  border-color: #504416;\n  color: #303030;\n  background-color: #f3edce;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  border-color: #2b2118;\n  color: #0d0a07;\n  background-color: #eae0d7;\n}\n.btn.focus[_ngcontent-%COMP%] {\n  box-shadow: #0d0a0736;\n}\nbutton[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 4vmin;\n  padding: 0 5%;\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid;\n  padding: 0 0.5 vmin;\n  line-height: 1;\n  border-radius: 0.25rem;\n  transition: color 0.15;\n}\n.ssselector-wrap[_ngcontent-%COMP%] {\n  display: grid;\n  max-width: 1200px;\n  place-content: center;\n  gap: 2%;\n  grid-template: [salad-start] \"salad\" 26fr [salad-end] [sandwich-start] \"sandwich\" 26fr [sandwich-end] [other-start] \"other\" 26fr [other-end]/100%;\n  height: 100%;\n  margin-inline: auto;\n  width: 96%;\n}\n.salad[_ngcontent-%COMP%] {\n  display: grid;\n  grid-area: salad;\n  grid-template: [r1-s] \". . . . .\" 18vh [r1-e] [r1-st] \". btn1 . btn2 .\" 6vh [r1-e] [r1-s] \". . . . .\" 2vh [r1-e]/2% 46% 4% 46% 2%;\n}\n.sandwich[_ngcontent-%COMP%] {\n  display: grid;\n  grid-area: sandwich;\n  grid-template: [img-start] \". . . . .\" 18vh [img-end] [img-start] \". btn1 . btn2 .\" 6vh [img-end] [spc-start] \". . . . .\" 2vh [spc-end]/2% 46% 4% 46% 2%;\n}\n.other[_ngcontent-%COMP%] {\n  display: grid;\n  grid-area: other;\n  grid-template: [img-start] \". . .\" 2vh [img-end] [img-start] \". btn1 .\" 6vh [img-end] [spc-start] \". . .\" 2vh [spc-end] [img-start] \". btn2 .\" 6vh [img-end] [spc-start] \". . .\" 2vh [spc-end] [img-start] \". btn3 .\" 6vh [img-end] [spc-start] \". . .\" 2vh [spc-end]/52% 46% 2%;\n}\n.fill[_ngcontent-%COMP%] {\n  grid-area: 1/1/4/6;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  border: 1px solid darkgreen;\n}\n.fill-other[_ngcontent-%COMP%] {\n  grid-area: 1/1/8/4;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  border: 1px solid darkgreen;\n}\nimg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-width: 100%;\n  min-height: 100%;\n  z-index: 1;\n}\n.salad-specialty[_ngcontent-%COMP%] {\n  grid-area: btn1;\n}\n.salad-byo[_ngcontent-%COMP%] {\n  grid-area: btn2;\n}\n.sandwich-specialty[_ngcontent-%COMP%] {\n  grid-area: btn1;\n}\n.sandwich-byo[_ngcontent-%COMP%] {\n  grid-area: btn2;\n}\n.sides[_ngcontent-%COMP%] {\n  grid-area: btn1;\n}\n.desserts[_ngcontent-%COMP%] {\n  grid-area: btn2;\n}\n.drinks[_ngcontent-%COMP%] {\n  grid-area: btn3;\n}\nbutton[_ngcontent-%COMP%] {\n  z-index: 2;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHNzc2VsY3Rvci5jb21wb25lbnQuc2NzcyIsIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcc3R5bGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDQWhCLHlDQUFBO0FBUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSx5QkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtBRExGO0FDUUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUVBLHNCQUFBO0VBQ0Esc0JBQUE7QURORjtBQWhEQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0VBQ0EsT0FBQTtFQUNBLGlKQUNFO0VBSUYsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtBQStDRjtBQTVDQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGlJQUNFO0FBOENKO0FBeENBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esd0pBQ0U7QUEwQ0o7QUFwQ0E7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnUkFDRTtBQXNDSjtBQTVCQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLDJCQUFBO0FBK0JGO0FBNUJBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMkJBQUE7QUErQkY7QUE1QkE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQStCRjtBQTVCQTtFQUNFLGVBQUE7QUErQkY7QUE1QkE7RUFDRSxlQUFBO0FBK0JGO0FBNUJBO0VBQ0UsZUFBQTtBQStCRjtBQTVCQTtFQUNFLGVBQUE7QUErQkY7QUE1QkE7RUFDRSxlQUFBO0FBK0JGO0FBNUJBO0VBQ0UsZUFBQTtBQStCRjtBQTVCQTtFQUNFLGVBQUE7QUErQkY7QUE1QkE7RUFDRSxVQUFBO0FBK0JGIiwiZmlsZSI6InNzc2VsY3Rvci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbkBpbXBvcnTCoCBcIn5ib290c3RyYXAvc2Nzcy9ib290c3RyYXAuc2Nzc1wiO1xuLmJ0bi1zdWNjZXNzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNjQ3NjA5O1xuICBjb2xvcjogIzEwMTMwMjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZmFjNjtcbn1cblxuLmJ0bi1zdWNjZXNzOmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjMTAxMzAyO1xuICBjb2xvcjogIzY0NzYwOTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RjZjE3ZTtcbn1cblxuLmJ0bi1kYW5nZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJjZmM1O1xuICBjb2xvcjogIzEzMDUwMTtcbiAgYm9yZGVyLWNvbG9yOiAjNmYxYTA3O1xufVxuXG4uYnRuLXdhcm5pbmcge1xuICBib3JkZXItY29sb3I6ICM1MDQ0MTY7XG4gIGNvbG9yOiAjMzAzMDMwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZGNlO1xufVxuXG4uYnRuLXByaW1hcnkge1xuICBib3JkZXItY29sb3I6ICMyYjIxMTg7XG4gIGNvbG9yOiAjMGQwYTA3O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWFlMGQ3O1xufVxuXG4uYnRuLmZvY3VzIHtcbiAgYm94LXNoYWRvdzogIzBkMGEwNzM2O1xufVxuXG5idXR0b24ge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiA0dm1pbjtcbiAgcGFkZGluZzogMCA1JTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZDtcbiAgcGFkZGluZzogMCAwLjUgdm1pbjtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMTU7XG59XG5cbi5zc3NlbGVjdG9yLXdyYXAge1xuICBkaXNwbGF5OiBncmlkO1xuICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xuICBnYXA6IDIlO1xuICBncmlkLXRlbXBsYXRlOiBbc2FsYWQtc3RhcnRdIFwic2FsYWRcIiAyNmZyIFtzYWxhZC1lbmRdIFtzYW5kd2ljaC1zdGFydF0gXCJzYW5kd2ljaFwiIDI2ZnIgW3NhbmR3aWNoLWVuZF0gW290aGVyLXN0YXJ0XSBcIm90aGVyXCIgMjZmciBbb3RoZXItZW5kXS8xMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XG4gIHdpZHRoOiA5NiU7XG59XG5cbi5zYWxhZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtYXJlYTogc2FsYWQ7XG4gIGdyaWQtdGVtcGxhdGU6IFtyMS1zXSBcIi4gLiAuIC4gLlwiIDE4dmggW3IxLWVdIFtyMS1zdF0gXCIuIGJ0bjEgLiBidG4yIC5cIiA2dmggW3IxLWVdIFtyMS1zXSBcIi4gLiAuIC4gLlwiIDJ2aCBbcjEtZV0vMiUgNDYlIDQlIDQ2JSAyJTtcbn1cblxuLnNhbmR3aWNoIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC1hcmVhOiBzYW5kd2ljaDtcbiAgZ3JpZC10ZW1wbGF0ZTogW2ltZy1zdGFydF0gXCIuIC4gLiAuIC5cIiAxOHZoIFtpbWctZW5kXSBbaW1nLXN0YXJ0XSBcIi4gYnRuMSAuIGJ0bjIgLlwiIDZ2aCBbaW1nLWVuZF0gW3NwYy1zdGFydF0gXCIuIC4gLiAuIC5cIiAydmggW3NwYy1lbmRdLzIlIDQ2JSA0JSA0NiUgMiU7XG59XG5cbi5vdGhlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtYXJlYTogb3RoZXI7XG4gIGdyaWQtdGVtcGxhdGU6IFtpbWctc3RhcnRdIFwiLiAuIC5cIiAydmggW2ltZy1lbmRdIFtpbWctc3RhcnRdIFwiLiBidG4xIC5cIiA2dmggW2ltZy1lbmRdIFtzcGMtc3RhcnRdIFwiLiAuIC5cIiAydmggW3NwYy1lbmRdIFtpbWctc3RhcnRdIFwiLiBidG4yIC5cIiA2dmggW2ltZy1lbmRdIFtzcGMtc3RhcnRdIFwiLiAuIC5cIiAydmggW3NwYy1lbmRdIFtpbWctc3RhcnRdIFwiLiBidG4zIC5cIiA2dmggW2ltZy1lbmRdIFtzcGMtc3RhcnRdIFwiLiAuIC5cIiAydmggW3NwYy1lbmRdLzUyJSA0NiUgMiU7XG59XG5cbi5maWxsIHtcbiAgZ3JpZC1hcmVhOiAxLzEvNC82O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyOiAxcHggc29saWQgZGFya2dyZWVuO1xufVxuXG4uZmlsbC1vdGhlciB7XG4gIGdyaWQtYXJlYTogMS8xLzgvNDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJvcmRlcjogMXB4IHNvbGlkIGRhcmtncmVlbjtcbn1cblxuaW1nIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIG1pbi13aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgei1pbmRleDogMTtcbn1cblxuLnNhbGFkLXNwZWNpYWx0eSB7XG4gIGdyaWQtYXJlYTogYnRuMTtcbn1cblxuLnNhbGFkLWJ5byB7XG4gIGdyaWQtYXJlYTogYnRuMjtcbn1cblxuLnNhbmR3aWNoLXNwZWNpYWx0eSB7XG4gIGdyaWQtYXJlYTogYnRuMTtcbn1cblxuLnNhbmR3aWNoLWJ5byB7XG4gIGdyaWQtYXJlYTogYnRuMjtcbn1cblxuLnNpZGVzIHtcbiAgZ3JpZC1hcmVhOiBidG4xO1xufVxuXG4uZGVzc2VydHMge1xuICBncmlkLWFyZWE6IGJ0bjI7XG59XG5cbi5kcmlua3Mge1xuICBncmlkLWFyZWE6IGJ0bjM7XG59XG5cbmJ1dHRvbiB7XG4gIHotaW5kZXg6IDI7XG59IiwiQGltcG9ydMKgICd+Ym9vdHN0cmFwL3Njc3MvYm9vdHN0cmFwLnNjc3MnO1xyXG4kYm9yZGVyLW1lZDogIzY0NzYwOTtcclxuJGJvcmRlci1kYXJrOiAjMTAxMzAyO1xyXG4kYm9yZGVyLWxpZ2h0OiAjZjNmYWM2O1xyXG4kYmctZGFyazogIzY0NzYwOTtcclxuJGJnLWxpZ2h0OiAjZjNmYWM2O1xyXG4kYmctdmVyeS1saWdodDogI2ZiZmRlYztcclxuXHJcbi5idG4tc3VjY2VzcyB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjNjQ3NjA5O1xyXG4gIGNvbG9yOiAjMTAxMzAyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2ZhYzY7XHJcbn1cclxuXHJcbi5idG4tc3VjY2VzczpkaXNhYmxlZCB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMTAxMzAyO1xyXG4gIGNvbG9yOiAjNjQ3NjA5O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkY2YxN2U7XHJcbn1cclxuXHJcbi5idG4tZGFuZ2VyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJjZmM1O1xyXG4gIGNvbG9yOiAjMTMwNTAxO1xyXG4gIGJvcmRlci1jb2xvcjogIzZmMWEwNztcclxufVxyXG5cclxuLmJ0bi13YXJuaW5nIHtcclxuICBib3JkZXItY29sb3I6ICM1MDQ0MTY7XHJcbiAgY29sb3I6IHJnYig0OCwgNDgsIDQ4KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZGNlO1xyXG59XHJcblxyXG4uYnRuLXByaW1hcnkge1xyXG4gIGJvcmRlci1jb2xvcjogIzJiMjExODtcclxuICBjb2xvcjogIzBkMGEwNztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWFlMGQ3O1xyXG59XHJcblxyXG4uYnRuLmZvY3VzIHtcclxuICBib3gtc2hhZG93OiAjMGQwYTA3MzY7XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiA0dm1pbjtcclxuICBwYWRkaW5nOiAwIDUlO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gIHBhZGRpbmc6IDAgMC41IHZtaW47XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4xNTtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "FpXt":
/*!*************************************************!*\
  !*** ./src/app/modules/shared/shared.module.ts ***!
  \*************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _state_shared_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/shared.reducer */ "WxzM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["StoreModule"].forFeature(_state_shared_reducer__WEBPACK_IMPORTED_MODULE_2__["sharedFeatureKey"], _state_shared_reducer__WEBPACK_IMPORTED_MODULE_2__["reducer"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SharedModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["StoreFeatureModule"]] }); })();


/***/ }),

/***/ "GxtG":
/*!*************************************************!*\
  !*** ./src/app/mocks/staticData.interceptor.ts ***!
  \*************************************************/
/*! exports provided: MockOrderStaticDataInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockOrderStaticDataInterceptor", function() { return MockOrderStaticDataInterceptor; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "l7P3");




class MockOrderStaticDataInterceptor {
    constructor(store) {
        this.store = store;
    }
    intercept(req, next) {
        if (req.method === 'GET' && req.url == 'http://localhost:3000/api/order-static-data/') {
            const staticData = this.getOrderStaticDataData();
            const response = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]({
                body: staticData
            });
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(response);
        }
        return next.handle(req);
    }
    getOrderStaticDataData() {
        return {
            "specialties": [
                {
                    "id": "ham_sourdough",
                    "name": "Ham on Sourdough",
                    "ingredients": ["ham", "sourdough", "cheddar"],
                    "itemGroup": "sandwich",
                    "img": "./assets/images/specialties/ham_sourdough.png",
                    "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
                },
                {
                    "id": "turkey_sandwich",
                    "name": "Turkey on White",
                    "ingredients": [
                        "turkey",
                        "kaiser_roll",
                        "provolone",
                        "mustard",
                        "lettuce"
                    ],
                    "itemGroup": "sandwich",
                    "img": "./assets/images/specialties/turkey_sandwich.png",
                    "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
                },
                {
                    "id": "cobb",
                    "name": "Cobb Salad",
                    "ingredients": [
                        "ham",
                        "turkey",
                        "mixed_greens",
                        "tomatoes",
                        "cheddar",
                        "cucumbers",
                        "ranch"
                    ],
                    "itemGroup": "salad",
                    "img": "./assets/images/specialties/cobb.png",
                    "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
                },
                {
                    "id": "svens_salad",
                    "name": "Sven's Salad",
                    "ingredients": [
                        "red_lettuce",
                        "vinaigrette",
                        "almonds",
                        "cranberries",
                        "ham"
                    ],
                    "itemGroup": "salad",
                    "img": "./assets/images/specialties/svens_salad.png",
                    "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
                }
            ],
            "ingredients": [
                {
                    "id": "ham",
                    "name": "Ham",
                    "image": ".assets/images/ingredients/ham.png",
                    "itemGroup": "sal/sand",
                    "type": "Meat"
                },
                {
                    "id": "turkey",
                    "name": "Turkey",
                    "image": ".assets/images/ingredients/turkey.png",
                    "itemGroup": "sal/sand",
                    "type": "Meat"
                },
                {
                    "id": "roast_beef",
                    "name": "Roast Beef",
                    "image": ".assets/images/ingredients/roast_beef.png",
                    "itemGroup": "sandwich",
                    "type": "Meat"
                },
                {
                    "id": "red_lettuce",
                    "name": "Red Lettuce",
                    "image": ".assets/images/ingredients/red_lettuce.png",
                    "itemGroup": "sal/sand",
                    "type": "Greens"
                },
                {
                    "id": "green_lettuce",
                    "name": "Green Lettuce",
                    "image": ".assets/images/ingredients/green_lettuce.png",
                    "itemGroup": "sal/sand",
                    "type": "Greens"
                },
                {
                    "id": "mixed_greens",
                    "name": "Mixed Greens",
                    "image": ".assets/images/ingredients/mixed_greens.png",
                    "itemGroup": "salad",
                    "type": "Greens"
                },
                {
                    "id": "lettuce",
                    "name": "Lettuce",
                    "image": ".assets/images/ingredients/lettuce.png",
                    "itemGroup": "salad",
                    "type": "Veggies"
                },
                {
                    "id": "tomatoes",
                    "name": "Tomatoes",
                    "image": ".assets/images/ingredients/tomatoes.png",
                    "itemGroup": "sal/sand",
                    "type": "Veggies"
                },
                {
                    "id": "pickles",
                    "name": "Pickles",
                    "image": ".assets/images/ingredients/Pickles.png",
                    "itemGroup": "sandwich",
                    "type": "Veggies"
                },
                {
                    "id": "onions",
                    "name": "Onions",
                    "image": ".assets/images/ingredients/onions.png",
                    "itemGroup": "sal/sand",
                    "type": "Veggies"
                },
                {
                    "id": "cucumbers",
                    "name": "Cucumbers",
                    "image": ".assets/images/ingredients/cucumbers.png",
                    "itemGroup": "salad",
                    "type": "Veggies"
                },
                {
                    "id": "cheddar",
                    "name": "Cheddar",
                    "image": ".assets/images/ingredients/cheddar.png",
                    "itemGroup": "sal/sand",
                    "type": "Cheese"
                },
                {
                    "id": "provolone",
                    "name": "Provolone",
                    "image": ".assets/images/ingredients/provolone.png",
                    "itemGroup": "sandwich",
                    "type": "Cheese"
                },
                {
                    "id": "blue_cheese",
                    "name": "Blue Cheese",
                    "image": ".assets/images/ingredients/blue_cheese.png",
                    "itemGroup": "salad",
                    "type": "Cheese"
                },
                {
                    "id": "sourdough",
                    "name": "Sourdough",
                    "image": ".assets/images/ingredients/sourdough.png",
                    "itemGroup": "sandwich",
                    "type": "Bread"
                },
                {
                    "id": "kaiser_roll",
                    "name": "Kaiser Roll",
                    "image": ".assets/images/ingredients/kaiser_roll.png",
                    "itemGroup": "sandwich",
                    "type": "Bread"
                },
                {
                    "id": "mustard",
                    "name": "Mustard",
                    "image": ".assets/images/ingredients/mustard.png",
                    "itemGroup": "sandwich",
                    "type": "Condiments"
                },
                {
                    "id": "mayo",
                    "name": "Mayo",
                    "image": ".assets/images/ingredients/mayo.png",
                    "itemGroup": "sandwich",
                    "type": "Condiments"
                },
                {
                    "id": "ranch",
                    "name": "Ranch",
                    "image": ".assets/images/ingredients/ranch.png",
                    "itemGroup": "salad",
                    "type": "Dressings"
                },
                {
                    "id": "almonds",
                    "name": "Almonds",
                    "image": ".assets/images/ingredients/almonds.png",
                    "itemGroup": "salad",
                    "type": "Nuts/Fruit"
                },
                {
                    "id": "cranberries",
                    "name": "Cranberries",
                    "image": ".assets/images/ingredients/cranberries.png",
                    "itemGroup": "salad",
                    "type": "Nuts/Fruit"
                },
                {
                    "id": "vinaigrette",
                    "name": "Vinaigrette",
                    "image": ".assets/images/ingredients/vinaigrette.png",
                    "itemGroup": "salad",
                    "type": "Dressings"
                }
            ],
            "ingredientTypes": {
                "Condiments": {
                    "selectType": "multiple",
                    "price": "0.25"
                },
                "Bread": {
                    "selectType": "single",
                    "price": "3.00"
                },
                "Cheese": {
                    "selectType": "multiple",
                    "price": "2.00"
                },
                "Meat": {
                    "selectType": "multiple",
                    "price": "3.20"
                },
                "Veggies": {
                    "selectType": "multiple",
                    "price": "1.70"
                },
                "Greens": {
                    "selectType": "single",
                    "price": "2.80"
                },
                "Dressings": {
                    "selectType": "multiple",
                    "price": "1.50"
                },
                "Nuts/Fruit": {
                    "selectType": "multiple",
                    "price": "2.20"
                }
            },
            "desserts": [],
            "drinks": [],
            "sides": []
        };
    }
}
MockOrderStaticDataInterceptor.ɵfac = function MockOrderStaticDataInterceptor_Factory(t) { return new (t || MockOrderStaticDataInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"])); };
MockOrderStaticDataInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: MockOrderStaticDataInterceptor, factory: MockOrderStaticDataInterceptor.ɵfac });


/***/ }),

/***/ "Hque":
/*!******************************************************!*\
  !*** ./src/app/modules/pages/home/home.component.ts ***!
  \******************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/state/shared.actions */ "2jiJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class HomeComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        setTimeout(() => {
            this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_0__["updateHeader"])({ header: 'Salad, Sandwich, & Sven!' }));
        });
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"])); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 22, vars: 0, consts: [[1, "home-wrap"], [1, "background-img-area"], ["src", "./assets/images/home-splash.jpg", "alt", "", 1, "splash-img"], [1, "button-holder"], [1, "btn-success", "menu-btn"], ["routerLink", "/order", 1, "btn-success", "order-btn"], [1, "btn-success", "signup-btn"], [1, "btn-success", "location-btn"], [1, "store-bg-img-area"], ["src", "./assets/images/store_img.png", "alt", "", 1, "store-img"], [1, "quote"], [1, "d-flex", "font-italic"], [1, "profile"], [1, "profile-img-area"], ["src", "./assets/images/sven_headshot.png", "alt", "", 1, "profile-img"], [1, "profile-copy"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Start Order");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Sign Up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Find Nearest Location");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, " \"It's not actually 'us,' it's really just me... and it's for pretend.\" ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, " I try to serve the freshest salads and sandwiches possible... because I'm the only one that eats them. I go to great lengths to make sure that what I fix myself isn't bad, and I think that for the most part, I do a fine job. No one has ever given me an award for my food because no one else has tried it. I've eaten it all. And that's right, I charge myself for it. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"]], styles: [".home-wrap[_ngcontent-%COMP%] {\n  display: grid;\n  height: 180vh;\n  grid-template: [img-start] \"img img img\" 50vh [img-end] [buttons-start] \". buttons .\" 40vh [buttons-end] [store_img-start] \"store_img store_img store_img\" 40vh [store_img-end] [quote-start] \". quote .\" 3vh [quote-end] [profile-start] \". profile .\" 45vh [profile-end]/2% 96% 2%;\n}\n\n.background-img-area[_ngcontent-%COMP%] {\n  height: 50vh;\n  padding: 0;\n  grid-area: img;\n  border-bottom: 2px solid #444444;\n  max-width: 1200px;\n}\n\n.splash-img[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100vw;\n  display: block;\n  object-fit: cover;\n}\n\n.button-holder[_ngcontent-%COMP%] {\n  display: grid;\n  grid-area: buttons;\n  grid-template: [row1-start] \". \" 2vh [row1-end] [row2-start] \" button1 \" 8vh [row2-end] [row3-start] \". \" 2vh [row4-end] [row4-start] \" button2 \" 8vh [row4-end] [row5-start] \". \" 2vh [row5-end] [row6-start] \" button3 \" 8vh [row6-end] [row7-start] \". \" 2vh [row7-end] [row8-start] \" button4 \" 8vh [row8-end] [row9-start] \".\" 2vh [row9-end]/100%;\n}\n\n.menu-btn[_ngcontent-%COMP%] {\n  grid-area: button1;\n}\n\n.order-btn[_ngcontent-%COMP%] {\n  grid-area: button2;\n}\n\n.signup-btn[_ngcontent-%COMP%] {\n  grid-area: button3;\n}\n\n.location-btn[_ngcontent-%COMP%] {\n  grid-area: button4;\n}\n\n.store-bg-img-area[_ngcontent-%COMP%] {\n  display: flex;\n  grid-area: store_img;\n  justify-content: center;\n  align-content: center;\n}\n\n.store-img[_ngcontent-%COMP%] {\n  display: block;\n  border: 1rem solid white;\n  height: 40vh;\n  object-fit: scale-down;\n}\n\n.quote[_ngcontent-%COMP%] {\n  grid-area: quote;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.profile[_ngcontent-%COMP%] {\n  display: grid;\n  border: 1px solid black;\n  background-color: darkgrey;\n  max-width: 768px;\n  grid-area: profile;\n  grid-template: [profile-start] \"profile_img profile_copy\" 45vh [profile-end]/1fr 1fr;\n}\n\n.profile-img-area[_ngcontent-%COMP%] {\n  grid-area: profile_img;\n  margin: 1rem 0.5rem 1rem 1rem;\n  display: flex;\n}\n\n.profile-img[_ngcontent-%COMP%] {\n  border: 2px solid #434242;\n  object-fit: scale-down;\n  margin: auto;\n  max-height: 100%;\n  max-width: 100%;\n}\n\n.profile-copy[_ngcontent-%COMP%] {\n  grid-area: profile_copy;\n  margin: auto 1rem auto 0.5rem;\n  padding: 1rem;\n  background-color: whitesmoke;\n  display: flex;\n  flex-flow: column wrap;\n  overflow-y: scroll;\n  max-height: 100%;\n  max-width: 100%;\n}\n\n@media only screen and (min-width: 768px) {\n  .home-wrap[_ngcontent-%COMP%] {\n    display: grid;\n    place-items: center;\n    height: 180vh;\n    grid-template: [img-start] \"img img img\" 60vh [img-end] [buttons-start] \". buttons .\" 30vh [buttons-end] [store_img-start] \"store_img store_img store_img\" 40vh [store_img-end] [quote-start] \". quote .\" 3vh [quote-end] [profile-start] \". profile .\" 45vh [profile-end]/2% 96% 2%;\n  }\n\n  .background-img-area[_ngcontent-%COMP%] {\n    height: 100%;\n    padding: 0;\n    grid-area: img;\n    border-bottom: 2px solid #444444;\n    max-width: 1200px;\n    overflow-x: hidden;\n  }\n\n  .splash-img[_ngcontent-%COMP%] {\n    display: block;\n    object-fit: cover;\n    padding-bottom: 12vh;\n  }\n\n  .button-holder[_ngcontent-%COMP%] {\n    display: grid;\n    grid-area: buttons;\n    max-width: 1200px;\n    width: 100%;\n    grid-template: [row1-start] \". . .\" 8vh [row1-end] [row2-start] \" button1 . button2\" 6vh [row2-end] [row1-start] \". . .\" 8vh [row1-end] [row2-start] \"button3 . button4\" 6vh [row2-end] [row9-start] \". . .\" 8vh [row9-end]/48% 4% 48%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcaG9tZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0Esb1JBQ0U7QUFBSjs7QUFRQTtFQUNFLFlBQUE7RUFDQSxVQUFBO0VBQ0EsY0FBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7QUFMRjs7QUFRQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBTEY7O0FBUUE7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSx1VkFDRTtBQU5KOztBQWtCQTtFQUNFLGtCQUFBO0FBZkY7O0FBa0JBO0VBQ0Usa0JBQUE7QUFmRjs7QUFrQkE7RUFDRSxrQkFBQTtBQWZGOztBQWtCQTtFQUNFLGtCQUFBO0FBZkY7O0FBa0JBO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtBQWZGOztBQWtCQTtFQUNFLGNBQUE7RUFDQSx3QkFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQWZGOztBQWtCQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFmRjs7QUFrQkE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSwwQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvRkFDRTtBQWhCSjs7QUFvQkE7RUFDRSxzQkFBQTtFQUNBLDZCQUFBO0VBQ0EsYUFBQTtBQWpCRjs7QUFvQkE7RUFDRSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQWpCRjs7QUFvQkE7RUFDRSx1QkFBQTtFQUNBLDZCQUFBO0VBQ0EsYUFBQTtFQUNBLDRCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFqQkY7O0FBb0JBO0VBQ0U7SUFDRSxhQUFBO0lBQ0EsbUJBQUE7SUFDQSxhQUFBO0lBQ0Esb1JBQ0U7RUFsQko7O0VBMEJBO0lBQ0UsWUFBQTtJQUNBLFVBQUE7SUFDQSxjQUFBO0lBQ0EsZ0NBQUE7SUFDQSxpQkFBQTtJQUNBLGtCQUFBO0VBdkJGOztFQTBCQTtJQUdFLGNBQUE7SUFDQSxpQkFBQTtJQUNBLG9CQUFBO0VBekJGOztFQTRCQTtJQUNFLGFBQUE7SUFDQSxrQkFBQTtJQUNBLGlCQUFBO0lBQ0EsV0FBQTtJQUNBLHNPQUNFO0VBMUJKO0FBQ0YiLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ob21lLXdyYXAge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgaGVpZ2h0OiAxODB2aDtcclxuICBncmlkLXRlbXBsYXRlOlxyXG4gICAgW2ltZy1zdGFydF0gXCJpbWcgaW1nIGltZ1wiIDUwdmggW2ltZy1lbmRdXHJcbiAgICBbYnV0dG9ucy1zdGFydF0gXCIuIGJ1dHRvbnMgLlwiIDQwdmggW2J1dHRvbnMtZW5kXVxyXG4gICAgW3N0b3JlX2ltZy1zdGFydF0gXCJzdG9yZV9pbWcgc3RvcmVfaW1nIHN0b3JlX2ltZ1wiIDQwdmggW3N0b3JlX2ltZy1lbmRdXHJcbiAgICBbcXVvdGUtc3RhcnRdIFwiLiBxdW90ZSAuXCIgM3ZoIFtxdW90ZS1lbmRdXHJcbiAgICBbcHJvZmlsZS1zdGFydF0gXCIuIHByb2ZpbGUgLlwiIDQ1dmggW3Byb2ZpbGUtZW5kXVxyXG4gICAgLyAyJSA5NiUgMiU7XHJcbn1cclxuXHJcbi5iYWNrZ3JvdW5kLWltZy1hcmVhIHtcclxuICBoZWlnaHQ6IDUwdmg7XHJcbiAgcGFkZGluZzogMDtcclxuICBncmlkLWFyZWE6IGltZztcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzQ0NDQ0NDtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxufVxyXG5cclxuLnNwbGFzaC1pbWcge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwdnc7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbn1cclxuXHJcbi5idXR0b24taG9sZGVyIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtYXJlYTogYnV0dG9ucztcclxuICBncmlkLXRlbXBsYXRlOlxyXG4gICAgW3JvdzEtc3RhcnRdIFwiLiBcIiAydmggW3JvdzEtZW5kXVxyXG4gICAgW3JvdzItc3RhcnRdIFwiIGJ1dHRvbjEgXCIgOHZoIFtyb3cyLWVuZF1cclxuICAgIFtyb3czLXN0YXJ0XSBcIi4gXCIgMnZoIFtyb3c0LWVuZF1cclxuICAgIFtyb3c0LXN0YXJ0XSBcIiBidXR0b24yIFwiIDh2aCBbcm93NC1lbmRdXHJcbiAgICBbcm93NS1zdGFydF0gXCIuIFwiIDJ2aCBbcm93NS1lbmRdXHJcbiAgICBbcm93Ni1zdGFydF0gXCIgYnV0dG9uMyBcIiA4dmggW3JvdzYtZW5kXVxyXG4gICAgW3Jvdzctc3RhcnRdIFwiLiBcIiAydmggW3JvdzctZW5kXVxyXG4gICAgW3Jvdzgtc3RhcnRdIFwiIGJ1dHRvbjQgXCIgOHZoIFtyb3c4LWVuZF1cclxuICAgIFtyb3c5LXN0YXJ0XSBcIi5cIiAydmggW3JvdzktZW5kXVxyXG4gICAgLyAxMDAlO1xyXG59XHJcblxyXG4ubWVudS1idG4ge1xyXG4gIGdyaWQtYXJlYTogYnV0dG9uMTtcclxufVxyXG5cclxuLm9yZGVyLWJ0biB7XHJcbiAgZ3JpZC1hcmVhOiBidXR0b24yO1xyXG59XHJcblxyXG4uc2lnbnVwLWJ0biB7XHJcbiAgZ3JpZC1hcmVhOiBidXR0b24zO1xyXG59XHJcblxyXG4ubG9jYXRpb24tYnRuIHtcclxuICBncmlkLWFyZWE6IGJ1dHRvbjQ7XHJcbn1cclxuXHJcbi5zdG9yZS1iZy1pbWctYXJlYSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBncmlkLWFyZWE6IHN0b3JlX2ltZztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zdG9yZS1pbWcge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGJvcmRlcjogMXJlbSBzb2xpZCB3aGl0ZTtcclxuICBoZWlnaHQ6IDQwdmg7XHJcbiAgb2JqZWN0LWZpdDogc2NhbGUtZG93bjtcclxufVxyXG5cclxuLnF1b3RlIHtcclxuICBncmlkLWFyZWE6IHF1b3RlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnByb2ZpbGUge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZXk7XHJcbiAgbWF4LXdpZHRoOiA3NjhweDtcclxuICBncmlkLWFyZWE6IHByb2ZpbGU7XHJcbiAgZ3JpZC10ZW1wbGF0ZTpcclxuICAgIFtwcm9maWxlLXN0YXJ0XSBcInByb2ZpbGVfaW1nIHByb2ZpbGVfY29weVwiIDQ1dmggW3Byb2ZpbGUtZW5kXVxyXG4gICAgLyAxZnIgMWZyO1xyXG59XHJcblxyXG4ucHJvZmlsZS1pbWctYXJlYSB7XHJcbiAgZ3JpZC1hcmVhOiBwcm9maWxlX2ltZztcclxuICBtYXJnaW46IDFyZW0gMC41cmVtIDFyZW0gMXJlbTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4ucHJvZmlsZS1pbWcge1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig2NywgNjYsIDY2KTtcclxuICBvYmplY3QtZml0OiBzY2FsZS1kb3duO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxufVxyXG5cclxuLnByb2ZpbGUtY29weSB7XHJcbiAgZ3JpZC1hcmVhOiBwcm9maWxlX2NvcHk7XHJcbiAgbWFyZ2luOiBhdXRvIDFyZW0gYXV0byAwLjVyZW07XHJcbiAgcGFkZGluZzogMXJlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1mbG93OiBjb2x1bW4gd3JhcDtcclxuICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgbWF4LWhlaWdodDogMTAwJTtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAuaG9tZS13cmFwIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAxODB2aDtcclxuICAgIGdyaWQtdGVtcGxhdGU6XHJcbiAgICAgIFtpbWctc3RhcnRdIFwiaW1nIGltZyBpbWdcIiA2MHZoIFtpbWctZW5kXVxyXG4gICAgICBbYnV0dG9ucy1zdGFydF0gXCIuIGJ1dHRvbnMgLlwiIDMwdmggW2J1dHRvbnMtZW5kXVxyXG4gICAgICBbc3RvcmVfaW1nLXN0YXJ0XSBcInN0b3JlX2ltZyBzdG9yZV9pbWcgc3RvcmVfaW1nXCIgNDB2aCBbc3RvcmVfaW1nLWVuZF1cclxuICAgICAgW3F1b3RlLXN0YXJ0XSBcIi4gcXVvdGUgLlwiIDN2aCBbcXVvdGUtZW5kXVxyXG4gICAgICBbcHJvZmlsZS1zdGFydF0gXCIuIHByb2ZpbGUgLlwiIDQ1dmggW3Byb2ZpbGUtZW5kXVxyXG4gICAgICAvIDIlIDk2JSAyJTtcclxuICB9XHJcblxyXG4gIC5iYWNrZ3JvdW5kLWltZy1hcmVhIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBncmlkLWFyZWE6IGltZztcclxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjNDQ0NDQ0O1xyXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgfVxyXG5cclxuICAuc3BsYXNoLWltZyB7XHJcbiAgICAvLyBtaW4taGVpZ2h0OiAxMDAlO1xyXG4gICAgLy8gd2lkdGg6IGluaGVyaXQ7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEydmg7XHJcbiAgfVxyXG5cclxuICAuYnV0dG9uLWhvbGRlciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC1hcmVhOiBidXR0b25zO1xyXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGdyaWQtdGVtcGxhdGU6XHJcbiAgICAgIFtyb3cxLXN0YXJ0XSBcIi4gLiAuXCIgOHZoIFtyb3cxLWVuZF1cclxuICAgICAgW3JvdzItc3RhcnRdIFwiIGJ1dHRvbjEgLiBidXR0b24yXCIgNnZoW3JvdzItZW5kXVxyXG4gICAgICBbcm93MS1zdGFydF0gXCIuIC4gLlwiIDh2aCBbcm93MS1lbmRdXHJcbiAgICAgIFtyb3cyLXN0YXJ0XSBcImJ1dHRvbjMgLiBidXR0b240XCIgNnZoW3JvdzItZW5kXVxyXG4gICAgICBbcm93OS1zdGFydF0gXCIuIC4gLlwiIDh2aCBbcm93OS1lbmRdXHJcbiAgICAgIC8gNDglIDQlIDQ4JTtcclxuICB9XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "Ixgz":
/*!**************************************************************************!*\
  !*** ./src/app/modules/order/state/order-items/order-items.selectors.ts ***!
  \**************************************************************************/
/*! exports provided: selectOrderItemsState, selectOrderItemIds, selectOrderItemEntities, selectOrderItemArray, selectOrderItemNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOrderItemsState", function() { return selectOrderItemsState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOrderItemIds", function() { return selectOrderItemIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOrderItemEntities", function() { return selectOrderItemEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOrderItemArray", function() { return selectOrderItemArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOrderItemNames", function() { return selectOrderItemNames; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/stores/selectors/order-static-data.selectors */ "bDRp");
/* harmony import */ var _order_items_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order-items.reducer */ "JdOj");



const selectOrderItemsState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_order_items_reducer__WEBPACK_IMPORTED_MODULE_2__["orderItemsFeatureKey"]);
const selectOrderItemIds = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderItemsState, (state) => state.ids);
const selectOrderItemEntities = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderItemsState, (state) => state.entities);
const selectOrderItemArray = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderItemEntities, (entities) => {
    let orderItems = [];
    for (let key in entities) {
        orderItems.push(entities[key]);
    }
    return orderItems;
});
const selectOrderItemNames = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllIngredients"], selectOrderItemEntities, (allIngredients, orderItems) => {
    // let ingredientNames: Array<{ [id: string]: string[] }> = []
    let item = {};
    // loop through each order item ingredient list (by id)
    // for each ingredient id ...
    // look up the name in allIngredients
    // set id as the index set name as the value
    for (let itemId in orderItems) {
        let nameList = [];
        // get list of ingredients from the item
        orderItems[itemId].ingredients.forEach(ingredientId => {
            nameList.push(allIngredients.find(ingredient => ingredient.id == ingredientId).name);
        });
        item[itemId] = nameList;
        // ingredientNames.push(item)
    }
    return item;
});


/***/ }),

/***/ "JdOj":
/*!************************************************************************!*\
  !*** ./src/app/modules/order/state/order-items/order-items.reducer.ts ***!
  \************************************************************************/
/*! exports provided: orderItemsFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderItemsFeatureKey", function() { return orderItemsFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "R0Ic");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _order_items_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order-items.actions */ "WGDn");



const orderItemsFeatureKey = 'orderItems';
const initialState = {
    entities: {},
    ids: []
};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["loadOrderItems"], (state) => state), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["addOrderItem"], (state, action) => {
    let ids = state.ids.slice(0);
    ids.push(action.orderItem.id);
    ids.sort();
    return {
        ids,
        entities: Object.assign(Object.assign({}, state.entities), { [action.orderItem.id]: action.orderItem })
    };
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["removeOrderItem"], (state, action) => (Object.assign(Object.assign({}, state), { ids: action.ids, entities: action.entities }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["toggleDetail"], (state, action) => {
    let ids = state.ids.slice(0);
    let orderItem = Object.assign({}, state.entities[action.id]);
    orderItem.viewDetail = !orderItem.viewDetail;
    return {
        ids,
        entities: Object.assign(Object.assign({}, state.entities), { [action.id]: orderItem })
    };
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["clearOrderItems"], () => (Object.assign(Object.assign({}, _angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"]), { ids: [], entities: {} }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["updateQuantityAndSubtotal"], (state, action) => {
    let ids = state.ids.slice(0);
    let orderItem = Object.assign({}, state.entities[action.id]);
    orderItem.quantity = action.quantity;
    orderItem.subtotal = action.quantity * orderItem.price;
    return {
        ids,
        entities: Object.assign(Object.assign({}, state.entities), { [action.id]: orderItem })
    };
}));


/***/ }),

/***/ "JnYV":
/*!*******************************************************!*\
  !*** ./src/app/modules/order/order-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: OrderRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderRoutingModule", function() { return OrderRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_builder_builder_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/builder/builder.component */ "jSi4");
/* harmony import */ var _components_order_list_order_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/order-list/order-list.component */ "gRyS");
/* harmony import */ var _order_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order.component */ "MsO7");
/* harmony import */ var _components_specialty_specialty_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/specialty/specialty.component */ "wY/J");
/* harmony import */ var _components_ssselctor_ssselctor_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ssselctor/ssselctor.component */ "DWvF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    {
        path: 'order', component: _order_component__WEBPACK_IMPORTED_MODULE_3__["OrderComponent"],
        children: [
            { path: 'ss-selector', component: _components_ssselctor_ssselctor_component__WEBPACK_IMPORTED_MODULE_5__["SsselctorComponent"] },
            { path: 'specialty', component: _components_specialty_specialty_component__WEBPACK_IMPORTED_MODULE_4__["SpecialtyComponent"] },
            { path: 'builder', component: _components_builder_builder_component__WEBPACK_IMPORTED_MODULE_1__["BuilderComponent"] },
            { path: 'order-list', component: _components_order_list_order_list_component__WEBPACK_IMPORTED_MODULE_2__["OrderListComponent"] },
            { path: '', redirectTo: 'ss-selector', pathMatch: 'full' },
        ]
    }
];
class OrderRoutingModule {
}
OrderRoutingModule.ɵfac = function OrderRoutingModule_Factory(t) { return new (t || OrderRoutingModule)(); };
OrderRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: OrderRoutingModule });
OrderRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](OrderRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "LOrT":
/*!*************************************************************************************!*\
  !*** ./src/app/modules/payment/components/pay-tx-result/pay-tx-result.component.ts ***!
  \*************************************************************************************/
/*! exports provided: PayTxResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayTxResultComponent", function() { return PayTxResultComponent; });
/* harmony import */ var src_app_modules_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/order/state/cart/cart.selectors */ "+xTS");
/* harmony import */ var _shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/state/shared.actions */ "2jiJ");
/* harmony import */ var _state_payment_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../state/payment.selectors */ "l3ve");
/* harmony import */ var src_app_modules_order_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/order/state/order-items/order-items.actions */ "WGDn");
/* harmony import */ var src_app_modules_order_state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/order/state/cart/cart.actions */ "Cfa1");
/* harmony import */ var _state_payment_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../state/payment.actions */ "Zclr");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");










function PayTxResultComponent_div_0_ng_container_1_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "tr", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", item_r6.quantity, " @ $", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](4, 4, item_r6.price, "1.2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](item_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](11, 7, item_r6.subtotal, "1.2"));
} }
function PayTxResultComponent_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Order#: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Transaction Id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](16, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, PayTxResultComponent_div_0_ng_container_1_ng_container_19_Template, 12, 10, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](20, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](22, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "td", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, "Total: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](27, "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](31, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](33, "Pick it up around: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](34, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](36, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](38, "Email me my receipt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function PayTxResultComponent_div_0_ng_container_1_Template_button_click_39_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r7.clearMemory(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](40, "Done");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const result_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](result_r2.transactionId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", result_r2.transactionId, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](15, 7, result_r2.dateTime, "mediumDate"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](16, 10, result_r2.dateTime, "h:mm:ss a"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](20, 13, ctx_r3.items$));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](31, 15, result_r2.amount, "1.2"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](36, 18, ctx_r3.timeReady, "shortTime"), "");
} }
function PayTxResultComponent_div_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Order#: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Transaction Id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](16, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "Payment Incomplete!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "Try Again");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function PayTxResultComponent_div_0_ng_container_2_Template_button_click_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r10.openCancelConfirm(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const result_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](result_r2.transactionId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", result_r2.transactionId, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](15, 4, result_r2.dateTime, "mediumDate"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](16, 7, result_r2.dateTime, "h:mm:ss a"), " ");
} }
function PayTxResultComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PayTxResultComponent_div_0_ng_container_1_Template, 41, 21, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PayTxResultComponent_div_0_ng_container_2_Template, 23, 10, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.paySuccessFlag);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r0.paySuccessFlag);
} }
function PayTxResultComponent_div_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Do you ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "really");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " want to cancel this transaction?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Your payment info will be cleared.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function PayTxResultComponent_div_2_ng_container_2_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r14.confirmCancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, " Cancel Payment ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PayTxResultComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PayTxResultComponent_div_2_ng_container_2_Template, 13, 0, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function PayTxResultComponent_div_2_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r16.closePopup(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, " Never mind ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.confirmFlag);
} }
class PayTxResultComponent {
    constructor(store, router) {
        this.store = store;
        this.router = router;
        this.paySuccessFlag = false;
        this.confirmFlag = false;
        this.popupFlag = false;
    }
    ngOnInit() {
        setTimeout(() => {
            this.paySuccessFlag
                ? this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_1__["updateHeader"])({ header: 'Success!' }))
                : this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_1__["updateHeader"])({ header: 'Oops!' }));
        });
        this.payResult$ = this.store.select(_state_payment_selectors__WEBPACK_IMPORTED_MODULE_2__["selectPayResult"]);
        this.payResult$.subscribe(result => {
            if (result) {
                this.paySuccessFlag = result.status == 'approved'
                    ? true
                    : false;
                this.timeReady = this.orderReadyTime(result.dateTime);
            }
        });
        this.items$ = this.store.select(src_app_modules_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_0__["selectCartItemsWithIngredientInfo"]);
    }
    openCancelConfirm() {
        this.popupFlag = true;
        this.confirmFlag = true;
    }
    orderReadyTime(time) {
        let processTime = new Date(time);
        let readyTime = processTime.getTime() + 10 * 60000;
        return new Date(readyTime);
    }
    confirmCancel() {
        this.store.dispatch(Object(_state_payment_actions__WEBPACK_IMPORTED_MODULE_5__["clearPaymentInfo"])());
    }
    closePopup() {
        this.popupFlag = false;
        this.confirmFlag = false;
    }
    // dev
    flipResults() {
        this.paySuccessFlag = !this.paySuccessFlag;
    }
    clearMemory() {
        this.store.dispatch(Object(src_app_modules_order_state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_4__["clearCart"])());
        this.store.dispatch(Object(src_app_modules_order_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_3__["clearOrderItems"])());
        this.store.dispatch(Object(_state_payment_actions__WEBPACK_IMPORTED_MODULE_5__["clearPaymentInfo"])());
    }
}
PayTxResultComponent.ɵfac = function PayTxResultComponent_Factory(t) { return new (t || PayTxResultComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"])); };
PayTxResultComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: PayTxResultComponent, selectors: [["app-pay-tx-result"]], decls: 3, vars: 4, consts: [["class", "post-pay-wrap", 4, "ngIf"], ["class", "popup-screen-cover", 4, "ngIf"], [1, "post-pay-wrap"], [4, "ngIf"], [1, "result"], ["src", "./assets/images/thanks.png", "alt", ""], [1, "order-form"], [1, "order-meta"], [1, "order-num"], [1, "order-id"], [1, "date"], [1, "order-items"], [1, "receipt-data"], [4, "ngFor", "ngForOf"], [1, "qty-price"], [1, "total"], [1, "dollar"], [1, "amount"], [1, "post-msg"], ["type", "button", 1, "btn1", "btn-primary"], ["type", "button", "routerLink", "/", 1, "btn2", "btn-success", 3, "click"], [1, "table-rows"], [1, "description"], ["src", "./assets/images/transaction_fail.png", "alt", ""], [1, "post-msg", "failed"], ["type", "button", "routerLink", "/pay/payment", 1, "btn1", "btn-success"], ["type", "button", 1, "btn2", "btn-danger", 3, "click"], [1, "popup-screen-cover"], [1, "popup-window"], [1, "btn-primary", "close-btn", 3, "click"], [1, "popup-contents"], [1, "msg"], [1, "cancel"], ["type", "button", "routerLink", "/order/order-list", 1, "cancel-btn", "btn-danger", 3, "click"]], template: function PayTxResultComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, PayTxResultComponent_div_0_Template, 3, 2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PayTxResultComponent_div_2_Template, 5, 1, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 2, ctx.payResult$));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.popupFlag);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterLink"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["DecimalPipe"]], styles: [".post-pay-wrap[_ngcontent-%COMP%] {\n  width: 96vw;\n  max-width: 600px;\n  margin: auto;\n}\n\n.result[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.order-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: column nowrap;\n  width: 96%;\n  margin-left: auto;\n  margin-right: auto;\n  font-family: monospace;\n}\n\n.order-meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n\ndiv.receipt-data[_ngcontent-%COMP%] {\n  display: table;\n  margin: 1vmin 0;\n  padding: 0 1vmin;\n}\n\n.order-num[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.order-id[_ngcontent-%COMP%] {\n  display: inline-block;\n  text-align: right;\n}\n\n.date[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.order-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: column nowrap;\n}\n\n.qty-price[_ngcontent-%COMP%] {\n  width: 20vmin;\n}\n\n.description[_ngcontent-%COMP%] {\n  width: 56vmin;\n}\n\n.dollar[_ngcontent-%COMP%] {\n  width: 3vmin;\n  text-align: right;\n  text-justify: right;\n}\n\n.amount[_ngcontent-%COMP%] {\n  width: 15vmin;\n  text-align: right;\n  text-justify: right;\n}\n\n.total[_ngcontent-%COMP%] {\n  justify-content: right;\n  text-align: right;\n  width: 56vmin;\n}\n\n.post-msg[_ngcontent-%COMP%] {\n  display: flex;\n  width: 96%;\n  height: 20vmin;\n  font-weight: bold;\n  font-size: 5vmin;\n  background-color: whitesmoke;\n  margin: 3vmin 2vmin;\n  text-align: center;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton[_ngcontent-%COMP%] {\n  margin: 3vmin auto;\n  display: block;\n  width: 90%;\n  max-width: 500px;\n}\n\n.popup-screen-cover[_ngcontent-%COMP%] {\n  display: flex;\n  position: absolute;\n  width: 100vw;\n  height: 90vh;\n  border: 2px solid #272727;\n  background-color: #f8f8f8;\n  padding: 3vh 3vw;\n  left: 0;\n  top: 10vh;\n}\n\n.popup-window[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [s-s] \". . .\" 2fr [s-e] [msg-s] \". contents .\" 60fr [msg-e] [spc1-s] \". . .\" 2fr [spc1-e] [yes-s] \". cancel_btn .\" 6fr [yes-e] [spc2-s] \". . .\" 6fr [spc2-e] [close-s] \". close_btn .\" 6fr [close-e] [e-s] \". . .\" 6fr [e-e]/2fr 96fr 2fr;\n  place-self: center stretch;\n  width: 100%;\n  height: 90vh;\n}\n\n.popup-contents[_ngcontent-%COMP%] {\n  grid-area: contents;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 3vh 3vw;\n  background-color: #f8f8f8;\n  overflow: scroll;\n  flex-direction: column;\n}\n\n.msg[_ngcontent-%COMP%] {\n  grid-area: msg;\n  display: flex;\n  flex-flow: column;\n  justify-items: center;\n  align-items: center;\n  background-color: whitesmoke;\n  padding: 0.5rem;\n  border-radius: 1rem;\n}\n\n.cancel[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2rem;\n}\n\n.cancel-btn[_ngcontent-%COMP%] {\n  grid-area: cancel_btn;\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  grid-area: close_btn;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHBheS10eC1yZXN1bHQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSx3QkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QUFDRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtBQUVGOztBQUNBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQUVGOztBQUFBO0VBQ0UscUJBQUE7QUFHRjs7QUFEQTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7QUFJRjs7QUFGQTtFQUNFLHFCQUFBO0FBS0Y7O0FBRkE7RUFDRSxhQUFBO0VBQ0Esd0JBQUE7QUFLRjs7QUFIQTtFQUNFLGFBQUE7QUFNRjs7QUFKQTtFQUNFLGFBQUE7QUFPRjs7QUFMQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBUUY7O0FBTkE7RUFDRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQVNGOztBQVBBO0VBQ0Usc0JBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7QUFVRjs7QUFQQTtFQUNFLGFBQUE7RUFDQSxVQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBVUY7O0FBUEE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUFVRjs7QUFKQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7QUFPRjs7QUFKQTtFQUNFLGFBQUE7RUFDQSx3UEFDRTtFQVFGLDBCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFERjs7QUFLQTtFQUNFLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtBQUZGOztBQUtBO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUVBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBQUhGOztBQU1BO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBSEY7O0FBTUE7RUFDRSxxQkFBQTtBQUhGOztBQU1BO0VBQ0Usb0JBQUE7QUFIRiIsImZpbGUiOiJwYXktdHgtcmVzdWx0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBvc3QtcGF5LXdyYXAge1xyXG4gIHdpZHRoOiA5NnZ3O1xyXG4gIG1heC13aWR0aDogNjAwcHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG59XHJcblxyXG4ucmVzdWx0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4ub3JkZXItZm9ybSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XHJcbiAgd2lkdGg6IDk2JTtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcclxufVxyXG4ub3JkZXItbWV0YSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbmRpdi5yZWNlaXB0LWRhdGEge1xyXG4gIGRpc3BsYXk6IHRhYmxlO1xyXG4gIG1hcmdpbjogMXZtaW4gMDtcclxuICBwYWRkaW5nOiAwIDF2bWluO1xyXG59XHJcbi5vcmRlci1udW0ge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG4ub3JkZXItaWQge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG4uZGF0ZSB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4ub3JkZXItaXRlbXMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xyXG59XHJcbi5xdHktcHJpY2Uge1xyXG4gIHdpZHRoOiAyMHZtaW47XHJcbn1cclxuLmRlc2NyaXB0aW9uIHtcclxuICB3aWR0aDogNTZ2bWluO1xyXG59XHJcbi5kb2xsYXIge1xyXG4gIHdpZHRoOiAzdm1pbjtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxuICB0ZXh0LWp1c3RpZnk6IHJpZ2h0O1xyXG59XHJcbi5hbW91bnQge1xyXG4gIHdpZHRoOiAxNXZtaW47XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgdGV4dC1qdXN0aWZ5OiByaWdodDtcclxufVxyXG4udG90YWwge1xyXG4gIGp1c3RpZnktY29udGVudDogcmlnaHQ7XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgd2lkdGg6IDU2dm1pbjtcclxufVxyXG5cclxuLnBvc3QtbXNnIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiA5NiU7XHJcbiAgaGVpZ2h0OiAyMHZtaW47XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiA1dm1pbjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gIG1hcmdpbjogM3ZtaW4gMnZtaW47XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgLy8gdGV4dC1qdXN0aWZ5OiBjZW50ZXI7XHJcbn1cclxuYnV0dG9uIHtcclxuICBtYXJnaW46IDN2bWluIGF1dG87XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDkwJTtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG59XHJcblxyXG4vLyBQT1BVUFNcclxuXHJcbi8vIFNDUkVFTiBDT1ZFUiAocHJldmVudHMgdW53YW50ZWQgYnV0dG9uIHByZXNzZXMpXHJcbi5wb3B1cC1zY3JlZW4tY292ZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBoZWlnaHQ6IDkwdmg7XHJcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDM5LCAzOSwgMzkpO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDgsIDI0OCwgMjQ4KTtcclxuICBwYWRkaW5nOiAzdmggM3Z3O1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiAxMHZoO1xyXG59XHJcblxyXG4ucG9wdXAtd2luZG93IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6XHJcbiAgICBbcy1zXSBcIi4gLiAuXCIgMmZyIFtzLWVdXHJcbiAgICBbbXNnLXNdIFwiLiBjb250ZW50cyAuXCIgNjBmciBbbXNnLWVdXHJcbiAgICBbc3BjMS1zXSBcIi4gLiAuXCIgMmZyIFtzcGMxLWVdXHJcbiAgICBbeWVzLXNdIFwiLiBjYW5jZWxfYnRuIC5cIiA2ZnIgW3llcy1lXVxyXG4gICAgW3NwYzItc10gXCIuIC4gLlwiIDZmciBbc3BjMi1lXVxyXG4gICAgW2Nsb3NlLXNdIFwiLiBjbG9zZV9idG4gLlwiIDZmciBbY2xvc2UtZV1cclxuICAgIFtlLXNdIFwiLiAuIC5cIiA2ZnIgW2UtZV1cclxuICAgIC8gMmZyIDk2ZnIgMmZyO1xyXG4gIHBsYWNlLXNlbGY6IGNlbnRlciBzdHJldGNoO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogOTB2aDtcclxufVxyXG5cclxuLy8gQ09ORklSTSBDQU5DRUxcclxuLnBvcHVwLWNvbnRlbnRzIHtcclxuICBncmlkLWFyZWE6IGNvbnRlbnRzO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAzdmggM3Z3O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDgsIDI0OCwgMjQ4KTtcclxuICBvdmVyZmxvdzogc2Nyb2xsO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5tc2cge1xyXG4gIGdyaWQtYXJlYTogbXNnO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1mbG93OiBjb2x1bW47XHJcbiAgLy8gcGxhY2Utc2VsZjogY2VudGVyO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgcGFkZGluZzogMC41cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XHJcbn1cclxuXHJcbi5jYW5jZWwge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IDJyZW07XHJcbn1cclxuXHJcbi5jYW5jZWwtYnRuIHtcclxuICBncmlkLWFyZWE6IGNhbmNlbF9idG47XHJcbn1cclxuXHJcbi5jbG9zZS1idG4ge1xyXG4gIGdyaWQtYXJlYTogY2xvc2VfYnRuO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "LScw":
/*!**************************************************************************!*\
  !*** ./src/app/modules/order/state/current-item/current-item.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: currentItemFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentItemFeatureKey", function() { return currentItemFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _current_item_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./current-item.actions */ "Bszr");


const currentItemFeatureKey = 'currentItem';
const initialState = {
    id: '',
    name: '',
    itemGroup: null,
    quantity: 1,
    price: 0,
    subtotal: 0,
    selectedSpecialtyId: null,
    ingredients: [],
    viewDetail: false
};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["setItemGroup"], (state, action) => (Object.assign(Object.assign({}, state), { itemGroup: action.currentItemGroup }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["updateSpecialtyId"], (state, action) => (Object.assign(Object.assign({}, state), { selectedSpecialtyId: action.selectedSpecialtyId }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["updateIngredients"], (state, action) => (Object.assign(Object.assign({}, state), { ingredients: action.ingredients }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["loadItemToBuilder"], (state, action) => (Object.assign(Object.assign({}, state), { id: action.orderItem.id, name: action.orderItem.name, itemGroup: action.orderItem.itemGroup, quantity: action.orderItem.quantity, price: action.orderItem.price, subtotal: action.orderItem.subtotal, selectedSpecialtyId: null, ingredients: action.orderItem.ingredients, viewDetail: false }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["clearCurrentItem"], () => (Object.assign({}, initialState))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["updateCurrentItemId"], (state, action) => (Object.assign(Object.assign({}, state), { id: action.id }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["updateCurrentItemName"], (state, action) => (Object.assign(Object.assign({}, state), { name: action.name }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["updateCurrentItemPriceAndSubtotal"], (state, action) => (Object.assign(Object.assign({}, state), { price: action.price, subtotal: action.price * state.quantity }))));


/***/ }),

/***/ "MsO7":
/*!**************************************************!*\
  !*** ./src/app/modules/order/order.component.ts ***!
  \**************************************************/
/*! exports provided: OrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return OrderComponent; });
/* harmony import */ var src_app_stores_actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/stores/actions/order-static-data.actions */ "UsQq");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class OrderComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.store.dispatch(Object(src_app_stores_actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_0__["loadStaticOrderData"])());
    }
}
OrderComponent.ɵfac = function OrderComponent_Factory(t) { return new (t || OrderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"])); };
OrderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OrderComponent, selectors: [["app-order"]], decls: 1, vars: 0, template: function OrderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvcmRlci5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "Nm2m":
/*!**************************************!*\
  !*** ./src/app/app/app.component.ts ***!
  \**************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _modules_shared_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/shared/header/header.component */ "X9oS");
/* harmony import */ var _modules_shared_main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/shared/main-panel/main-panel.component */ "g6L9");



class AppComponent {
    constructor() {
        this.title = 'salad-plus';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, consts: [[1, "sticky"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-main-panel");
    } }, directives: [_modules_shared_header_header_component__WEBPACK_IMPORTED_MODULE_1__["HeaderComponent"], _modules_shared_main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_2__["MainPanelComponent"]], styles: [".sticky[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFdBQUE7QUFDRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3RpY2t5IHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgbGVmdDogMDtcclxuICB0b3A6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "Q0UC":
/*!**********************************************************!*\
  !*** ./src/app/modules/order/state/cart/cart.effects.ts ***!
  \**********************************************************/
/*! exports provided: CartEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartEffects", function() { return CartEffects; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/effects */ "9jGm");


class CartEffects {
    // loadCarts$ = createEffect(() => {
    //   return this.actions$.pipe(
    //     ofType(CartActions.loadCarts),
    //     concatMap(() =>
    //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
    //       EMPTY.pipe(
    //         map(data => CartActions.loadCartsSuccess({ data })),
    //         catchError(error => of(CartActions.loadCartsFailure({ error }))))
    //     )
    //   );
    // });
    constructor(actions$) {
        this.actions$ = actions$;
    }
}
CartEffects.ɵfac = function CartEffects_Factory(t) { return new (t || CartEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_1__["Actions"])); };
CartEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CartEffects, factory: CartEffects.ɵfac });


/***/ }),

/***/ "StcJ":
/*!****************************************************!*\
  !*** ./src/app/modules/payment/payment.service.ts ***!
  \****************************************************/
/*! exports provided: PaymentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentService", function() { return PaymentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class PaymentService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3000/';
    }
    getPayResultsDB(data) {
        const url = this.baseUrl + 'api/pay';
        return this.http.get(url);
    }
}
PaymentService.ɵfac = function PaymentService_Factory(t) { return new (t || PaymentService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
PaymentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PaymentService, factory: PaymentService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "UsQq":
/*!*************************************************************!*\
  !*** ./src/app/stores/actions/order-static-data.actions.ts ***!
  \*************************************************************/
/*! exports provided: loadStaticOrderData, loadStaticOrderDataSuccess, loadStaticOrderDataFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStaticOrderData", function() { return loadStaticOrderData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStaticOrderDataSuccess", function() { return loadStaticOrderDataSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStaticOrderDataFailure", function() { return loadStaticOrderDataFailure; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

const loadStaticOrderData = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[StaticOrderData] Load StaticOrderData');
const loadStaticOrderDataSuccess = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[StaticOrderData] Load StaticOrderData Success', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const loadStaticOrderDataFailure = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[StaticOrderData] Load StaticOrderData Failure', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());


/***/ }),

/***/ "WGDn":
/*!************************************************************************!*\
  !*** ./src/app/modules/order/state/order-items/order-items.actions.ts ***!
  \************************************************************************/
/*! exports provided: loadOrderItems, addOrderItem, removeOrderItem, updateQuantityAndSubtotal, toggleDetail, clearOrderItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOrderItems", function() { return loadOrderItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOrderItem", function() { return addOrderItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeOrderItem", function() { return removeOrderItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateQuantityAndSubtotal", function() { return updateQuantityAndSubtotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleDetail", function() { return toggleDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearOrderItems", function() { return clearOrderItems; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

const loadOrderItems = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[OrderItems] Load OrderItems');
const addOrderItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[OrderItems] Add OrderItem', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const removeOrderItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[OrderItems] Delete OrderItem', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateQuantityAndSubtotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[OrderItems Form] Update Quantity and Subtotal', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const toggleDetail = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[OrderItems] Toggle Order Item Detail View', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const clearOrderItems = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Cart] Clear all order items');


/***/ }),

/***/ "WxzM":
/*!********************************************************!*\
  !*** ./src/app/modules/shared/state/shared.reducer.ts ***!
  \********************************************************/
/*! exports provided: sharedFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sharedFeatureKey", function() { return sharedFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _shared_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.actions */ "2jiJ");


const sharedFeatureKey = 'shared';
const initialState = {
    headerMessage: 'The Header Is Broken'
};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_shared_actions__WEBPACK_IMPORTED_MODULE_1__["updateHeader"], (state, action) => (Object.assign(Object.assign({}, state), { headerMessage: action.header }))));


/***/ }),

/***/ "X9oS":
/*!***********************************************************!*\
  !*** ./src/app/modules/shared/header/header.component.ts ***!
  \***********************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _state_shared_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/shared.selectors */ "x0KQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




class HeaderComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.headerMessage$ = this.store.select(_state_shared_selectors__WEBPACK_IMPORTED_MODULE_0__["selectHeaderMessage"]);
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 3, vars: 3, consts: [[1, "header"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx.headerMessage$), "\n");
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["AsyncPipe"]], styles: [".header[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 10vh;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  color: #f5fbda;\n  background-color: #3d4908;\n  font-family: \"Franklin Gothic Medium\", \"Arial Narrow\", Arial, sans-serif;\n  font-size: 7.5vmin;\n  border-bottom: 2px solid #101302;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLHdFQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQ0FBQTtBQUNGIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTB2aDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgY29sb3I6ICNmNWZiZGE7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkNDkwODtcclxuICBmb250LWZhbWlseTogXCJGcmFua2xpbiBHb3RoaWMgTWVkaXVtXCIsIFwiQXJpYWwgTmFycm93XCIsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogNy41dm1pbjtcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzEwMTMwMjtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.component */ "Nm2m");
/* harmony import */ var _barrels_app_modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./barrels/app-modules */ "8A5i");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store-devtools */ "agSv");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../environments/environment */ "AytR");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/effects */ "9jGm");
/* harmony import */ var _ngrx_router_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngrx/router-store */ "99NH");
/* harmony import */ var _stores_effects_order_static_data_effects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stores/effects/order-static-data.effects */ "gKmf");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _barrels_app_mocks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./barrels/app-mocks */ "rm3g");
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./stores */ "CJEk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _modules_pages_home_home_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/pages/home/home.component */ "Hque");
/* harmony import */ var _modules_shared_header_header_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/shared/header/header.component */ "X9oS");
/* harmony import */ var _modules_shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/shared/footer/footer.component */ "sWgc");
/* harmony import */ var _modules_shared_main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/shared/main-panel/main-panel.component */ "g6L9");
/* harmony import */ var _modules_order_order_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/order/order.module */ "yzJG");
/* harmony import */ var _modules_payment_payment_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/payment/payment.module */ "oVPa");
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/shared/shared.module */ "FpXt");
/* harmony import */ var _modules_pages_pages_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./modules/pages/pages.module */ "/HDY");



























class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ providers: [
        ...(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].useMocking ? _barrels_app_mocks__WEBPACK_IMPORTED_MODULE_11__["AppMockInterceptors"] : [])
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            ..._barrels_app_modules__WEBPACK_IMPORTED_MODULE_3__["AppModules"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_4__["StoreModule"].forRoot(_stores__WEBPACK_IMPORTED_MODULE_12__["reducers"], {}),
            _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_5__["StoreDevtoolsModule"].instrument({ maxAge: 25, logOnly: _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].production }),
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_7__["EffectsModule"].forRoot([_stores_effects_order_static_data_effects__WEBPACK_IMPORTED_MODULE_9__["OrderStaticDataEffects"]]),
            _ngrx_router_store__WEBPACK_IMPORTED_MODULE_8__["StoreRouterConnectingModule"].forRoot()
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], _modules_pages_home_home_component__WEBPACK_IMPORTED_MODULE_14__["HomeComponent"], _modules_shared_header_header_component__WEBPACK_IMPORTED_MODULE_15__["HeaderComponent"], _modules_shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_16__["FooterComponent"], _modules_shared_main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_17__["MainPanelComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _modules_order_order_module__WEBPACK_IMPORTED_MODULE_18__["OrderModule"], _modules_payment_payment_module__WEBPACK_IMPORTED_MODULE_19__["PaymentModule"], _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_20__["SharedModule"], _modules_pages_pages_module__WEBPACK_IMPORTED_MODULE_21__["PagesModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_4__["StoreRootModule"], _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_5__["StoreDevtoolsModule"], _ngrx_effects__WEBPACK_IMPORTED_MODULE_7__["EffectsRootModule"], _ngrx_router_store__WEBPACK_IMPORTED_MODULE_8__["StoreRouterConnectingModule"]] }); })();


/***/ }),

/***/ "Zclr":
/*!**********************************************************!*\
  !*** ./src/app/modules/payment/state/payment.actions.ts ***!
  \**********************************************************/
/*! exports provided: updateCCInfo, updateName, clearPaymentInfo, postPayment, postPaymentSuccess, postPaymentFailure, loadPayments, loadPaymentsSuccess, loadPaymentsFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCCInfo", function() { return updateCCInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateName", function() { return updateName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearPaymentInfo", function() { return clearPaymentInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postPayment", function() { return postPayment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postPaymentSuccess", function() { return postPaymentSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postPaymentFailure", function() { return postPaymentFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPayments", function() { return loadPayments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPaymentsSuccess", function() { return loadPaymentsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPaymentsFailure", function() { return loadPaymentsFailure; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

const updateCCInfo = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Update Payment Form', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateName = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Update Payment Form', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const clearPaymentInfo = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment Results] Clear All Payment Info');
const postPayment = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Payment to Server', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const postPaymentSuccess = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Payment Success', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const postPaymentFailure = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Payment Failure', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
// boilerplate
const loadPayments = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Load Payments');
const loadPaymentsSuccess = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Load Payments Success', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const loadPaymentsFailure = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Payment] Load Payments Failure', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());


/***/ }),

/***/ "bDRp":
/*!*****************************************************************!*\
  !*** ./src/app/stores/selectors/order-static-data.selectors.ts ***!
  \*****************************************************************/
/*! exports provided: selectOrderStaticDataState, selectSpecialties, selectAllIngredients, selectDrinks, selectIngredientTypes, selectSides, selectAllIngredientIds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOrderStaticDataState", function() { return selectOrderStaticDataState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSpecialties", function() { return selectSpecialties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllIngredients", function() { return selectAllIngredients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDrinks", function() { return selectDrinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIngredientTypes", function() { return selectIngredientTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSides", function() { return selectSides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllIngredientIds", function() { return selectAllIngredientIds; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/order-static-data.reducer */ "sMsK");


const selectOrderStaticDataState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_1__["orderStaticDataFeatureKey"]);
const selectSpecialties = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderStaticDataState, (state) => state.specialties);
const selectAllIngredients = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderStaticDataState, (state) => state.ingredients);
const selectDrinks = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderStaticDataState, (state) => state.drinks);
const selectIngredientTypes = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderStaticDataState, (state) => state.ingredientTypes);
const selectSides = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectOrderStaticDataState, (state) => state.sides);
const selectAllIngredientIds = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectAllIngredients, (allIngredients) => allIngredients.map(ingredient => ingredient.id));


/***/ }),

/***/ "c14U":
/*!******************************************!*\
  !*** ./src/app/services/cart.service.ts ***!
  \******************************************/
/*! exports provided: CartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartService", function() { return CartService; });
/* harmony import */ var _modules_order_state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/order/state/cart/cart.actions */ "Cfa1");
/* harmony import */ var _modules_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/order/state/cart/cart.selectors */ "+xTS");
/* harmony import */ var _modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/order/state/current-item/current-item.selectors */ "0G+c");
/* harmony import */ var _modules_order_state_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/order/state/order-items/order-items.selectors */ "Ixgz");
/* harmony import */ var _modules_order_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/order/state/order-items/order-items.actions */ "WGDn");
/* harmony import */ var _modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/order/state/current-item/current-item.actions */ "Bszr");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ "l7P3");








class CartService {
    constructor(store) {
        this.store = store;
        this.store.select(_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_2__["selectSelectedSpecialty"]).subscribe(itemSpecialty => this.specialty = itemSpecialty);
        this.store.select(_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_2__["selectCurrentItemGroup"]).subscribe(itemGroup => this.group = itemGroup);
    }
    updateTotal() {
        let total = 0;
        this.store.select(_modules_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCartTotal"]).subscribe(cartTotal => total = cartTotal);
        this.store.dispatch(Object(_modules_order_state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_0__["updateTotal"])({ total }));
    }
    removeCartItem(id) {
        // get the current cart item list
        let orderItemIds;
        this.store.select(_modules_order_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCartIds"]).subscribe(ids => 
        // and remove the selected id
        orderItemIds = ids.filter(cartId => cartId != id));
        // tell the store
        this.store.dispatch(Object(_modules_order_state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_0__["removeCartItem"])({ orderItemIds }));
        // update total
        this.updateTotal();
    }
    addOrderItem() {
        // build item... probably delete (done in reducer)
        let orderItem;
        this.store.select(_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_2__["selectCurrentItemState"]).subscribe(state => orderItem = Object.assign({}, {
            id: state.id,
            name: state.name,
            ingredients: state.ingredients,
            itemGroup: state.itemGroup,
            price: state.price,
            quantity: state.quantity,
            subtotal: state.subtotal,
            viewDetail: false
        }));
        this.store.dispatch(Object(_modules_order_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_4__["addOrderItem"])({ orderItem }));
        this.store.dispatch(Object(_modules_order_state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_0__["addCartItem"])({ id: orderItem.id }));
        this.store.dispatch(Object(_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_5__["clearCurrentItem"])());
    }
    removeOrderItem(id) {
        let ids = [];
        let entities = {};
        this.store.select(_modules_order_state_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_3__["selectOrderItemsState"]).subscribe(state => {
            ids = state.ids.filter(itemId => itemId != id);
            for (let entityId in state.entities) {
                if (entityId != id) {
                    entities[entityId] = state.entities[entityId];
                }
            }
        });
        this.store.dispatch(Object(_modules_order_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_4__["removeOrderItem"])({ ids, entities }));
    }
}
CartService.ɵfac = function CartService_Factory(t) { return new (t || CartService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__["Store"])); };
CartService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: CartService, factory: CartService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "d5cx":
/*!********************************************************************!*\
  !*** ./src/app/modules/order/state/item-edit/item-edit.actions.ts ***!
  \********************************************************************/
/*! exports provided: updateTempIngredientsOfType, updateEditIngredientType, openIngredientSelectorPopup, closeIngredientSelectorPopup, clearSelectedIngredients, addSelectedIngredient, removeSelectedIngredient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTempIngredientsOfType", function() { return updateTempIngredientsOfType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEditIngredientType", function() { return updateEditIngredientType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openIngredientSelectorPopup", function() { return openIngredientSelectorPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeIngredientSelectorPopup", function() { return closeIngredientSelectorPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSelectedIngredients", function() { return clearSelectedIngredients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSelectedIngredient", function() { return addSelectedIngredient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSelectedIngredient", function() { return removeSelectedIngredient; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

// get ingredient infos
const updateTempIngredientsOfType = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Form] Load Ingredients of Selected Type from Current Item to Temp List', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
// export const updateAllIngredientsOfType = createAction(
//   '[Builder Form] Update Ingredient Select Popup List',
//   props<{ allIngredientsOfType: IngredientList }>()
// );
const updateEditIngredientType = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Form] Update Edited Ingredient Type', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
// popup open/close
const openIngredientSelectorPopup = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Form] Open Ingredient Sector Popup (Builder)');
const closeIngredientSelectorPopup = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Popup] Close Ingredient Sector Popup (Builder)');
// add/remove (de)selected ingredients
const clearSelectedIngredients = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Popup] Clear All Selected From Temp List');
const addSelectedIngredient = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Popup] Add Selected to Temp List', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const removeSelectedIngredient = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Builder Popup] Remove Selected From Temp List', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());


/***/ }),

/***/ "d8ee":
/*!****************************************************************!*\
  !*** ./src/app/modules/order/services/currentItems.service.ts ***!
  \****************************************************************/
/*! exports provided: CurrentItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentItemService", function() { return CurrentItemService; });
/* harmony import */ var src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/stores/selectors/order-static-data.selectors */ "bDRp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class CurrentItemService {
    constructor(store, router) {
        this.store = store;
        this.router = router;
    }
    ingredientMultiSelectType(id) {
        let selectType;
        this.store.select(src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_0__["selectOrderStaticDataState"]).subscribe(state => selectType = state.ingredientTypes[id].selectType);
        return selectType;
    }
    getIngredient(type) {
        let ingredients;
        this.store.select(src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_0__["selectAllIngredients"]).subscribe(allIngredients => ingredients = allIngredients.filter(ingredient => ingredient.type === type));
        return ingredients;
    }
}
CurrentItemService.ɵfac = function CurrentItemService_Factory(t) { return new (t || CurrentItemService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
CurrentItemService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CurrentItemService, factory: CurrentItemService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "g6L9":
/*!*******************************************************************!*\
  !*** ./src/app/modules/shared/main-panel/main-panel.component.ts ***!
  \*******************************************************************/
/*! exports provided: MainPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainPanelComponent", function() { return MainPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class MainPanelComponent {
    constructor() { }
    ngOnInit() {
    }
}
MainPanelComponent.ɵfac = function MainPanelComponent_Factory(t) { return new (t || MainPanelComponent)(); };
MainPanelComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainPanelComponent, selectors: [["app-main-panel"]], decls: 2, vars: 0, consts: [[1, "main-panel"]], template: function MainPanelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".main-panel[_ngcontent-%COMP%] {\n  height: 90vh;\n  background-color: #fafafa;\n  margin-top: 10vh;\n  overflow-y: scroll;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcbWFpbi1wYW5lbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtBQUNGIiwiZmlsZSI6Im1haW4tcGFuZWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbi1wYW5lbCB7XHJcbiAgaGVpZ2h0OiA5MHZoO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XHJcbiAgbWFyZ2luLXRvcDogMTB2aDtcclxuICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "gKmf":
/*!*************************************************************!*\
  !*** ./src/app/stores/effects/order-static-data.effects.ts ***!
  \*************************************************************/
/*! exports provided: OrderStaticDataEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderStaticDataEffects", function() { return OrderStaticDataEffects; });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ "9jGm");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/order-static-data.actions */ "UsQq");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_app_services_OrderStaticData_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app/services/OrderStaticData.service */ "tUrS");







class OrderStaticDataEffects {
    constructor(actions$, service) {
        this.actions$ = actions$;
        this.service = service;
        this.loadOrderStaticData$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["createEffect"])(() => {
            return this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["ofType"])(_actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_3__["loadStaticOrderData"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["concatMap"])(() => 
            /** An EMPTY observable only emits completion. Replace with your own observable API request */
            this.service.getOrderStaticData().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => _actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_3__["loadStaticOrderDataSuccess"]({ data })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(error => Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(_actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_3__["loadStaticOrderDataFailure"]({ error }))))));
        });
    }
}
OrderStaticDataEffects.ɵfac = function OrderStaticDataEffects_Factory(t) { return new (t || OrderStaticDataEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["Actions"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_app_services_OrderStaticData_service__WEBPACK_IMPORTED_MODULE_5__["OrderStaticDataService"])); };
OrderStaticDataEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: OrderStaticDataEffects, factory: OrderStaticDataEffects.ɵfac });


/***/ }),

/***/ "gP9/":
/*!******************************************************!*\
  !*** ./src/app/modules/order/state/order.actions.ts ***!
  \******************************************************/
/*! exports provided: loadOrders, loadOrdersSuccess, loadOrdersFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOrders", function() { return loadOrders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOrdersSuccess", function() { return loadOrdersSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOrdersFailure", function() { return loadOrdersFailure; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");

const loadOrders = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Order] Load Orders');
const loadOrdersSuccess = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Order] Load Orders Success', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const loadOrdersFailure = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Order] Load Orders Failure', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());


/***/ }),

/***/ "gRyS":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/order/components/order-list/order-list.component.ts ***!
  \*****************************************************************************/
/*! exports provided: OrderListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderListComponent", function() { return OrderListComponent; });
/* harmony import */ var _shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/state/shared.actions */ "2jiJ");
/* harmony import */ var _state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../state/cart/cart.actions */ "Cfa1");
/* harmony import */ var _state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../state/cart/cart.selectors */ "+xTS");
/* harmony import */ var _state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/current-item/current-item.actions */ "Bszr");
/* harmony import */ var _state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../state/order-items/order-items.actions */ "WGDn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/cart.service */ "c14U");
/* harmony import */ var _order_form_order_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../order-form/order-form.component */ "y91+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");











function OrderListComponent_div_12_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Do you ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "really");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " want to cancel this order? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OrderListComponent_div_12_ng_container_2_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r2.confirmCancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, " Cancel Order ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} }
function OrderListComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, OrderListComponent_div_12_ng_container_2_Template, 11, 0, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OrderListComponent_div_12_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r4.closePopup(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " Close ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.confirmFlag);
} }
class OrderListComponent {
    constructor(store, cartService) {
        this.store = store;
        this.cartService = cartService;
        this.confirmFlag = false;
        this.popupFlag = false;
    }
    ngOnInit() {
        setTimeout(() => {
            this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_0__["updateHeader"])({ header: 'Review & Order More' }));
        });
        this.total$ = this.store.select(_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_2__["selectCartTotal"]);
    }
    openCancelConfirm() {
        this.popupFlag = true;
        this.confirmFlag = true;
    }
    confirmCancel() {
        this.store.dispatch(Object(_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_4__["clearOrderItems"])());
        this.store.dispatch(Object(_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_3__["clearCurrentItem"])());
        this.store.dispatch(Object(_state_cart_cart_actions__WEBPACK_IMPORTED_MODULE_1__["clearCart"])());
    }
    closePopup() {
        this.popupFlag = false;
        this.confirmFlag = false;
    }
}
OrderListComponent.ɵfac = function OrderListComponent_Factory(t) { return new (t || OrderListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_6__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_7__["CartService"])); };
OrderListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: OrderListComponent, selectors: [["app-order-list"]], decls: 13, vars: 7, consts: [[1, "order-list-wrap"], [1, "total", "form-control"], [1, "order-form"], ["type", "button", "routerLink", "/pay", 1, "pay", "btn-success"], [1, "divider"], ["type", "button", 1, "cancel", "btn-danger", 3, "click"], ["class", "popup-screen-cover", 4, "ngIf"], [1, "popup-screen-cover"], [1, "popup-window"], [4, "ngIf"], [1, "btn-primary", "close-btn", 3, "click"], [1, "popup-contents"], [1, "contents"], [1, "cancel-pop"], [1, "msg"], ["type", "button", "routerLink", "/", 1, "cancel-btn-pop", "btn-danger", 3, "click"]], template: function OrderListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "number");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "app-order-form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Pay");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OrderListComponent_Template_button_click_10_listener() { return ctx.openCancelConfirm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, OrderListComponent_div_12_Template, 5, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("$", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](3, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 5, ctx.total$), "1.2"), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.popupFlag);
    } }, directives: [_order_form_order_form_component__WEBPACK_IMPORTED_MODULE_8__["OrderFormComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["DecimalPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["AsyncPipe"]], styles: [".order-list-wrap[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [s1-s] \". . . . .\" 2vh [s1-e] [total-s] \". . . total .\" 6vh [total-e] [s2-s] \". . . . .\" 1vh [s2-e] [order-s] \". order order order .\" 61vh [order-e] [s4-s] \". . . . .\" 2vh [s4-e] [pay-s] \". pay pay pay .\" 6vh [pay-e] [divider-s] \". divider divider divider .\" 3vh [divider-e] [cancel-s] \". cancel cancel cancel .\" 6vh [cancel-e] [s5-s] \". . . . .\" 2vh [s5-e]/2% 32% 32% 32% 2%;\n  max-width: 768px;\n  width: 100%;\n  margin: auto;\n}\n\n.total[_ngcontent-%COMP%] {\n  grid-area: total;\n  dispay: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  border: 1px solid black;\n  background-color: white;\n  padding: 0;\n  font-size: 5vmin;\n  font-weight: bold;\n  height: 6vmin;\n  vertical-align: middle;\n  line-height: 1;\n}\n\n.order-form[_ngcontent-%COMP%] {\n  grid-area: order;\n  overflow-y: scroll;\n}\n\n.add[_ngcontent-%COMP%] {\n  grid-area: add;\n}\n\n.pay[_ngcontent-%COMP%] {\n  grid-area: pay;\n}\n\n.divider[_ngcontent-%COMP%] {\n  grid-area: divider;\n  display: flex;\n}\n\n.cancel[_ngcontent-%COMP%] {\n  grid-area: cancel;\n}\n\nhr[_ngcontent-%COMP%] {\n  margin: auto 5vw;\n  width: 95vw;\n}\n\nlabel[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.popup-screen-cover[_ngcontent-%COMP%] {\n  grid-area: 1/1/6/4;\n  display: flex;\n  position: relative;\n  width: 100vw;\n  height: 90vh;\n  border: 2px solid #272727;\n  background-color: rgba(248, 248, 248, 0.919);\n  padding: 3vh 3vw;\n  margin: 0 -2vw;\n}\n\n.popup-window[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [s-s] \". . .\" 2fr [s-e] [msg-s] \". contents .\" 60fr [msg-e] [spc1-s] \". . .\" 2fr [spc1-e] [yes-s] \". btn1 .\" 6fr [yes-e] [spc2-s] \". . .\" 6fr [spc2-e] [close-s] \". btn2 .\" 6fr [close-e] [e-s] \". . .\" 6fr [e-e]/2fr 96fr 2fr;\n  place-self: center stretch;\n  width: 96vw;\n  height: 90vh;\n}\n\n.popup-contents[_ngcontent-%COMP%] {\n  grid-area: contents;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 3vh 3vw;\n  background-color: #f8f8f8;\n  overflow: scroll;\n  flex-direction: column;\n}\n\n.msg[_ngcontent-%COMP%] {\n  grid-area: msg;\n  display: flex;\n  flex-flow: column;\n  justify-items: center;\n  align-items: center;\n  background-color: whitesmoke;\n  padding: 0.5rem;\n  border-radius: 1rem;\n}\n\n.cancel-pop[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2rem;\n}\n\n.cancel-btn-pop[_ngcontent-%COMP%] {\n  grid-area: btn1;\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  grid-area: btn2;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXG9yZGVyLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc1lBQ0U7RUFXRixnQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBVkY7O0FBYUE7RUFFRSxnQkFBQTtFQUVBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBWkY7O0FBZUE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FBWkY7O0FBZUE7RUFDRSxjQUFBO0FBWkY7O0FBZUE7RUFDRSxjQUFBO0FBWkY7O0FBZUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7QUFaRjs7QUFlQTtFQUNFLGlCQUFBO0FBWkY7O0FBZUE7RUFDRSxnQkFBQTtFQUNBLFdBQUE7QUFaRjs7QUFlQTtFQUNFLGdCQUFBO0FBWkY7O0FBa0JBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsNENBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFmRjs7QUFrQkE7RUFDRSxhQUFBO0VBQ0EsNk9BQ0U7RUFRRiwwQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBdkJGOztBQTJCQTtFQUNFLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtBQXhCRjs7QUEyQkE7RUFDRSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBRUEscUJBQUE7RUFDQSxtQkFBQTtFQUNBLDRCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBekJGOztBQTRCQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtBQXpCRjs7QUE0QkE7RUFDRSxlQUFBO0FBekJGOztBQTRCQTtFQUNFLGVBQUE7QUF6QkYiLCJmaWxlIjoib3JkZXItbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5vcmRlci1saXN0LXdyYXAge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZTpcclxuICAgIFtzMS1zXSBcIi4gLiAuIC4gLlwiIDJ2aCBbczEtZV1cclxuICAgIFt0b3RhbC1zXSBcIi4gLiAuIHRvdGFsIC5cIiA2dmggW3RvdGFsLWVdXHJcbiAgICBbczItc10gXCIuIC4gLiAuIC5cIiAxdmggW3MyLWVdXHJcbiAgICBbb3JkZXItc10gXCIuIG9yZGVyIG9yZGVyIG9yZGVyIC5cIiA2MXZoIFtvcmRlci1lXVxyXG4gICAgW3M0LXNdIFwiLiAuIC4gLiAuXCIgMnZoIFtzNC1lXVxyXG4gICAgW3BheS1zXSBcIi4gcGF5IHBheSBwYXkgLlwiIDZ2aCBbcGF5LWVdXHJcbiAgICBbZGl2aWRlci1zXSBcIi4gZGl2aWRlciBkaXZpZGVyIGRpdmlkZXIgLlwiIDN2aCBbZGl2aWRlci1lXVxyXG4gICAgW2NhbmNlbC1zXSBcIi4gY2FuY2VsIGNhbmNlbCBjYW5jZWwgLlwiIDZ2aCBbY2FuY2VsLWVdXHJcbiAgICBbczUtc10gXCIuIC4gLiAuIC5cIiAydmggW3M1LWVdXHJcbiAgICAvIDIlIDMyJSAzMiUgMzIlIDIlO1xyXG5cclxuICBtYXgtd2lkdGg6IDc2OHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxuLnRvdGFsIHtcclxuICAvLyBUT0RPOiBuZWVkcyB3b3JrIGZvciB2aWV3cG9ydHMgKHZlcnQgY2VudGVyKVxyXG4gIGdyaWQtYXJlYTogdG90YWw7XHJcblxyXG4gIGRpc3BheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGZvbnQtc2l6ZTogNXZtaW47XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgaGVpZ2h0OiA2dm1pbjtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcblxyXG4ub3JkZXItZm9ybSB7XHJcbiAgZ3JpZC1hcmVhOiBvcmRlcjtcclxuICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbn1cclxuXHJcbi5hZGQge1xyXG4gIGdyaWQtYXJlYTogYWRkO1xyXG59XHJcblxyXG4ucGF5IHtcclxuICBncmlkLWFyZWE6IHBheTtcclxufVxyXG5cclxuLmRpdmlkZXIge1xyXG4gIGdyaWQtYXJlYTogZGl2aWRlcjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4uY2FuY2VsIHtcclxuICBncmlkLWFyZWE6IGNhbmNlbDtcclxufVxyXG5cclxuaHIge1xyXG4gIG1hcmdpbjogYXV0byA1dnc7XHJcbiAgd2lkdGg6IDk1dnc7XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICBtYXJnaW4tYm90dG9tOiAwO1xyXG59XHJcblxyXG4vLyBQT1BVUFNcclxuXHJcbi8vIFNDUkVFTiBDT1ZFUiAocHJldmVudHMgdW53YW50ZWQgYnV0dG9uIHByZXNzZXMpXHJcbi5wb3B1cC1zY3JlZW4tY292ZXIge1xyXG4gIGdyaWQtYXJlYTogMSAvIDEgLyA2IC8gNDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMTAwdnc7XHJcbiAgaGVpZ2h0OiA5MHZoO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYigzOSwgMzksIDM5KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0OCwgMjQ4LCAyNDgsIDAuOTE5KTtcclxuICBwYWRkaW5nOiAzdmggM3Z3O1xyXG4gIG1hcmdpbjogMCAtMnZ3O1xyXG59XHJcblxyXG4ucG9wdXAtd2luZG93IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6XHJcbiAgICBbcy1zXSBcIi4gLiAuXCIgMmZyIFtzLWVdXHJcbiAgICBbbXNnLXNdIFwiLiBjb250ZW50cyAuXCIgNjBmciBbbXNnLWVdXHJcbiAgICBbc3BjMS1zXSBcIi4gLiAuXCIgMmZyIFtzcGMxLWVdXHJcbiAgICBbeWVzLXNdIFwiLiBidG4xIC5cIiA2ZnIgW3llcy1lXVxyXG4gICAgW3NwYzItc10gXCIuIC4gLlwiIDZmciBbc3BjMi1lXVxyXG4gICAgW2Nsb3NlLXNdIFwiLiBidG4yIC5cIiA2ZnIgW2Nsb3NlLWVdXHJcbiAgICBbZS1zXSBcIi4gLiAuXCIgNmZyIFtlLWVdXHJcbiAgICAvIDJmciA5NmZyIDJmcjtcclxuICBwbGFjZS1zZWxmOiBjZW50ZXIgc3RyZXRjaDtcclxuICB3aWR0aDogOTZ2dztcclxuICBoZWlnaHQ6IDkwdmg7XHJcbn1cclxuXHJcbi8vIENPTkZJUk0gQ0FOQ0VMXHJcbi5wb3B1cC1jb250ZW50cyB7XHJcbiAgZ3JpZC1hcmVhOiBjb250ZW50cztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogM3ZoIDN2dztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ4LCAyNDgsIDI0OCk7XHJcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ubXNnIHtcclxuICBncmlkLWFyZWE6IG1zZztcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogY29sdW1uO1xyXG4gIC8vIHBsYWNlLXNlbGY6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gIHBhZGRpbmc6IDAuNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xyXG59XHJcblxyXG4uY2FuY2VsLXBvcCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxufVxyXG5cclxuLmNhbmNlbC1idG4tcG9wIHtcclxuICBncmlkLWFyZWE6IGJ0bjE7IC8vIHBvcHVwLXdpbmRvd1xyXG59XHJcblxyXG4uY2xvc2UtYnRuIHtcclxuICBncmlkLWFyZWE6IGJ0bjI7IC8vIHBvcHVwLXdpbmRvd1xyXG4gIC8vIG1hcmdpbjogMXZoIGF1dG87XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "icYP":
/*!**********************************************************************!*\
  !*** ./src/app/modules/order/state/item-edit/item-edit.selectors.ts ***!
  \**********************************************************************/
/*! exports provided: selectItemEditState, selectIngredientType, selectAllIngredientsOfType, selectSelectedIngredientsOfType, selectSelectorFlag, selectSelectedIngredientsOfTypeIds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectItemEditState", function() { return selectItemEditState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIngredientType", function() { return selectIngredientType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllIngredientsOfType", function() { return selectAllIngredientsOfType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSelectedIngredientsOfType", function() { return selectSelectedIngredientsOfType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSelectorFlag", function() { return selectSelectorFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSelectedIngredientsOfTypeIds", function() { return selectSelectedIngredientsOfTypeIds; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/stores/selectors/order-static-data.selectors */ "bDRp");
/* harmony import */ var _item_edit_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./item-edit.reducer */ "+YOH");



const selectItemEditState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_item_edit_reducer__WEBPACK_IMPORTED_MODULE_2__["itemEditFeatureKey"]);
// export const selectAllIngredientsOfType2 = createSelector(
//   selectItemEditState,
//   (state): IngredientList => state.allIngredientsOfType
// )
const selectIngredientType = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectItemEditState, (state) => state.ingredientType);
const selectAllIngredientsOfType = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllIngredients"], selectIngredientType, (allIngredients, type) => allIngredients.filter(ingredient => ingredient.type === type));
const selectSelectedIngredientsOfType = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectItemEditState, (state) => state.selectedIngredientsOfType);
const selectSelectorFlag = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectItemEditState, (state) => state.selectorFlag);
const selectSelectedIngredientsOfTypeIds = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectAllIngredientsOfType, (state) => {
    let ids = [];
    for (let ingredient of state) {
        ids.push(ingredient.id);
    }
    return ids;
});


/***/ }),

/***/ "j7ow":
/*!**********************************************************!*\
  !*** ./src/app/modules/payment/state/payment.reducer.ts ***!
  \**********************************************************/
/*! exports provided: paymentFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paymentFeatureKey", function() { return paymentFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _payment_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment.actions */ "Zclr");


const paymentFeatureKey = 'payment';
const initialState = {
    name: null,
    number: null,
    cvv: null,
    exp: null,
    amount: null,
    result: undefined
};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_payment_actions__WEBPACK_IMPORTED_MODULE_1__["updateCCInfo"], (state, action) => (Object.assign(Object.assign({}, state), { name: action.data.name, number: action.data.number, exp: action.data.exp, cvv: action.data.cvv }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_payment_actions__WEBPACK_IMPORTED_MODULE_1__["clearPaymentInfo"], () => (Object.assign({}, initialState))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_payment_actions__WEBPACK_IMPORTED_MODULE_1__["postPaymentSuccess"], (state, action) => (Object.assign(Object.assign({}, state), { result: action.data }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_payment_actions__WEBPACK_IMPORTED_MODULE_1__["postPaymentFailure"], (state, action) => (Object.assign(Object.assign({}, state), { error: action.error }))));


/***/ }),

/***/ "jSi4":
/*!***********************************************************************!*\
  !*** ./src/app/modules/order/components/builder/builder.component.ts ***!
  \***********************************************************************/
/*! exports provided: BuilderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuilderComponent", function() { return BuilderComponent; });
/* harmony import */ var src_app_modules_order_state_item_edit_item_edit_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/order/state/item-edit/item-edit.actions */ "d5cx");
/* harmony import */ var src_app_modules_order_state_item_edit_item_edit_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/order/state/item-edit/item-edit.selectors */ "icYP");
/* harmony import */ var src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/order/state/current-item/current-item.actions */ "Bszr");
/* harmony import */ var _shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/state/shared.actions */ "2jiJ");
/* harmony import */ var _state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../state/current-item/current-item.selectors */ "0G+c");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/cart.service */ "c14U");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _builder_form_builder_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../builder-form/builder-form.component */ "lb8U");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");













function BuilderComponent_div_7_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function BuilderComponent_div_7_ng_container_3_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ingredient_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r4.selectIngredient(ingredient_r3.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ingredient_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("selected", ctx_r2.isSelected(ingredient_r3.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ingredient_r3.name, " ");
} }
function BuilderComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, BuilderComponent_div_7_ng_container_3_Template, 3, 3, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function BuilderComponent_div_7_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r6.closeSelectIngredient(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, " Close ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 1, ctx_r0.ingredientsOfType$));
} }
function BuilderComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Do you ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "really");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, " want to cancel this item?");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function BuilderComponent_div_9_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r8.confirmCancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, " Remove Item ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function BuilderComponent_div_9_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r10.closeConfirmCancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, " Close ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
class BuilderComponent {
    constructor(store, cartService, router) {
        this.store = store;
        this.cartService = cartService;
        this.router = router;
        this.confirmFlag = false;
    }
    ngOnInit() {
        setTimeout(() => {
            this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_3__["updateHeader"])({ header: 'Customize!' }));
        });
        // ensure page starts with popup closed
        this.store.dispatch(Object(src_app_modules_order_state_item_edit_item_edit_actions__WEBPACK_IMPORTED_MODULE_0__["closeIngredientSelectorPopup"])());
        this.selectorFlag$ = this.store.select(src_app_modules_order_state_item_edit_item_edit_selectors__WEBPACK_IMPORTED_MODULE_1__["selectSelectorFlag"]);
        // returns the ingredients currently on the item of the chosen type
        // used to pre-select items on the ingredient selector popup:
        this.store.select(src_app_modules_order_state_item_edit_item_edit_selectors__WEBPACK_IMPORTED_MODULE_1__["selectSelectedIngredientsOfType"])
            .subscribe(ingredients => this.popupIngredientList = ingredients);
        this.ingredientsOfType$ = this.store.select(src_app_modules_order_state_item_edit_item_edit_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllIngredientsOfType"]);
        // clear the id/name (if any)
        this.store.select(_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrentItemId"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(id => this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateCurrentItemId"])({ id })));
        this.store.select(_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrentItemName"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(name => this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateCurrentItemName"])({ name })));
        // update price
        this.store.select(_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrentItemPrice"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(price => this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateCurrentItemPriceAndSubtotal"])({ price })));
        // update the name/id
    }
    // #region Methods
    isSelected(id) {
        let ingredientIds;
        this.store.select(_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrentItemIngredientIds"]).subscribe(currentIngredientIds => ingredientIds = currentIngredientIds);
        if (this.popupIngredientList) {
            return ingredientIds.find(ingredientId => ingredientId === id) ? true : false;
        }
        else
            return false;
    }
    submit() {
        this.cartService.addOrderItem();
        this.cartService.updateTotal();
    }
    //#region Popups
    //#region Select Ingredient
    selectIngredient(selectedIngredientId) {
        // (1) deselect if selected
        //else
        // (2.1) if single-select type, deselect any from the popup list from current selected
        // (2.2) select if not selected
        let ingredients;
        // (1)
        this.store.select(_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrentItemIngredientIds"]).subscribe(currentIngredientIds => {
            if (currentIngredientIds.includes(selectedIngredientId)) {
                ingredients = currentIngredientIds.filter(id => id != selectedIngredientId);
            }
            else {
                // (2.1)
                let selectType;
                let popupIngredientIds;
                this.store.select(_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__["selectSelectedIngredientSelectType"]).subscribe(type => selectType = type);
                this.store.select(src_app_modules_order_state_item_edit_item_edit_selectors__WEBPACK_IMPORTED_MODULE_1__["selectSelectedIngredientsOfTypeIds"]).subscribe(ids => popupIngredientIds = ids);
                if (selectType === 'single') {
                    // remove all popup ingredients from current item (clear list of type)
                    currentIngredientIds = currentIngredientIds.filter(ingredientId => !popupIngredientIds.includes(ingredientId));
                }
                // (2.2)
                ingredients = Object.assign([], currentIngredientIds);
                ingredients.push(selectedIngredientId);
            }
        });
        this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateIngredients"])({ ingredients }));
    }
    closeSelectIngredient() {
        this.store.dispatch(Object(src_app_modules_order_state_item_edit_item_edit_actions__WEBPACK_IMPORTED_MODULE_0__["closeIngredientSelectorPopup"])());
        this.store.select(_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrentItemPrice"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(price => this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateCurrentItemPriceAndSubtotal"])({ price })));
    }
    //#endregion Select Ingredient
    openCancelConfirm() {
        this.confirmFlag = true;
    }
    // //#region Confirm Cancel
    confirmCancel() {
        this.confirmFlag = false;
        // current item is cleared on /order onInit
        this.router.navigate(['/order']);
    }
    closeConfirmCancel() {
        this.confirmFlag = false;
    }
}
BuilderComponent.ɵfac = function BuilderComponent_Factory(t) { return new (t || BuilderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_8__["CartService"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"])); };
BuilderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: BuilderComponent, selectors: [["app-builder"]], decls: 10, vars: 4, consts: [[1, "builder-wrap"], [1, "builder"], ["type", "button", "routerLink", "../order-list", 1, "done", "btn-success", 3, "click"], [1, "divider1"], ["type", "button", 1, "cancel", "btn-danger", 3, "click"], ["class", "popup-screen-cover", 4, "ngIf"], [1, "popup-screen-cover"], [1, "popup-window"], [1, "popup-contents"], [4, "ngFor", "ngForOf"], [1, "btn-primary", "close-btn", 3, "click"], [1, "ingredient", "btn", 3, "click"], [1, "msg"], [1, "remove"], [1, "really"], ["type", "button", "routerLink", "../", 1, "remove-btn", "btn-danger", 3, "click"]], template: function BuilderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-builder-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function BuilderComponent_Template_button_click_2_listener() { return ctx.submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Done");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "hr", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function BuilderComponent_Template_button_click_5_listener() { return ctx.openCancelConfirm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, " Cancel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, BuilderComponent_div_7_Template, 7, 3, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, BuilderComponent_div_9_Template, 13, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 2, ctx.selectorFlag$));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.confirmFlag);
    } }, directives: [_builder_form_builder_form_component__WEBPACK_IMPORTED_MODULE_10__["BuilderFormComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["AsyncPipe"]], styles: ["@charset \"UTF-8\";\n@import\u00A0 \"~bootstrap/scss/bootstrap.scss\";\n.btn-success[_ngcontent-%COMP%] {\n  border-color: #647609;\n  color: #101302;\n  background-color: #f3fac6;\n}\n.btn-success[_ngcontent-%COMP%]:disabled {\n  border-color: #101302;\n  color: #647609;\n  background-color: #dcf17e;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #fbcfc5;\n  color: #130501;\n  border-color: #6f1a07;\n}\n.btn-warning[_ngcontent-%COMP%] {\n  border-color: #504416;\n  color: #303030;\n  background-color: #f3edce;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  border-color: #2b2118;\n  color: #0d0a07;\n  background-color: #eae0d7;\n}\n.btn.focus[_ngcontent-%COMP%] {\n  box-shadow: #0d0a0736;\n}\nbutton[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 4vmin;\n  padding: 0 5%;\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid;\n  padding: 0 0.5 vmin;\n  line-height: 1;\n  border-radius: 0.25rem;\n  transition: color 0.15;\n}\nhr[_ngcontent-%COMP%] {\n  margin: 1.5vh 5% 0 5%;\n  border: 1px solid darkgray;\n  box-shadow: 0 0px 0px -10px dimgray;\n}\nbutton[_ngcontent-%COMP%] {\n  align-items: center;\n  justify-content: center;\n}\n.builder-wrap[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [spc1-s] \". . .\" 2vh [spc1-e] [builder-s] \". builder .\" 66vh [builder-e] [spc2-s] \". . .\" 5vh [spc2-e] [done-s] \". done_btn .\" 6vh [done-e] [spc3-s] \". divider1 .\" 3vh [spc3-e] [cancel-s] \". cancel_btn .\" 6vh [cancel-e] [spc5-s] \". . .\" 2vh [spc5-e]/2% 96% 2%;\n  max-width: 1200px;\n  width: 100%;\n  margin: auto;\n}\n.done[_ngcontent-%COMP%] {\n  grid-area: done_btn;\n  border: 1px solid darkgreen;\n}\n.cancel[_ngcontent-%COMP%] {\n  grid-area: cancel_btn;\n  border: 1px solid darkred;\n}\n.add-ingredients-btn[_ngcontent-%COMP%] {\n  grid-area: add_btn;\n}\nhr.divider1[_ngcontent-%COMP%] {\n  grid-area: divider1;\n}\n.divider2[_ngcontent-%COMP%] {\n  grid-area: divider2;\n}\n.builder[_ngcontent-%COMP%] {\n  grid-area: builder;\n  background-color: #f8f5f2;\n  padding: 0.25rem;\n  border-radius: 3px;\n  overflow-y: scroll;\n}\n.holder[_ngcontent-%COMP%] {\n  grid-area: divider1;\n  padding: 1rem;\n}\n.popup-screen-cover[_ngcontent-%COMP%] {\n  grid-area: 1/1/11/4;\n  display: flex;\n  position: relative;\n  width: 100%;\n  height: 90vh;\n  border: 2px solid #272727;\n  background-color: #f8f8f8;\n  padding: 3vh 3%;\n}\n.popup-window[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [s-s] \". . .\" 2fr [s-e] [msg-s] \". contents .\" 60fr [msg-e] [spc1-s] \". . .\" 2fr [spc1-e] [yes-s] \". remove_btn .\" 6fr [yes-e] [spc2-s] \". . .\" 6fr [spc2-e] [close-s] \". close .\" 6fr [close-e] [e-s] \". . .\" 6fr [e-e]/2fr 96fr 2fr;\n  place-self: center stretch;\n  width: 100%;\n  height: 90vh;\n}\n.popup-contents[_ngcontent-%COMP%] {\n  grid-area: contents;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 3vh 3%;\n  background-color: #f8f8f8;\n  overflow: scroll;\n  flex-direction: column;\n}\n.msg[_ngcontent-%COMP%] {\n  grid-area: msg;\n  display: flex;\n  flex-flow: column;\n  justify-items: center;\n  align-items: center;\n  background-color: whitesmoke;\n  padding: 0.5rem;\n  border-radius: 1rem;\n}\n.remove[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2rem;\n}\n.popup-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 96%;\n  overflow: hidden;\n  margin: auto;\n}\n.ingredients-popup[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [s-s] \". . .\" 2px [e-s] [s-s] \". item .\" 6vh [e-s] [e-s] \". . .\" 2px [e-s]/2fr 96fr 2fr;\n  overflow-y: scroll;\n}\n.ingredient[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 1vh 2%;\n  font-weight: bold;\n  background-color: #c4cfd4;\n  color: black;\n  border: 1px #111517;\n}\n.remove-btn[_ngcontent-%COMP%] {\n  grid-area: remove_btn;\n}\n.close-btn[_ngcontent-%COMP%] {\n  grid-area: close;\n}\n.selected[_ngcontent-%COMP%] {\n  background-color: #0d0a07;\n  color: #f5f5f5;\n}\n@media only screen and (min-width: 768px) {\n  .builder-wrap[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template: [spc1-s] \". . . . .\" 2vh [spc1-e] [builder-s] \". builder builder builder .\" 72vh [builder-e] [spc2-s] \". . . . .\" 5vh [spc2-e] [done-s] \". done_btn . cancel_btn .\" 6vh [done-e] [spc3-s] \". . . . .\" 3vh [spc3-e] [spc5-s] \". . . . .\" 2vh [spc5-e]/2% 46% 4% 46% 2%;\n    max-width: 1200px;\n    width: 100%;\n    margin: auto;\n  }\n\n  .popup-screen-cover[_ngcontent-%COMP%] {\n    grid-area: 1/4/11/6;\n    display: flex;\n    position: relative;\n    width: 100%;\n    height: 90vh;\n    border: 2px solid #272727;\n    background-color: #f8f8f8;\n    padding: 3vh 3%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGJ1aWxkZXIuY29tcG9uZW50LnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQix5Q0FBQTtBQVFBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7QURMRjtBQ1FBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFFQSxzQkFBQTtFQUNBLHNCQUFBO0FETkY7QUEvQ0E7RUFDRSxxQkFBQTtFQUNBLDBCQUFBO0VBRUEsbUNBQUE7QUFpREY7QUE5Q0E7RUFDRSxtQkFBQTtFQUNBLHVCQUFBO0FBaURGO0FBOUNBO0VBQ0UsYUFBQTtFQUNBLGtSQUNFO0VBUUYsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQXlDRjtBQXRDQTtFQUNFLG1CQUFBO0VBQ0EsMkJBQUE7QUF5Q0Y7QUF0Q0E7RUFDRSxxQkFBQTtFQUNBLHlCQUFBO0FBeUNGO0FBdENBO0VBQ0Usa0JBQUE7QUF5Q0Y7QUF0Q0E7RUFDRSxtQkFBQTtBQXlDRjtBQXRDQTtFQUNFLG1CQUFBO0FBeUNGO0FBdENBO0VBQ0Usa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFFQSxrQkFBQTtBQXdDRjtBQXJDQTtFQUNFLG1CQUFBO0VBQ0EsYUFBQTtBQXdDRjtBQWxDQTtFQUNFLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBQXFDRjtBQWxDQTtFQUNFLGFBQUE7RUFDQSxvUEFDRTtFQVFGLDBCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUE2QkY7QUF6QkE7RUFDRSxtQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtBQTRCRjtBQXpCQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFFQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUEyQkY7QUF4QkE7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUEyQkY7QUF2QkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBMEJGO0FBdkJBO0VBQ0UsYUFBQTtFQUNBLHNHQUNFO0VBSUYsa0JBQUE7QUFzQkY7QUFuQkE7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUFzQkY7QUFuQkE7RUFDRSxxQkFBQTtBQXNCRjtBQW5CQTtFQUNFLGdCQUFBO0FBc0JGO0FBbEJBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBcUJGO0FBbEJBO0VBQ0U7SUFDRSxhQUFBO0lBQ0Esb1JBQ0U7SUFRRixpQkFBQTtJQUNBLFdBQUE7SUFDQSxZQUFBO0VBYUY7O0VBUEE7SUFDRSxtQkFBQTtJQUNBLGFBQUE7SUFDQSxrQkFBQTtJQUNBLFdBQUE7SUFDQSxZQUFBO0lBQ0EseUJBQUE7SUFDQSx5QkFBQTtJQUNBLGVBQUE7RUFVRjtBQUNGIiwiZmlsZSI6ImJ1aWxkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG5AaW1wb3J0wqAgXCJ+Ym9vdHN0cmFwL3Njc3MvYm9vdHN0cmFwLnNjc3NcIjtcbi5idG4tc3VjY2VzcyB7XG4gIGJvcmRlci1jb2xvcjogIzY0NzYwOTtcbiAgY29sb3I6ICMxMDEzMDI7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2ZhYzY7XG59XG5cbi5idG4tc3VjY2VzczpkaXNhYmxlZCB7XG4gIGJvcmRlci1jb2xvcjogIzEwMTMwMjtcbiAgY29sb3I6ICM2NDc2MDk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkY2YxN2U7XG59XG5cbi5idG4tZGFuZ2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZiY2ZjNTtcbiAgY29sb3I6ICMxMzA1MDE7XG4gIGJvcmRlci1jb2xvcjogIzZmMWEwNztcbn1cblxuLmJ0bi13YXJuaW5nIHtcbiAgYm9yZGVyLWNvbG9yOiAjNTA0NDE2O1xuICBjb2xvcjogIzMwMzAzMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZWRjZTtcbn1cblxuLmJ0bi1wcmltYXJ5IHtcbiAgYm9yZGVyLWNvbG9yOiAjMmIyMTE4O1xuICBjb2xvcjogIzBkMGEwNztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VhZTBkNztcbn1cblxuLmJ0bi5mb2N1cyB7XG4gIGJveC1zaGFkb3c6ICMwZDBhMDczNjtcbn1cblxuYnV0dG9uIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogNHZtaW47XG4gIHBhZGRpbmc6IDAgNSU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQ7XG4gIHBhZGRpbmc6IDAgMC41IHZtaW47XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1O1xufVxuXG5ociB7XG4gIG1hcmdpbjogMS41dmggNSUgMCA1JTtcbiAgYm9yZGVyOiAxcHggc29saWQgZGFya2dyYXk7XG4gIGJveC1zaGFkb3c6IDAgMHB4IDBweCAtMTBweCBkaW1ncmF5O1xufVxuXG5idXR0b24ge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmJ1aWxkZXItd3JhcCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IFtzcGMxLXNdIFwiLiAuIC5cIiAydmggW3NwYzEtZV0gW2J1aWxkZXItc10gXCIuIGJ1aWxkZXIgLlwiIDY2dmggW2J1aWxkZXItZV0gW3NwYzItc10gXCIuIC4gLlwiIDV2aCBbc3BjMi1lXSBbZG9uZS1zXSBcIi4gZG9uZV9idG4gLlwiIDZ2aCBbZG9uZS1lXSBbc3BjMy1zXSBcIi4gZGl2aWRlcjEgLlwiIDN2aCBbc3BjMy1lXSBbY2FuY2VsLXNdIFwiLiBjYW5jZWxfYnRuIC5cIiA2dmggW2NhbmNlbC1lXSBbc3BjNS1zXSBcIi4gLiAuXCIgMnZoIFtzcGM1LWVdLzIlIDk2JSAyJTtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IGF1dG87XG59XG5cbi5kb25lIHtcbiAgZ3JpZC1hcmVhOiBkb25lX2J0bjtcbiAgYm9yZGVyOiAxcHggc29saWQgZGFya2dyZWVuO1xufVxuXG4uY2FuY2VsIHtcbiAgZ3JpZC1hcmVhOiBjYW5jZWxfYnRuO1xuICBib3JkZXI6IDFweCBzb2xpZCBkYXJrcmVkO1xufVxuXG4uYWRkLWluZ3JlZGllbnRzLWJ0biB7XG4gIGdyaWQtYXJlYTogYWRkX2J0bjtcbn1cblxuaHIuZGl2aWRlcjEge1xuICBncmlkLWFyZWE6IGRpdmlkZXIxO1xufVxuXG4uZGl2aWRlcjIge1xuICBncmlkLWFyZWE6IGRpdmlkZXIyO1xufVxuXG4uYnVpbGRlciB7XG4gIGdyaWQtYXJlYTogYnVpbGRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjVmMjtcbiAgcGFkZGluZzogMC4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi5ob2xkZXIge1xuICBncmlkLWFyZWE6IGRpdmlkZXIxO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ucG9wdXAtc2NyZWVuLWNvdmVyIHtcbiAgZ3JpZC1hcmVhOiAxLzEvMTEvNDtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA5MHZoO1xuICBib3JkZXI6IDJweCBzb2xpZCAjMjcyNzI3O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xuICBwYWRkaW5nOiAzdmggMyU7XG59XG5cbi5wb3B1cC13aW5kb3cge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlOiBbcy1zXSBcIi4gLiAuXCIgMmZyIFtzLWVdIFttc2ctc10gXCIuIGNvbnRlbnRzIC5cIiA2MGZyIFttc2ctZV0gW3NwYzEtc10gXCIuIC4gLlwiIDJmciBbc3BjMS1lXSBbeWVzLXNdIFwiLiByZW1vdmVfYnRuIC5cIiA2ZnIgW3llcy1lXSBbc3BjMi1zXSBcIi4gLiAuXCIgNmZyIFtzcGMyLWVdIFtjbG9zZS1zXSBcIi4gY2xvc2UgLlwiIDZmciBbY2xvc2UtZV0gW2Utc10gXCIuIC4gLlwiIDZmciBbZS1lXS8yZnIgOTZmciAyZnI7XG4gIHBsYWNlLXNlbGY6IGNlbnRlciBzdHJldGNoO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA5MHZoO1xufVxuXG4ucG9wdXAtY29udGVudHMge1xuICBncmlkLWFyZWE6IGNvbnRlbnRzO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogM3ZoIDMlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xuICBvdmVyZmxvdzogc2Nyb2xsO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ubXNnIHtcbiAgZ3JpZC1hcmVhOiBtc2c7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogY29sdW1uO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcbn1cblxuLnJlbW92ZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAycmVtO1xufVxuXG4ucG9wdXAtd3JhcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiA5NiU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLmluZ3JlZGllbnRzLXBvcHVwIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZTogW3Mtc10gXCIuIC4gLlwiIDJweCBbZS1zXSBbcy1zXSBcIi4gaXRlbSAuXCIgNnZoIFtlLXNdIFtlLXNdIFwiLiAuIC5cIiAycHggW2Utc10vMmZyIDk2ZnIgMmZyO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi5pbmdyZWRpZW50IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMXZoIDIlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M0Y2ZkNDtcbiAgY29sb3I6IGJsYWNrO1xuICBib3JkZXI6IDFweCAjMTExNTE3O1xufVxuXG4ucmVtb3ZlLWJ0biB7XG4gIGdyaWQtYXJlYTogcmVtb3ZlX2J0bjtcbn1cblxuLmNsb3NlLWJ0biB7XG4gIGdyaWQtYXJlYTogY2xvc2U7XG59XG5cbi5zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDBhMDc7XG4gIGNvbG9yOiAjZjVmNWY1O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5idWlsZGVyLXdyYXAge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZTogW3NwYzEtc10gXCIuIC4gLiAuIC5cIiAydmggW3NwYzEtZV0gW2J1aWxkZXItc10gXCIuIGJ1aWxkZXIgYnVpbGRlciBidWlsZGVyIC5cIiA3MnZoIFtidWlsZGVyLWVdIFtzcGMyLXNdIFwiLiAuIC4gLiAuXCIgNXZoIFtzcGMyLWVdIFtkb25lLXNdIFwiLiBkb25lX2J0biAuIGNhbmNlbF9idG4gLlwiIDZ2aCBbZG9uZS1lXSBbc3BjMy1zXSBcIi4gLiAuIC4gLlwiIDN2aCBbc3BjMy1lXSBbc3BjNS1zXSBcIi4gLiAuIC4gLlwiIDJ2aCBbc3BjNS1lXS8yJSA0NiUgNCUgNDYlIDIlO1xuICAgIG1heC13aWR0aDogMTIwMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgfVxuXG4gIC5wb3B1cC1zY3JlZW4tY292ZXIge1xuICAgIGdyaWQtYXJlYTogMS80LzExLzY7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA5MHZoO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICMyNzI3Mjc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbiAgICBwYWRkaW5nOiAzdmggMyU7XG4gIH1cbn0iLCJAaW1wb3J0wqAgJ35ib290c3RyYXAvc2Nzcy9ib290c3RyYXAuc2Nzcyc7XHJcbiRib3JkZXItbWVkOiAjNjQ3NjA5O1xyXG4kYm9yZGVyLWRhcms6ICMxMDEzMDI7XHJcbiRib3JkZXItbGlnaHQ6ICNmM2ZhYzY7XHJcbiRiZy1kYXJrOiAjNjQ3NjA5O1xyXG4kYmctbGlnaHQ6ICNmM2ZhYzY7XHJcbiRiZy12ZXJ5LWxpZ2h0OiAjZmJmZGVjO1xyXG5cclxuLmJ0bi1zdWNjZXNzIHtcclxuICBib3JkZXItY29sb3I6ICM2NDc2MDk7XHJcbiAgY29sb3I6ICMxMDEzMDI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZmFjNjtcclxufVxyXG5cclxuLmJ0bi1zdWNjZXNzOmRpc2FibGVkIHtcclxuICBib3JkZXItY29sb3I6ICMxMDEzMDI7XHJcbiAgY29sb3I6ICM2NDc2MDk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RjZjE3ZTtcclxufVxyXG5cclxuLmJ0bi1kYW5nZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYmNmYzU7XHJcbiAgY29sb3I6ICMxMzA1MDE7XHJcbiAgYm9yZGVyLWNvbG9yOiAjNmYxYTA3O1xyXG59XHJcblxyXG4uYnRuLXdhcm5pbmcge1xyXG4gIGJvcmRlci1jb2xvcjogIzUwNDQxNjtcclxuICBjb2xvcjogcmdiKDQ4LCA0OCwgNDgpO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2VkY2U7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMmIyMTE4O1xyXG4gIGNvbG9yOiAjMGQwYTA3O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlYWUwZDc7XHJcbn1cclxuXHJcbi5idG4uZm9jdXMge1xyXG4gIGJveC1zaGFkb3c6ICMwZDBhMDczNjtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LXNpemU6IDR2bWluO1xyXG4gIHBhZGRpbmc6IDAgNSU7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQ7XHJcbiAgcGFkZGluZzogMCAwLjUgdm1pbjtcclxuICBsaW5lLWhlaWdodDogMTtcclxuXHJcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcclxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1O1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "l3ve":
/*!************************************************************!*\
  !*** ./src/app/modules/payment/state/payment.selectors.ts ***!
  \************************************************************/
/*! exports provided: selectPaymentState, selectPayResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectPaymentState", function() { return selectPaymentState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectPayResult", function() { return selectPayResult; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _payment_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment.reducer */ "j7ow");


const selectPaymentState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_payment_reducer__WEBPACK_IMPORTED_MODULE_1__["paymentFeatureKey"]);
const selectPayResult = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectPaymentState, (state) => state.result);


/***/ }),

/***/ "lb8U":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/order/components/builder-form/builder-form.component.ts ***!
  \*********************************************************************************/
/*! exports provided: BuilderFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuilderFormComponent", function() { return BuilderFormComponent; });
/* harmony import */ var src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/stores/selectors/order-static-data.selectors */ "bDRp");
/* harmony import */ var src_app_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/order/state/current-item/current-item.selectors */ "0G+c");
/* harmony import */ var src_app_modules_order_state_item_edit_item_edit_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/order/state/item-edit/item-edit.actions */ "d5cx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _services_currentItems_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/currentItems.service */ "d8ee");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







function BuilderFormComponent_ng_container_0_div_1_ng_container_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_div_1_ng_container_6_ng_container_1_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](4); return ctx_r13.editIngredients("Bread"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const bread_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", bread_r11.name, " ");
} }
function BuilderFormComponent_ng_container_0_div_1_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_div_1_ng_container_6_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const bread_r11 = ctx.$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r10.inSelected(bread_r11.id));
} }
function BuilderFormComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r16.editIngredients("Bread"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Bread");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, BuilderFormComponent_ng_container_0_div_1_ng_container_6_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("@ $", ctx_r2.iType["Bread"].price, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.breads);
} }
function BuilderFormComponent_ng_container_0_div_2_ng_container_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const green_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", green_r19.name, " ");
} }
function BuilderFormComponent_ng_container_0_div_2_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_div_2_ng_container_6_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const green_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r18.inSelected(green_r19.id));
} }
function BuilderFormComponent_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_div_2_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r22.editIngredients("Greens"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Greens");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, BuilderFormComponent_ng_container_0_div_2_ng_container_6_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" @ $", ctx_r3.iType["Greens"].price, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r3.greens);
} }
function BuilderFormComponent_ng_container_0_ng_container_9_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const meat_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", meat_r24.name, " ");
} }
function BuilderFormComponent_ng_container_0_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_ng_container_9_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const meat_r24 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r4.inSelected(meat_r24.id));
} }
function BuilderFormComponent_ng_container_0_ng_container_16_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const cheese_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", cheese_r27.name, " ");
} }
function BuilderFormComponent_ng_container_0_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_ng_container_16_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const cheese_r27 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.inSelected(cheese_r27.id));
} }
function BuilderFormComponent_ng_container_0_ng_container_23_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const veggie_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", veggie_r30.name, " ");
} }
function BuilderFormComponent_ng_container_0_ng_container_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_ng_container_23_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const veggie_r30 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r6.inSelected(veggie_r30.id));
} }
function BuilderFormComponent_ng_container_0_div_24_ng_container_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const nutsFruit_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", nutsFruit_r34.name, " ");
} }
function BuilderFormComponent_ng_container_0_div_24_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_div_24_ng_container_6_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const nutsFruit_r34 = ctx.$implicit;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r33.inSelected(nutsFruit_r34.id));
} }
function BuilderFormComponent_ng_container_0_div_24_Template(rf, ctx) { if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_div_24_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r38); const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r37.editIngredients("Nuts/Fruit"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Nuts/Fruits");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, BuilderFormComponent_ng_container_0_div_24_ng_container_6_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" @ $", ctx_r7.iType["Nuts/Fruit"].price, " each ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r7.nutsFruits);
} }
function BuilderFormComponent_ng_container_0_div_25_ng_container_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const condiment_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", condiment_r40.name, " ");
} }
function BuilderFormComponent_ng_container_0_div_25_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_div_25_ng_container_6_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const condiment_r40 = ctx.$implicit;
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r39.inSelected(condiment_r40.id));
} }
function BuilderFormComponent_ng_container_0_div_25_Template(rf, ctx) { if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_div_25_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r44); const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r43.editIngredients("Condiments"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Condiments");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, BuilderFormComponent_ng_container_0_div_25_ng_container_6_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" @ $", ctx_r8.iType["Condiments"].price, " each ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r8.condiments);
} }
function BuilderFormComponent_ng_container_0_div_26_ng_container_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const dressing_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", dressing_r46.name, " ");
} }
function BuilderFormComponent_ng_container_0_div_26_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_div_26_ng_container_6_ng_container_1_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const dressing_r46 = ctx.$implicit;
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r45.inSelected(dressing_r46.id));
} }
function BuilderFormComponent_ng_container_0_div_26_Template(rf, ctx) { if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_div_26_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r50); const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2); return ctx_r49.editIngredients("Dressings"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Dressings");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, BuilderFormComponent_ng_container_0_div_26_ng_container_6_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" @ $", ctx_r9.iType["Dressings"].price, " each ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r9.dressings);
} }
function BuilderFormComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, BuilderFormComponent_ng_container_0_div_1_Template, 7, 2, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, BuilderFormComponent_ng_container_0_div_2_Template, 7, 2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_Template_div_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r51.editIngredients("Meat"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Meats");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, BuilderFormComponent_ng_container_0_ng_container_9_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_Template_div_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r53.editIngredients("Cheese"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "Cheeses");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, BuilderFormComponent_ng_container_0_ng_container_16_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BuilderFormComponent_ng_container_0_Template_div_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r54.editIngredients("Veggies"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "Veggies");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](23, BuilderFormComponent_ng_container_0_ng_container_23_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, BuilderFormComponent_ng_container_0_div_24_Template, 7, 2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, BuilderFormComponent_ng_container_0_div_25_Template, 7, 2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, BuilderFormComponent_ng_container_0_div_26_Template, 7, 2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const group_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", group_r1 == "sandwich");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", group_r1 == "salad");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("@ $", ctx_r0.iType["Meat"].price, " each ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.meats);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("@ $", ctx_r0.iType["Cheese"].price, " each ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.cheeses);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" @ $", ctx_r0.iType["Veggies"].price, " each ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.veggies);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", group_r1 == "salad");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", group_r1 == "sandwich");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", group_r1 == "salad");
} }
class BuilderFormComponent {
    constructor(store, service) {
        this.store = store;
        this.service = service;
        //#region Flags
        this.selectorFlag = false;
        this.popupFlag = false;
        //#endregion Ingredient Lists
        //#endregion declarations
        this.ingredients = [];
    }
    ngOnInit() {
        this.ingredients$ = this.store.select(src_app_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCurrentItemIngredients"]);
        this.store.select(src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_0__["selectIngredientTypes"]).subscribe(ingredientType => {
            this.iType = ingredientType;
        });
        this.itemGroup$ = this.store.select(src_app_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCurrentItemGroup"]);
        //#region select ingredient groups
        this.breads = this.service.getIngredient('Bread');
        this.greens = this.service.getIngredient('Greens');
        this.meats = this.service.getIngredient('Meat');
        this.cheeses = this.service.getIngredient('Cheese');
        this.veggies = this.service.getIngredient('Veggies');
        this.nutsFruits = this.service.getIngredient('Nuts/Fruit');
        this.condiments = this.service.getIngredient('Condiments');
        this.dressings = this.service.getIngredient('Dressings');
        //#endregion ingredient groups
    }
    //#region POPUP METHODS
    confirmCancel() {
        // when a user taps cancel
        // a popup asks if the user is sure (cancels current item)
    }
    editIngredients(type) {
        // when a user taps either an ingredient or its header
        // a popup listing the ingredients of that type appears
        this.store.dispatch(src_app_modules_order_state_item_edit_item_edit_actions__WEBPACK_IMPORTED_MODULE_2__["updateEditIngredientType"]({ ingredientType: type }));
        // DELETE
        // create list of ingredients to show in popup (type selected)
        // let allIngredientsOfType: IngredientList
        // this.store.select(selectAllIngredients).subscribe(all =>
        //   allIngredientsOfType = all.filter(i => i.type === type)
        // )
        // send to the store
        // this.store.dispatch(fromItemEdit.updateAllIngredientsOfType(
        //   { allIngredientsOfType: allIngredientsOfType }
        // ))
        // create a temporary list of currently selected ingredients where items can be added/removed without affecting current item
        let selectedIngredients;
        this.store.select(src_app_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCurrentItemIngredients"])
            .subscribe(ingredients => selectedIngredients = ingredients.filter(i => i.type === type));
        // send to the store
        this.store.dispatch(src_app_modules_order_state_item_edit_item_edit_actions__WEBPACK_IMPORTED_MODULE_2__["updateTempIngredientsOfType"]({ selectedIngredientsOfType: selectedIngredients }));
        // update selector flag in builder to open selector popup
        this.store.dispatch(src_app_modules_order_state_item_edit_item_edit_actions__WEBPACK_IMPORTED_MODULE_2__["openIngredientSelectorPopup"]());
    }
    //#endregion popup methods
    onSubmit() {
    }
    inSelected(typeId) {
        let result = false;
        this.ingredients$.subscribe(ingredients => {
            ingredients.forEach(ingredient => {
                if (ingredient.id === typeId) {
                    result = true;
                    return;
                }
            });
        });
        return result;
    }
}
BuilderFormComponent.ɵfac = function BuilderFormComponent_Factory(t) { return new (t || BuilderFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_currentItems_service__WEBPACK_IMPORTED_MODULE_5__["CurrentItemService"])); };
BuilderFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: BuilderFormComponent, selectors: [["app-builder-form"]], decls: 2, vars: 3, consts: [[4, "ngIf"], ["class", "bread typeContainer", 3, "click", 4, "ngIf"], ["class", "green typeContainer", 3, "click", 4, "ngIf"], [1, "meat", "typeContainer", 3, "click"], [1, "ingredient-header"], [1, "ingredient-list"], [4, "ngFor", "ngForOf"], [1, "cheese", "typeContainer", 3, "click"], [1, "veggie", "typeContainer", 3, "click"], ["class", "nuts-fruit typeContainer", 3, "click", 4, "ngIf"], ["class", "condiment typeContainer", 3, "click", 4, "ngIf"], ["class", "dressing typeContainer", 3, "click", 4, "ngIf"], [1, "bread", "typeContainer", 3, "click"], [1, "breads", "ingredient", 3, "click"], [1, "green", "typeContainer", 3, "click"], [1, "greens", "ingredient"], [1, "meats", "ingredient"], [1, "cheeses", "ingredient"], [1, "veggies", "ingredient"], [1, "nuts-fruit", "typeContainer", 3, "click"], [1, "nuts-fruits", "ingredient"], [1, "condiment", "typeContainer", 3, "click"], [1, "condiments", "ingredient"], [1, "dressing", "typeContainer", 3, "click"], [1, "dressings", "ingredient"]], template: function BuilderFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, BuilderFormComponent_ng_container_0_Template, 27, 11, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, ctx.itemGroup$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: [".typeContainer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: row wrap;\n  width: 100%;\n  border-width: 1px;\n  border-bottom: 1px solid #6a6a6a;\n  border-radius: 3px;\n  box-shadow: #6b6b6b;\n  font-size: 4vmin;\n  font-weight: bold;\n  padding: 0.5vmin;\n}\n\n.ingredient-header[_ngcontent-%COMP%] {\n  width: 20%;\n  display: flex;\n  text-align: left;\n  font-size: 3vmin;\n  align-items: center;\n}\n\n.ingredient-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-around;\n  width: 80%;\n}\n\n.ingredient[_ngcontent-%COMP%] {\n  grid-area: ingredient;\n  display: flex;\n  position: relative;\n  text-align: start;\n  border-radius: 0.5rem;\n  border: 0.5px solid #6b6b6b;\n  align-items: center;\n  margin: 1% 2%;\n  padding: 1vmin 5%;\n  font-size: 4vmin;\n  color: white;\n}\n\n.remove[_ngcontent-%COMP%] {\n  grid-area: remove;\n  border: 1px solid darkred;\n}\n\nbutton[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 1vmin;\n  justify-content: center;\n  align-items: center;\n  font-weight: bolder;\n  font-size: 4vmin;\n}\n\n.bread[_ngcontent-%COMP%] {\n  background-color: #f3e0cf;\n}\n\n.breads[_ngcontent-%COMP%] {\n  background-color: #403712;\n}\n\n.green[_ngcontent-%COMP%] {\n  background-color: #e9f8a0;\n}\n\n.greens[_ngcontent-%COMP%] {\n  background-color: #90ab0d;\n}\n\n.meat[_ngcontent-%COMP%] {\n  background-color: #cccccc;\n}\n\n.meats[_ngcontent-%COMP%] {\n  background-color: #3d3d3d;\n}\n\n.cheese[_ngcontent-%COMP%] {\n  background-color: #ffdd99;\n}\n\n.cheeses[_ngcontent-%COMP%] {\n  background-color: #e09600;\n}\n\n.veggie[_ngcontent-%COMP%] {\n  background-color: #e1f57a;\n}\n\n.veggies[_ngcontent-%COMP%] {\n  background-color: #505f07;\n}\n\n.condiment[_ngcontent-%COMP%] {\n  background-color: #fbcfc5;\n}\n\n.condiments[_ngcontent-%COMP%] {\n  background-color: #d3320d;\n}\n\n.dressing[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n}\n\n.dressings[_ngcontent-%COMP%] {\n  background-color: #8f8f8f;\n}\n\n.nuts-fruit[_ngcontent-%COMP%] {\n  background-color: #e0d08f;\n}\n\n.nuts-fruits[_ngcontent-%COMP%] {\n  background-color: #504416;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGJ1aWxkZXItZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UscUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRiIsImZpbGUiOiJidWlsZGVyLWZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudHlwZUNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci13aWR0aDogMXB4O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2IoMTA2LCAxMDYsIDEwNik7XHJcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xyXG4gIGJveC1zaGFkb3c6IHJnYigxMDcsIDEwNywgMTA3KTtcclxuICBmb250LXNpemU6IDR2bWluO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIHBhZGRpbmc6IDAuNXZtaW47XHJcbn1cclxuXHJcbi5pbmdyZWRpZW50LWhlYWRlciB7XHJcbiAgd2lkdGg6IDIwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgZm9udC1zaXplOiAzdm1pbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uaW5ncmVkaWVudC1saXN0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogcm93IHdyYXA7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgd2lkdGg6IDgwJTtcclxufVxyXG5cclxuLmluZ3JlZGllbnQge1xyXG4gIGdyaWQtYXJlYTogaW5ncmVkaWVudDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0ZXh0LWFsaWduOiBzdGFydDtcclxuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XHJcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW46IDElIDIlO1xyXG4gIHBhZGRpbmc6IDF2bWluIDUlO1xyXG4gIGZvbnQtc2l6ZTogNHZtaW47XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4ucmVtb3ZlIHtcclxuICBncmlkLWFyZWE6IHJlbW92ZTtcclxuICBib3JkZXI6IDFweCBzb2xpZCBkYXJrcmVkO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luOiAxdm1pbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgZm9udC1zaXplOiA0dm1pbjtcclxufVxyXG5cclxuLmJyZWFkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQzLCAyMjQsIDIwNyk7XHJcbn1cclxuXHJcbi5icmVhZHMge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MDM3MTI7XHJcbn1cclxuXHJcbi5ncmVlbiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U5ZjhhMDtcclxufVxyXG5cclxuLmdyZWVucyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzkwYWIwZDtcclxufVxyXG5cclxuLm1lYXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2NjY2M7XHJcbn1cclxuXHJcbi5tZWF0cyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkM2QzZDtcclxufVxyXG5cclxuLmNoZWVzZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZGQ5OTtcclxufVxyXG5cclxuLmNoZWVzZXMge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMDk2MDA7XHJcbn1cclxuXHJcbi52ZWdnaWUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMWY1N2E7XHJcbn1cclxuXHJcbi52ZWdnaWVzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTA1ZjA3O1xyXG59XHJcblxyXG4uY29uZGltZW50IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJjZmM1O1xyXG59XHJcblxyXG4uY29uZGltZW50cyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QzMzIwZDtcclxufVxyXG5cclxuLmRyZXNzaW5nIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG59XHJcblxyXG4uZHJlc3NpbmdzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGY4ZjhmO1xyXG59XHJcblxyXG4ubnV0cy1mcnVpdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZDA4ZjtcclxufVxyXG5cclxuLm51dHMtZnJ1aXRzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTA0NDE2O1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "mPhv":
/*!******************************************************!*\
  !*** ./src/app/modules/order/state/order.reducer.ts ***!
  \******************************************************/
/*! exports provided: orderFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderFeatureKey", function() { return orderFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _order_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order.actions */ "gP9/");


const orderFeatureKey = 'order';
const initialState = {};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_order_actions__WEBPACK_IMPORTED_MODULE_1__["loadOrders"], state => state), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_order_actions__WEBPACK_IMPORTED_MODULE_1__["loadOrdersSuccess"], (state, action) => state), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_order_actions__WEBPACK_IMPORTED_MODULE_1__["loadOrdersFailure"], (state, action) => state));


/***/ }),

/***/ "oVPa":
/*!***************************************************!*\
  !*** ./src/app/modules/payment/payment.module.ts ***!
  \***************************************************/
/*! exports provided: PaymentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentModule", function() { return PaymentModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_payment_payment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/payment/payment.component */ "87iz");
/* harmony import */ var _components_pay_pay_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pay/pay.component */ "u8Zo");
/* harmony import */ var _payment_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment-routing.module */ "6w4R");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _state_payment_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/payment.reducer */ "j7ow");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _state_payment_effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/payment.effects */ "tc+U");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngrx/effects */ "9jGm");
/* harmony import */ var _components_pay_tx_result_pay_tx_result_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/pay-tx-result/pay-tx-result.component */ "LOrT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");













class PaymentModule {
}
PaymentModule.ɵfac = function PaymentModule_Factory(t) { return new (t || PaymentModule)(); };
PaymentModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: PaymentModule });
PaymentModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _payment_routing_module__WEBPACK_IMPORTED_MODULE_3__["PaymentRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_8__["EffectsModule"].forFeature([_state_payment_effects__WEBPACK_IMPORTED_MODULE_7__["PaymentEffects"]]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_6__["StoreModule"].forFeature(_state_payment_reducer__WEBPACK_IMPORTED_MODULE_5__["paymentFeatureKey"], _state_payment_reducer__WEBPACK_IMPORTED_MODULE_5__["reducer"]),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](PaymentModule, { declarations: [_components_payment_payment_component__WEBPACK_IMPORTED_MODULE_1__["PaymentComponent"],
        _components_pay_pay_component__WEBPACK_IMPORTED_MODULE_2__["PayComponent"],
        _components_pay_tx_result_pay_tx_result_component__WEBPACK_IMPORTED_MODULE_9__["PayTxResultComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _payment_routing_module__WEBPACK_IMPORTED_MODULE_3__["PaymentRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _ngrx_effects__WEBPACK_IMPORTED_MODULE_8__["EffectsFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_6__["StoreFeatureModule"]] }); })();


/***/ }),

/***/ "rm3g":
/*!**************************************!*\
  !*** ./src/app/barrels/app-mocks.ts ***!
  \**************************************/
/*! exports provided: AppMockInterceptors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMockInterceptors", function() { return AppMockInterceptors; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _mocks_payment_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mocks/payment.interceptor */ "570T");
/* harmony import */ var _mocks_staticData_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mocks/staticData.interceptor */ "GxtG");



const AppMockInterceptors = [
    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HTTP_INTERCEPTORS"], useClass: _mocks_payment_interceptor__WEBPACK_IMPORTED_MODULE_1__["MockPaymentInterceptor"], multi: true },
    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HTTP_INTERCEPTORS"], useClass: _mocks_staticData_interceptor__WEBPACK_IMPORTED_MODULE_2__["MockOrderStaticDataInterceptor"], multi: true }
];


/***/ }),

/***/ "sMsK":
/*!**************************************************************!*\
  !*** ./src/app/stores/reducers/order-static-data.reducer.ts ***!
  \**************************************************************/
/*! exports provided: orderStaticDataFeatureKey, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderStaticDataFeatureKey", function() { return orderStaticDataFeatureKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/order-static-data.actions */ "UsQq");


const orderStaticDataFeatureKey = 'orderStaticData';
const initialState = {
    specialties: [],
    ingredients: [],
    ingredientTypes: {},
    desserts: [],
    drinks: [],
    sides: [],
};
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_1__["loadStaticOrderDataSuccess"], (state, action) => {
    return action.data;
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_actions_order_static_data_actions__WEBPACK_IMPORTED_MODULE_1__["loadStaticOrderDataFailure"], (state, action) => state));


/***/ }),

/***/ "sWgc":
/*!***********************************************************!*\
  !*** ./src/app/modules/shared/footer/footer.component.ts ***!
  \***********************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 2, vars: 0, template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "footer works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "tUrS":
/*!*********************************************************!*\
  !*** ./src/app/app/services/OrderStaticData.service.ts ***!
  \*********************************************************/
/*! exports provided: OrderStaticDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderStaticDataService", function() { return OrderStaticDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class OrderStaticDataService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'https://svenpire.github.io/database.json';
    }
    getOrderStaticData() {
        const url = this.baseUrl + 'orderStaticData/';
        const body = '';
        let htpOptions;
        return this.http.get(url);
    }
}
OrderStaticDataService.ɵfac = function OrderStaticDataService_Factory(t) { return new (t || OrderStaticDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
OrderStaticDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: OrderStaticDataService, factory: OrderStaticDataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "tc+U":
/*!**********************************************************!*\
  !*** ./src/app/modules/payment/state/payment.effects.ts ***!
  \**********************************************************/
/*! exports provided: PaymentEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentEffects", function() { return PaymentEffects; });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ "9jGm");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _payment_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment.actions */ "Zclr");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _payment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../payment.service */ "StcJ");







class PaymentEffects {
    constructor(actions$, payService) {
        this.actions$ = actions$;
        this.payService = payService;
        this.payResult$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["createEffect"])(() => this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["ofType"])(_payment_actions__WEBPACK_IMPORTED_MODULE_3__["postPayment"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])((action) => this.payService.getPayResultsDB(action.data).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(data => _payment_actions__WEBPACK_IMPORTED_MODULE_3__["postPaymentSuccess"]({ data })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(error => Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(_payment_actions__WEBPACK_IMPORTED_MODULE_3__["postPaymentFailure"]({ error })))))));
    }
}
PaymentEffects.ɵfac = function PaymentEffects_Factory(t) { return new (t || PaymentEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["Actions"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_payment_service__WEBPACK_IMPORTED_MODULE_5__["PaymentService"])); };
PaymentEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: PaymentEffects, factory: PaymentEffects.ɵfac });


/***/ }),

/***/ "u8Zo":
/*!*****************************************************************!*\
  !*** ./src/app/modules/payment/components/pay/pay.component.ts ***!
  \*****************************************************************/
/*! exports provided: PayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayComponent", function() { return PayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class PayComponent {
    constructor() { }
    ngOnInit() {
    }
}
PayComponent.ɵfac = function PayComponent_Factory(t) { return new (t || PayComponent)(); };
PayComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PayComponent, selectors: [["app-pay"]], decls: 1, vars: 0, template: function PayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXkuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _modules_order_order_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/order/order.component */ "MsO7");
/* harmony import */ var _modules_pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/pages/home/home.component */ "Hque");
/* harmony import */ var _modules_payment_components_pay_pay_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/payment/components/pay/pay.component */ "u8Zo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






const routes = [
    { path: '', component: _modules_pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] },
    {
        path: 'order', component: _modules_order_order_component__WEBPACK_IMPORTED_MODULE_1__["OrderComponent"],
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./modules/order/order.module */ "yzJG"))
            .then(m => m.OrderModule)
    },
    {
        path: 'pay', component: _modules_payment_components_pay_pay_component__WEBPACK_IMPORTED_MODULE_3__["PayComponent"],
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./modules/payment/payment.module */ "oVPa"))
            .then(m => m.PaymentModule)
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "wY/J":
/*!***************************************************************************!*\
  !*** ./src/app/modules/order/components/specialty/specialty.component.ts ***!
  \***************************************************************************/
/*! exports provided: SpecialtyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpecialtyComponent", function() { return SpecialtyComponent; });
/* harmony import */ var src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/order/state/current-item/current-item.actions */ "Bszr");
/* harmony import */ var src_app_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/order/state/current-item/current-item.selectors */ "0G+c");
/* harmony import */ var src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/stores/selectors/order-static-data.selectors */ "bDRp");
/* harmony import */ var _shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/state/shared.actions */ "2jiJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _services_currentItems_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/currentItems.service */ "d8ee");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");









function SpecialtyComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SpecialtyComponent_ng_container_0_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3); const recipe_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r2.loadSpecialty(recipe_r1.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const recipe_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("src", recipe_r1.img, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", recipe_r1.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$ ", ctx_r0.calculateSpecialtyPrice(recipe_r1), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", recipe_r1.description, " ");
} }
class SpecialtyComponent {
    constructor(store, service) {
        this.store = store;
        this.service = service;
        this.myArray = [];
        this.specialties$ = this.store.select(src_app_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_1__["selectSpecialtiesOfGroup"]);
    }
    ngOnInit() {
        setTimeout(() => {
            this.store.dispatch(Object(_shared_state_shared_actions__WEBPACK_IMPORTED_MODULE_3__["updateHeader"])({ header: 'Specialty Selector' }));
        });
    }
    // before exiting use the selected ID to load the
    // specialty as the current item
    // find specialty
    loadSpecialty(selectedSpecialtyId) {
        let specialtyIngredients;
        // update store with specialty id
        this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_0__["updateSpecialtyId"])({ selectedSpecialtyId }));
        // load specialty ingredients to the current item
        this.store.select(src_app_modules_order_state_current_item_current_item_selectors__WEBPACK_IMPORTED_MODULE_1__["selectSpecialtyIngredientIds"]).subscribe(ingredients => this.store.dispatch(Object(src_app_modules_order_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_0__["updateIngredients"])({ ingredients })));
    }
    calculateSpecialtyPrice(specialty) {
        let totalPrice = 0;
        let price;
        let allIngredients;
        let ingredientTypes;
        // get all ingredients & their type info
        this.store.select(src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectAllIngredients"]).subscribe(ingredients => allIngredients = ingredients);
        this.store.select(src_app_stores_selectors_order_static_data_selectors__WEBPACK_IMPORTED_MODULE_2__["selectIngredientTypes"]).subscribe(types => ingredientTypes = types);
        // look up each specialty ingredient to get type
        specialty.ingredients.forEach(sIngredientId => {
            let currentIngredient = allIngredients.find(ingredient => sIngredientId === ingredient.id);
            // return the price and add to the running total
            totalPrice += +ingredientTypes[currentIngredient.type].price;
        });
        price = totalPrice.toFixed(2);
        return price;
    }
}
SpecialtyComponent.ɵfac = function SpecialtyComponent_Factory(t) { return new (t || SpecialtyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_currentItems_service__WEBPACK_IMPORTED_MODULE_6__["CurrentItemService"])); };
SpecialtyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: SpecialtyComponent, selectors: [["app-specialty"]], decls: 2, vars: 3, consts: [[4, "ngFor", "ngForOf"], [1, "specialty-wrapper"], [1, "recipe-wrap"], [1, "fill"], ["alt", "", 1, "fill", 3, "src"], ["type", "button", "routerLink", "../builder", 1, "btn-success", 3, "click"], [1, "description"], [1, "price"]], template: function SpecialtyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SpecialtyComponent_ng_container_0_Template, 11, 4, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, ctx.specialties$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterLink"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"]], styles: ["@charset \"UTF-8\";\n@import\u00A0 \"~bootstrap/scss/bootstrap.scss\";\n.btn-success[_ngcontent-%COMP%] {\n  border-color: #647609;\n  color: #101302;\n  background-color: #f3fac6;\n}\n.btn-success[_ngcontent-%COMP%]:disabled {\n  border-color: #101302;\n  color: #647609;\n  background-color: #dcf17e;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #fbcfc5;\n  color: #130501;\n  border-color: #6f1a07;\n}\n.btn-warning[_ngcontent-%COMP%] {\n  border-color: #504416;\n  color: #303030;\n  background-color: #f3edce;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  border-color: #2b2118;\n  color: #0d0a07;\n  background-color: #eae0d7;\n}\n.btn.focus[_ngcontent-%COMP%] {\n  box-shadow: #0d0a0736;\n}\nbutton[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 4vmin;\n  padding: 0 5%;\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid;\n  padding: 0 0.5 vmin;\n  line-height: 1;\n  border-radius: 0.25rem;\n  transition: color 0.15;\n}\n.specialty-wrapper[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template: [s1] \". . .\" 2vh [e1] [s2] \". item-wrap .\" 26vh [e2] [s3] \". . .\" 2vh [e3]/2% 96% 2%;\n  width: 100%;\n  max-width: 1200px;\n  margin-inline: auto;\n}\n.recipe-wrap[_ngcontent-%COMP%] {\n  display: grid;\n  grid-area: item-wrap;\n  grid-template: [s1] \". . . . .\" 2fr [e1] [s2] \". . . description .\" 20fr [e2] [s3] \". btn . description .\" 6fr [e3] [s4] \". . . . .\" 2fr [e4]/3fr 44fr 6fr 44fr 3fr;\n}\n.price[_ngcontent-%COMP%] {\n  display: flex;\n  font-weight: bold;\n  font-size: 4vmin;\n  float: right;\n  margin: 0 1.5vmin 1.5vmin;\n  overflow: auto;\n}\n.description[_ngcontent-%COMP%] {\n  grid-area: description;\n  padding: 0.75vmin;\n  z-index: 1;\n  background-color: rgba(251, 253, 236, 0.8);\n  font-size: 2.5vmin;\n  overflow-y: scroll;\n}\n.fill[_ngcontent-%COMP%] {\n  grid-area: 1/1/5/6;\n  display: flex;\n  overflow: hidden;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #647609;\n}\n.fill[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-width: 100%;\n  min-height: 100%;\n  z-index: 0;\n}\nbutton[_ngcontent-%COMP%] {\n  font-weight: bold;\n  grid-area: btn;\n  z-index: 2;\n  font-size: 4vmin;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHNwZWNpYWx0eS5jb21wb25lbnQuc2NzcyIsIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcc3R5bGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDQWhCLHlDQUFBO0FBUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSx5QkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBRExGO0FDUUE7RUFDRSxxQkFBQTtBRExGO0FDUUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUVBLHNCQUFBO0VBQ0Esc0JBQUE7QURORjtBQWhEQTtFQUNFLGFBQUE7RUFDQSxtR0FDRTtFQUlGLFdBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBK0NGO0FBNUNBO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsbUtBQ0U7QUE4Q0o7QUF2Q0E7RUFDRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7QUEwQ0Y7QUF2Q0E7RUFDRSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLDBDQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQTBDRjtBQXZDQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0FBMENGO0FBdkNBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7QUEwQ0Y7QUF2Q0E7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUEwQ0YiLCJmaWxlIjoic3BlY2lhbHR5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuQGltcG9ydMKgIFwifmJvb3RzdHJhcC9zY3NzL2Jvb3RzdHJhcC5zY3NzXCI7XG4uYnRuLXN1Y2Nlc3Mge1xuICBib3JkZXItY29sb3I6ICM2NDc2MDk7XG4gIGNvbG9yOiAjMTAxMzAyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNmYWM2O1xufVxuXG4uYnRuLXN1Y2Nlc3M6ZGlzYWJsZWQge1xuICBib3JkZXItY29sb3I6ICMxMDEzMDI7XG4gIGNvbG9yOiAjNjQ3NjA5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGNmMTdlO1xufVxuXG4uYnRuLWRhbmdlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYmNmYzU7XG4gIGNvbG9yOiAjMTMwNTAxO1xuICBib3JkZXItY29sb3I6ICM2ZjFhMDc7XG59XG5cbi5idG4td2FybmluZyB7XG4gIGJvcmRlci1jb2xvcjogIzUwNDQxNjtcbiAgY29sb3I6ICMzMDMwMzA7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2VkY2U7XG59XG5cbi5idG4tcHJpbWFyeSB7XG4gIGJvcmRlci1jb2xvcjogIzJiMjExODtcbiAgY29sb3I6ICMwZDBhMDc7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlYWUwZDc7XG59XG5cbi5idG4uZm9jdXMge1xuICBib3gtc2hhZG93OiAjMGQwYTA3MzY7XG59XG5cbmJ1dHRvbiB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDR2bWluO1xuICBwYWRkaW5nOiAwIDUlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkO1xuICBwYWRkaW5nOiAwIDAuNSB2bWluO1xuICBsaW5lLWhlaWdodDogMTtcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4xNTtcbn1cblxuLnNwZWNpYWx0eS13cmFwcGVyIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZTogW3MxXSBcIi4gLiAuXCIgMnZoIFtlMV0gW3MyXSBcIi4gaXRlbS13cmFwIC5cIiAyNnZoIFtlMl0gW3MzXSBcIi4gLiAuXCIgMnZoIFtlM10vMiUgOTYlIDIlO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XG59XG5cbi5yZWNpcGUtd3JhcCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtYXJlYTogaXRlbS13cmFwO1xuICBncmlkLXRlbXBsYXRlOiBbczFdIFwiLiAuIC4gLiAuXCIgMmZyIFtlMV0gW3MyXSBcIi4gLiAuIGRlc2NyaXB0aW9uIC5cIiAyMGZyIFtlMl0gW3MzXSBcIi4gYnRuIC4gZGVzY3JpcHRpb24gLlwiIDZmciBbZTNdIFtzNF0gXCIuIC4gLiAuIC5cIiAyZnIgW2U0XS8zZnIgNDRmciA2ZnIgNDRmciAzZnI7XG59XG5cbi5wcmljZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDR2bWluO1xuICBmbG9hdDogcmlnaHQ7XG4gIG1hcmdpbjogMCAxLjV2bWluIDEuNXZtaW47XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4uZGVzY3JpcHRpb24ge1xuICBncmlkLWFyZWE6IGRlc2NyaXB0aW9uO1xuICBwYWRkaW5nOiAwLjc1dm1pbjtcbiAgei1pbmRleDogMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTEsIDI1MywgMjM2LCAwLjgpO1xuICBmb250LXNpemU6IDIuNXZtaW47XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cblxuLmZpbGwge1xuICBncmlkLWFyZWE6IDEvMS81LzY7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCAjNjQ3NjA5O1xufVxuXG4uZmlsbCBpbWcge1xuICBmbGV4LXNocmluazogMDtcbiAgbWluLXdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICB6LWluZGV4OiAwO1xufVxuXG5idXR0b24ge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZ3JpZC1hcmVhOiBidG47XG4gIHotaW5kZXg6IDI7XG4gIGZvbnQtc2l6ZTogNHZtaW47XG59IiwiQGltcG9ydMKgICd+Ym9vdHN0cmFwL3Njc3MvYm9vdHN0cmFwLnNjc3MnO1xyXG4kYm9yZGVyLW1lZDogIzY0NzYwOTtcclxuJGJvcmRlci1kYXJrOiAjMTAxMzAyO1xyXG4kYm9yZGVyLWxpZ2h0OiAjZjNmYWM2O1xyXG4kYmctZGFyazogIzY0NzYwOTtcclxuJGJnLWxpZ2h0OiAjZjNmYWM2O1xyXG4kYmctdmVyeS1saWdodDogI2ZiZmRlYztcclxuXHJcbi5idG4tc3VjY2VzcyB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjNjQ3NjA5O1xyXG4gIGNvbG9yOiAjMTAxMzAyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2ZhYzY7XHJcbn1cclxuXHJcbi5idG4tc3VjY2VzczpkaXNhYmxlZCB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMTAxMzAyO1xyXG4gIGNvbG9yOiAjNjQ3NjA5O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkY2YxN2U7XHJcbn1cclxuXHJcbi5idG4tZGFuZ2VyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJjZmM1O1xyXG4gIGNvbG9yOiAjMTMwNTAxO1xyXG4gIGJvcmRlci1jb2xvcjogIzZmMWEwNztcclxufVxyXG5cclxuLmJ0bi13YXJuaW5nIHtcclxuICBib3JkZXItY29sb3I6ICM1MDQ0MTY7XHJcbiAgY29sb3I6IHJnYig0OCwgNDgsIDQ4KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZGNlO1xyXG59XHJcblxyXG4uYnRuLXByaW1hcnkge1xyXG4gIGJvcmRlci1jb2xvcjogIzJiMjExODtcclxuICBjb2xvcjogIzBkMGEwNztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWFlMGQ3O1xyXG59XHJcblxyXG4uYnRuLmZvY3VzIHtcclxuICBib3gtc2hhZG93OiAjMGQwYTA3MzY7XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiA0dm1pbjtcclxuICBwYWRkaW5nOiAwIDUlO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gIHBhZGRpbmc6IDAgMC41IHZtaW47XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4xNTtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "x0KQ":
/*!**********************************************************!*\
  !*** ./src/app/modules/shared/state/shared.selectors.ts ***!
  \**********************************************************/
/*! exports provided: selectSharedState, selectHeaderMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSharedState", function() { return selectSharedState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectHeaderMessage", function() { return selectHeaderMessage; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _shared_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.reducer */ "WxzM");


const selectSharedState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_shared_reducer__WEBPACK_IMPORTED_MODULE_1__["sharedFeatureKey"]);
const selectHeaderMessage = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectSharedState, (state) => state.headerMessage);


/***/ }),

/***/ "y91+":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/order/components/order-form/order-form.component.ts ***!
  \*****************************************************************************/
/*! exports provided: OrderFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderFormComponent", function() { return OrderFormComponent; });
/* harmony import */ var _state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../state/cart/cart.selectors */ "+xTS");
/* harmony import */ var _state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../state/current-item/current-item.actions */ "Bszr");
/* harmony import */ var _state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../state/order-items/order-items.actions */ "WGDn");
/* harmony import */ var _state_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/order-items/order-items.selectors */ "Ixgz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/cart.service */ "c14U");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");









function OrderFormComponent_ng_container_1_ng_container_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ingredient_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ingredient_r6.name, " ");
} }
function OrderFormComponent_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OrderFormComponent_ng_container_1_ng_container_4_ng_container_2_Template, 3, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", item_r1.ingredientDetails);
} }
function OrderFormComponent_ng_container_1_ng_container_24_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function OrderFormComponent_ng_container_1_ng_container_24_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r8.toggleDetail(item_r1.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "View");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function OrderFormComponent_ng_container_1_ng_container_25_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function OrderFormComponent_ng_container_1_ng_container_25_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.toggleDetail(item_r1.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Collapse");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function OrderFormComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "label", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, OrderFormComponent_ng_container_1_ng_container_4_Template, 3, 1, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Qty:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function OrderFormComponent_ng_container_1_Template_input_change_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15); const item_r1 = ctx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r14.updateQuantityAndSubtotal($event.target, item_r1.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "@");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "Subtotal:");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](20, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function OrderFormComponent_ng_container_1_Template_button_click_22_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15); const item_r1 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r16.editItem(item_r1.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, OrderFormComponent_ng_container_1_ng_container_24_Template, 3, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](25, OrderFormComponent_ng_container_1_ng_container_25_Template, 3, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function OrderFormComponent_ng_container_1_Template_button_click_26_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r15); const item_r1 = ctx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r17.removeCartItem(item_r1.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](27, "Remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](item_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r1.viewDetail);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("placeholder", item_r1.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" $", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](14, 7, item_r1.price, "1.2"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("$", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](20, 10, item_r1.subtotal, "1.2"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !item_r1.viewDetail);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", item_r1.viewDetail);
} }
class OrderFormComponent {
    // items: { [key: string]: string[] }
    constructor(store, cartService, router) {
        this.store = store;
        this.cartService = cartService;
        this.router = router;
    }
    ngOnInit() {
        this.items$ = this.store.select(_state_cart_cart_selectors__WEBPACK_IMPORTED_MODULE_0__["selectCartItemsWithIngredientInfo"]);
        this.ingredientsByName$ = this.store.select(_state_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_3__["selectOrderItemNames"]);
        // this.ingredientsByName$.subscribe(items =>
        //   this.items = items
        // )
    }
    toggleDetail(id) {
        this.store.dispatch(Object(_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["toggleDetail"])({ id }));
    }
    removeCartItem(id) {
        this.cartService.removeCartItem(id);
        this.cartService.removeOrderItem(id);
    }
    updateQuantityAndSubtotal(e, id) {
        let quantity = e.value;
        this.store.dispatch(Object(_state_order_items_order_items_actions__WEBPACK_IMPORTED_MODULE_2__["updateQuantityAndSubtotal"])({ quantity, id }));
        this.cartService.updateTotal();
    }
    editItem(id) {
        this.store.select(_state_order_items_order_items_selectors__WEBPACK_IMPORTED_MODULE_3__["selectOrderItemEntities"]).subscribe(entities => this.store.dispatch(Object(_state_current_item_current_item_actions__WEBPACK_IMPORTED_MODULE_1__["loadItemToBuilder"])({ orderItem: entities[id] })));
        this.cartService.removeCartItem(id);
        this.router.navigate(['order/builder']);
    }
}
OrderFormComponent.ɵfac = function OrderFormComponent_Factory(t) { return new (t || OrderFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_5__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_6__["CartService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"])); };
OrderFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: OrderFormComponent, selectors: [["app-order-form"]], decls: 5, vars: 3, consts: [[1, "order-form-wrap"], [4, "ngFor", "ngForOf"], ["routerLink", "/order", 1, "add-more", "btn-success"], [1, "item-list"], [1, "form-control", "item"], [4, "ngIf"], [1, "item-meta"], [1, "item-meta-1"], ["type", "number", 1, "", 3, "placeholder", "change"], [1, "price"], [1, "subtotal"], [1, "form-control"], [1, "actions"], [1, "edit", "btn-primary", 3, "click"], [1, "remove", "btn-danger", 3, "click"], [1, "ingredient-list"], [1, "form-control", "ingredient"], [1, "view", "btn-warning", 3, "click"]], template: function OrderFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, OrderFormComponent_ng_container_1_Template, 28, 13, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "+ More Items");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, ctx.items$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["DecimalPipe"]], styles: ["@charset \"UTF-8\";\n@import\u00A0 \"~bootstrap/scss/bootstrap.scss\";\n.btn-success[_ngcontent-%COMP%] {\n  border-color: #647609;\n  color: #101302;\n  background-color: #f3fac6;\n}\n.btn-success[_ngcontent-%COMP%]:disabled {\n  border-color: #101302;\n  color: #647609;\n  background-color: #dcf17e;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #fbcfc5;\n  color: #130501;\n  border-color: #6f1a07;\n}\n.btn-warning[_ngcontent-%COMP%] {\n  border-color: #504416;\n  color: #303030;\n  background-color: #f3edce;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  border-color: #2b2118;\n  color: #0d0a07;\n  background-color: #eae0d7;\n}\n.btn.focus[_ngcontent-%COMP%] {\n  box-shadow: #0d0a0736;\n}\nbutton[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 4vmin;\n  padding: 0 5%;\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid;\n  padding: 0 0.5 vmin;\n  line-height: 1;\n  border-radius: 0.25rem;\n  transition: color 0.15;\n}\n.item-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: column;\n  width: 96%;\n  background-color: #f8f5f2;\n  border-radius: 0.5rem;\n  padding: 1%;\n  margin: 1%;\n}\n.item[_ngcontent-%COMP%] {\n  background-color: #b9c7cb;\n  font-weight: bold;\n  height: calc(4vmin + 2vmin);\n  line-height: 1;\n  font-size: 4vmin;\n  padding: 1vmin 6vmin;\n  margin-bottom: 0;\n}\n.ingredient-list[_ngcontent-%COMP%] {\n  width: 96%;\n  padding: 1%;\n  margin: 0 1%;\n  display: block;\n}\n.ingredient[_ngcontent-%COMP%] {\n  font-size: 3vmin;\n  width: 96%;\n  margin: 1%;\n  padding: 1vmin 1%;\n  height: calc(3vmin + 2vmin);\n  line-height: 1;\n  background-color: #e8ecee;\n}\n.item-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-between;\n  width: 100%;\n  margin: 1vmin 0;\n}\n.item-meta[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  line-height: 1;\n  margin: 0 1%;\n  font-size: 3vmin;\n  height: 4vmin;\n  text-align: center;\n  text-justify: center;\n  justify-items: center;\n  vertical-align: center;\n  align-items: center;\n  border-radius: 0.25rem;\n}\n.item-meta-1[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: left;\n  width: 50%;\n}\n.item-meta-1[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.item-meta-1[_ngcontent-%COMP%]    > input[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0 3%;\n  width: 20%;\n  border: 1px solid #101302;\n}\n.item-meta-1[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0 5%;\n  margin: 0 1%;\n  width: 40%;\n  border: 1px solid #101302;\n  background-color: white;\n  justify-content: center;\n}\n.subtotal[_ngcontent-%COMP%] {\n  display: flex;\n  justify-items: flex-end;\n  flex-flow: row nowrap;\n  width: 50%;\n}\n.subtotal[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0 5%;\n}\n.subtotal[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  justify-content: right;\n}\n.subtotal[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  width: 60%;\n  border: 1px solid #101302;\n  background-color: white;\n  justify-content: center;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  height: 5vmin;\n  font-size: 4vmin;\n  justify-content: center;\n  align-items: center;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n.add-more[_ngcontent-%COMP%] {\n  margin: 1px auto;\n  height: 6vmin;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXG9yZGVyLWZvcm0uY29tcG9uZW50LnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQix5Q0FBQTtBQVFBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7QURMRjtBQ1FBO0VBQ0UscUJBQUE7QURMRjtBQ1FBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFFQSxzQkFBQTtFQUNBLHNCQUFBO0FETkY7QUE3Q0E7RUFjRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBbUNGO0FBaENBO0VBQ0UseUJBQUE7RUFDQSxpQkFBQTtFQUNBLDJCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQW1DRjtBQWhDQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFtQ0Y7QUFoQ0E7RUFFRSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQWtDRjtBQS9CQTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFrQ0Y7QUEvQkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQWtDRjtBQS9CQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsVUFBQTtBQWtDRjtBQWhDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQW1DRjtBQWhDQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0FBbUNGO0FBaENBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0VBQ0EsdUJBQUE7RUFDQSx1QkFBQTtBQW1DRjtBQWpDQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0EsVUFBQTtBQW9DRjtBQWpDQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0FBb0NGO0FBakNBO0VBQ0Usc0JBQUE7QUFvQ0Y7QUFqQ0E7RUFDRSxVQUFBO0VBQ0EseUJBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0FBb0NGO0FBakNBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsV0FBQTtBQW9DRjtBQWpDQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUFBLHVCQUFBO0VBQUEsa0JBQUE7QUFvQ0Y7QUFqQ0E7RUFDRSxnQkFBQTtFQUNBLGFBQUE7QUFvQ0YiLCJmaWxlIjoib3JkZXItZm9ybS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbkBpbXBvcnTCoCBcIn5ib290c3RyYXAvc2Nzcy9ib290c3RyYXAuc2Nzc1wiO1xuLmJ0bi1zdWNjZXNzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNjQ3NjA5O1xuICBjb2xvcjogIzEwMTMwMjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzZmFjNjtcbn1cblxuLmJ0bi1zdWNjZXNzOmRpc2FibGVkIHtcbiAgYm9yZGVyLWNvbG9yOiAjMTAxMzAyO1xuICBjb2xvcjogIzY0NzYwOTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2RjZjE3ZTtcbn1cblxuLmJ0bi1kYW5nZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJjZmM1O1xuICBjb2xvcjogIzEzMDUwMTtcbiAgYm9yZGVyLWNvbG9yOiAjNmYxYTA3O1xufVxuXG4uYnRuLXdhcm5pbmcge1xuICBib3JkZXItY29sb3I6ICM1MDQ0MTY7XG4gIGNvbG9yOiAjMzAzMDMwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZGNlO1xufVxuXG4uYnRuLXByaW1hcnkge1xuICBib3JkZXItY29sb3I6ICMyYjIxMTg7XG4gIGNvbG9yOiAjMGQwYTA3O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWFlMGQ3O1xufVxuXG4uYnRuLmZvY3VzIHtcbiAgYm94LXNoYWRvdzogIzBkMGEwNzM2O1xufVxuXG5idXR0b24ge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiA0dm1pbjtcbiAgcGFkZGluZzogMCA1JTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZDtcbiAgcGFkZGluZzogMCAwLjUgdm1pbjtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMTU7XG59XG5cbi5pdGVtLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWZsb3c6IGNvbHVtbjtcbiAgd2lkdGg6IDk2JTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjVmMjtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICBwYWRkaW5nOiAxJTtcbiAgbWFyZ2luOiAxJTtcbn1cblxuLml0ZW0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjljN2NiO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgaGVpZ2h0OiBjYWxjKDR2bWluICsgMnZtaW4pO1xuICBsaW5lLWhlaWdodDogMTtcbiAgZm9udC1zaXplOiA0dm1pbjtcbiAgcGFkZGluZzogMXZtaW4gNnZtaW47XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5pbmdyZWRpZW50LWxpc3Qge1xuICB3aWR0aDogOTYlO1xuICBwYWRkaW5nOiAxJTtcbiAgbWFyZ2luOiAwIDElO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmluZ3JlZGllbnQge1xuICBmb250LXNpemU6IDN2bWluO1xuICB3aWR0aDogOTYlO1xuICBtYXJnaW46IDElO1xuICBwYWRkaW5nOiAxdm1pbiAxJTtcbiAgaGVpZ2h0OiBjYWxjKDN2bWluICsgMnZtaW4pO1xuICBsaW5lLWhlaWdodDogMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZWNlZTtcbn1cblxuLml0ZW0tbWV0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAxdm1pbiAwO1xufVxuXG4uaXRlbS1tZXRhICoge1xuICBsaW5lLWhlaWdodDogMTtcbiAgbWFyZ2luOiAwIDElO1xuICBmb250LXNpemU6IDN2bWluO1xuICBoZWlnaHQ6IDR2bWluO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtanVzdGlmeTogY2VudGVyO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XG59XG5cbi5pdGVtLW1ldGEtMSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcbiAgd2lkdGg6IDUwJTtcbn1cblxuLml0ZW0tbWV0YS0xIGRpdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5pdGVtLW1ldGEtMSA+IGlucHV0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMCAzJTtcbiAgd2lkdGg6IDIwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzEwMTMwMjtcbn1cblxuLml0ZW0tbWV0YS0xID4gbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBwYWRkaW5nOiAwIDUlO1xuICBtYXJnaW46IDAgMSU7XG4gIHdpZHRoOiA0MCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxMDEzMDI7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnN1YnRvdGFsIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1pdGVtczogZmxleC1lbmQ7XG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcbiAgd2lkdGg6IDUwJTtcbn1cblxuLnN1YnRvdGFsID4gKiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDAgNSU7XG59XG5cbi5zdWJ0b3RhbCA+IGRpdiB7XG4gIGp1c3RpZnktY29udGVudDogcmlnaHQ7XG59XG5cbi5zdWJ0b3RhbCA+IGxhYmVsIHtcbiAgd2lkdGg6IDYwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzEwMTMwMjtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmFjdGlvbnMgKiB7XG4gIGhlaWdodDogNXZtaW47XG4gIGZvbnQtc2l6ZTogNHZtaW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogZml0LWNvbnRlbnQ7XG59XG5cbi5hZGQtbW9yZSB7XG4gIG1hcmdpbjogMXB4IGF1dG87XG4gIGhlaWdodDogNnZtaW47XG59IiwiQGltcG9ydMKgICd+Ym9vdHN0cmFwL3Njc3MvYm9vdHN0cmFwLnNjc3MnO1xyXG4kYm9yZGVyLW1lZDogIzY0NzYwOTtcclxuJGJvcmRlci1kYXJrOiAjMTAxMzAyO1xyXG4kYm9yZGVyLWxpZ2h0OiAjZjNmYWM2O1xyXG4kYmctZGFyazogIzY0NzYwOTtcclxuJGJnLWxpZ2h0OiAjZjNmYWM2O1xyXG4kYmctdmVyeS1saWdodDogI2ZiZmRlYztcclxuXHJcbi5idG4tc3VjY2VzcyB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjNjQ3NjA5O1xyXG4gIGNvbG9yOiAjMTAxMzAyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2ZhYzY7XHJcbn1cclxuXHJcbi5idG4tc3VjY2VzczpkaXNhYmxlZCB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMTAxMzAyO1xyXG4gIGNvbG9yOiAjNjQ3NjA5O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkY2YxN2U7XHJcbn1cclxuXHJcbi5idG4tZGFuZ2VyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJjZmM1O1xyXG4gIGNvbG9yOiAjMTMwNTAxO1xyXG4gIGJvcmRlci1jb2xvcjogIzZmMWEwNztcclxufVxyXG5cclxuLmJ0bi13YXJuaW5nIHtcclxuICBib3JkZXItY29sb3I6ICM1MDQ0MTY7XHJcbiAgY29sb3I6IHJnYig0OCwgNDgsIDQ4KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZGNlO1xyXG59XHJcblxyXG4uYnRuLXByaW1hcnkge1xyXG4gIGJvcmRlci1jb2xvcjogIzJiMjExODtcclxuICBjb2xvcjogIzBkMGEwNztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWFlMGQ3O1xyXG59XHJcblxyXG4uYnRuLmZvY3VzIHtcclxuICBib3gtc2hhZG93OiAjMGQwYTA3MzY7XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiA0dm1pbjtcclxuICBwYWRkaW5nOiAwIDUlO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xyXG4gIHBhZGRpbmc6IDAgMC41IHZtaW47XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4xNTtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "yzJG":
/*!***********************************************!*\
  !*** ./src/app/modules/order/order.module.ts ***!
  \***********************************************/
/*! exports provided: OrderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderModule", function() { return OrderModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_ssselctor_ssselctor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ssselctor/ssselctor.component */ "DWvF");
/* harmony import */ var _components_builder_builder_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/builder/builder.component */ "jSi4");
/* harmony import */ var _components_builder_form_builder_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/builder-form/builder-form.component */ "lb8U");
/* harmony import */ var _components_order_list_order_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/order-list/order-list.component */ "gRyS");
/* harmony import */ var _components_order_form_order_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/order-form/order-form.component */ "y91+");
/* harmony import */ var _components_specialty_specialty_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/specialty/specialty.component */ "wY/J");
/* harmony import */ var _order_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./order.component */ "MsO7");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _order_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./order-routing.module */ "JnYV");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngrx/effects */ "9jGm");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store */ "l7P3");
/* harmony import */ var _state_cart_cart_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/cart/cart.reducer */ "8Nv7");
/* harmony import */ var _state_order_reducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/order.reducer */ "mPhv");
/* harmony import */ var _stores_reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../stores/reducers/order-static-data.reducer */ "sMsK");
/* harmony import */ var _state_cart_cart_effects__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./state/cart/cart.effects */ "Q0UC");
/* harmony import */ var _state_order_effects__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./state/order.effects */ "59xy");
/* harmony import */ var _stores_effects_order_static_data_effects__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../stores/effects/order-static-data.effects */ "gKmf");
/* harmony import */ var _state_current_item_current_item_reducer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./state/current-item/current-item.reducer */ "LScw");
/* harmony import */ var _state_item_edit_item_edit_reducer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./state/item-edit/item-edit.reducer */ "+YOH");
/* harmony import */ var _state_order_items_order_items_reducer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./state/order-items/order-items.reducer */ "JdOj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ "fXoL");
























class OrderModule {
}
OrderModule.ɵfac = function OrderModule_Factory(t) { return new (t || OrderModule)(); };
OrderModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineNgModule"]({ type: OrderModule });
OrderModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _order_routing_module__WEBPACK_IMPORTED_MODULE_9__["OrderRoutingModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
            //#region Store
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__["EffectsModule"].forFeature([_state_cart_cart_effects__WEBPACK_IMPORTED_MODULE_15__["CartEffects"], _state_order_effects__WEBPACK_IMPORTED_MODULE_16__["OrderEffects"], _stores_effects_order_static_data_effects__WEBPACK_IMPORTED_MODULE_17__["OrderStaticDataEffects"]]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forFeature(_state_cart_cart_reducer__WEBPACK_IMPORTED_MODULE_12__["cartFeatureKey"], _state_cart_cart_reducer__WEBPACK_IMPORTED_MODULE_12__["reducer"]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forFeature(_state_order_items_order_items_reducer__WEBPACK_IMPORTED_MODULE_20__["orderItemsFeatureKey"], _state_order_items_order_items_reducer__WEBPACK_IMPORTED_MODULE_20__["reducer"]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forFeature(_state_order_reducer__WEBPACK_IMPORTED_MODULE_13__["orderFeatureKey"], _state_order_reducer__WEBPACK_IMPORTED_MODULE_13__["reducer"]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forFeature(_stores_reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_14__["orderStaticDataFeatureKey"], _stores_reducers_order_static_data_reducer__WEBPACK_IMPORTED_MODULE_14__["reducer"]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forFeature(_state_current_item_current_item_reducer__WEBPACK_IMPORTED_MODULE_18__["currentItemFeatureKey"], _state_current_item_current_item_reducer__WEBPACK_IMPORTED_MODULE_18__["reducer"]),
            _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreModule"].forFeature(_state_item_edit_item_edit_reducer__WEBPACK_IMPORTED_MODULE_19__["itemEditFeatureKey"], _state_item_edit_item_edit_reducer__WEBPACK_IMPORTED_MODULE_19__["reducer"])
            //#endregion store
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsetNgModuleScope"](OrderModule, { declarations: [_components_ssselctor_ssselctor_component__WEBPACK_IMPORTED_MODULE_1__["SsselctorComponent"],
        _components_builder_builder_component__WEBPACK_IMPORTED_MODULE_2__["BuilderComponent"],
        _components_builder_form_builder_form_component__WEBPACK_IMPORTED_MODULE_3__["BuilderFormComponent"],
        _components_order_list_order_list_component__WEBPACK_IMPORTED_MODULE_4__["OrderListComponent"],
        _components_order_form_order_form_component__WEBPACK_IMPORTED_MODULE_5__["OrderFormComponent"],
        _components_specialty_specialty_component__WEBPACK_IMPORTED_MODULE_6__["SpecialtyComponent"],
        _order_component__WEBPACK_IMPORTED_MODULE_7__["OrderComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _order_routing_module__WEBPACK_IMPORTED_MODULE_9__["OrderRoutingModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"], _ngrx_effects__WEBPACK_IMPORTED_MODULE_10__["EffectsFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreFeatureModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_11__["StoreFeatureModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map