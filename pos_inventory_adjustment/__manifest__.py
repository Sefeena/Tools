# -*- coding: utf-8 -*-
###############################################################################
#
#   Copyright (C) 2004-today OpenERP SA (<http://www.openerp.com>)
#   Copyright (C) 2016-today Geminate Consultancy Services (<http://geminatecs.com>).
#
#   This program is free software: you can redistribute it and/or modify
#   it under the terms of the GNU Affero General Public License as
#   published by the Free Software Foundation, either version 3 of the
#   License, or (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
#   GNU Affero General Public License for more details.
#
#   You should have received a copy of the GNU Affero General Public License
#   along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
###############################################################################
{
    'name': 'POS Inventory Adjustment',
    "version": "16.0.0.1",
    'category': 'pos',
    'summary': "Geminate comes with a feature for inventory adjustments using point of sale. In the POS screen, you can add multiple products with different qtys and whenever you click on the 'Adjust Inventory' button it will create new Inventory Adjustments.",
    'website': 'www.geminatecs.com',
    'author': 'Geminate Consultancy Services',
    'license': 'Other proprietary',
    'depends': ['point_of_sale'],
    "description": "Geminate comes with a feature for inventory adjustments using point of sale. In the POS screen, you can add multiple products with different qtys and whenever you click on the 'Adjust Inventory' button it will create new Inventory Adjustments. If the inventory adjustment checkbox is checked on POS session configuration then only the 'Adjust Inventory' button will be available on POS screen. you can configure the inventoried location on POS session configuration which will set as stock location on inventory adjustment.",
    'data': [
            'views/pos_config_view.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            ('include', 'web._assets_helpers'),
            ('include', 'web._assets_backend_helpers'),
            ('include', 'web._assets_primary_variables'),
            'pos_inventory_adjustment/static/src/js/inventory_adjustment.js',
            'pos_inventory_adjustment/static/src/xml/inventory_adjustment.xml',
        ],
        'web.assets_qweb': [
            'pos_inventory_adjustment/static/src/xml/inventory_adjustment.xml',
        ],
    },
    'images': ['static/description/pos_inventory_adjustment.png'],
    'installable': True,
    'auto_install': False,
    'application': False,
    'price': 54.99,
    'currency': 'EUR'
}  
