import { BasicGame } from "./games/basic.js"
import { Core } from './engine/engine.js'

document.body.onload = function() {
    window.game = new BasicGame('canvas')
    Core.initialize('canvas', window.game)
}
