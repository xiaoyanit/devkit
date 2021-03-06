/* @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with the Game Closure SDK.  If not, see <http://www.gnu.org/licenses/>.
 */

var common = require('../common');
var parser = common.jsio("import util.parseJS");

exports.getStrings = function (src) {
	var tree = parser.parse(src);
	var strings = extractFromTree(tree);
	return strings;
}

function extractFromTree(tree, strings) {
	if (!strings) { strings = {}; }

	if (tree[0] == "string") {
		var val = tree[1];
		if (/^[^a-zA-Z]*$/.test(val)) { return strings; }
		var details = {
				"line": tree.line
			};
		if (strings[val]) {
			strings[val].push(details);
		} else {
			strings[val] = [details];
		}
	} else {
		var n = tree.length;
		for (var i = 0; i < n; ++i) {
			if (Array.isArray(tree[i])) {
				extractFromTree(tree[i], strings);
			}
		}
	}

	return strings;
}