"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paperless = void 0;
var animation_1 = require("./theme/animation");
var colors_1 = require("./theme/colors");
var height_1 = require("./theme/height");
var rotate_1 = require("./theme/rotate");
var scale_1 = require("./theme/scale");
var screens_1 = require("./theme/screens");
var shadows_1 = require("./theme/shadows");
var spacing_1 = require("./theme/spacing");
var typography_1 = require("./theme/typography");
var width_1 = require("./theme/width");
var z_index_1 = require("./theme/z-index");
exports.paperless = JSON.parse(JSON.stringify({
    theme: {
        colors: colors_1.default,
        boxShadow: shadows_1.default,
        dropShadow: shadows_1.default,
        extend: {
            keyframs: animation_1.default.keyframes,
            animation: animation_1.default.animation,
            fontFamily: {
                geist: ['Geist', 'serif'],
                ambit: ['Ambit', 'sans-serif'],
            },
            scale: scale_1.default,
            rotate: rotate_1.default,
            fontSize: typography_1.default.fontSize,
            lineHeight: typography_1.default.lineHeight,
            zIndex: z_index_1.default,
            screens: screens_1.default,
            width: width_1.default.width,
            height: height_1.default.height,
            spacing: spacing_1.default,
            aspectRatio: {
                branding: '23/24',
            },
        },
    },
}));
