import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox, Divider, Card} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import TrueFalseService from '../services/TrueFalseService'

class TrueFalseQuestionEditor extends Component {
    static navigationOptions = { title: "True / False"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            answer: true,
            type: 'truefalse',
            examId:'',
            lessonId:''
        };
        this.createTrueFalse = this.createTrueFalse.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.trueFalseService = TrueFalseService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {

        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        this.state.lessonId = navigation.getParam("lessonId")


    }
    componentWillReceiveProps(newProps){
        this.setExamId(newProps.examId);

    }

    createTrueFalse() {

     let newtruefalse;

    newtruefalse={
        title:this.state.title,
        desciption : this.state.description,
        answer : this.state.answer,
        points : this.state.points,
        type: this.state.type
    }


        this.trueFalseService.createTrueFalse(newtruefalse,this.state.examId)
            .then(this.props.navigation.navigate("QuestionList",{lessonId:this.state.lessonId}));

    }


    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>
                <Text h3>True / False Question Model</Text>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    multiline={true} numberOfLines={4}
                    onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={points => this.updateForm({points: points})}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <CheckBox onPress={() => this.updateForm({answer: !this.state.answer})}
                          checked={this.state.answer} title='The answer is true'/>

                <Button backgroundColor="green"
                           color="white"
                           title="Save"
                onPress={this.createTrueFalse}/>
                <Button
                    onPress={() =>this.props
                        .navigation
                        .goBack()}
                    backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text></Text>
                <Text></Text>
                <Divider
                    style={{
                        backgroundColor:
                            'blue' }} />
                <Text h4>Preview</Text>


                <ScrollView style={{paddingVertical: 10}}>
                    <View style={{paddingHorizontal: 5}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text h4>{this.state.title}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>{this.state.points} pts</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                <Text>{this.state.description}</Text>
                            </View>
                            <View style={{paddingVertical: 10}}>
                                <CheckBox
                                          checked={this.state.answer} title='The answer is true'/>
                            </View>

                    </View>
                </ScrollView>

            </ScrollView>
        )
    }
}

export default TrueFalseQuestionEditor