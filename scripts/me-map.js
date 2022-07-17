var map,markers=[];const log_map=function(o){console.log("[MAP INFO] "+o)},DEFAULT_ZOOM=2,DEFAULT_PRECISION=8,COORD_DIGITS=8,DEFAULT_LAT=20,DEFAULT_LON=0;var gw_icon,air_icon;function me_map_init(){map=L.map("map").setView([DEFAULT_LAT,DEFAULT_LON],DEFAULT_ZOOM),L.tileLayer("http://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',subdomains:"abcd",maxZoom:19}).addTo(map),gw_icon=L.icon({iconUrl:"css/images/marker-icon-gw.png",shadowUrl:"css/images/marker-shadow.png",iconSize:L.Icon.Default.prototype.options.iconSize,shadowSize:L.Icon.Default.prototype.options.shadowSize,iconAnchor:L.Icon.Default.prototype.options.iconAnchor,popupAnchor:L.Icon.Default.prototype.options.popupAnchor,shadowSize:L.Icon.Default.prototype.options.shadowSize,shadowAnchor:L.Icon.Default.prototype.options.shadowAnchor}),air_icon=L.icon({iconUrl:"css/images/marker-icon-air.png",shadowUrl:"css/images/marker-shadow.png",iconSize:L.Icon.Default.prototype.options.iconSize,shadowSize:L.Icon.Default.prototype.options.shadowSize,iconAnchor:L.Icon.Default.prototype.options.iconAnchor,popupAnchor:L.Icon.Default.prototype.options.popupAnchor,shadowSize:L.Icon.Default.prototype.options.shadowSize,shadowAnchor:L.Icon.Default.prototype.options.shadowAnchor}),console.log(gw_icon),map.on("click",onMapClick)}function onMapClick(o){}function getLastSeenSec(o){new Date(o.last_seen);let e=o.last_seen,t=new Date;return Math.floor(t.getTime()/1e3)-e}function getLastSeen(o){let e=getLastSeenSec(o),t="error";if(e<60)t="< 1 minute";else if(e<3600){let o=Math.round(e/60),n=" minute";o>1&&(n+="s"),t=o.toString()+n}else if(e<86400){let o=Math.round(e/3600),n=" hour";o>1&&(n+="s"),t=o.toString()+n}else if(e<2592e3){let o=Math.round(e/86400),n=" day";o>1&&(n+="s"),t=o.toString()+n}else if(e<31104e3){let o=Math.round(e/2592e3),n=" month";o>1&&(n+="s"),t=o.toString()+n}else if(e<=31104e4){let o=Math.round(e/31104e3),n=" year";o>1&&(n+="s"),t=o.toString()+n}else t="never";return t}function getStateStr(o){let e=o.state;if(e)switch(e){case 1:return"Active";default:return"Inactive"}return"Unknown"}function getTypeStr(o){switch(me_lib_type(o)){case ME_TYPE_AIR:return"AIR";case ME_TYPE_GW:return"GW"}return"Unknown"}function me_map_plot_record(o,e){let t=parseFloat(e.location.lat)||0,n=parseFloat(e.location.lon)||0;var a=L.marker([t,n]).addTo(map);let r=new Date(1e3*e.timestamp),i="";i+=o+" location: "+t.toFixed(COORD_DIGITS)+", "+n.toFixed(COORD_DIGITS)+"<br>",i+="Time: "+r+"<br>",a.bindPopup(i),markers.push(a)}function zoomPoints(o){o||(o=.5);var e=new L.featureGroup(markers);map.fitBounds(e.getBounds().pad(o))}function getMarker(o,e,t){var n;switch(me_lib_type(o)){case ME_TYPE_AIR:n=L.marker([e,t],{icon:air_icon});break;case ME_TYPE_GW:n=L.marker([e,t],{icon:gw_icon});break;default:n=L.marker([e,t])}return n}function me_map_add(o,e){let t=getLastSeen(o);log_map("adding "+o.station_id+" last seen: "+t+" ago");let n=e(o.account),a="pages/data/index.html?station="+o.account+me_lib_get_chain_param(),r=parseFloat(o.location.lat)||0,i=parseFloat(o.location.lon)||0;if(0===r||0===i)return void console.log("not adding "+o.account);var c=getMarker(o.account,r,i).addTo(map);let s="";s+="Station ID: <b>"+o.account+"</b> &nbsp;"+getTypeStr(o.account)+"<br>",s+="Station name: "+o.station_id+"<br>",s+="Location: "+r.toFixed(COORD_DIGITS)+", "+i.toFixed(COORD_DIGITS)+"<br>",s+="Last seen: "+t+" ago<br>",s+="State: "+getStateStr(o)+"<br>",s+='<a href="'+a+'" target="_blank" rel="noopener noreferrer">Charts</a> &nbsp;|&nbsp; ',s+='<a href="'+n+'" target="_blank" rel="noopener noreferrer">Live Stream</a>',c.bindPopup(s),markers.push(c)}