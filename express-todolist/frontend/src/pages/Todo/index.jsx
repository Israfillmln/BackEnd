import axios from "axios"
import { Box, Button, Container, Flex, Input, Spacer, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react"

const TodoPage = () => {
    const toast = useToast()
    const [todoList, setTodoList] = useState([])
    const [inputValues, setInputValues] = useState("")


    const fetchTodoList = async () => {
        try {
            const res = await axios.get("http://localhost:2000/todos")
            setTodoList(res.data.result)
        } catch (error) {
            toast({
                title: "Can't Reach The Server",
                description: "Connect The Server",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
        }
    }

    const inputHandler = (event) => {
        const {value} = event.target
        setInputValues(value)
    }

    const addNewListBtn = async () => {
        try {
            
            axios.post("http://localhost:2000/todos", {
                action: inputValues,
                isDone: "On Going"
            })

            fetchTodoList()
            setInputValues("")
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    const deleteTodoList = (id) => {
        axios.delete(`http://localhost:2000/todos/${id}`).then(() => {
            fetchTodoList()
        })
    }

    const editTodoList = (id) => {

        const dataToFind = todoList.find((val) => {
            return val.id == id;
          });

        axios.patch(`http://localhost:2000/todos/${id}`, {
            isDone: !dataToFind.isDone
        }).then(() => {
            fetchTodoList()
        }).catch((err) => {
            console.log(err.response.data.message);
        })
    }

    const renderTodoList = () => {
        return todoList.map((val) => {
            
            return (
                <Box padding="3" my="3" width="xl" border="1px" borderColor="gray.750" borderRadius="lg">
                <Flex justifyContent="space-between">
                <Text fontSize="2xl">{val.action}</Text>
                <Spacer />
                {val.isDone ? <Button onClick={() => editTodoList(val.id)} colorScheme="green" mx="2">Done</Button> : <Button onClick={() => editTodoList(val.id)} colorScheme="orange" mx="2">On Going</Button>}
                <Button onClick={() => deleteTodoList(val.id)}>Delete</Button>
                </Flex>
                </Box> 
            )
        })
    }

    useEffect(() => {
        fetchTodoList()
    }, [])

    return (
        <Container padding="3" width="xl" my="5" >
            <Flex>
            <Input onChange={inputHandler} />
            <Button onClick={addNewListBtn}  marginLeft="4" colorScheme="green">Add New List</Button>
            </Flex>
                {renderTodoList()}
        </Container>
    )
}

export default TodoPage