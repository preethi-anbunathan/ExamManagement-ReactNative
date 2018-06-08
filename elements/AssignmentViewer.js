import React, {Component} from 'react'
import {View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Text, ListItem, FormLabel, FormInput, FormValidationMessage, Button, Divider, Icon, Card} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'


class AssignmentViewer extends Component {
    static navigationOptions = {title: 'Assignment'};
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            widgetType:'Assignment',
            text: 'AssignmentWidget',
            lessonId:'',
            points:0,
            essayAnswer:'',
            uploadFileLink:'',
            link:'',
            assignId:'',
            assignview:{
                title:'',
                description: '',
                text: '',
                widgetType: '',
                points:'',
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

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    componentDidMount() {
        const {navigation} = this.props;

        this.state.lessonId = navigation.getParam("lessonId")
        this.state.assignId = navigation.getParam("assignId");
        fetch("http://10.0.3.2:8080/api/assign/"+this.state.assignId)
            .then(response => (response.json()))
            .then(assignview => this.setState({assignview}))
    }
    componentWillReceiveProps(newProps){
        const {navigation} = this.props;

        this.state.lessonId = navigation.getParam("lessonId")
        this.state.assignId = navigation.getParam("assignId");
        fetch("http://10.0.3.2:8080/api/assign/"+this.state.assignId)
            .then(response => (response.json()))
            .then(assignview => this.setState({assignview}))
    }


    render() {
        return(
            <ScrollView style={{padding: 15}}>

                    <Text h4>Preview</Text>
                    <Divider
                        style={{
                            backgroundColor:
                                'black' }} />
                    <ScrollView style={{paddingVertical: 10}}>
                        <View style={{paddingHorizontal: 5}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text h4>{this.state.assignview.title}</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{textAlign: 'right'}}>{this.state.assignview.points} pts</Text>
                                    </View>
                                </View>
                                <View style={{paddingVertical: 2}}>
                                    <Text>{this.state.assignview.description}</Text>
                                </View>
                                <View style={{paddingVertical: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}>Essay answer</Text>
                                    <TextInput style={styles.box} multiline={true} numberOfLines={5}/>
                                </View>
                                <View style={{paddingVertical: 2, paddingBottom: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}>Upload File</Text>
                                    <TextInput/>
                                </View>
                                <View style={{paddingVertical: 2, paddingBottom: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}> Submit Link</Text>
                                    <TextInput/>
                                </View>
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