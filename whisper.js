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
            ui.notify("No message was entered to whisper.")
            return;
        }

        const data = foundry.utils.expandObject(formData);

        const recipients = [];

        Object.keys(data.user).forEach(id => {
            if (data.user.id) {
                const user = game.users.get(id)
                recipients.push(user.name)
            }
        })

        if (!recipients.length) {
            ui.notify("No recipients were chosen for the whisper.")
            return;
        }

        const whisperTo = recipients.join(", ")

        const message = `/w [${whisperTo}] ${formData.message}`

        ui.chat.processMessage(message)
    }
}