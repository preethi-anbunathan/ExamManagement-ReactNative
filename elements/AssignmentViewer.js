import React, {Component} from 'react'
import {View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Text, ListItem, FormLabel, FormInput, FormValidationMessage, Button, Divider, Icon, Card} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'


class AssignmentViewer extends Component {
    static navigationOptions = {title: 'Assignment'};
    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            title: '',
            description: '',
            widgetType:'Assignment',
            text: 'AssignmentWidget',
            lessonId:1,
            points:0,
            essayAnswer:'',
            uploadFileLink:'',
            link:'',
            assignId:'',
            newAssign:{
                title: '',
                description: '',
                widgetType:'Assignment',
                text: 'AssignmentWidget',
                lessonId:1,
                points:0,
                essayAnswer:'',
                uploadFileLink:'',
                link:''
            }

        };

        this.assignService = AssignmentService.instance;
    }

    updateForm(newState) {
        this.setState(newState)
    }

    setAssignId(assignId) {
        this.setState({assignId: assignId});
    }

    componentDidMount() {
        const {navigation} = this.props;

        //this.setAssignId(navigation.getParam("assignId"))
this.state.assignId = navigation.getParam("assignId");
        console.log("http://10.0.3.2:8080/api/assignment/"+this.state.assignId)
        fetch("http://10.0.3.2:8080/api/"+this.state.assignId)
            .then(response => (response.json()))
            .then(newAssign => this.setState({newAssign}))

    }
    componentWillReceiveProps(newProps){
        const {navigation} = this.props;

        //this.setAssignId(navigation.getParam("assignId"))
        this.state.assignId = navigation.getParam("assignId");
        console.log("http://10.0.3.2:8080/api/assignment/"+this.state.assignId)
        fetch("http://10.0.3.2:8080/api/"+this.state.assignId)
            .then(response => (response.json()))
            .then(newAssign => this.setState({newAssign}))
    }

    findAllAssignForLesson(lessonId) {
        console.log('In find all assign');
        this.assignService
            .findAllAssignForLesson(lessonId)
            .then((widgets) => {this.setAssign(widgets)});
    }

    setAssign(widgets) {
        console.log('In set Assign');
        this.setState({widgets: widgets})
    }

    // createAssign() {
    //     console.log("In create assign");
    //     let newAssign;
    //     newAssign={
    //         title:this.state.title,
    //         description : this.state.description,
    //         text : this.state.text,
    //         widgetType : this.state.widgetType,
    //         points: this.state.points,
    //         essayAnswer: this.state.essayAnswer,
    //         uploadFileLink:this.state.uploadFileLink,
    //         link:this.state.link
    //     }
    //     console.log("Widget Type:"+newAssign.widgetType);
    //     console.log("Widget Title:"+newAssign.title);
    //     this.assignService
    //         .createAssign
    //         (this.state.lessonId,newAssign)
    //         .then(this.props.navigation.navigate("AssignmentList",{lessonId:this.state.lessonId}))
    // }
    //
    // deleteAssign(widgetId) {
    //
    //     this.assignService
    //         .deleteAssign(widgetId)
    //         .then(() => {
    //             this.findAllAssignForLesson
    //             (this.state.lessonId)
    //         });
    //
    // }



    render() {
        return(
            <ScrollView>
                    <Text h4>Preview</Text>
                    <Divider
                        style={{
                            backgroundColor:
                                'blue' }} />
                    <ScrollView style={{paddingVertical: 10}}>
                        <View style={{paddingHorizontal: 5}}>
                            <Card style={{height: 400}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text h4>{this.state.newAssign.title}</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{textAlign: 'right'}}>{this.state.newAssign.points} pts</Text>
                                    </View>
                                </View>
                                <View style={{paddingVertical: 2}}>
                                    <Text>{this.state.newAssign.description}</Text>
                                </View>
                                <View style={{paddingVertical: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}>Essay answer</Text>
                                    <TextInput style={styles.box} value={this.state.newAssign.essayAnswer} multiline={true} numberOfLines={5}/>
                                </View>
                                <View style={{paddingVertical: 2, paddingBottom: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}>Upload File</Text>
                                    <TextInput/>
                                </View>
                                <View style={{paddingVertical: 2, paddingBottom: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}> Submit Link</Text>
                                    <TextInput/>
                                </View>

                            </Card>
                        </View>
                    </ScrollView>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da'
    }
});

export default AssignmentViewer