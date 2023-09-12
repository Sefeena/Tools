# -*- coding: utf-8 -*-
# This module and its content is copyright of Technaureus Info Solutions Pvt.Ltd.
# - © Technaureus Info Solutions Pvt. Ltd 2022. All rights reserved.
{
    'name': 'POS Return By Manager Only',
    'version': '16.0.0.0',
    'summary': 'Only Managers Can Access Return Products',
    'sequence': 1,
    'author': 'Technaureus Info Solutions Pvt. Ltd.',
    'description': "Only Managers Can Access Return Products",
    'website': 'http://www.technaureus.com',
    'price': 8,
    'currency': 'EUR',
    'license': 'Other proprietary',
    'depends': ['point_of_sale', 'sale_stock'],
    'data': [
        'views/pos_order.xml',
            ],
    'images': ['images/main_screenshot.png'],
    'installable': True,
    'application': True,
    'auto_install': False,
}
