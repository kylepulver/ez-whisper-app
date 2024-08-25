import { WhisperFormApplication } from "./whisper.js";

console.log("EZ Whisper App | Loaded");

Hooks.on("ready", () => {
})

Hooks.on("renderChatLog", (application, html, data) => {
    html.find("#chat-controls").prepend(`<label class="chat-control-icon"><a class="ez-whisper-app-button" data-tooltip="Whisper"><i class="fas fa-comment"></i></a></label>`)

    html.on("click", ".ez-whisper-app-button", (ev) => {
        new WhisperFormApplication().render(true);
    })
})