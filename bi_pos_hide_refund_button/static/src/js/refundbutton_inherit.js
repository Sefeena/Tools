odoo.define('bi_pos_hide_refund_button.RefundButton', function (require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const RefundButton = require('point_of_sale.RefundButton');
    const Registries = require('point_of_sale.Registries');
    const { useListener } = require("@web/core/utils/hooks");


    const RefundButtonCustom = (RefundButton) =>
        class extends RefundButton {
            setup() {
                super.setup();
            }
            _onClick() {
                if (this.env.pos.config.hide_refund_button){
                    if(this.env.pos.config.enable_refund_button_manager){
                        if(this.env.pos.user.role == 'manager'){
                                const partner = this.env.pos.get_order().get_partner();
                                const searchDetails = partner ? { fieldName: 'PARTNER', searchTerm: partner.name } : {};
                                this.showScreen('TicketScreen', {
                                    ui: { filter: 'SYNCED', searchDetails },
                                    destinationOrder: this.env.pos.get_order(),
                                });
                        }

                    }

                }
                else{
                    if(this.env.pos.config.enable_refund_button_manager){
                        if(this.env.pos.user.role == 'manager'){
                                const partner = this.env.pos.get_order().get_partner();
                                const searchDetails = partner ? { fieldName: 'PARTNER', searchTerm: partner.name } : {};
                                this.showScreen('TicketScreen', {
                                    ui: { filter: 'SYNCED', searchDetails },
                                    destinationOrder: this.env.pos.get_order(),
                                });
                        }

                    }
                    else{
                        const partner = this.env.pos.get_order().get_partner();
                                const searchDetails = partner ? { fieldName: 'PARTNER', searchTerm: partner.name } : {};
                                this.showScreen('TicketScreen', {
                                    ui: { filter: 'SYNCED', searchDetails },
                                    destinationOrder: this.env.pos.get_order(),
                                });
                    }
                }
                
            
        }
           
        };

    Registries.Component.extend(RefundButton, RefundButtonCustom);

    return RefundButton;


    
});
