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

$href = isset($_GET['link']) ? $_GET['link'] : null;
$href = htmlentities($href, ENT_QUOTES);
header('Content-Type: text/html; charset=UTF-8');
?>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Jump</title>
</head>
<body>
<p>リンクをクリックするとページにアクセスします。</p>
<p><a href="<?php print $href;?>"><?php print $href;?></a></p>
</body>
</html>
