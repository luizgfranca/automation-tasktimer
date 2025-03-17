import { ToolProvider } from "platformlab-sdk";
import { TaskTimer } from "./timer";


const timer = new TaskTimer();

const tool = new ToolProvider({
    project: 'tasktimer',
    endpoint: 'ws://localhost:8080/ws/tool/provider',
    credentials: {
        username: 'test@test.com',
        password: 'password',
    },
    tools: [
        {
            id: 'create',
            function: async ({ io }) => {
                const name = await io.prompt({
                    title: 'Task name:',
                    type: 'string'
                })

                timer.create(name)

                return 'Created.'
            },
        },
        {
            id: 'show',
            function: async ({ io }) => {
                await io.textBox(timer.display())
                return 'ok';
            }
        },
        {
            id: 'delete',
            function: async ({ io }) => {
                const name = await io.selection({
                    description: 'Select the task to be deleted:',
                    options: timer.list().map((name) => ({
                        key: name,
                        text: name
                    }))
                })

                timer.delete(name)

                return 'Deleted.'
            }
        }
    ]
})

tool.listen()
