import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import FillInTheBlanksService from '../services/FillInTheBlanksService'

class FillInTheBlanksEditor extends Component {
    static navigationOptions = { title: "Fill in the blanks"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            variables: '',
            type: 'blanks',
            examId:''
        };
        this.createBlanks = this.createBlanks.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.fillInTheBlanksService = FillInTheBlanksService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        console.log('In component did mount- Blanks');
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        // fetch("http://10.0.3.2:8080/api/lesson/"+lessonId+"/examwidget")
        //   .then(response => (response.json()))
        //   .then(widgets => this.setState({widgets}))
        //this.findAllExamsForLesson(this.state.lessonId);
        console.log("ExamID:"+this.state.examId)
    }
    componentWillReceiveProps(newProps){
        console.log('In component will receive props Blanks');
        this.setExamId(newProps.examId);
        //this.findAllExamsForLesson(newProps.lessonId)
    }

    createBlanks() {

        let newblank;
        // let desc;
        // let isTrue;
        //let newtitle;
        // let point;
        // title = this.state.title;
        // desc = this.state.description;
        // isTrue = this.state.isTrue;
        // point = this.state.points;
        newblank={
            title:this.state.title,
            desciption : this.state.description,
            variables : this.state.variables,
            points : this.state.points,
            type: this.state.type
        }


        console.log("Hello logger"+newblank.variables);
        this.fillInTheBlanksService.createBlanks(newblank,this.state.examId)
            .then(this.props.navigation.navigate("ExamList"));
        //document.getElementById('titleFld').value = '';
    }


    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>
                <Text h3>Fill in the Blanks Question Model</Text>
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

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={this.createBlanks}/>
                <Button
                    onPress={() =>this.props
                        .navigation
                        .goBack()}
                    backgroundColor="red"
                    color="white"
                    title="Cancel"/>

                <Text h4>Preview</Text>
                <Divider
                    style={{
                        backgroundColor:
                            'blue' }} />
                {/*<Text h4>{this.state.title}</Text>*/}

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text h4>{this.state.title}</Text>
                        <Text>{this.state.description}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'right'}}>{this.state.points} pts</Text>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

export default FillInTheBlanksEditor