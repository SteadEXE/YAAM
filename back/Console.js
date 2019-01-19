class Console {
    Log (topic, message) {
        const now = new Date()

        console.log(`[${now.toDateString()} ${topic}] ${message}`)
    }
}

module.exports = new Console