odoo.define('pos_inventory_adjustment.inventory_adjustment', function (require) {
"use strict";
	
    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');
    const Popup = require('point_of_sale.ConfirmPopup');
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
	var rpc = require('web.rpc');
	const ErrorPopup = require('point_of_sale.ErrorPopup');

    // ---------------------------Inventory Adjustments Popup

    class InventoryAdjustmentsPopupWidget extends AbstractAwaitablePopup {
        constructor(obj, options) {
            super(...arguments);
        }
        async confirm() {
            var self = this
            var stock_inventory = {};
            var order_lines = this.env.pos.get_order().get_orderlines();
            stock_inventory.line_ids = [];
            for (var line in order_lines){
                var is_same_product_line = false
                for (var same_line in stock_inventory.line_ids){
                    if(stock_inventory.line_ids[same_line][2].product_id == order_lines[line].product.id){
                        is_same_product_line = true
                        stock_inventory.line_ids[same_line][2].product_qty = stock_inventory.line_ids[same_line][2].product_qty + order_lines[line].quantity
                    }
                }
                if(!is_same_product_line){
                    var stock_inventory_line = [0,false,{product_id:null,product_qty:0,theoretical_qty:0,product_uom_id:null,location_id:null}]
                    stock_inventory_line[2].product_id = order_lines[line].product.id;
                    stock_inventory_line[2].product_uom_id = order_lines[line].product.uom_id[0];
                    stock_inventory_line[2].product_qty = order_lines[line].quantity;
                    stock_inventory_line[2].location_id = this.env.pos.config.adjst_location_id[0];
                    stock_inventory.line_ids.push(stock_inventory_line);
                }
            }
            stock_inventory.from_pos = true;
            stock_inventory.location_ids = [(4, this.env.pos.config.adjst_location_id[0])];
            var validate = false;
            rpc.query({
                model: 'stock.quant',
                method: 'create_inventory_from_pos',
                args: [stock_inventory,validate],
            }).then(function(stock_inventory){
                if(stock_inventory){
                    var error_msg = '';
                    _.each(stock_inventory, function(msg){
                        error_msg += msg + ' \n \n';
                    });
                    self.showPopup('ErrorInventoryAdjustmentsPopupWidget',{
                        title: self.env._t("Warning"),
                        body:  self.env._t(error_msg),
                    });
                }else{
                    var order_only = self.env.pos.get_order()
                    self.env.pos.get_order().remove_orderline(order_lines);
                    var success_msg = 'Successfully generated inventory adjustment for selected products and quantities, please process it further!'
                    self.showPopup('ConfirmPopup',{
                        title: self.env._t('Confirmation'),
                        body: self.env._t(success_msg),
                    });
                }
            });
        }

        async confirm_apply() {
            var self = this
            var stock_inventory = {};
            var order_lines = this.env.pos.get_order().get_orderlines();
            stock_inventory.line_ids = [];
            for (var line in order_lines){
                var is_same_product_line = false
                for (var same_line in stock_inventory.line_ids){
                    if(stock_inventory.line_ids[same_line][2].product_id == order_lines[line].product.id){
                        is_same_product_line = true
                        stock_inventory.line_ids[same_line][2].product_qty = stock_inventory.line_ids[same_line][2].product_qty + order_lines[line].quantity
                    }
                }
                if(!is_same_product_line){
                    var stock_inventory_line = [0,false,{product_id:null,product_qty:0,theoretical_qty:0,product_uom_id:null,location_id:null}]
                    stock_inventory_line[2].product_id = order_lines[line].product.id;
                    stock_inventory_line[2].product_uom_id = order_lines[line].product.uom_id[0];
                    stock_inventory_line[2].product_qty = order_lines[line].quantity;
                    stock_inventory_line[2].location_id = this.env.pos.config.adjst_location_id[0];
                    stock_inventory.line_ids.push(stock_inventory_line);
                }
            }
            stock_inventory.from_pos = true;
            stock_inventory.location_ids = [(4, this.env.pos.config.adjst_location_id[0])];
            var validate = true;
            rpc.query({
                model: 'stock.quant',
                method: 'create_inventory_from_pos',
                args: [stock_inventory,validate],
            }).then(function(stock_inventory){
                if(stock_inventory){
                    var error_msg = '';
                    _.each(stock_inventory, function(msg){
                        error_msg += msg + ' \n \n';
                    });
                    self.showPopup('ErrorInventoryAdjustmentsPopupWidget',{
                        title: self.env._t("Warning"),
                        body:  self.env._t(error_msg),
                    });
                }else{
                    var order_only = self.env.pos.get_order()
                    self.env.pos.get_order().remove_orderline(order_lines);
                    var success_msg = 'Successfully generated and applied inventory adjustments for selected products and quantities.'
                    self.showPopup('ConfirmPopup',{
                        title: self.env._t('Confirmation'),
                        body: self.env._t(success_msg),
                    });
                }
            });
        }
        cancel() {
            this.env.posbus.trigger('close-popup', {
                popupId: this.props.id,
                response: { confirmed: false, payload: null },
            });
        }
    };
    InventoryAdjustmentsPopupWidget.template = 'InventoryAdjustmentsPopupWidget';
    InventoryAdjustmentsPopupWidget.defaultProps = {
        confirmText: 'Draft',
        confirmTextApply: 'Draft + Validate',
        cancelText: 'Cancel',
        title: '',
    };
    Registries.Component.add(InventoryAdjustmentsPopupWidget);

    // ---------------------------END Inventory Adjustments Popup

    // ----------------------------------Inventory Adjustments Button
    class InventoryAdjustmentsButtonWidget extends PosComponent {
        setup() {
            super.setup();
            useListener('click', this.onClick);
        }
        async onClick() {
            var self = this;
            var order_lines = this.env.pos.get_order().get_orderlines();
            if(this.env.pos.get_order().get_orderlines().length > 0){
                this.showPopup('InventoryAdjustmentsPopupWidget',{
                    title : this.env._t("Inventory Adjustments"),
                });
            }else if(this.env.pos.get_order().get_orderlines().length == 0){
                this.showPopup('ErrorPopup',{
                    title: this.env._t("Alert: Invalid Inventory Adjustment"),
                    body: this.env._t("Please add few product (s) for inventory adjustment"),
                });
            }
        }
    }
    InventoryAdjustmentsButtonWidget.template = 'InventoryAdjustmentsButtonWidget';
    ProductScreen.addControlButton({
        component: InventoryAdjustmentsButtonWidget,
        condition: function() {
            return true;
        },
    });
    Registries.Component.add(InventoryAdjustmentsButtonWidget);

    // ----------------------------------END Inventory Adjustments Button

    class ErrorInventoryAdjustmentsPopupWidget extends ErrorPopup {
        constructor() {
            super(...arguments);
        }
    }
    ErrorInventoryAdjustmentsPopupWidget.template = 'ErrorInventoryAdjustmentsPopupWidget';
    ErrorInventoryAdjustmentsPopupWidget.defaultProps = {
        confirmText: 'Ok',
        body: '',
        exitButtonIsShown: false,
        exitButtonText: 'Exit Pos',
        exitButtonTrigger: 'close-pos'
    };
    Registries.Component.add(ErrorInventoryAdjustmentsPopupWidget);
});