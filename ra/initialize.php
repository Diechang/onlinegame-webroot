<?php
/**
 * Research Artisan Lite: Website Access Analyzer
 * Copyright (C) 2009 Research Artisan Project
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * @copyright Copyright (C) 2009 Research Artisan Project
 * @license GNU General Public License (see license.txt)
 * @author ossi
 */
ignore_user_abort(true);

$settingDir = dirname(__FILE__). DIRECTORY_SEPARATOR. 'setting'. DIRECTORY_SEPARATOR;
if (!file_exists($settingDir. 'path.php')) return; 
require $settingDir. 'path.php';
define('RA_CORE_DIR', constant('CORE_PATH'));
define('SETTING_SITEURL_FILE', $settingDir. 'siteurl.php');
define('SETTING_DATABASE_FILE', $settingDir. 'database.php');
require RA_CORE_DIR. 'system'. DIRECTORY_SEPARATOR. 'RaInclude.php';
?>
