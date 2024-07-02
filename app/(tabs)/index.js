import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import {useRouter} from 'expo-router';
import React, {useRef} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

const {width: screenWidth} = Dimensions.get('window');

export default function Index() {
    const router = useRouter();
    const [taskInput, setTaskInput] = React.useState("");
    const [tasks, setTasks] = React.useState([]);
    const swipeableRefs = useRef([]);


    const navigateToProfile = () => {
        router.navigate('/profile');
    };

    const handleAddTask = () => {
        if (taskInput) {
            const newTask = {text: taskInput, isDone: false};
            setTasks([...tasks, newTask]);
            setTaskInput("");
        }
    };

    const handleDeleteTask = (index) => {
        const swipeableRef = swipeableRefs.current[index];
        if (swipeableRef) {
            swipeableRef.close();
        }

        const updatedTasks = tasks.filter((_, idx) => idx !== index);
        swipeableRefs.current = swipeableRefs.current.filter((_, idx) => idx !== index);
        setTasks(updatedTasks);
        console.log(swipeableRefs.current);
    };

    const toggleTaskStatus = (index) => {
        setTasks(tasks.map((task, idx) => {
            if (idx === index) {
                return {...task, isDone: !task.isDone};
            }
            return task;
        }));
    };

    const renderRightActions = (index) => {
        return (
            <Pressable onPress={() => handleDeleteTask(index)} style={styles.deleteButton}>
                <FontAwesome name="trash-o" size={30} color="white"/>
            </Pressable>
        );
    };

    const renderTaskItem = ({item, index}) => {
        return (
            <Swipeable
                ref={(ref) => swipeableRefs.current[index] = ref}
                renderRightActions={() => renderRightActions(index)}
                style={styles.swipeContainer}
            >
                <View style={styles.taskItem}>
                    <TouchableOpacity onPress={() => toggleTaskStatus(index)} style={styles.taskItemContent}>
                        {item.isDone ? (
                            <AntDesign name="checkcircleo" size={24} color="#1E90FF" style={styles.tickIcon}/>
                        ) : (
                            <Entypo name="circle" size={24} color="#1E90FF" style={styles.tickIcon}/>
                        )}
                        <Text style={item.isDone ? styles.taskTextDone : styles.taskText}>{item.text}</Text>
                    </TouchableOpacity>
                </View>
            </Swipeable>
        );
    };

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.title}>TO-DO</Text>
                <FlatList
                    data={tasks}
                    renderItem={renderTaskItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.taskList}
                />
                <View style={styles.inputContainer}>
                    <AntDesign name="pluscircleo" size={24} color="white" style={styles.addIcon}
                               onPress={handleAddTask}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter task"
                        placeholderTextColor="#999"
                        value={taskInput}
                        onChangeText={text => setTaskInput(text)}
                        onSubmitEditing={handleAddTask}
                        returnKeyType="done"
                    />
                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: '#f5f5f5',
        width: '100%'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'center',
        color: '#333'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#1E90FF',
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        height: 55,
        marginBottom: 40,
        width: '100%',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: 'white'
    },
    addIcon: {
        marginHorizontal: 10,
    },
    taskList: {
        width: '100%',
    },
    tickIcon: {
        marginRight: 5,
    },
    taskItem: {
        padding: 10,
        margin: 1,
        borderWidth: 3,
        borderColor: '#1E90FF',
        backgroundColor: 'white',
        borderRadius: 10,
        width: screenWidth - 50,
    },
    taskItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    taskText: {
        fontSize: 20,
        color: '#333',
        marginLeft: 10,
    },
    taskTextDone: {
        fontSize: 20,
        marginLeft: 10,
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
        backgroundColor: '#1E90FF',
        borderRadius: 10,
    },
    deleteButtonText: {
        color: 'white',
        marginRight: 5,
    },
    deleteIcon: {
        paddingLeft: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
