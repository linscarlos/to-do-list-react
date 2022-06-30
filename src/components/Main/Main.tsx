import { ChangeEvent, FormEvent, useState } from 'react';
import Clipboard from '../../images/clipboard.png';
import Plus from '../../images/plus.svg'
import styles from './Main.module.css'
import { Trash } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid';

export function Main(){

    const [tasks, setTasks] = useState([{
        id: uuidv4(),
        title: '',
        isComplete: false
    }])

    const [newTaskText, setNewTaskText] = useState('')

    const [isComplete, setIsComplete] = useState(false);

    const [countTaskCompleted, setCountTaskCompleted] = useState(0)

    function handleCreateTask(event: FormEvent){
        event.preventDefault();

        if(tasks[0].title === ''){
            setTasks([{
                id: uuidv4(),
                title: newTaskText,
                isComplete: false
            }])
        }else{
            setTasks([...tasks, {
                id: uuidv4(),
                title: newTaskText,
                isComplete: false
            }])
        }
        setNewTaskText('')
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value);
    }

    function handleCheckbox(event: ChangeEvent<HTMLInputElement>){
        const idEvent = event.target.id;

        const listTaskUpdate = tasks.filter(task => {
            if(task.id === idEvent){

                task.isComplete = !task.isComplete;

                if(task.isComplete === true){
                    setCountTaskCompleted(count => count + 1 )
                }else(
                    setCountTaskCompleted(count => count - 1 )
                )
            }

            return task;
        })

        setTasks(listTaskUpdate)

    }

    function handleDeleteTask(event: String ) {
        const idEvent = event;

        const taskWithoutDeletedOne = tasks.filter(task => {
            if(task.id != idEvent){
                return task
            }else{
                if(task.isComplete === true){
                    setCountTaskCompleted(count => count - 1 )
                }
            }
        })

        if(tasks.length === 1){
            setTasks([{
                id: uuidv4(),
                title: '',
                isComplete: false
            }])
        }else{
            setTasks(taskWithoutDeletedOne)
        }

    }
    

    return (
        <main className={styles.mainContainer}>
            <div className={styles.mainContent}>
                <form onSubmit={handleCreateTask} className={styles.newToDo}>
                    <textarea 
                        name='newTask'
                        placeholder="Adicione uma nova tarefa" 
                        value={newTaskText}
                        onChange={handleNewTaskChange}
                        required
                    />
                    <button type="submit">Criar<img src={Plus} /></button>
                </form>

                <div className={styles.toDoContent}>
                    <div className={styles.controlTask}>
                        <p>Tarefas criadas<span className={styles.taskCount}>{tasks[0].title === '' ? 0 : tasks.length}</span></p>
                        <p>Concluídas<span className={styles.taskCount}>{countTaskCompleted} de {tasks[0].title === '' ? 0 : tasks.length}</span></p>
                    </div>

                    {tasks[0].title === '' ? (

                        <section className={styles.listToDo}>
                            <img src={Clipboard} alt="Lista de taredas vazias" />
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </section>
                    ) : (
                        <section className={styles.listToDoFill}>

                        {tasks.map(task => {
                            return (
                                <div key={task.id} className={styles.taskInput}>
                                    <input type="checkbox" name={task.id} id={task.id} onChange={handleCheckbox} />
                                    <span>{task.title}</span>
                                    <button onClick={() => handleDeleteTask(task.id)} title="Deletar tarefa">
                                        <Trash size={20} />
                                    </button>
                                </div>
                            )
                        })}
                    </section>
                    )}

                </div>
            </div>
        </main>
    )
}