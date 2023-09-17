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
from odoo import api, fields, models, _

class POSInventory(models.Model):
    _inherit = 'stock.quant'

    @api.model
    def create_inventory_from_pos(self,orders,validate):
        val = []
        is_true = False
        for values in orders.get('line_ids'):
            product_id = self.env['product.product'].sudo().browse(values[2]['product_id'])
            if product_id.type != 'product':
                is_true = True
                msgSC = _("You can only adjust storable products. \n%s -> %s") % (product_id.display_name, product_id.type)
                val.append(msgSC)
            else:
                location_id = self.env['stock.location'].sudo().browse(values[2]['location_id'])
                quant_id = self.env['stock.quant'].sudo().search([('location_id', '=', location_id.id),('product_id', '=', product_id.id)])
                if quant_id:
                    quant_id.user_id = self.env.user.id
                    if quant_id.inventory_quantity == 0.0:
                        quant_id.inventory_quantity = int(values[2]['product_qty'])
                    else:
                        quant_id.inventory_quantity = quant_id.inventory_quantity + int(values[2]['product_qty'])
                    if validate:
                        quant_id.action_apply_inventory()
                else:
                    quant_id = self.env['stock.quant'].sudo().create({
                        'product_id': product_id.id,
                        'location_id': location_id.id,
                        'inventory_quantity': int(values[2]['product_qty']),
                        'user_id': self.env.user.id,
                    })
                    if validate:
                        quant_id.action_apply_inventory()
        if is_true:
            return val

