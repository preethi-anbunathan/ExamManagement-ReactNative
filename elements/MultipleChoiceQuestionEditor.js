import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import MultipleChoiceService from '../services/MultipleChoiceService'

class MultipleChoiceQuestionEditor extends Component {
    static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            type: 'multi',
            options: '',
            correctOption :'',
            examId:''
        };
        this.createMulti = this.createMulti.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.multipleChoiceService = MultipleChoiceService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        console.log('In component did mount- Multi');
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        // fetch("http://10.0.3.2:8080/api/lesson/"+lessonId+"/examwidget")
        //   .then(response => (response.json()))
        //   .then(widgets => this.setState({widgets}))
        //this.findAllExamsForLesson(this.state.lessonId);
        console.log("ExamID:"+this.state.examId)
    }
    componentWillReceiveProps(newProps){
        console.log('In component will receive props Multi');
        this.setExamId(newProps.examId);
        //this.findAllExamsForLesson(newProps.lessonId)
    }

    createMulti() {

        let newmulti;
        // let desc;
        // let isTrue;
        //let newtitle;
        // let point;
        // title = this.state.title;
        // desc = this.state.description;
        // isTrue = this.state.isTrue;
        // point = this.state.points;
        newmulti={
            title:this.state.title,
            desciption : this.state.description,
            points : this.state.points,
            type: this.state.type,
            options: this.state.options,
            correctOption: this.state.correctOption
        }


        console.log("Hello logger"+newmulti.correctOption);
        this.multipleChoiceService.createMulti(newmulti,this.state.examId)
            .then(this.props.navigation.navigate("ExamList"));
        //document.getElementById('titleFld').value = '';
    }


    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>
                <Text h3>Multiple Choice Question Model</Text>
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
                           onPress={this.createMulti}/>
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

export default MultipleChoiceQuestionEditor