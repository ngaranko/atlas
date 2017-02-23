'use strict';

const toggleDrawingToolPO =
    dp.require('modules/map/components/draw-tool/toggle-drawing-tool/toggle-drawing-tool.page-objects');

module.exports = function (drawToolElement) {
    return {
        toggleDrawingTool: toggleDrawingToolPO(drawToolElement.element(by.css('dp-toggle-drawing-tool')))
    };
};
