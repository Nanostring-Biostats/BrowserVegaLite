import * as d3 from "d3"
import embed from 'vega-embed';
import { legendColor } from 'd3-svg-legend'
import colorbrewer from 'colorbrewer'
var infovis = {};


const renderVegaLite = function(wid_waypoint, id, visdata, events) {
  try {
    return embed(`#${id}`, visdata, {
      tooltip: false,
      actions: false,
      theme: 'dark',
      renderer: 'svg'
    })
    .then(result => {
      console.log('Attaching pointerdown listener to Vega view:', result.view);
      // One unified handler for all input types
      result.view.addEventListener('pointerdown', (event, item) => {
        console.log('Pointerdown fired:', event.type);
        console.log('Item object:', item)
        if (item && item.datum) {
          console.log('Datum:', item.datum)
          events.clickHandler(item.datum);
        } else {
          console.warn('No item detected under pointer.');
        }
      });
    })
    .catch(console.warn);
  } catch (error) {
    throw error;
  }
};


infovis.renderMatrix = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderBarChart = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderScatterplot = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderCanvasScatterplot = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderMaskAndPan = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderChanAndMaskandPanHandler = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderMultipleMasksHandler = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderMultipleMasksAndPan = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

infovis.renderMultipleMasksPanChannel = function(wid_waypoint, id, visdata, events) {
  return renderVegaLite(wid_waypoint, id, visdata, events);
}

export default infovis;
