export class WhisperFormApplication extends FormApplication {
    constructor() {
        super();
    }

    static get defaultOptions() {
        const defaults = super.defaultOptions;

        const overrides = {
            height: 'auto',
            id: 'whisper-app',
            template: 'modules/ez-whisper-app/template.hbs',
            title: "Send Whisper Message",
            width: 500,
            classes: ["ez-whisper-app"]
        };

        return foundry.utils.mergeObject(defaults, overrides);
    }

    getData(options) {

        const recipients = [];

        game.users.forEach(user => {
            if (user.id !== game.user.id) {
            // if (!user.isGM && !!user.character) {
                recipients.push(user);
            }
        })

        return {
            users: game.users,
            recipients: recipients
        }
    }

    activateListeners(html) {
        super.activateListeners(html);

    }

    _updateObject(event, formData) {


        if (!formData.message) {
            ui.notify("No message was entered to whisper.")
            return;
        }

        const recipients = [];
        const userPrefix = 'user-';

        Object.keys(formData).forEach(key => {
            if (key.startsWith(userPrefix)) {
                const user = game.users.get(key.substring(userPrefix.length))
                recipients.push(user.name)
            }
        })

        if (!recipients.length) {
            ui.notify("No recipients were chosen for the whisper.")
            return;
        }


        const whisperTo = recipients.join(" ")

        const message = `/w ${whisperTo} ${formData.message}`

        ui.chat.processMessage(message)

    }

    // submit(options) {
    //     super.submit(options);
    //     console.log("ioasdhfasd")
    // }
}