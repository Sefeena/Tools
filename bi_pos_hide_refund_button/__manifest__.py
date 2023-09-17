# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': "POS Hide Refund Button",
    'version': '16.0.0.1',
    "category" : "Point of Sale",
    'summary': 'POS Hide Refund button on pos hide refund button on point of sales hide refund button point of sale hide refund button hide refund on pos hide refund on point of sales hide information invisible pos refund button invisible refund button on point od sales',
    "description": """

        Hide POS Refund Button in odoo,
        Hide Refund Button in odoo,
        Enable Hide Refund Button for Manager in odoo,
        Hide Refund for All Users in odoo,
        Only Manager Have Access to Refund in odoo,

    """ , 
    'author': 'BrowseInfo',
    "price": 10,
    "currency": 'EUR',
    'website': 'https://www.browseinfo.in',
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_config_inherit.xml',  
    ],
    'assets':{
        'point_of_sale.assets': [
            '/bi_pos_hide_refund_button/static/src/js/refundbutton_inherit.js',
            
         ],
    },
    'license': 'OPL-1',
    "auto_install": False,
    "installable": True,
    'live_test_url':'https://youtu.be/dPYw9dvrStM',
    "images":['static/description/Banner.gif'],
}
