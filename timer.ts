export class TaskTimer {
    taskMap: Record<string, Date> = {};

    create(name: string) {
        if (this.taskMap[name]) {
            throw 'task already exists'
        }

        this.taskMap[name] = new Date();

        console.log('task created; task list is now:', this.taskMap)
    }

    delete(name: string) {
        if (!this.taskMap[name]) {
            throw 'task not found'
        }

        delete this.taskMap[name]
    }

    list() {
        return Object.keys(this.taskMap);
    }

    display() {
        let str = '';
        Object.keys(this.taskMap).forEach(k => {
            const name = k;
            const startTime = this.taskMap[k].toISOString()
            const timeSpent = ((new Date()).getTime() - this.taskMap[k].getTime()) / 1000

            const line = `${name}\t\t${timeSpent}s\t\t${startTime}\n`
            str += line;
        }) 

        return str;
    }
}
