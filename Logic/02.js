function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function randomProcess() {
  const delay = Math.floor(Math.random() * 2000) + 500

  await sleep(delay)

  return Math.random() < 0.5
}

// 6

const jobs = [
  { id: 1, type: 'email' },
  { id: 2, type: 'backup' },
  { id: 3, type: 'report' },
  { id: 4, type: 'sync' }
]

class JobProcessor {
    options = {
        maxAttempts: 3
    }
    jobs = new Map()

    async execute(jobs) {
        this.jobs.clear()

        jobs.forEach(job => {
            this.jobs.set(job.id, {
                ...job,
                status: 'queued',
                attempts: 0
            })
        })

        await this.process()

        return this.jobs.values()
    }

    async process() {
        for (const job of [...this.jobs.values()]) {
            for (let c = 1; c <= this.options.maxAttempts; c++) {
                const result = await randomProcess()

                this.jobs.set(job.id, {
                    ...job,
                    status: result === true ? 'success' : 'failed',
                    attempts: c
                })

                if (result === true) break
            }
        }

        return
    }
}

// 7

const users = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Carlos' },
  { id: 3, name: 'Maria' },
  { id: 4, name: 'João' },
  { id: 5, name: 'Julia' },
  { id: 6, name: 'Pedro' }
]

class UsersSyncService {
    options = {
        concurrency: 2
    }
    queue = []
    results = []

    async execute(users) {
        this.queue = []
        this.results = []

        this.queue = users.map(user => {
            return {
                ...user,
                status: 'queued'
            }
        })

        await this.sync()

        return this.results
    }

    async sync() {
        while (this.queue.length > 0) {
            const usersByStatus = this.queue.reduce((acc, ct) => {
                acc[ct.status].push(ct)

                return acc
            }, { queued: [], processing: [] })

            const freeSlots = this.options.concurrency - usersByStatus.processing.length

            if (freeSlots <= 0) {
                return
            }
            
            const nextUsers = usersByStatus.queued.slice(0, freeSlots)

            const ids = nextUsers.map(user => user.id)

            this.queue = this.queue.map(user => ids.includes(user.id) ? {
                ...user,
                status: 'processing'
            } : user)

            await Promise.all(nextUsers.map(async (user) => {
                const result = await randomProcess()

                this.queue = this.queue.filter(u => u.id !== user.id)

                this.results.push({
                    ...user,
                    status: result === true ? 'success' : 'failed'
                })
            }))
        }
    }
}