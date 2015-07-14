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
$raCoreDir = 'ra_core'. DIRECTORY_SEPARATOR;

$raSystemDir = 'system'. DIRECTORY_SEPARATOR;
$raIncludeFileName = 'RaInclude.php';
$settingDir = realpath('..'). DIRECTORY_SEPARATOR. 'setting'. DIRECTORY_SEPARATOR;
$settingPathFile = 'path.php';
$coreDefine = 'CORE_PATH';

if (!checkRaPath($coreDefine, $settingDir. $settingPathFile)) {
  defineRaPath($coreDefine, $raCoreDir, $raSystemDir, $raIncludeFileName, $settingDir. $settingPathFile);
  require $settingDir. $settingPathFile;
}
$raIncludeFilePath = constant($coreDefine). DIRECTORY_SEPARATOR. $raSystemDir. $raIncludeFileName;
if (!@file_exists($raIncludeFilePath)) {
  writeFile($settingDir. $settingPathFile, '');
  defineRaPath($coreDefine, $raCoreDir, $raSystemDir, $raIncludeFileName, $settingDir. $settingPathFile);
  outputMessage('環境設定に失敗しました。', 'ブラウザの更新ボタンやF5キー等でリロード（再読み込み）してください。');
}

define('RA_CORE_DIR', constant($coreDefine));
define('SETTING_DIR', $settingDir);
define('SETTING_SITEURL_FILE', $settingDir. 'siteurl.php');
define('SETTING_DATABASE_FILE', $settingDir. 'database.php');
define('SETTING_INSTALL_COMPLETE_FILE', $settingDir. 'install_complete');
define('SETTING_PATH_FILE', $settingDir. $settingPathFile);
define('ADMIN_DIR_NAME', getAdminDirName());
define('UPGRADE_DIR', realpath(RA_CORE_DIR. '..'). DIRECTORY_SEPARATOR. 'ra_upgrade'. DIRECTORY_SEPARATOR);

require $raIncludeFilePath;

$ra = new Ra();
$ra->execute();

function checkRaPath($coreDefine, $raPublicSettingFilePath) {
  if (!file_exists($raPublicSettingFilePath)) return false;
  require $raPublicSettingFilePath;
  if (!defined($coreDefine)) return false;
  return true;
}

function defineRaPath($coreDefine, $raCoreDir, $raSystemDir, $raIncludeFileName, $raPublicSettingFilePath) {
  $relativePath = '..';
  $raIncludeFilePath = realpath($relativePath). DIRECTORY_SEPARATOR. $raCoreDir. $raSystemDir. $raIncludeFileName;
  while (!file_exists($raIncludeFilePath)) {
    $relativePath .= DIRECTORY_SEPARATOR. '..';
    $raIncludeFilePath = realpath($relativePath). DIRECTORY_SEPARATOR. $raCoreDir. $raSystemDir. $raIncludeFileName;
    if (!file_exists(realpath($relativePath))) {
      outputMessage('環境設定に失敗しました。', $raCoreDir. ' ディレクトリが適切な場所にアップロードされていません。');
    }
  }
  $define = '';
  $define .= '<?php'. "\r\n";
  $define .= 'define(\''. $coreDefine. '\',\''. addslashes(realpath(dirname($raIncludeFilePath). DIRECTORY_SEPARATOR. '..'). DIRECTORY_SEPARATOR). '\');'. "\r\n";
  $define .= '?>';
  writeFile($raPublicSettingFilePath, $define);
}

function writeFile($fileName, $writeString) {
  $result = false;
  $fp = @fopen($fileName, 'wb+');
  if ($fp!==false) {
    $length = @fwrite($fp, $writeString);
    if ($length!==false) if (@fclose($fp)!==false) $result = true;
  }
  if (!$result) {
    outputMessage('環境設定に失敗しました。以下のディレクトリのアクセス権（パーミッション）を書き込み可能にしてください。', dirname($fileName));
  }
}

function getAdminDirName(){
  $rtn = null;
  $dirs = explode(DIRECTORY_SEPARATOR, realpath('.'));
  foreach ($dirs as $k => $v) {
    if ($k == count($dirs)-1) $rtn = $v; 
  }
  if (is_null($rtn)) outputMessage('環境設定に失敗しました。', realpath('.'). ' ディレクトリが適切な場所にアップロードされていません。');
  return $rtn;
}

function outputMessage($message1, $message2=null) {
  $charset = 'UTF-8';
  if (PHP_OS=='WINNT'||PHP_OS=='WIN32'||PHP_OS=='Windows') {
    $message1 = mb_convert_encoding($message1, 'SJIS', $charset);
    if (!is_null($message2)) $message2 = mb_convert_encoding($message2, 'SJIS', $charset);
    $charset = 'Shift_JIS';
  }
  header('Content-Type: text/plain; charset='. $charset);
  print $message1;
  if (!is_null($message2)) {
    print "\r\n";
    print $message2;
  }
  exit;
}
?>
