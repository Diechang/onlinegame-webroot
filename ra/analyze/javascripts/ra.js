/**
 * Research Artisan Lite: Website Access Analyzer
 * Copyright (C) 2009 Research Artisan Project
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 */
function disableButton(form) {
  var elements = form.elements;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].type == 'submit' && elements[i].name != 'download') {
      elements[i].disabled = true;
    }
  }
  form.submit();
  return false;
}
function checkboxAllOn(formId, checkBoxName) {
  var i;
  var object = document.getElementById(formId);  if (object==undefined) return;
  if (object.length) {
    for (i = 0; i < object.length; i++) if (object[i].name == checkBoxName) object[i].checked = true;
  } else {
    object.checked = true;
  }
}
function checkboxAllOff(formId, checkBoxName) {
  var i;
  var object = document.getElementById(formId);  if (object==undefined) return;
  if (object.length) {
    for (i = 0; i < object.length; i++) if (object[i].name == checkBoxName) object[i].checked = false;
  } else {
    object.checked = false;
  }
}
