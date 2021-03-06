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
 
function EasyMapStyleManager(config){
    this.styledMaps = {};
    this.map = config.map;
}
 
EasyMapStyleManager.prototype = {
    constructor: EasyMapStyleManager,
    addStyleMap: function(config){
        var styledMap = new google.maps.StyledMapType(config.style);
        this.styledMaps[config.name] = styledMap;
        this.updateMapTypeIds();
    },
    addImageMap: function(config){
        var tile = null;
        
        if (config.tileSize != null){
            tile = new google.maps.Size(config.tileSize[0], config.tileSize[1]);
        } else{
            tile = new google.maps.Size(256, 256);
        }
        
        var imgMap = new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom){
                return config.callback(coord, zoom);
            },
            tileSize: tile,
            name: ((config.title != null) ? config.title : ''),
            maxZoom: ((config.maxZoom != null) ? config.maxZoom : 18),
            opacity: ((config.opacity != null) ? config.opacity : 1.0)
        });
        
        this.styledMaps[config.name] = imgMap;
        this.updateMapTypeIds();
    },
    updateMapTypeIds: function(){
        var arrMapTypeIds = this.makeMapTypeIds();
        this.map.setOptions({mapTypeControlOptions: {mapTypeIds: arrMapTypeIds}});
        
        for (var i=1; i<arrMapTypeIds.length; i++){
            var key = arrMapTypeIds[i];
            var value = this.styledMaps[key];
            
            this.map.mapTypes.set(key, value);
        }
    },
    makeMapTypeIds: function(){
        var array = [];
        
        array.push(this.map.current_maptypeid);

        for (var key in this.styledMaps) {
            if (this.styledMaps.hasOwnProperty(key)) {
                array.push(key);
            }
        }
        
        return array;
    },
    setOverlay: function(i, name){
        this.map.overlayMapTypes.insertAt(i, this.styledMaps[name]);
    }
}