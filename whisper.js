export class WhisperFormApplication extends FormApplication {
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
                recipients.push(user);
            }
        })

        return {
            users: game.users,
            recipients: recipients
        }
    }

    _updateObject(event, formData) {
        if (!formData.message) {
            ui.notifications.error("No message was entered to whisper.")
            throw new Error("No message was entered to whisper.")
        }

        const data = foundry.utils.expandObject(formData);

        const recipients = [];

        Object.keys(data.user).forEach(id => {
            if (data.user[id]) {
                const user = game.users.get(id)
                recipients.push(user.name)
            }
        })

        if (!recipients.length) {
            ui.notifications.error("No recipients were chosen for the whisper.")
            throw new Error("No recipients were chosen for the whisper.")
        }

        const whisperTo = recipients.join(", ")

        const message = `/w [${whisperTo}] ${formData.message}`

        ui.chat.processMessage(message)
    }
}