import React, {Component} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {Text, Button, CheckBox, Divider, Card} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import FillInTheBlanksService from '../services/FillInTheBlanksService'

class FillInTheBlanksViewer extends Component {
    static navigationOptions = { title: "Fill in the blanks"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            variables: '',
            type: 'blanks',
            examId:'',
            lessonId:'',
            blanksview:
                {
                    title: '',
                    desciption: '',
                    points: 0,
                    variables: ''
                }
        };
        this.deleteBlank = this.deleteBlank.bind(this);
        this.fillInTheBlanksService = FillInTheBlanksService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.setExamId(navigation.getParam("examId"))
        this.state.questionId = navigation.getParam("questionId")
        this.state.lessonId = navigation.getParam("lessonId");
        fetch("http://10.0.3.2:8080/api/blanks/"+this.state.questionId)
            .then(response => (response.json()))
            .then(blanksview => this.setState({blanksview}))


    }
    componentWillReceiveProps(newProps){
        const {navigation} = this.props;
        this.setExamId(navigation.getParam("examId"))
        this.state.questionId = navigation.getParam("questionId")
        this.state.lessonId = navigation.getParam("lessonId");
        fetch("http://10.0.3.2:8080/api/blanks/"+this.state.questionId)
            .then(response => (response.json()))
            .then(blanksview => this.setState({blanksview}))

    }

    deleteBlank()
    {
        this.fillInTheBlanksService.deleteBlank(this.state.questionId)
            .then(this.props.navigation.navigate("QuestionList",{lessonId:this.state.lessonId}))
    }


    updateForm(newState) {
        this.setState(newState)
    }

    renderBlanks(){
        var str = this.state.blanksview.variables
        var cur= str.replace(/\[(.+?)\]/g, "______")
        return cur
    }

    render() {
        return(
            <ScrollView>
                <Text h4>Preview</Text>
                <Divider
                    style={{
                        backgroundColor:
                            'black' }} />

                <ScrollView style={{paddingVertical: 10}}>
                    <View style={{paddingHorizontal: 5}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text h4>{this.state.blanksview.title}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>{this.state.blanksview.points} pts</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                <Text>{this.state.blanksview.desciption}</Text>
                            </View>
                            <View style={{paddingVertical: 10}}>
                                <Text>{this.renderBlanks()}</Text>
                            </View>
                            <View style={styles.container}>

                                <View style={styles.buttonContainer}>
                                    <Button	 backgroundColor="red"
                                                color="white"
                                                title="Delete"
                                                onPress={this.deleteBlank}/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button	 backgroundColor="blue"
                                                color="white"
                                                title="Cancel"
                                                onPress={() =>this.props
                                                    .navigation
                                                    .goBack()}/>
                                </View>
                            </View>
                    </View>
                </ScrollView>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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
});

export default FillInTheBlanksViewer