import React, {Component} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import {Text, Button, CheckBox, Divider, ListItem, Icon, Card} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import MultipleChoiceService from '../services/MultipleChoiceService'
import  RadioForm from 'react-native-simple-radio-button';

class MultipleChoiceQuestionViewer extends Component {
    static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            type: 'multi',
            options: '',
            correctOption: 0,
            examId:'',
            lessonId:'',
            choices:[],
            multiview:{
                title: '',
                desciption: '',
                points: 0,
                type: 'multi',
                options: '',
                correctOption: 0,

            }
        };

        this.setExamId = this.setExamId.bind(this);
        this.multipleChoiceService = MultipleChoiceService.instance;
        this.addChoice = this.addChoice.bind(this);
        this.deleteMulti= this.deleteMulti.bind(this);
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.setExamId(navigation.getParam("examId"))
        this.state.questionId = navigation.getParam("questionId")
        this.state.lessonId = navigation.getParam("lessonId");
        fetch("http://10.0.3.2:8080/api/multi/"+this.state.questionId)
            .then(response => (response.json()))
            .then(multiview => this.setState({multiview}))


    }
    componentWillReceiveProps(newProps){
        const {navigation} = this.props;
        this.setExamId(navigation.getParam("examId"))
        this.state.questionId = navigation.getParam("questionId")
        this.state.lessonId = navigation.getParam("lessonId");
        fetch("http://10.0.3.2:8080/api/multi/"+this.state.questionId)
            .then(response => (response.json()))
            .then(multiview => this.setState({multiview}))
    }


    saveQuestion(){

        var  allOpt = this.state.choices
        var i
        var joinedOptions="";
        for(i=1;i<allOpt.length;i++){
            joinedOptions = joinedOptions + allOpt[i-1].option+";";
        }

        if((allOpt.length-1)>=0)
            joinedOptions = joinedOptions + allOpt[allOpt.length-1].option

        this.state.options=joinedOptions

    }



    updateForm(newState) {
        this.setState(newState)
    }

    addChoice(newChoice) {
        this.setState({ choices: [ ...this.state.choices, {
                option: newChoice
            }]})
    }

    setCorrectOption (index, value) {
        this.setState({
            correctOption: index
        })
    }

    deleteOption (index) {
        var array= this.state.choices
        array.splice(index, 1)
        this.setState ({choices: array})
    }

    deleteMulti()
    {
        this.multipleChoiceService.deleteMulti(this.state.questionId)
            .then(this.props.navigation.navigate("QuestionList",{lessonId:this.state.lessonId}))
    }

    renderRadio() {
        let radioProps = []
        radioProps= this.state.multiview.options.split(";");
        return radioProps

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
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text h4>{this.state.multiview.title}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>{this.state.multiview.points} pts</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                <Text>{this.state.multiview.desciption}</Text>
                            </View>


                            <View>
                                {this.renderRadio().map(
                                    (choice) => (
                                        <ListItem
                                            key={choice}
                                            title={choice}
                                            leftIcon={<Icon
                                                reverse
                                                name='dot-circle-o'
                                                type='font-awesome'
                                                size={4}
                                                style={{paddingRight:20}}
                                            />}

                                        />))}
                            </View>
                            <View style={styles.containers}>

                                <View style={styles.buttonContainer}>
                                    <Button	 backgroundColor="red"
                                                color="white"
                                                title="Delete"
                                                onPress={this.deleteMulti}/>
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

                </View>

            </ScrollView>







        )
    }
}

const styles = StyleSheet.create({
    containers: {
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


export default MultipleChoiceQuestionViewer