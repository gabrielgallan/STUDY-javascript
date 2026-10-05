// 2

class DatabaseReconciler {
    static execute(databaseUsers, deviceUsers) {
    const result = {
        create: [],
        update: [],
        remove: []
    }

    databaseUsers.forEach(user => {
        const userInDevice = deviceUsers.find(u => u.id === user.id)

        if (!userInDevice) {
            result.create.push(user)
        } else if (userInDevice && (JSON.stringify(userInDevice) !== JSON.stringify(user))) {
            result.update.push(user)
        }
    })

    deviceUsers.forEach(user => {
        if (!databaseUsers.find(u => u.id === user.id)) {
            result.remove.push(user)
        }
    })

    return result 
}
}

const databaseUsers = [
  { id: 1, name: 'Ana', access: true },
  { id: 2, name: 'Carlos', access: false },
  { id: 3, name: 'Maria', access: true }
];

const deviceUsers = [
  { id: 1, name: 'Ana', access: true },
  { id: 2, name: 'Carlos', access: true },
  { id: 4, name: 'João', access: true }
];

// 3

class RateLimiter {
    requests = new Map()

    isAllowed(userId) {
        const now = Date.now()
        const userRequest = this.requests.get(userId)

        if (!userRequest) {
            this.requests.set(userId, {
                firstReq: now,
                reqCount: 1
            })

            return true
        }

        if ((now - userRequest.firstReq) >= 10000) {
            this.requests.set(userId, {
                firstReq: now,
                reqCount: 1
            })

            return true
        }

        if (userRequest.reqCount >= 5) {
            return false
        }

        userRequest.reqCount++

        return true
    }
}

// 4

const events = [
  {
    eventId: 'abc-123',
    type: 'ACCESS_GRANTED',
    userId: 10
  },
  {
    eventId: 'abc-124',
    type: 'ACCESS_DENIED',
    userId: 20
  },
  {
    eventId: 'abc-123',
    type: 'ACCESS_GRANTED',
    userId: 10
  }
];

class EventsProcessor {
    #processedEvents = new Map()

    constructor() {
        this.#startProcessing()
    }

    processEvent(e) {
        if (this.#processedEvents.get(e.eventId) === undefined) {
            this.#processedEvents.set(e.eventId, {
                ...e,
                timestamp: Date.now()
            })
        }

        return
    }

    #clearEvents() {
        const now = Date.now()
        const fiveMinAgo = now - 30000

        this.#processedEvents.forEach((e) => {
            if (e.timestamp < fiveMinAgo) {
                this.#processedEvents.delete(e.eventId)
            }
        })

        return
    }

    #startProcessing() {
        setTimeout(() => {
            this.#clearEvents()
        }, 1000)
    }

    get events() {
        return this.#processedEvents
    }
}

// 5

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomValue() {
  return Math.floor(Math.random() * 5001)
}

class DeviceSyncService {
    options = {
        concurrency: 3
    }
    devicesQueue = new Map()
    devicesResult = new Map()

    async execute(devices) {
        devices.forEach(device => {
            this.devicesQueue.set(device.id, {
            ...device,
            syncStatus: 'queued'
            })
        })

        return await this.updateQueue()
    }

    async updateQueue() {
        const devicesProcessing = [...this.devicesQueue.values()].filter(d => d.syncStatus === 'processing').length
        const freeSpots = this.options.concurrency - devicesProcessing

        const nextDevices = [...this.devicesQueue.values()].filter(d => d.syncStatus === 'queued').slice(0, freeSpots)

        if (nextDevices.length === 0) {
            return this.devicesResult.values()
        }

        nextDevices.forEach((device) => {
            this.devicesQueue.set(device.id, {
                ...device,
                syncStatus: 'processing'
            })
        })

        Promise.all(nextDevices.map(async (device) => {
            await sleep(randomValue())

            this.devicesQueue.delete(device.id)

            this.devicesResult.set(device.id, {
                ...device,
                syncStatus: 'processed'
            })

            this.updateQueue()
        }))
    }
}