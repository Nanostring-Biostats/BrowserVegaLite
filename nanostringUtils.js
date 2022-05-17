import { index_regex } from './state'

/**
 * Event Listener to pan and zoom to a specific place and draw a box
 * @param {object} osd : The osd object in use for building the story - passed from the waypoint build event
 * @param {object} svgObj : The object containing the data for the pan coordinates (object), zoom ratio (number), and 
 *      box start point and dimensions (list of objects)
 * @param {number} storyNum : the story number of the current waypoint
 * @param {number} waypointNum : the waypoint number of the current waypoint
 * @returns N/A 
 */
export function panZoom(osd, svgObj, storyNum, waypointNum) {
    const id = 'ROIBox'
    // Pan and Zoom
    osd.viewer.viewport.panTo(svgObj.panCoord)
    osd.viewer.viewport.zoomTo(svgObj.zoomRatio)

    // If an ROI' is already highlighted, remove it and add a box around the new one
    if (document.querySelector(`[id^=${id}-`)){
        const ROIBoxes = document.querySelectorAll(`[id^=${id}-`)
        ROIBoxes.forEach((box) => {
            osd.viewer.removeOverlay(box.id)
            document.querySelector(`#${box.id}`).remove()
        })
        if (ROIBoxes[0].id === `${id}-${svgObj.name}-${1}`) {
            return
        }
        
    }
    for (let i=1; i <= (svgObj.ROIBox).length; i++){
        addROIBox(osd, svgObj.ROIBox[i-1], `${id}-${svgObj.name}-${i}`, storyNum, waypointNum)
    }
}

/**
 * Adds or removes, if already present, the polygon corresponding to the specific part on the slide.
 * @param {string} polygonID : id to assign to the polygon once it is drawn (later identifies it for removing)
 * @param {object} fileName : name of the object that the file is assigned to when imported into the story-specific file
 * @param {object} osd : The osd object in use for building the story - passed from the waypoint build event
 */
export function addSlidePolygon(polygonID, fileName, osd){
    if (!document.querySelector(`#${polygonID}`)) {
        osd.addPolygon(polygonID, fileName);
    } else {
        document.querySelector(`#${polygonID}`).remove();
    }
}

/**
 * Adds a box at the specifc coordinates provided.
 * @param {object} osd : The osd object in use for building the story - passed from the waypoint build event
 * @param {object} ROIBox : Specifies the x and y coordinates of the top left corner and width and height of the box to draw
 * @param {string} id : unique identifier to assign to the box to draw
 * @param {number} storyNum : the story number the waypoint to draw the ROI box for (current story)
 * @param {number} waypointNum : the waypoint number that to draw the ROI Box for (current waypoint)
 */
function addROIBox(osd, ROIBox, id, storyNum, waypointNum){
    const {overlay} = ROIBox
    osd.addOverlay(overlay, id, storyNum, waypointNum)
}

/**
 * Turns on specific data layers in the story
 * @param {object} osd : The osd object in use for building the story - passed from the waypoint build event
 * @param {list of strings} maskNames : Exact name of data layer to turn on, exactly as it appears in the story
 */
export function addMask(osd, maskNames) {
    osd.hashstate.m = [-1];
    maskNames.forEach((el) => {
        var escaped_name = el.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regexName = RegExp('^'+escaped_name+'$','gi');
        const maskIndex = index_regex(osd.hashstate.masks, regexName);
        if (maskIndex >= 0){
            osd.hashstate.m.push(maskIndex);
        }
    });
    osd.hashstate.pushState();
    window.onpopstate();
}

/**
 * Changes the story to render the channels passed to it.
 * @param {object} osd : The osd object in use for building the story - passed from the waypoint build event
 * @param {string} channelName : exact name of the channel as it appears in the story
 */
export function addChannel(osd, channelName) {
    const channelsList = osd.hashstate.cgs[0].Channels;
    const channelIndex = channelsList.indexOf(channelName);
    if (channelIndex >= 0) {
        osd.hashstate.g = channelIndex + 1;
    } else {
        osd.hashstate.g = 0;
    }
}

/**
 * Changes the sotry to render the channels and data layers (masks) passed to it
 * @param {object} osd : The osd object in use for building the story - passed from the waypoint build event
 * @param {list of strings} maskNames : Exact name of data layer to turn on, exactly as it appears in the story
 * @param {string} channelName : exact name of the channel as it appears in the story
 */
export function addMaskAndChannel(osd, maskNames, channelName) {
    addMask(osd, maskNames);
    if (channelName){
        addChannel(osd, channelName);
    }
    osd.hashstate.pushState();
    window.onpopstate();
}

/**
 * Add click handlers to an element
 * @param {object} osd : The osd object in use for building the story - passed from the waypoint build event
 * @param {object} svgObj : The object containing the data for the pan coordinates (object), zoom ratio (number), and 
 *      box start point and dimensions (list of objects)
 * @param {object} svg : svg or item in the story to attach the event handlers to
 * @param {list of strings} eventTypes : the names of the event handlers to attach to the svg (addPolygon, panZoom, addMask, addMaskAndChannel)
 * @param {number} storyNum : the story number of the current waypoint
 * @param {number} waypointNum : the waypoint number of the current waypoint 
 */
export function addEListener(osd, svgObj, svg, eventTypes, storyNum, waypointNum) {
    svg.addEventListener('click', () => {
        eventTypes.forEach((eventType) => {
            switch (eventType) {
                case 'addPolygon':
                    addSlidePolygon(svgObj.polygonID, svgObj.file, osd)
                    break;
                case 'panZoom':
                    panZoom(osd, svgObj, storyNum, waypointNum)
                    break;
                case 'addMask':
                    addMask(osd, svgObj.maskName);
                    break;
                case 'addMaskAndChannel':
                    addMaskAndChannel(osd, svgObj.maskName, svgObj.channel);
                    break;
                default:
                    break;
            }
        })
    });   
}
