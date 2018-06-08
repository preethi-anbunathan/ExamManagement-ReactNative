import React from 'react'
import {View,ScrollView, TextInput , StyleSheet} from 'react-native'
import {Text, Button, CheckBox, Divider, Card} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import EssayService from '../services/EssayService'



class EssayQuestionViewer extends React.Component {
    static navigationOptions = { title: "Essay"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            answer: '',
            type: 'essay',
            examId: '',
            lessonId:'',
            questionId:'',
            essayview:{
                title: '',
                desciption: '',
                points: 0,
                essayAnswer: '',
                type: 'essay'
            }
        }
        this.deleteEssay = this.deleteEssay.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.essayService = EssayService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.setExamId(navigation.getParam("examId"))
        this.state.questionId = navigation.getParam("questionId")
        this.state.lessonId = navigation.getParam("lessonId");
        fetch("http://10.0.3.2:8080/api/essay/"+this.state.questionId)
            .then(response => (response.json()))
            .then(essayview => this.setState({essayview}))
        console.log("ExamID:"+this.state.examId)
    }
    componentWillReceiveProps(newProps){
        console.log('In component did mount- Essay');
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        this.state.lessonId = navigation.getParam("lessonId")
        fetch("http://10.0.3.2:8080/api/essay/"+this.state.questionId)
            .then(response => (response.json()))
            .then(essayview => this.setState({essayview}))

    }

    deleteEssay()
    {
        this.essayService.deleteEssay(this.state.questionId)
            .then(this.props.navigation.navigate("QuestionList",{lessonId:this.state.lessonId}))
    }

    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>

                <Text h4>Preview</Text>
                <Divider
                    style={{
                        backgroundColor:
                            'black' }} />
                <View style={{paddingVertical: 10}}>
                    <View style={{paddingHorizontal: 5}}>
                        <Card style={{height: 400}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text h4>{this.state.essayview.title}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>{this.state.essayview.points} pts</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                <Text>{this.state.essayview.desciption}</Text>
                            </View>
                            <View style={{paddingVertical: 10}}>
                                <Text h4 style={{paddingHorizontal: 5}}>Essay answer</Text>
                                <TextInput style={styles.box} multiline={true} numberOfLines={5}
                                           value={this.state.essayview.essayAnswer}/>
                            </View>
                            <View style={styles.container}>

                                <View style={styles.buttonContainer}>
                                    <Button	 backgroundColor="red"
                                                color="white"
                                                title="Delete"
                                                onPress={this.deleteEssay}/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button	 backgroundColor="orange"
                                                color="white"
                                                title="Cancel"
                                                onPress={() =>this.props
                                                    .navigation
                                                    .goBack()}/>
                                </View>
                            </View>
                        </Card>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    box: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    buttonContainer2: {
        flex: 2,

    }
})


export default EssayQuestionViewer