#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Faraday Penetration Test IDE
Copyright (C) 2013  Infobyte LLC (http://www.infobytesec.com/)
See the file 'doc/LICENSE' for the license information

"""
from __future__ import absolute_import

from faraday.client.plugins.plugin import PluginBase as PluginBaseExt

# This class was moved to plugins.plugin so we need a way to
# support plugins that are still inheriting from core
PluginBase = PluginBaseExt


# I'm Py3
