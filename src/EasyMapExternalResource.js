/* @license
 *
 * Copyright (c) 2014 Jorge Alberto G�mez L�pez <gomezlopez.jorge96@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.*/
 
function EasyExternalResource(config){
    this.resources = {};
    this.map = config.map;
}
 
EasyExternalResource.prototype = {
    constructor: EasyExternalResource,
    addSource: function(config){
        this.resources[config.name] = new google.maps.KmlLayer(config.url);
    },
    setSource: function(name){
        var KML = this.resources[name];
        KML.setMap(this.map);
    }
}