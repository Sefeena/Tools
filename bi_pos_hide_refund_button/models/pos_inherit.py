# -*- coding: utf-8 -*-
# Part of BrowseInfo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models, _

class PosConfig(models.Model):
    _inherit = "pos.config"


    hide_refund_button = fields.Boolean("Hide Refund Button")
    enable_refund_button_manager = fields.Boolean("Enable Refund Button For Manager")


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    hide_refund_button = fields.Boolean(related="pos_config_id.hide_refund_button",string="Hide Refund Button",readonly=False)
    enable_refund_button_manager = fields.Boolean(related="pos_config_id.enable_refund_button_manager",string="Enable Refund Button For Manager",readonly=False)


