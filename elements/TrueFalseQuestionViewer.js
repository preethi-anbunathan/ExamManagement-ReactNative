import React, {Component} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {Text, Button, CheckBox, Divider, Card} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import TrueFalseService from '../services/TrueFalseService'

class TrueFalseQuestionViewer extends Component {
    static navigationOptions = { title: "True / False"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            desciption: '',
            points: 0,
            answer: true,
            type: 'truefalse',
            examId:'',
            questionId:'',
            lessonId:'',
            // temp:{},
            truefalseview:{
                title: '',
                desciption: '',
                points: 0,
                answer: true,
                type: '',
                examId:'',

            }
        };
        this.view={}
        //this.updateTrueFalse = this.updateTrueFalse.bind(this);
        this.deleteTrueFalse = this.deleteTrueFalse.bind(this);
        // this.setExamId = this.setExamId.bind(this);
        this.trueFalseService = TrueFalseService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }


    componentDidMount() {

        const {navigation} = this.props;
        this.setExamId(navigation.getParam("examId"))
        this.state.questionId = navigation.getParam("questionId")
        this.state.lessonId = navigation.getParam("lessonId");
        console.log("In ques:"+this.state.questionId)
        fetch("http://10.0.3.2:8080/api/truefalse/"+this.state.questionId)
            .then(response => (response.json()))
            .then(truefalseview => this.setState({truefalseview}))

        console.log("LEts see:"+this.state.truefalseview.title)


    }
    componentWillReceiveProps(newProps){
        const {navigation} = this.props;
        this.setExamId(navigation.getParam("examId"))
        this.state.questionId = navigation.getParam("questionId")
        console.log("In ques:"+this.state.questionId)
        fetch("http://10.0.3.2:8080/api/truefalse/"+this.state.questionId)
            .then(response => (response.json()))
            .then(truefalseview => this.setState({truefalseview}))
    }

    // updateTrueFalse() {
    //
    //     let newtruefalse;
    //     newtruefalse={
    //         title:this.state.title,
    //         desciption : this.state.description,
    //         answer : this.state.answer,
    //         points : this.state.points,
    //         type: this.state.type
    //     }
    //
    //     console.log("In react update truefalse:"+this.state.answer);
    //     console.log("Hello logger"+newtruefalse.answer);
    //     this.trueFalseService.updateTrueFalse(newtruefalse,this.state.questionId)
    //         .then(this.props.navigation.navigate("ExamList"),{examID:this.state.examId})
    //
    //
    //     //document.getElementById('titleFld').value = '';
    // }

    deleteTrueFalse()
    {
        this.trueFalseService.deleteTrueFalse(this.state.questionId)
            .then(this.props.navigation.navigate("QuestionList",{lessonId:this.state.lessonId}))
    }


    updateForm(newState) {
        this.setState(newState);

    }
    render() {
        return(
            <ScrollView>
                {/*<Text h3>True / False Question Model</Text>*/}
                {/*<FormLabel>Title</FormLabel>*/}
                {/*<FormInput defaultValue={this.state.truefalseview.title} onChangeText={*/}
                    {/*text => this.updateForm({title: text})}/>*/}
                {/*/!*<FormValidationMessage>*!/*/}
                    {/*/!*Title is required*!/*/}
                {/*/!*</FormValidationMessage>*!/*/}

                {/*<FormLabel>Description</FormLabel>*/}
                {/*<FormInput*/}
                    {/*defaultValue={this.state.truefalseview.desciption}*/}
                    {/*multiline={true} numberOfLines={4}*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({description: text})*/}
                    {/*}*/}
                {/*/>*/}
                {/*/!*<FormValidationMessage>*!/*/}
                    {/*/!*Description is required*!/*/}
                {/*/!*</FormValidationMessage>*!/*/}

                {/*<FormLabel>Points</FormLabel>*/}
                {/*<FormInput defaultValue={this.state.truefalseview.points.toString()}*/}
                           {/*onChangeText={points => this.updateForm({points: points})}/>*/}
                {/*/!*<FormValidationMessage>*!/*/}
                    {/*/!*Points is required*!/*/}
                {/*/!*</FormValidationMessage>*!/*/}

                {/*<CheckBox onPress={() => this.updateForm({answer: !this.state.answer})}*/}
                          {/*checked={this.state.answer} title='The answer is true'/>*/}

                {/*<View style={styles.container}>*/}
                    {/*<View style={styles.buttonContainer}>*/}
                        {/*<Button	 backgroundColor="green"*/}
                                    {/*color="white"*/}
                                    {/*title="Update"*/}
                                    {/*onPress={this.updateTrueFalse}/>*/}
                    {/*</View>*/}
                    {/*<View style={styles.buttonContainer}>*/}
                        {/*<Button	 backgroundColor="red"*/}
                                    {/*color="white"*/}
                                    {/*title="Delete"*/}
                                    {/*onPress={this.deleteTrueFalse}/>*/}
                    {/*</View>*/}
                {/*</View>*/}
                {/*<View style={styles.buttonContainer2}>*/}
                {/*<Button*/}
                    {/*onPress={() =>this.props*/}
                        {/*.navigation*/}
                        {/*.goBack()}*/}
                    {/*backgroundColor="orange"*/}
                    {/*color="black"*/}
                    {/*title="Cancel"/>*/}
                {/*</View>*/}

                <Text h4>Preview</Text>
                <Divider
                    style={{
                        backgroundColor:
                            'blue' }} />
                {/*<Text h4>{this.state.title}</Text>*/}

                <View style={{paddingVertical: 10}}>
                    <View style={{paddingHorizontal: 5}}>
                        <Card style={{height: 400}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text h4>{this.state.truefalseview.title}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>{this.state.truefalseview.points} pts</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                <Text>{this.state.truefalseview.desciption}</Text>
                            </View>
                            <View style={{paddingVertical: 10}}>
                                <CheckBox
                                    checked={this.state.truefalseview.answer} title='The answer is true'/>
                            </View>
                            <View style={styles.container}>

                                <View style={styles.buttonContainer}>
                                    <Button	 backgroundColor="red"
                                                color="white"
                                                title="Delete"
                                                onPress={this.deleteTrueFalse}/>
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

export default TrueFalseQuestionViewer